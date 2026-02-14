<template>
  <div class="page-wrapper">
    <Header />
    <main>
      <Hero 
        kicker="Articles"
        title="Les articles de l'association"
        subtitle="Témoignages, évènements, retours de missions, focus sur un projet ou une famille&nbsp;: retrouvez ici tous les articles publiés."
      />

      <Section title="">
        <div class="news-list">
          <article class="news-row">
            <div class="news-thumb">Photo</div>
            <div>
              <h2 class="news-row-title">
                <a href="#">Titre d'article numéro 1</a>
              </h2>
              <p class="news-row-meta">15/04/2026 • par Colette</p>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies tincidunt.
              </p>
            </div>
          </article>

          <article class="news-row">
            <div class="news-thumb">Photo</div>
            <div>
              <h2 class="news-row-title">
                <a href="#">Titre d'article numéro 2</a>
              </h2>
              <p class="news-row-meta">02/03/2026 • par Gauthier</p>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies tincidunt.
              </p>
            </div>
          </article>

          <article class="news-row">
            <div class="news-thumb">Photo</div>
            <div>
              <h2 class="news-row-title">
                <a href="#">Titre d'article numéro 3</a>
              </h2>
              <p class="news-row-meta">18/02/2026 • par Marie</p>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies tincidunt.
              </p>
            </div>
          </article>
        </div>
      </Section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.card-text {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}
</style>
