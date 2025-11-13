<template>
  <div class="projet project-card">
    <div class="projet__content">
      <div class="projet__content__title">
        <h4>{{ title }}</h4>
        <div v-if="tags?.length" class="tags">
          <TagItem v-for="tag in tags" :key="tag" :label="tag" />
        </div>
      </div>
      <p class="text--secondary">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import TagItem from './TagItem.vue'

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

</style>
