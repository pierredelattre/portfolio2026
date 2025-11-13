<template>
  <div class="projet project-card">
    <div class="projet__content">
      <div class="projet__content__title">
        <h4>{{ title }}</h4>
        <div v-if="tags?.length" class="tags">
          <div class="tag" v-for="tag in tags" :key="tag">{{ tag }}</div>
        </div>
      </div>
      <p class="text--secondary">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  }
})
</script>
