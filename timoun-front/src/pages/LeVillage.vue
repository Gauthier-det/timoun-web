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
        kicker="Le lieu"
        title="Le village"
        subtitle="Situé en Haïti, ce village de montagne est l'endroit que nous soutenons avec nos partenaires locaux."
      />

      <Section title="Presentation du village">
        <div>
          <div class="subsection-text">
            <p>
              L'association agit en Haïti, principalement à Ternier (6000 habitants), secteur de la Commune de la
              Vallée de Jacmel (40000 habitants) mais aussi à Jacmel et Port-au-Prince.
            </p>
            <p>
              C'est un petit village de montagne où vivent des centaines de familles, situé dans une région montagneuse du sud-est d'Haïti. 
              Ternier est le cœur de nos actions depuis plus de 25 ans.
            </p>
            <p>
              La situation actuelle en Haïti est désastreuse : misère généralisée, inflation, violence des gangs, défaillance de l'État, 
              pénuries alimentaires et de carburant. Grâce à notre association et au courage des habitants, une bulle de vie meilleure 
              existe pour de nombreuses familles dans ce secteur.
            </p>
          </div>
          <img class="subsection-image" src="/resources/landscapes/landscapesternier-et-alentours-2.jpg" alt="Paysage de Ternier">
        </div>
      </Section>

      <Section kicker="Cadre de vie" title="Un ancrage local fort">
        <div>
          <div class="subsection-text">
            <p>
              Les actions sont construites avec les habitants et les responsables locaux, dans un esprit d'échange et de respect mutuel. 
              Tony Bouchette, enseignant haïtien ancien parrainé, et son épouse Emma en sont les coordinateurs directs, épaulés par un groupe 
              d'habitants du village.
            </p>
            <p>
              L'objectif n'est pas seulement d'aider, mais de soutenir durablement les familles pour qu'elles gagnent
              en autonomie et puissent faire vivre leurs projets sur le long terme, en accord avec notre devise « soutenir pour mieux repartir ».
            </p>
            <p>
              De nombreuses familles parviennent désormais à se nourrir du revenu de leur terrain familial grâce à nos actions. 
              Le nombre d'enfants par famille a globalement baissé au village, et la vie s'améliore progressivement.
            </p>
          </div>
          <img class="subsection-image" src="/resources/school/schoolsur-le-chemin-de-lecole.jpg" alt="Chemin de l'ecole">
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
