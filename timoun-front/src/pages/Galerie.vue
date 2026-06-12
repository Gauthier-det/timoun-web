<script setup>
import { reactive } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'

const toAltText = (imagePath) => {
  const fileName = imagePath.split('/').pop() || ''
  const nameWithoutExt = fileName.replace(/\.[^.]+$/, '')
  const normalized = nameWithoutExt.replace(/[-_]+/g, ' ').trim()
  const compact = normalized
    .replace(/^school\s*/i, '')
    .replace(/^rural\s*/i, '')
    .replace(/^village\s*/i, '')
    .replace(/^landscapes\s*/i, '')
    .replace(/^graphics\s*/i, '')
    .trim()

  return compact || 'Photo'
}

const buildImages = (paths) => paths.map((path) => ({
  src: path,
  alt: toAltText(path)
}))

const categories = [
  {
    id: 'school',
    kicker: 'Éducation',
    title: "L'école",
    description: "Classes, repas, fournitures et vie scolaire au cœur de l'action.",
    images: buildImages([
      '/resources/school/schoolclasses-de-pre-scolaire-maternelle-1.jpg',
      '/resources/school/schoolclasses-de-pre-scolaire-maternelle-6.jpg',
      '/resources/school/schoolclasses-de-primaire-2.jpg',
      '/resources/school/schoolclasses-de-primaire-3.jpg',
      '/resources/school/schoolclasses-du-college-secondaire-de-ternier-1.jpg',
      '/resources/school/schoolclasses-du-college-secondaire-de-ternier-2.jpg',
      '/resources/school/schoolclasses-du-college-secondaire-de-ternier-3.jpg',
      '/resources/school/schoolclasses-du-college-secondaire-de-ternier-4.jpg',
      '/resources/school/schoolcollege-imenes-oge-pre-scolaire-et-primaire.jpg',
      '/resources/school/schoolcst.jpg',
      '/resources/school/schooldistribution-de-repas-au-college-secondaire-1.jpg',
      '/resources/school/schooldistribution-de-repas-au-college-secondaire-2.jpg',
      '/resources/school/schooldistribution-de-repas-au-college-secondaire-3.jpg',
      '/resources/school/schooldistribution-du-repas-au-college-imenes-oge-5.jpg',
      '/resources/school/schoolecoles-1.jpg',
      '/resources/school/schoolecoles-2.jpg',
      '/resources/school/schoolecoles-3.jpg',
      '/resources/school/schoolecoles-4.jpg',
      '/resources/school/schoolle-college-secondaire-de-ternier-cst.jpg',
      '/resources/school/schoolrepas-au-college-imenes-oge-1.jpg',
      '/resources/school/schoolrepas-au-college-imenes-oge-2.jpg',
      '/resources/school/schoolrepas-au-college-imenes-oge-3.jpg',
      '/resources/school/schoolrepas-au-college-imenes-oge-4.jpg',
      '/resources/school/schoolsur-le-chemin-de-lecole.jpg'
    ])
  },
  {
    id: 'village',
    kicker: 'Terrain',
    title: 'Le village',
    description: 'Le quotidien à Ternier et dans les environs de la Vallée de Jacmel.',
    images: buildImages([
      '/resources/village/villageternier-et-alentours-1.jpg'
    ])
  },
  {
    id: 'landscapes',
    kicker: 'Nature',
    title: 'Paysages',
    description: 'Les reliefs, les routes et les paysages qui entourent le village.',
    images: buildImages([
      '/resources/landscapes/landscapesternier-et-alentours-2.jpg',
      '/resources/landscapes/landscapesternier-et-alentours-3.jpg',
      '/resources/landscapes/landscapesternier-et-alentours-4.jpg',
      '/resources/landscapes/landscapesternier-et-alentours-8.jpg',
      '/resources/landscapes/landscapesternier-et-alentours-9.jpg',
      '/resources/landscapes/landscapestoto.jpg'
    ])
  },
  {
    id: 'rural',
    kicker: 'Développement rural',
    title: 'Autonomie',
    description: 'Jardins, semences et activités agricoles menées avec les familles.',
    images: buildImages([
      '/resources/rural/ruralrural-1.jpg',
      '/resources/rural/ruralrural-2.jpg',
      '/resources/rural/ruralrural-3.jpg',
      '/resources/rural/ruralrural-4.jpg',
      '/resources/rural/ruralrural-5.jpg'
    ])
  },
  {
    id: 'graphics',
    kicker: 'Association',
    title: 'Moments de vie',
    description: "Identité visuelle, moments solidaires et photos d'engagement.",
    images: buildImages([
      '/resources/graphics/graphicscourse-solidaire.jpg',
      '/resources/graphics/graphicsdrapeau.jpg',
      '/resources/graphics/graphicslogo.png',
      '/resources/graphics/graphicssolidaires.jpg'
    ])
  }
]

const carouselIndexes = reactive(
  categories.reduce((accumulator, category) => {
    accumulator[category.id] = 0
    return accumulator
  }, {})
)

const previousImage = (categoryId, total) => {
  carouselIndexes[categoryId] = (carouselIndexes[categoryId] - 1 + total) % total
}

const nextImage = (categoryId, total) => {
  carouselIndexes[categoryId] = (carouselIndexes[categoryId] + 1) % total
}

const goToImage = (categoryId, index) => {
  carouselIndexes[categoryId] = index
}
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <Hero
        kicker="Photos"
        title="Galerie photos"
        subtitle="Explorez toutes les catégories en carrousel : école, village, paysages, rural et vie associative."
      />

      <Section
        v-for="category in categories"
        :key="category.id"
        :kicker="category.kicker"
        :title="category.title"
      >
        <div class="gallery-category">
          <div class="subsection-text">
            <p>{{ category.description }}</p>
            <p class="gallery-counter">
              {{ carouselIndexes[category.id] + 1 }} / {{ category.images.length }}
            </p>
          </div>

          <div class="gallery-carousel" role="region" :aria-label="`Carrousel ${category.title}`">
            <button
              class="gallery-nav gallery-nav-prev"
              type="button"
              :aria-label="`Image précédente ${category.title}`"
              @click="previousImage(category.id, category.images.length)"
            >
              ‹
            </button>

            <div class="gallery-viewport">
              <div
                class="gallery-track"
                :style="{ transform: `translateX(-${carouselIndexes[category.id] * 100}%)` }"
              >
                <figure v-for="image in category.images" :key="image.src" class="gallery-slide">
                  <img class="gallery-slide-image" :src="image.src" :alt="image.alt" loading="lazy">
                  <figcaption class="gallery-caption">{{ image.alt }}</figcaption>
                </figure>
              </div>
            </div>

            <button
              class="gallery-nav gallery-nav-next"
              type="button"
              :aria-label="`Image suivante ${category.title}`"
              @click="nextImage(category.id, category.images.length)"
            >
              ›
            </button>

            <div class="gallery-dots" role="tablist" :aria-label="`Navigation ${category.title}`">
              <button
                v-for="(image, imageIndex) in category.images"
                :key="`${category.id}-${image.src}`"
                class="gallery-dot"
                :class="{ active: carouselIndexes[category.id] === imageIndex }"
                type="button"
                :aria-label="`Aller à l'image ${imageIndex + 1}`"
                @click="goToImage(category.id, imageIndex)"
              />
            </div>
          </div>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
