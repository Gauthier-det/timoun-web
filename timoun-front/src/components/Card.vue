<script setup>
defineProps({
  type: {
    type: String,
    default: 'Actualité'
  },
  title: String,
  date: String,
  text: String,
  location: String,
  isEvent: Boolean,
  withMedia: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <article class="card" :class="{ 'event-card': isEvent }">
    <div class="card-header">{{ type }}</div>
    <div class="card-body">
      <span v-if="isEvent" class="badge-date">{{ date }} – {{ location }}</span>
      <h3 class="card-title">{{ title }}</h3>
      <p v-if="!isEvent" class="card-meta">{{ date }}</p>
      <p class="card-text">{{ text }}</p>
      <div v-if="withMedia" class="card-media-placeholder">Photo ou illustration</div>
    </div>
  </article>
</template>
