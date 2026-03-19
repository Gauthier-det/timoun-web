<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import Panel from '../components/Panel.vue'
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <Hero 
        kicker="Le lieu"
        title="Le village"
        subtitle="Situé en Haïti, ce village de montagne est l'endroit que nous soutenir avec nos partenaires locaux."
      />

      <Section title="">
        <Panel title="Présentation du village">
          L'association agit en Haïti, principalement à Ternier (6000 habitants), secteur de la Commune de la Vallée de Jacmel (40000 habitants) mais aussi à Jacmel et Port au Prince. C'est un petit village de montagne où vivent des centaines de familles. C'est là que nous intervenons avec une approche locale, en partenariat direct avec les habitants et les responsables du village.
        </Panel>
      </Section>

      <Section kicker="Galerie" title="Le village en images">
        <div class="gallery-grid">
          <img class="gallery-item" src="/resources/village/Ternier-et-alentours-(1).jpg" alt="Village de Ternier">
          <img class="gallery-item" src="/resources/landscapes/Ternier-et-alentours-(2).JPG" alt="Paysage d'Haïti">
          <img class="gallery-item" src="/resources/landscapes/Ternier-et-alentours-(3).JPG" alt="Paysage d'Haïti">
          <img class="gallery-item" src="/resources/landscapes/Ternier-et-alentours-(4).JPG" alt="Paysage d'Haïti">
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
