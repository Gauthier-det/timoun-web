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
        <Panel title="Développement rural">
          <p>Création de jardins familiaux avec apport de semences, petits plants, achats et distribution d’outillage à main, d’animaux d’élevage (volailles, cabris et porcs). Création de jardins éducatifs, organisée par un technicien agricole, ancien parrainé. Les soixante familles concernées appliquent ses conseils dans leurs jardins familiaux et bénéficient des plants obtenus en commun. Le but est d'aider les habitants à se réapproprier les cultures traditionnelles, à produire leurs propres semences afin de parvenir à une autosuffisance alimentaire, et si possible, pouvoir vendre un surplus de production.</p>
          <p>Appui financier et technique au développement de l’apiculture à La Vallée en liaison avec un jeune apiculteur qui a créé une association locale regroupant 30 participants.</p>
        </Panel>
      </Section>

      <Section title="">
        <div class="grid-two">
          <Panel title="Parrainage et aide à la scolarité">
            Près de 450 enfants sont actuellement parrainés, de la maternelle aux études supérieures. Avec un parrainage de 30 euros par mois l’enfant ou le jeune est scolarisé, a son uniforme scolaire, un repas par jour, un suivi santé. Une aide financière est donnée à sa famille trois fois par an.
          </Panel>
          <Panel title="Éducation">
            L’association soutient le fonctionnement de plusieurs écoles primaires et d’un collège/lycée par la construction et l’entretien de classes, le financement de mobilier, de fournitures scolaires et de matériel informatique, la restauration scolaire, le soutien pédagogique aux enseignants et une aide à la rémunération des enseignants.
          </Panel>
        </div>
      </Section>

      <Section title="">
        <div class="grid-two">
          <Panel title="Santé">
            Consultations médicales régulières par une infirmière à la Maison du Bonheur et à Jacmel. Mise en place d’un suivi médical pour les élèves des écoles soutenues par l’association. Création d’un fonds d’urgence pour répondre aux dépenses médicales courantes. Des cours d’éducation sexuelle et de prévention santé sont également donnés aux jeunes.
          </Panel>
          <Panel title="Urgences">
            Les bénéfices de manifestations diverses en France et des dons permettent à l’association de réagir très vite après tornades et cyclones tropicaux très nombreux en Haïti, séismes et épidémies pour assurer la reconstruction de maisons, achats et distribution de nourriture, aides individuelles et soins de santé onéreux.
          </Panel>
        </div>
      </Section>

      <Section title="">
        <Panel title="Amélioration des conditions de vie">
          Financement d’un repas par jour pour les élèves non parrainés, achat et installation de panneaux solaires pour les écoles, installation d’une pompe et captage d’une source pour faciliter l’accès à l’eau, et soutien du commerce local par l’achat d’objets artisanaux.
        </Panel>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
