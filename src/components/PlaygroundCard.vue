<template>
  <div class="playground__item">
    <img :src="image" :alt="title" loading="lazy" />
    <p class="title">{{ title }}</p>
    <p class="date text--secondary">{{ date }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})
</script>
