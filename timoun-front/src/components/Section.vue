<script setup>
defineProps({
  kicker: String,
  title: String
})
</script>

<template>
  <section class="section">
    <div class="section-header">
      <div>
        <p class="section-kicker">{{ kicker }}</p>
        <h2 class="section-title">{{ title }}</h2>
      </div>
    </div>
    <slot />
  </section>
</template>
