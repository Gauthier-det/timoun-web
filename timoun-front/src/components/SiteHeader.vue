<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

const activeMenuGroup = computed(() => {
  const path = route.path
  if (path.startsWith('/qui-sommes-nous') ||
      path.startsWith('/notre-action') ||
      path.startsWith('/le-village') ||
      path.startsWith('/galerie')) {
    return 'discover'
  }
  if (path.startsWith('/articles') || path.startsWith('/evenements')) {
    return 'news'
  }
  return null
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

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
      <button class="nav-toggle" :class="{ open: menuOpen }" @click="toggleMenu" aria-label="Menu" type="button">&#9776;</button>
      <nav class="nav-links" :class="{ open: menuOpen }">
        <div class="nav-item-with-menu" :class="{ active: activeMenuGroup === 'discover' }">
          <button type="button" class="nav-decouvrir">Découvrir l'association</button>
          <div class="nav-dropdown">
            <RouterLink to="/qui-sommes-nous">Qui sommes-nous ?</RouterLink>
            <RouterLink to="/notre-action">Notre action</RouterLink>
            <RouterLink to="/le-village">Le village</RouterLink>
            <RouterLink to="/galerie">Galerie photos</RouterLink>
          </div>
        </div>
        <div class="nav-item-with-menu" :class="{ active: activeMenuGroup === 'news' }">
          <button type="button" class="nav-actus">Actualités</button>
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