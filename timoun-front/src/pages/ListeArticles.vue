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
        kicker="Articles"
        title="Les articles de l'association"
        subtitle="Témoignages, évènements, retours de missions, focus sur un projet ou une famille&nbsp;: retrouvez ici tous les articles publiés."
      />

      <Section title="">
        <div class="news-list">
          <RouterLink to="/articles/1" class="news-row">
            <div class="news-thumb">Photo</div>
            <div>
              <h2 class="news-row-title">Titre d'article numéro 1</h2>
              <p class="news-row-meta">15/04/2026 • par Colette</p>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies tincidunt.
              </p>
            </div>
          </RouterLink>

          <RouterLink to="/articles/2" class="news-row">
            <div class="news-thumb">Photo</div>
            <div>
              <h2 class="news-row-title">Titre d'article numéro 2</h2>
              <p class="news-row-meta">02/03/2026 • par Gauthier</p>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies tincidunt.
              </p>
            </div>
          </RouterLink>

          <RouterLink to="/articles/3" class="news-row">
            <div class="news-thumb">Photo</div>
            <div>
              <h2 class="news-row-title">Titre d'article numéro 3</h2>
              <p class="news-row-meta">18/02/2026 • par Marie</p>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies tincidunt.
              </p>
            </div>
          </RouterLink>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
