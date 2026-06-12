<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Panel from '../components/Panel.vue'
import { API_URL } from '../api.js'
import { blocksToHtml } from '../utils/blocks.js'
import { formatDateRange } from '../utils/format.js'

const route = useRoute()
const evenementId = route.params.id
const evenement = ref(null)
const loading = ref(true)
const error = ref(null)

const contentHtml = computed(() => blocksToHtml(evenement.value?.content))

const heroSubtitle = computed(() => {
  if (!evenement.value) return ''
  const datePart = formatDateRange(evenement.value.start_date, evenement.value.end_date)
  const cityPart = evenement.value.city ? ` • ${evenement.value.city}` : ''
  return `${datePart}${cityPart}`
})

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/evenements/${encodeURIComponent(evenementId)}?populate=image`)
    if (res.status === 404) throw new Error('Évènement introuvable')
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const json = await res.json()
    evenement.value = json.data || null
    if (!evenement.value) throw new Error('Évènement introuvable')
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
      <div v-else-if="error" class="hero"><p class="hero-subtitle">Impossible de charger l'évènement : {{ error }}</p></div>
      <template v-else-if="evenement">
        <Hero kicker="Évènement" :title="evenement.title" :subtitle="heroSubtitle" />

        <Panel :title="evenement.title">
          <img
            v-if="evenement.image?.url"
            :src="API_URL + evenement.image.url"
            :alt="evenement.title"
            class="article-main-img"
          />

          <div class="event-meta">
            <p>
              <strong>Date :</strong> {{ formatDateRange(evenement.start_date, evenement.end_date) }}<br>
              <strong>Ville :</strong> {{ evenement.city || '-' }}<br>
              <strong>Adresse :</strong> {{ evenement.address || '-' }}
            </p>
          </div>

          <div class="event-content" v-html="contentHtml"></div>
        </Panel>
      </template>
    </main>
    <SiteFooter />
  </div>
</template>
