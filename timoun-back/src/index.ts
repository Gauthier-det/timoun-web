import type { Core } from '@strapi/strapi';
import { seedArticles, seedEvenements } from './seed-data';

const PUBLIC_ACTIONS = [
  'api::article.article.find',
  'api::article.article.findOne',
  'api::evenement.evenement.find',
  'api::evenement.evenement.findOne',
];

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (existing) {
      if (!existing.enabled) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .update({ where: { id: existing.id }, data: { enabled: true } });
      }
    } else {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id, enabled: true } });
    }
  }

  strapi.log.info('[permissions] Accès public articles + évènements OK.');
}

async function seedData(strapi: Core.Strapi) {
  try {
    const articleCount = await strapi.documents('api::article.article').count({
      status: 'published',
    });

    if (articleCount === 0) {
      for (const data of seedArticles) {
        await strapi.documents('api::article.article').create({ data, status: 'published' });
      }
      strapi.log.info(`[seed] ${seedArticles.length} articles créés.`);
    } else {
      strapi.log.info(`[seed] Articles déjà présents (${articleCount}), skip.`);
    }
  } catch (err) {
    strapi.log.error('[seed] Erreur lors de la création des articles :', err);
  }

  try {
    const evenementCount = await strapi.documents('api::evenement.evenement').count({
      status: 'published',
    });

    if (evenementCount === 0) {
      for (const data of seedEvenements) {
        await strapi.documents('api::evenement.evenement').create({ data, status: 'published' });
      }
      strapi.log.info(`[seed] ${seedEvenements.length} évènements créés.`);
    } else {
      strapi.log.info(`[seed] Évènements déjà présents (${evenementCount}), skip.`);
    }
  } catch (err) {
    strapi.log.error('[seed] Erreur lors de la création des évènements :', err);
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicPermissions(strapi);
    await seedData(strapi);
  },
};