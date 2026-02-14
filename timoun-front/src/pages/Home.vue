<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Section from '../components/Section.vue'
import Card from '../components/Card.vue'
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <Section kicker="Haïti • Sur le terrain" title="Les dernières actualités en Haïti">
        <div class="cards-grid">
          <Card 
            type="Actualité"
            title="Lorem ipsum"
            date="17/05/2026"
            text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur dolorum magnam illum delectus? Numquam sint rem eveniet nostrum minima dolore recusandae qui incidunt!"
          />
          <Card 
            type="Actualité"
            title="Lorem ipsum"
            date="22/06/2026"
            text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur dolorum magnam illum delectus? Numquam sint rem eveniet nostrum minima dolore recusandae qui incidunt!"
          />
        </div>
      </Section>

      <Section kicker="Agenda" title="Calendrier et futurs évènements">
        <div class="timeline">
          <Card 
            type="Évènement à venir"
            title="Concert solidaire pour Ti'moun"
            date="17/05/2026"
            location="Mont Saint Aignan"
            :isEvent="true"
            text="Soirée musicale au profit des actions en Haïti. Présentation de l'association, témoignages et temps convivial."
            :withMedia="false"
          />
          <Card 
            type="Évènement à venir"
            title="Journée découverte Haïti"
            date="17/09/2026"
            location="Rouen"
            :isEvent="true"
            text="Expositions, ateliers pour enfants et échanges autour de la vie au village et des projets en cours."
            :withMedia="false"
          />
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
