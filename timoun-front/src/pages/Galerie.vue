<script setup>
import { reactive, ref, onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import { API_URL } from '../api.js'

const categories = ref([])
const loading = ref(true)
const error = ref(null)
const carouselIndexes = reactive({})

const previousImage = (categoryId, total) => {
  carouselIndexes[categoryId] = (carouselIndexes[categoryId] - 1 + total) % total
}

const nextImage = (categoryId, total) => {
  carouselIndexes[categoryId] = (carouselIndexes[categoryId] + 1) % total
}

const goToImage = (categoryId, index) => {
  carouselIndexes[categoryId] = index
}

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/galerie-categories?populate=images&sort=order:asc`)
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const json = await res.json()
    const raw = Array.isArray(json.data) ? json.data : []

    categories.value = raw.map((category) => ({
      id: category.slug,
      kicker: category.kicker,
      title: category.title,
      description: category.description,
      images: (category.images || []).map((image) => ({
        src: API_URL + image.url,
        alt: image.alternativeText || image.name || 'Photo'
      }))
    }))

    for (const category of categories.value) {
      carouselIndexes[category.id] = 0
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
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

      <div v-if="loading" class="news-loading">Chargement…</div>
      <div v-else-if="error" class="news-error">Impossible de charger la galerie : {{ error }}</div>

      <template v-else>
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
      </template>
    </main>
    <SiteFooter />
  </div>
</template>
