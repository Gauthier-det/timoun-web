<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Panel from '../components/Panel.vue'
import { API_URL } from '../api.js'
import { blocksToHtml } from '../utils/blocks.js'
import { formatDate } from '../utils/format.js'

const route = useRoute()
const articleId = route.params.id
const article = ref(null)
const loading = ref(true)
const error = ref(null)
const galleryIndex = ref(0)

const contentHtml = computed(() => blocksToHtml(article.value?.content))

function prevPhoto() {
  const photos = article.value?.galery
  if (!photos?.length) return
  galleryIndex.value = (galleryIndex.value - 1 + photos.length) % photos.length
}

function nextPhoto() {
  const photos = article.value?.galery
  if (!photos?.length) return
  galleryIndex.value = (galleryIndex.value + 1) % photos.length
}

const heroSubtitle = computed(() => {
  if (!article.value) return ''
  return `${formatDate(article.value.release_date)} • par ${article.value.author || 'Auteur inconnu'}`
})

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/articles/${encodeURIComponent(articleId)}?populate[0]=main_image&populate[1]=galery`)
    if (res.status === 404) throw new Error('Article introuvable')
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const json = await res.json()
    article.value = json.data || null
    if (!article.value) throw new Error('Article introuvable')
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
      <div v-if="loading" class="hero"><p class="hero-subtitle">Chargement…</p></div>
      <div v-else-if="error" class="hero"><p class="hero-subtitle">Impossible de charger l'article : {{ error }}</p></div>
      <template v-else-if="article">
        <Hero
          kicker="Article"
          :title="article.title"
          :subtitle="heroSubtitle"
        />
        <Panel :title="article.title">
          <img
            v-if="article.main_image?.url"
            :src="API_URL + article.main_image.url"
            :alt="article.title"
            class="article-main-img"
          />
          <div class="article-content" v-html="contentHtml"></div>
          <div v-if="article.galery?.length" class="article-gallery">
            <div class="gallery-carousel">
              <button
                v-if="article.galery.length > 1"
                type="button"
                class="gallery-nav gallery-nav-prev"
                aria-label="Photo précédente"
                @click="prevPhoto"
              >‹</button>
              <a
                :href="API_URL + article.galery[galleryIndex].url"
                target="_blank"
                rel="noopener"
                class="gallery-main-link"
              >
                <img
                  :src="API_URL + (article.galery[galleryIndex].formats?.medium?.url || article.galery[galleryIndex].url)"
                  :alt="article.galery[galleryIndex].alternativeText || article.title"
                  class="gallery-main-img"
                />
              </a>
              <button
                v-if="article.galery.length > 1"
                type="button"
                class="gallery-nav gallery-nav-next"
                aria-label="Photo suivante"
                @click="nextPhoto"
              >›</button>
            </div>
            <div v-if="article.galery.length > 1" class="gallery-dots">
              <button
                v-for="(photo, i) in article.galery"
                :key="photo.id"
                type="button"
                class="gallery-dot"
                :class="{ active: i === galleryIndex }"
                :aria-label="`Voir la photo ${i + 1}`"
                @click="galleryIndex = i"
              ></button>
            </div>
          </div>
        </Panel>
      </template>
    </main>
    <SiteFooter />
  </div>
</template>
