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
        kicker="Nos projets"
        title="Notre action"
        subtitle="Une approche locale, transparente et durable au service des enfants et de leurs familles."
      />

      <Section title="Developpement rural">
        <div>
          <div class="subsection-text">
            <p>
              Nous travaillons en liaison avec Jeff, un jeune technicien agronome qui a fait toutes ses études en being parrainé grâce à l'association. 
              Il est notre interlocuteur privilégié depuis 5 ans pour cette action.
            </p>
            <p>
              We work with two main groups of women: Fanm an aksyon (F.A.L.) avec environ 90 personnes à Ridoré, 
              et Organisation Fanm egzanple de Ternier (O.F.E.T.) avec environ 100 personnes.
            </p>
            <p>
              Des jardins éducatifs et familiaux sont mis en place. Les formations portent sur les méthodes de culture efficaces, 
              l'utilisation d'engrais naturels, la plantation d'arbres fruitiers (bananiers, papayers, caféiers...), et l'élevage de chèvres 
              dont les chevreaux sont ensuite distribués aux familles.
            </p>
          </div>
          <img class="subsection-image" src="/resources/rural/ruralrural-2.jpg" alt="Jardin rural">
        </div>
      </Section>

      <Section title="Parrainage et education">
        <div>
          <div class="subsection-text">
            <p>
              Près de 350 enfants et jeunes sont actuellement parrainés, de la maternelle aux études supérieures. 
              La scolarisation est la condition indispensable pour le maintien du parrainage. Un contrôle bi-annuel est effectué.
            </p>
            <p>
              L'association porte particulièrement son effort sur l'aide à deux écoles privées, l'enseignement public étant insuffisant en Haïti :
            </p>
            <p>
              • <strong>Le Collège Imènes Ogé</strong> : classes pré-scolaires et primaires (455 élèves en 2025-2026)<br>
              • <strong>Le Collège secondaire de Ternier</strong> : de la 7ème année à la terminale (345 élèves en 2025-2026)<br>
              Ce collège affiche un taux de réussite exceptionnel de 90% au baccalauréat, contre environ 40% dans le pays.
            </p>
            <p>
              Tous les élèves, parrainés ou non, ainsi que les personnels, reçoivent chaque jour scolaire un repas financé par Ti'moun.
            </p>
          </div>
          <img class="subsection-image" src="/resources/school/schoolclasses-du-college-secondaire-de-ternier-1.jpg" alt="Classe du college">
        </div>
      </Section>

      <Section title="Sante et urgences">
        <div>
          <div class="subsection-text">
            <p>
              L'association intervient rapidement en cas de besoin sanitaire grâce à ses contacts locaux et ses ressources dédiées. 
              Une infirmière, indemnisée par l'association, passe chaque semaine dans les écoles aidées pour les soins courants.
            </p>
            <p>
              Nous prenons en charge également les soins onéreux, les médicaments, et l'hospitalisation sur demande de notre responsable sur place. 
              Nous organisons aussi des informations sur la contraception et le suivi sanitaire auprès des enfants et familles.
            </p>
            <p>
              L'association intervient aussi d'urgence en cas de catastrophe naturelle (ouragans, tremblements de terre) 
              ou de crise alimentaire.
            </p>
          </div>
          <img class="subsection-image" src="/resources/school/schooldistribution-de-repas-au-college-secondaire-1.jpg" alt="Distribution de repas">
        </div>
      </Section>

      <Section title="Conditions de vie">
        <div>
          <div class="subsection-text">
            <p>
              L'association finance des repas pour les élèves non parrainés et soutient activement l'accès à l'eau et les installations 
              essentielles (lavage des mains, eau filtrée) pour les écoles.
            </p>
            <p>
              Nous contribuons aussi au commerce local en achetant des objets artisanaux, et en finançant des aides à la cantine 
              pour deux autres écoles de la Vallée de Jacmel.
            </p>
            <p>
              Depuis plus de 25 ans, ces actions progressives portent leurs fruits. Des jeunes parrainés depuis l'enfance sont devenus 
              des adultes responsables : infirmières, comptables, enseignants, médecin, avocat, dentiste, sage-femme...
            </p>
          </div>
          <img class="subsection-image" src="/resources/school/schoolrepas-au-college-imenes-oge-1.jpg" alt="Repas scolaire">
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
