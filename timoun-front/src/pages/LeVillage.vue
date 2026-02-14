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
          Un petit village de montagne en Haïti où vivent des centaines de familles. C'est là que nous intervenons avec une approche locale, en partenariat direct avec les habitants et les responsables du village.
        </Panel>
      </Section>

      <Section kicker="Galerie" title="Le village en images">
        <div class="gallery-grid">
          <div class="gallery-item">Photo</div>
          <div class="gallery-item">Photo</div>
          <div class="gallery-item">Photo</div>
          <div class="gallery-item">Photo</div>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
