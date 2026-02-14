<script setup>
import { ref } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import Panel from '../components/Panel.vue'

const form = ref({
  nom: '',
  email: '',
  sujet: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Formulaire soumis:', form.value)
  // À intégrer avec l'API backend
}
</script>

<template>
  <div class="page-wrapper">
    <SiteHeader />
    <main>
      <Hero 
        kicker="Nous contacter"
        title="Vous avez une question, un message ou une idée à partager ? Vous voulez nous rejoindre ?"
        subtitle="N'hésitez pas à nous écrire pour en savoir plus sur l'association ou nous aider."
      />

      <Section title="">
        <div class="contact-grid">
          <Panel title="Envoyer un message">
            <form @submit.prevent="handleSubmit">
              <div class="form-field">
                <label class="form-label" for="nom">Nom</label>
                <input class="form-input" id="nom" v-model="form.nom" type="text" placeholder="Votre nom">
              </div>
              <div class="form-field">
                <label class="form-label" for="email">Adresse e‑mail</label>
                <input class="form-input" id="email" v-model="form.email" type="email" placeholder="vous@example.org">
              </div>
              <div class="form-field">
                <label class="form-label" for="sujet">Sujet</label>
                <input class="form-input" id="sujet" v-model="form.sujet" type="text" placeholder="Objet de votre message">
              </div>
              <div class="form-field">
                <label class="form-label" for="message">Message</label>
                <textarea class="form-textarea" id="message" v-model="form.message" placeholder="Votre message..."></textarea>
              </div>
              <button type="submit" class="btn">Envoyer</button>
            </form>
          </Panel>

          <Panel title="Coordonnées de l'association">
            <div style="margin-bottom: 1rem;">
              <strong>Ti'moun</strong><br>
              12 rue Exemple<br>
              14000 Caen, France
            </div>
            <div style="margin-bottom: 1rem;">
              <strong>Email :</strong> contact@timoun.org<br>
              <strong>Téléphone :</strong> +33 (0)1 23 45 67 89
            </div>
            <p>
              Vous pouvez aussi nous suivre sur les réseaux sociaux pour recevoir les dernières nouvelles
              et les prochains évènements.
            </p>
          </Panel>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>
