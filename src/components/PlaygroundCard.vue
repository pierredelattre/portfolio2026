<template>
  <div
    class="playground__item"
    role="button"
    tabindex="0"
    :aria-label="ariaLabel"
    :title="title"
    :style="styleVars"
    @click="handleSelect"
    @keyup.enter="handleSelect"
    @keyup.space.prevent="handleSelect"
  >
    <template v-if="isVideo">
      <video
        class="playground__image-media"
        :src="videoSrc"
        :poster="videoPoster"
        autoplay
        muted
        loop
        playsinline
        webkit-playsinline
        preload="metadata"
      ></video>
    </template>
    <OptimizedImage
      v-else
      class="playground__image"
      img-class="playground__image-media"
      :source="image"
      :alt="imageAlt"
      sizes="(min-width: 1600px) 26vw, (min-width: 1280px) 33vw, (min-width: 1024px) 45vw, 95vw"
    />
    <div v-if="type" class="playground__label">
      <ProjectLabel :type="type" />
    </div>
    <p class="title">{{ title }}</p>
    <p v-if="date" class="date text--secondary">{{ date }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProjectLabel from '@/components/ProjectLabel.vue'
import OptimizedImage from '@/components/OptimizedImage.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ''
  },
  image: {
    type: [String, Object],
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

const ariaLabel = computed(() => `Ouvrir le projet ${props.title}`)
const imageAlt = computed(() => `Visuel du projet ${props.title}`)
const isVideo = computed(() => typeof props.image === 'object' && props.image?.type === 'video' && props.image?.src)
const videoSrc = computed(() => (isVideo.value ? props.image.src : ''))
const videoPoster = computed(() => (isVideo.value ? props.image.poster || '' : ''))

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

  @media screen and (max-width: 768px) {
    height: 320px;
  }
}

:deep(.playground__image) {
  width: 100%;
  height: 100%;
  display: block;
}

:deep(.playground__image-media),
video.playground__image-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

.playground__item:hover :deep(.playground__image-media) {
  transform: scale(1.05);
}
</style>
