<template>
  <div v-if="typeInfo" class="project-label" aria-live="polite">
    <span class="project-label__swatch" :style="{ backgroundColor: typeInfo.color }" />
    <span class="project-label__text">{{ typeInfo.text }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '@/i18n'

const TYPE_COLORS = {
  school: 'var(--type-school)',
  freelance: 'var(--type-freelance)',
  perso: 'var(--type-perso)'
}

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const { t } = useLocale()

const typeInfo = computed(() => {
  const color = TYPE_COLORS[props.type]
  if (!color) return null

  return {
    text: t(`projectType.${props.type}`),
    color
  }
})
</script>

<style scoped>
.project-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--secondary);
  font-size: 0.875rem;
  line-height: 1.2;
  opacity: 0;
  animation: label-fade 0.25s ease forwards;
}

.project-label__swatch {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.project-label__text {
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.3;
}

@keyframes label-fade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
