<script setup>
defineProps({
  title: String
})
</script>

<template>
  <div class="panel">
    <h2 class="panel-title">{{ title }}</h2>
    <p class="panel-text"><slot /></p>
  </div>
</template>
