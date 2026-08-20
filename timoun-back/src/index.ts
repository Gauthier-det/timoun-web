import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';
import { seedArticles, seedEvenements, seedGalerieCategories } from './seed-data';

const PUBLIC_ACTIONS = [
  'api::article.article.find',
  'api::article.article.findOne',
  'api::evenement.evenement.find',
  'api::evenement.evenement.findOne',
  'api::galerie-categorie.galerie-categorie.find',
  'api::galerie-categorie.galerie-categorie.findOne',
  'api::contact-message.contact-message.create',
];

const IMAGE_MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const toAltText = (fileName: string) => {
  const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');
  const normalized = nameWithoutExt.replace(/[-_]+/g, ' ').trim();
  const compact = normalized
    .replace(/^school\s*/i, '')
    .replace(/^rural\s*/i, '')
    .replace(/^village\s*/i, '')
    .replace(/^landscapes\s*/i, '')
    .replace(/^graphics\s*/i, '')
    .trim();

  return compact || 'Photo';
};

async function uploadGalleryImage(strapi: Core.Strapi, filePath: string, fileName: string) {
  const ext = path.extname(fileName).toLowerCase();
  const mimetype = IMAGE_MIME_TYPES[ext];
  if (!mimetype) return null;

  const { size } = await fs.promises.stat(filePath);
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        alternativeText: toAltText(fileName),
      },
    },
    files: {
      filepath: filePath,
      originalFilename: fileName,
      mimetype,
      size,
    },
  });

  return uploaded;
}

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
        await strapi.documents('api::article.article').create({ data: data as any, status: 'published' });
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
        await strapi.documents('api::evenement.evenement').create({ data: data as any, status: 'published' });
      }
      strapi.log.info(`[seed] ${seedEvenements.length} évènements créés.`);
    } else {
      strapi.log.info(`[seed] Évènements déjà présents (${evenementCount}), skip.`);
    }
  } catch (err) {
    strapi.log.error('[seed] Erreur lors de la création des évènements :', err);
  }

  try {
    const galerieCount = await strapi.documents('api::galerie-categorie.galerie-categorie').count({
      status: 'published',
    });

    if (galerieCount === 0) {
      const assetsRoot = path.join(process.cwd(), 'seed-assets', 'gallery');
      let totalImages = 0;

      for (const { folder, ...data } of seedGalerieCategories) {
        const dir = path.join(assetsRoot, folder);
        let imageIds: number[] = [];

        if (fs.existsSync(dir)) {
          const fileNames = (await fs.promises.readdir(dir))
            .filter((name) => !/logo/i.test(name))
            .sort();

          for (const fileName of fileNames) {
            const uploaded = await uploadGalleryImage(strapi, path.join(dir, fileName), fileName);
            if (uploaded) imageIds.push(uploaded.id);
          }
          totalImages += imageIds.length;
        } else {
          strapi.log.warn(`[seed] Dossier d'images introuvable pour "${folder}" (${dir}), catégorie créée sans photo.`);
        }

        await strapi.documents('api::galerie-categorie.galerie-categorie').create({
          data: { ...data, images: imageIds } as any,
          status: 'published',
        });
      }
      strapi.log.info(`[seed] ${seedGalerieCategories.length} catégories galerie créées (${totalImages} photos).`);
    } else {
      strapi.log.info(`[seed] Catégories galerie déjà présentes (${galerieCount}), skip.`);
    }
  } catch (err) {
    strapi.log.error('[seed] Erreur lors de la création de la galerie :', err);
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicPermissions(strapi);
    await seedData(strapi);
  },
};