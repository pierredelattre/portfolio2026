<template>
  <div
    class="playground__item"
    role="button"
    tabindex="0"
    :style="styleVars"
    @click="handleSelect"
    @keyup.enter="handleSelect"
  >
    <img :src="image" :alt="title" loading="lazy" />
    <div v-if="type" class="playground__label">
      <ProjectLabel :type="type" />
    </div>
    <p class="title">{{ title }}</p>
    <p class="date text--secondary">{{ date }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProjectLabel from '@/components/ProjectLabel.vue'

const props = defineProps({
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
  },
  type: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select'])

const styleVars = computed(() => {
  if (props.color === 'dark') {
    return {
      '--playground-card-text': '#000000'
    }
  }
  return {}
})

const handleSelect = () => {
  emit('select')
}
</script>

<style scoped>
.playground__item {
  position: relative;
  overflow: hidden;
  height: 260px;
  width: 100%;
  cursor: pointer;
  --playground-card-label-bg: hsla(0, 0%, 100%, 1);
  --playground-card-label-border: #ababab;
  --playground-card-text: #ffffff;
  color: var(--playground-card-text);
}

.playground__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.playground__label {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
  display: inline-flex;
  background-color: var(--playground-card-label-bg);
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--playground-card-label-border);
}

.playground__item .title,
.playground__item .date {
  position: absolute;
  bottom: 1rem;
  color: var(--playground-card-text);
}

.playground__item .title {
  left: 1rem;
}

.playground__item .date {
  right: 1rem;
}

.playground__item:hover img {
  transform: scale(1.05);
}
</style>
