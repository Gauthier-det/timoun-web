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
        kicker="Nos projets"
        title="Notre action"
        subtitle="Une approche locale, transparente et durable au service des enfants et de leurs familles."
      />

      <Section title="">
        <Panel title="Scolarité et éducation">
          Nous soutenir la scolarité des enfants du village, en prenant en charge les frais d'inscription, fournitures, uniformes et repas à l'école.
        </Panel>
      </Section>

      <Section title="">
        <div class="grid-two">
          <Panel title="Santé et bien-être">
            Accès à des soins médicaux réguliers, vaccins, suivi dentaire, et sensibilisation aux bonnes pratiques d'hygiène et de nutrition.
          </Panel>
          <Panel title="Loisirs et culture">
            Moments de détente et d'apprentissage&nbsp;: sports, arts, musique, jeux éducatifs pour permettre aux enfants de s'épanouir au-delà de l'école.
          </Panel>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
