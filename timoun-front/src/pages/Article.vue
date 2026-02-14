<script setup>
import { useRoute } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Panel from '../components/Panel.vue'

const route = useRoute()
const articleId = route.params.id

// Données statiques pour l'exemple - seront remplacées par des appels API
const articleData = {
  title: `Titre d'article numéro ${articleId}`,
  author: 'Colette',
  date: '15/04/2026',
  subtitle: 'Découvrez les dernières actualités de notre association.',
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
  `
}
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <Hero 
        :kicker="`Article #${articleId}`"
        :title="articleData.title"
        :subtitle="articleData.subtitle"
      />

      <Panel :title="articleData.title">
        <div class="article-meta">
          <p>
            <strong>Par :</strong> {{ articleData.author }}<br>
            <strong>Date :</strong> {{ articleData.date }}
          </p>
        </div>
        <div class="article-content" v-html="articleData.content"></div>
      </Panel>
    </main>
    <SiteFooter />
  </div>
</template>
