<template>
  <div class="page-wrapper">
    <Header />
    <main>
      <Hero 
        kicker="Agenda"
        title="Calendrier des évènements"
        subtitle="Retrouvez ici tous les évènements organisés par l'association."
      />

      <Section title="">
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
          <Card 
            type="Évènement à venir"
            title="Marche solidaire"
            date="24/03/2026"
            location="Paris"
            :isEvent="true"
            text="Marche de 10 km pour lever des fonds et sensibiliser au projet de l'association."
            :withMedia="false"
          />
        </div>
      </Section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import Card from '../components/Card.vue'
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
