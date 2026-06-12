<script setup>
import { ref } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Hero from '../components/Hero.vue'
import Section from '../components/Section.vue'
import Panel from '../components/Panel.vue'
import { API_URL } from '../api.js'

const form = ref({
  nom: '',
  email: '',
  sujet: '',
  message: '',
  website: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref(null)

const handleSubmit = async () => {
  if (!form.value.nom || !form.value.email || !form.value.message) {
    error.value = 'Veuillez remplir les champs obligatoires (nom, e-mail, message).'
    return
  }

  loading.value = true
  error.value = null

  try {
    const res = await fetch(`${API_URL}/api/contact-messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { ...form.value } }),
    })

    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      throw new Error(json?.error?.message || `Erreur ${res.status}`)
    }

    success.value = true
    form.value = { nom: '', email: '', sujet: '', message: '', website: '' }
  } catch (e) {
    error.value = e.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
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
            <div v-if="success" class="form-success">
              Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
            </div>
            <form v-else @submit.prevent="handleSubmit" novalidate>
              <div v-if="error" class="form-error">{{ error }}</div>
              <div class="honeypot" aria-hidden="true">
                <label for="website">Ne pas remplir</label>
                <input id="website" type="text" name="website" tabindex="-1" autocomplete="off" v-model="form.website">
              </div>
              <div class="form-field">
                <label class="form-label" for="nom">Nom <span aria-hidden="true">*</span></label>
                <input class="form-input" id="nom" v-model="form.nom" type="text" placeholder="Votre nom" required>
              </div>
              <div class="form-field">
                <label class="form-label" for="email">Adresse e‑mail <span aria-hidden="true">*</span></label>
                <input class="form-input" id="email" v-model="form.email" type="email" placeholder="vous@example.org" required>
              </div>
              <div class="form-field">
                <label class="form-label" for="sujet">Sujet</label>
                <input class="form-input" id="sujet" v-model="form.sujet" type="text" placeholder="Objet de votre message">
              </div>
              <div class="form-field">
                <label class="form-label" for="message">Message <span aria-hidden="true">*</span></label>
                <textarea class="form-textarea" id="message" v-model="form.message" placeholder="Votre message..." required></textarea>
              </div>
              <button type="submit" class="btn" :disabled="loading">
                {{ loading ? 'Envoi en cours…' : 'Envoyer' }}
              </button>
            </form>
          </Panel>

          <Panel title="Coordonnées de l'association">
            <div class="contact-entry">
              <strong>Présidente :</strong> Mylène Liard<br>
              <a href="mailto:mylene.liard1@gmail.com">mylene.liard1@gmail.com</a> – 06 85 66 39 30
            </div>
            <div class="contact-entry">
              <strong>Normandie 27 & 76 :</strong> Jacques et Danièle Caldwell<br>
              <a href="mailto:jacques.caldwell@free.fr">jacques.caldwell@free.fr</a> – 06 12 22 46 73
            </div>
            <div class="contact-entry">
              <strong>Normandie 14, 50 & 61 :</strong> Annie Lambert-Carabin<br>
              <a href="mailto:annie.lambert-carabin@wanadoo.fr">annie.lambert-carabin@wanadoo.fr</a> – 06 83 54 40 51
            </div>
            <div class="contact-entry">
              <strong>Bretagne :</strong> Marie José Mazé<br>
              <a href="mailto:mjmaze@laposte.net">mjmaze@laposte.net</a> - 07 78 07 65 11
            </div>
            <div class="contact-entry">
              <strong>Parrainages et aide à la scolarité :</strong> Colette Gagneux<br>
              <a href="mailto:colette.gagneux@free.fr">colette.gagneux@free.fr</a> – 06 81 59 82 77
            </div>
            <div class="contact-entry">
              <strong>Parrainages « développement rural » :</strong> Jacky Berquez<br>
              <a href="mailto:berquez@free.fr">berquez@free.fr</a> - 06 72 76 01 13
            </div>
            <p>
              Pour tous dons ou parrainages, vous recevrez un reçu pour déduction fiscale au titre de « don à une association ».
            </p>
            <p>
              <a href="https://www.association-timoun.fr">www.association-timoun.fr</a><br>
              <a href="mailto:contact@association-timoun.fr">contact@association-timoun.fr</a><br>
              <a href="https://www.facebook.com/assoctimoun">www.facebook.com/assoctimoun</a>
            </p>
          </Panel>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
</template>