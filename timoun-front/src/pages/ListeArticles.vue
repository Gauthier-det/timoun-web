<script setup>
import { ref, computed, onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import { API_URL } from '../api.js'
import { formatDate } from '../utils/format.js'

const articles = ref([])
const loading = ref(true)
const error = ref(null)

const sortedArticles = computed(() =>
  [...articles.value].sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  )
)

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/articles?populate=main_image`)
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const json = await res.json()
    // Strapi singleType returns data as object; normalize to array
    const raw = json.data
    articles.value = Array.isArray(raw) ? raw : raw ? [raw] : []
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
        kicker="Articles"
        title="Les articles de l'association"
        subtitle="Témoignages, évènements, retours de missions, focus sur un projet ou une famille&nbsp;: retrouvez ici tous les articles publiés."
      />

      <Section title="">
        <div v-if="loading" class="news-loading">Chargement…</div>
        <div v-else-if="error" class="news-error">Impossible de charger les articles : {{ error }}</div>
        <div v-else-if="sortedArticles.length === 0" class="news-empty">Aucun article disponible.</div>
        <div v-else class="news-list">
          <RouterLink
            v-for="article in sortedArticles"
            :key="article.documentId"
            :to="`/articles/${article.documentId}`"
            class="news-row"
          >
            <div class="news-thumb">
              <img
                v-if="article.main_image?.url"
                :src="API_URL + article.main_image.url"
                :alt="article.title"
                class="news-thumb-img"
              />
              <span v-else>Photo</span>
            </div>
            <div>
              <h2 class="news-row-title">{{ article.title }}</h2>
              <p class="news-row-meta">{{ formatDate(article.release_date) }} • par {{ article.author }}</p>
              <p class="card-text">{{ article.resume }}</p>
            </div>
          </RouterLink>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
