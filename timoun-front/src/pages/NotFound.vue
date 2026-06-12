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
        kicker="Erreur 404"
        title="Page introuvable"
        subtitle="La page que vous cherchez n'existe pas ou a été déplacée."
      />
      <Section title="">
        <p>
          Vous pouvez revenir à <RouterLink to="/">l'accueil</RouterLink>,
          consulter <RouterLink to="/articles">les articles</RouterLink>
          ou <RouterLink to="/contact">nous contacter</RouterLink>.
        </p>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>