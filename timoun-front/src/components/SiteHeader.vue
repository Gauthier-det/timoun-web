<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

const menuGroups = {
  discover: ['/qui-sommes-nous', '/notre-action', '/le-village', '/galerie'],
  news: ['/articles', '/articles/:id', '/evenements', '/evenements/:id']
}

// Déterminer quel groupe de menu est actif
const activeMenuGroup = computed(() => {
  if (menuGroups.discover.includes(route.path) || 
      (route.params.id && '/articles/:id' === route.matched[0]?.path) ||
      (route.params.id && '/evenements/:id' === route.matched[0]?.path)) {
    if (menuGroups.discover.some(path => route.path === path)) {
      return 'discover'
    }
  }
  if (menuGroups.news.some(path => {
    if (path.includes(':id')) {
      return route.matched.some(m => m.path === path)
    }
    return route.path === path
  })) {
    return 'news'
  }
  return null
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// Fermer le menu quand on navigue
watch(() => route.path, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="site-header">
    <div class="navbar">
      <div class="brand">
        <RouterLink to="/" class="brand-link brand-link-home" aria-label="Accueil Ti'moun">
          <span class="brand-logo-shell">
            <img src="/resources/graphics/graphicslogo.png" alt="Ti'moun" class="brand-logo">
          </span>
          <span class="brand-title">Ti'moun</span>
        </RouterLink>
      </div>
      <button class="nav-toggle" :class="{ open: menuOpen }" @click="toggleMenu" aria-label="Menu">&#9776;</button>
      <nav class="nav-links" :class="{ open: menuOpen }">
        <div class="nav-item-with-menu" :class="{ active: activeMenuGroup === 'discover' }">
          <a href="#" class="nav-decouvrir">Découvrir l'association</a>
          <div class="nav-dropdown">
            <RouterLink to="/qui-sommes-nous">Qui sommes-nous ?</RouterLink>
            <RouterLink to="/notre-action">Notre action</RouterLink>
            <RouterLink to="/le-village">Le village</RouterLink>
            <RouterLink to="/galerie">Galerie photos</RouterLink>
          </div>
        </div>
        <div class="nav-item-with-menu" :class="{ active: activeMenuGroup === 'news' }">
          <a href="#" class="nav-actus">Actualités</a>
          <div class="nav-dropdown">
            <RouterLink to="/articles">Les articles</RouterLink>
            <RouterLink to="/evenements">Évènements</RouterLink>
          </div>
        </div>
        <RouterLink to="/contact" class="nav-contact">Nous contacter</RouterLink>
      </nav>
    </div>
  </header>
</template>
