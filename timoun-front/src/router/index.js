import { createRouter, createWebHistory } from 'vue-router'

// Importez les pages
import Home from '../pages/Home.vue'
import QuiSommesNous from '../pages/QuiSommesNous.vue'
import NotreAction from '../pages/NotreAction.vue'
import LeVillage from '../pages/LeVillage.vue'
import Galerie from '../pages/Galerie.vue'
import ListeArticles from '../pages/ListeArticles.vue'
import Article from '../pages/Article.vue'
import ListeEvenements from '../pages/ListeEvenements.vue'
import Evenement from '../pages/Evenement.vue'
import Contact from '../pages/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/qui-sommes-nous',
    name: 'qui-sommes-nous',
    component: QuiSommesNous
  },
  {
    path: '/notre-action',
    name: 'notre-action',
    component: NotreAction
  },
  {
    path: '/le-village',
    name: 'le-village',
    component: LeVillage
  },
  {
    path: '/galerie',
    name: 'galerie',
    component: Galerie
  },
  {
    path: '/articles',
    name: 'articles',
    component: ListeArticles
  },
  {
    path: '/articles/:id',
    name: 'article',
    component: Article
  },
  {
    path: '/evenements',
    name: 'evenements',
    component: ListeEvenements
  },
  {
    path: '/evenements/:id',
    name: 'evenement',
    component: Evenement
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
