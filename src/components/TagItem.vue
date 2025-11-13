<template>
  <div class="tag">
    {{ label }}
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.tag {
  padding: 0.25rem;
  background-color: var(--primary);
  color: var(--surface);
  font-size: 0.75rem;
  transition: background-color 0.4s ease;
}
</style>
