<script setup>
import { ref, computed, onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import { API_URL } from '../api.js'
import { formatDateRange, firstParagraph } from '../utils/format.js'

const evenements = ref([])
const loading = ref(true)
const error = ref(null)

const sortedEvenements = computed(() =>
  [...evenements.value].sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
)

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/evenements?populate=image`)
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const json = await res.json()
    evenements.value = Array.isArray(json.data) ? json.data : []
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
        kicker="Agenda"
        title="Calendrier des évènements"
        subtitle="Retrouvez ici tous les évènements organisés par l'association."
      />

      <Section title="">
        <div v-if="loading" class="news-loading">Chargement…</div>
        <div v-else-if="error" class="news-error">Impossible de charger les évènements : {{ error }}</div>
        <div v-else-if="sortedEvenements.length === 0" class="news-empty">Aucun évènement disponible.</div>
        <div v-else class="news-list">
          <RouterLink
            v-for="evenement in sortedEvenements"
            :key="evenement.documentId || evenement.id"
            :to="`/evenements/${evenement.documentId || evenement.id}`"
            class="news-row"
          >
            <div class="news-thumb">
              <img
                v-if="evenement.image?.url"
                :src="API_URL + evenement.image.url"
                :alt="evenement.title"
                class="news-thumb-img"
              />
              <span v-else>Photo</span>
            </div>

            <div>
              <h2 class="news-row-title">{{ evenement.title }}</h2>
              <p class="news-row-meta">
                {{ formatDateRange(evenement.start_date, evenement.end_date) }} • {{ evenement.city || '-' }}
              </p>
              <p class="card-text">{{ firstParagraph(evenement.content) || "Découvrez les détails de cet évènement." }}</p>
            </div>
          </RouterLink>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
