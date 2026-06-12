/// <reference types="node" />

import { factories } from '@strapi/strapi';

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const hits = (recentByIp.get(ip) || []).filter((t) => t > cutoff);
  if (hits.length >= RATE_MAX) {
    recentByIp.set(ip, hits);
    return true;
  }
  hits.push(now);
  recentByIp.set(ip, hits);
  return false;
}

setInterval(() => {
  const cutoff = Date.now() - RATE_WINDOW_MS;
  for (const [ip, hits] of recentByIp.entries()) {
    const kept = hits.filter((t) => t > cutoff);
    if (kept.length === 0) recentByIp.delete(ip);
    else recentByIp.set(ip, kept);
  }
}, RATE_WINDOW_MS).unref?.();

function clamp(value: unknown, max: number): string {
  return String(value ?? '').slice(0, max).trim();
}

export default factories.createCoreController(
  'api::contact-message.contact-message',
  ({ strapi }) => ({
    async create(ctx) {
      const ip = ctx.request.ip || 'unknown';
      const ua = clamp(ctx.request.header['user-agent'], 512);
      const body = (ctx.request.body as { data?: Record<string, unknown> })?.data || {};

      // Honeypot : champ invisible cote front. Si rempli => bot, on renvoie 200 silencieux.
      if (clamp(body.website, 200) !== '') {
        strapi.log.warn(`[contact-message] honeypot rempli depuis ${ip}`);
        ctx.status = 200;
        ctx.body = { data: { ok: true } };
        return;
      }

      if (isRateLimited(ip)) {
        ctx.status = 429;
        ctx.body = { error: { status: 429, message: 'Trop de messages, reessayez dans une minute.' } };
        return;
      }

      const nom = clamp(body.nom, 120);
      const email = clamp(body.email, 254);
      const sujet = clamp(body.sujet, 200);
      const message = clamp(body.message, 5000);

      if (!nom || !email || !message) {
        ctx.status = 400;
        ctx.body = { error: { status: 400, message: 'Champs obligatoires manquants.' } };
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        ctx.status = 400;
        ctx.body = { error: { status: 400, message: 'Adresse email invalide.' } };
        return;
      }

      await strapi.documents('api::contact-message.contact-message').create({
        data: { nom, email, sujet, message, ip, userAgent: ua },
      });

      ctx.status = 200;
      ctx.body = { data: { ok: true } };
    },
  })
);