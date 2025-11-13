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

<style scoped>
.projet {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.projet__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.projet__content__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag {
  padding: 0.25rem;
  background-color: var(--primary);
  color: var(--surface);
  font-size: 0.75rem;
}
</style>
