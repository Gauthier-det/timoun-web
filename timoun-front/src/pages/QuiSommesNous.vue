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
          L’association Ti’Moun a été créée en 1998 dans le grand ouest de la France. Elle agit en Haïti, principalement à Ternier (6000 habitants), secteur de la Commune de la Vallée de Jacmel (40000 habitants) mais aussi à Jacmel et Port au Prince. L'association a pour but d’accompagner l’enfant dans son pays et dans sa famille, et d’une façon plus générale, de soutenir et mettre en place tous programmes visant à améliorer ses conditions de vie.
        </Panel>
      </Section>

      <Section title="">
        <div class="grid-two">
          <Panel title="Nos coordinateurs locaux">
            Tony Bouchette, un haïtien ancien parrainé, et son épouse Emma sont nos interlocuteurs et coordinateurs sur place. Ils sont aidés par une petite équipe d’habitants. Les actions sont réalisées à partir de la « Maison du Bonheur ».
          </Panel>
          <Panel title="L'équipe en France">
            Quand la situation en Haïti le permet, les membres de l’association se rendent sur place, à leurs frais, au moins deux fois par an ce qui permet un suivi de nos actions efficace et un lien renforcé. La présidente est Mylène Liard.
          </Panel>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
