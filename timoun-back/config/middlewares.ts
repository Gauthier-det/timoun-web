/// <reference types="node" />

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s: string) => s.trim())
  .filter(Boolean);

export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: corsOrigins,
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    },
  },
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];