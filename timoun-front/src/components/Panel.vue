<script setup>
defineProps({
  title: String
})
</script>

<template>
  <div class="panel">
    <h2 class="panel-title">{{ title }}</h2>
    <div class="panel-text"><slot /></div>
  </div>
</template>