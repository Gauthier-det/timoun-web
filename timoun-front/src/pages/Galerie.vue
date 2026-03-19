<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <Hero 
        kicker="Photos"
        title="Galerie photos"
        subtitle="Découvrez le village, les enfants et les projets en images."
      />

      <Section kicker="Galerie" title="Nos photos">
        <div class="gallery-grid">
          <img class="gallery-item" src="/resources/landscapes/toto.jpg" alt="Paysage d'Haïti">
          <!-- <img class="gallery-item" src="/resources/school/sur-le-chemin-de-l'école.JPG" alt="Enfant sur le chemin de l'école">
          <img class="gallery-item" src="/resources/rural/D.-Rural-(1).jpg" alt="Développement rural">
          <img class="gallery-item" src="/resources/school/Classes-de-primaire-(3).jpg" alt="Salle de classe">
          <img class="gallery-item" src="/resources/village/Ternier-et-alentours-(1).jpg" alt="Village de Ternier">
          <img class="gallery-item" src="/resources/landscapes/Ternier-et-alentours-(2).JPG" alt="Paysage d'Haïti">
          <img class="gallery-item" src="/resources/school/Repas-au-Collège-Imènes-Ogé-(1).jpg" alt="Repas à l'école">
          <img class="gallery-item" src="/resources/rural/D.-Rural-(2).jpg" alt="Développement rural">
          <img class="gallery-item" src="/resources/landscapes/Ternier-et-alentours-(3).JPG" alt="Paysage d'Haïti"> -->
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
