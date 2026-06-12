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

const contentHtml = computed(() => blocksToHtml(article.value?.content))

const heroSubtitle = computed(() => {
  if (!article.value) return ''
  return `${formatDate(article.value.release_date)} • par ${article.value.author || 'Auteur inconnu'}`
})

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/articles/${encodeURIComponent(articleId)}?populate=main_image`)
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
        </Panel>
      </template>
    </main>
    <SiteFooter />
  </div>
</template>
