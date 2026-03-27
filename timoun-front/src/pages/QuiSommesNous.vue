<script setup>
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
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

      <Section title="Notre histoire">
        <div>
          <div class="subsection-text">
            <p>
              L'association Ti'moun a été créée en 1998 dans le grand ouest de la France. Elle agit en Haïti,
              principalement à Ternier (6000 habitants), secteur de la Commune de la Vallée de Jacmel (40 000 habitants),
              mais aussi dans une moindre mesure à Jacmel.
            </p>
            <p>
              L'association a pour objet l'aide à l'enfant dans son pays et dans sa famille et, d'une façon plus générale,
              le soutien de programmes visant à faciliter ou préserver la vie des enfants et de leur famille.
            </p>
            <p>
              Toutes les actions se veulent être en adéquation avec notre devise « soutenir pour mieux repartir » et tendent 
              à aider les habitants à atteindre l'autonomie.
            </p>
          </div>
          <img class="subsection-image-wrapper" src="/resources/graphics/graphicslogo.png" alt="Logo de l'association">
        </div>
      </Section>

      <Section title="Nos missions">
        <div>
          <div class="subsection-text">
            <p>
              <strong>Le développement rural :</strong> Nous travaillons avec des groupes de femmes et un jeune technicien agronome, 
              ancien parrainé. Des jardins éducatifs et familiaux sont créés, avec apport de semences, formation aux méthodes durables, 
              et distribution de plants d'arbres fruitiers et d'animaux d'élevage.
            </p>
            <p>
              <strong>Les parrainages :</strong> Près de 350 enfants et jeunes sont actuellement parrainés, de la maternelle aux études supérieures. 
              Le parrainage couvre la scolarité, l'uniforme, les fournitures scolaires, un repas quotidien et un accompagnement santé.
            </p>
            <p>
              <strong>Les actions d'aide à la vie quotidienne :</strong> Interventions après catastrophes naturelles, distribution alimentaire en cas de crise, 
              soins médicaux, aide à la cantine pour plusieurs écoles, et suivi sanitaire.
            </p>
          </div>
          <img class="subsection-image-wrapper" src="/resources/school/schoolclasses-du-college-secondaire-de-ternier-1.jpg" alt="Classes du collège">
        </div>
      </Section>

      <Section title="Nos coordinateurs locaux">
        <div>
          <div class="subsection-text">
            <p>
              En Haïti, Tony Bouchette, un enseignant haïtien ancien parrainé, et son épouse Emma sont à l'écoute des enfants et de leurs familles,
              en relation étroite avec les membres de l'association en France.
            </p>
            <p>
              Basés à « La Maison du Bonheur » à Ternier, ils sont épaulés par un groupe d'habitants du village et coordonnent toutes nos actions 
              sur le terrain avec transparence et efficacité.
            </p>
          </div>
          <img class="subsection-image-wrapper" src="/resources/graphics/graphicsdrapeau.jpg" alt="Drapeau d'Haïti">
        </div>
      </Section>

      <Section title="L'equipe en France">
        <div>
          <div class="subsection-text">
            <p>
              Les bénévoles de l'association suivent les actions dans la durée avec engagement et rigueur. 
              Quand la situation le permet, des membres se rendent sur place pour maintenir un lien direct et un suivi efficace.
            </p>
            <p>
              Tous les dons bénéficient d'une déduction fiscale au titre d'association reconnue d'utilité publique.
            </p>
          </div>
          <img class="subsection-image-wrapper" src="/resources/graphics/graphicssolidaires.jpg" alt="Action solidaire">
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
