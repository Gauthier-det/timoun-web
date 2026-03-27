<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Panel from '../components/Panel.vue'

const route = useRoute()
const evenementId = route.params.id
const evenement = ref(null)
const loading = ref(true)
const error = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatDateRange(startDateStr, endDateStr) {
  const start = formatDate(startDateStr)
  if (!endDateStr) return start
  const end = formatDate(endDateStr)
  return `${start} - ${end}`
}

function blocksToHtml(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks.map((block) => blockToHtml(block)).join('')
}

function blockToHtml(block) {
  switch (block.type) {
    case 'paragraph':
      return `<p>${inlineToHtml(block.children)}</p>`
    case 'heading':
      return `<h${block.level}>${inlineToHtml(block.children)}</h${block.level}>`
    case 'list': {
      const tag = block.format === 'ordered' ? 'ol' : 'ul'
      const items = (block.children || []).map((item) => `<li>${inlineToHtml(item.children)}</li>`).join('')
      return `<${tag}>${items}</${tag}>`
    }
    case 'quote':
      return `<blockquote>${inlineToHtml(block.children)}</blockquote>`
    case 'code':
      return `<pre><code>${inlineToHtml(block.children)}</code></pre>`
    case 'image':
      return `<img src="${'http://localhost:1337' + block.image?.url}" alt="${block.image?.alternativeText || ''}" class="article-block-img" />`
    default:
      return ''
  }
}

function inlineToHtml(children) {
  if (!Array.isArray(children)) return ''
  return children
    .map((node) => {
      if (node.type === 'link') return `<a href="${node.url}">${inlineToHtml(node.children)}</a>`
      let text = escapeHtml(node.text || '')
      if (node.bold) text = `<strong>${text}</strong>`
      if (node.italic) text = `<em>${text}</em>`
      if (node.underline) text = `<u>${text}</u>`
      if (node.strikethrough) text = `<s>${text}</s>`
      if (node.code) text = `<code>${text}</code>`
      return text
    })
    .join('')
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const contentHtml = computed(() => blocksToHtml(evenement.value?.content))

const heroSubtitle = computed(() => {
  if (!evenement.value) return ''
  const datePart = formatDateRange(evenement.value.start_date, evenement.value.end_date)
  const cityPart = evenement.value.city ? ` • ${evenement.value.city}` : ''
  return `${datePart}${cityPart}`
})

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:1337/api/evenements?populate=image')
    if (!res.ok) throw new Error(`Erreur ${res.status}`)

    const json = await res.json()
    const list = Array.isArray(json.data) ? json.data : []

    evenement.value = list.find((item) => `${item.documentId}` === `${evenementId}` || `${item.id}` === `${evenementId}`) || null

    if (!evenement.value && list.length === 1) {
      evenement.value = list[0]
    }

    if (!evenement.value) {
      throw new Error('Évènement introuvable')
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
      <div v-if="loading" class="hero"><p class="hero-subtitle">Chargement…</p></div>
      <div v-else-if="error" class="hero"><p class="hero-subtitle">Impossible de charger l'évènement : {{ error }}</p></div>
      <template v-else-if="evenement">
        <Hero kicker="Évènement" :title="evenement.title" :subtitle="heroSubtitle" />

        <Panel :title="evenement.title">
          <img
            v-if="evenement.image?.url"
            :src="'http://localhost:1337' + evenement.image.url"
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
