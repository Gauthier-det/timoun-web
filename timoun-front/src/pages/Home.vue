<script setup>
import { ref, computed, onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Section from '../components/Section.vue'
import Card from '../components/Card.vue'
import { API_URL } from '../api.js'

const articles = ref([])
const evenements = ref([])
const loading = ref(true)
const error = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function normalize(data) {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

function firstParagraph(blocks) {
  if (!Array.isArray(blocks)) return ''
  const p = blocks.find(b => b.type === 'paragraph')
  return p?.children?.map(c => c.text || '').join('') || ''
}

const latestArticles = computed(() =>
  [...articles.value]
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 2)
)

const upcomingEvents = computed(() =>
  [...evenements.value]
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0, 2)
)

onMounted(async () => {
  try {
    const [artRes, evtRes] = await Promise.allSettled([
      fetch(`${API_URL}/api/articles?populate=main_image`),
      fetch(`${API_URL}/api/evenements`),
    ])

    if (artRes.status === 'fulfilled' && artRes.value.ok) {
      const json = await artRes.value.json()
      articles.value = normalize(json.data)
    }
    if (evtRes.status === 'fulfilled' && evtRes.value.ok) {
      const json = await evtRes.value.json()
      evenements.value = Array.isArray(json.data) ? json.data : []
    }

    if (artRes.status === 'rejected' && evtRes.status === 'rejected') {
      error.value = 'Impossible de joindre le serveur.'
    }
  } catch {
    error.value = 'Une erreur inattendue est survenue.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <div v-if="loading" class="news-loading">Chargement…</div>
      <div v-else-if="error" class="news-error">{{ error }}</div>
      <template v-else>
        <Section kicker="Haïti • Sur le terrain" title="Les dernières actualités en Haïti">
          <div class="cards-grid">
            <RouterLink
              v-for="article in latestArticles"
              :key="article.documentId"
              :to="`/articles/${article.documentId}`"
              class="card-link"
            >
              <Card
                type="Actualité"
                :title="article.title || 'Sans titre'"
                :date="formatDate(article.release_date)"
                :text="article.resume || ''"
                :imageUrl="article.main_image?.url ? API_URL + article.main_image.url : undefined"
              />
            </RouterLink>
            <p v-if="latestArticles.length === 0" class="text-muted">Aucun article disponible.</p>
          </div>
        </Section>

        <Section kicker="Agenda" title="Calendrier et futurs évènements">
          <div class="timeline">
            <Card
              v-for="evt in upcomingEvents"
              :key="evt.documentId"
              type="Évènement à venir"
              :title="evt.title || 'Sans titre'"
              :date="formatDate(evt.start_date)"
              :location="evt.city || ''"
              :isEvent="true"
              :text="firstParagraph(evt.content)"
              :withMedia="false"
            />
            <p v-if="upcomingEvents.length === 0" class="text-muted">Aucun évènement à venir.</p>
          </div>
        </Section>
      </template>
    </main>
    <SiteFooter />
  </div>
</template>