<script setup>
defineProps({
  kicker: String,
  title: String,
  subtitle: String
})
</script>

<template>
  <section class="hero">
    <p class="hero-kicker">{{ kicker }}</p>
    <h1 class="hero-title">{{ title }}</h1>
    <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>
  </section>
</template>
