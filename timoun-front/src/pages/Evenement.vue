<script setup>
import { useRoute } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Panel from '../components/Panel.vue'

const route = useRoute()
const evenementId = route.params.id

// Données statiques pour l'exemple - seront remplacées par des appels API
const evenementData = {
  title: `Évènement numéro ${evenementId}`,
  date: '17/05/2026',
  location: 'Mont Saint Aignan',
  subtitle: 'Découvrez les détails de cet évènement.',
  description: `
    <p>Soirée musicale au profit des actions en Haïti. Cet évènement est l'occasion de découvrir notre association 
    et d'écouter des témoignages inspirants.</p>
    
    <h3>Programme</h3>
    <ul>
      <li>Présentation de l'association (19h00)</li>
      <li>Concert solidaire (20h00)</li>
      <li>Témoignages des bénévoles (21h00)</li>
      <li>Temps convivial et discussion (21h30)</li>
    </ul>
    
    <h3>Informations pratiques</h3>
    <p><strong>Date :</strong> ${evenementData.date}<br>
    <strong>Lieu :</strong> ${evenementData.location}<br>
    <strong>Entrée :</strong> Gratuite (dons bienvenus)<br>
    <strong>Inscription :</strong> Non obligatoire</p>
  `
}
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <Hero 
        :kicker="`Évènement #${evenementId}`"
        :title="evenementData.title"
        :subtitle="evenementData.subtitle"
      />

      <Panel :title="evenementData.title">
        <div class="event-meta">
          <p>
            <strong>Date :</strong> {{ evenementData.date }}<br>
            <strong>Lieu :</strong> {{ evenementData.location }}
          </p>
        </div>
        <div class="event-content" v-html="evenementData.description"></div>
      </Panel>
    </main>
    <SiteFooter />
  </div>
</template>
