<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import Panel from '../components/Panel.vue'
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader/>
    <main>
      <Hero 
        kicker="L'association"
        title="Qui sommes-nous ?"
        subtitle="Une association de bénévoles en France, en lien direct avec un village d'Haïti pour soutenir les enfants et leurs familles."
      />

      <Section title="">
        <Panel title="Notre histoire">
          Quelques amis, un voyage en Haïti, une rencontre avec un village&nbsp;: Ti'moun est née de ce lien fort et de la volonté d'apporter un soutien simple et concret aux enfants.
        </Panel>
      </Section>

      <Section title="">
        <div class="grid-two">
          <Panel title="Nos valeurs">
            Respect, solidarité, transparence&nbsp;: nous travaillons avec les habitants et les responsables locaux pour co‑construire les projets, en expliquant clairement l'usage des dons.
          </Panel>
          <Panel title="L'équipe bénévole">
            L'association est portée par une petite équipe de bénévoles, sans salarié. Chacun apporte son temps, ses compétences et son réseau pour faire vivre les projets.
          </Panel>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
