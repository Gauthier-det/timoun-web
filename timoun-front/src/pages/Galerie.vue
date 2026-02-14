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
          <div class="gallery-item">Photo</div>
          <div class="gallery-item">Photo</div>
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
