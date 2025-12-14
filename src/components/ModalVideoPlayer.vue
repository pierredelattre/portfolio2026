<template>
  <video
    ref="videoElement"
    :src="src"
    :poster="poster"
    :playsinline="true"
    :webkit-playsinline="true"
    preload="auto"
    :autoplay="true"
    :muted="true"
    :loop="true"
  ></video>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: ''
  }
})

const videoElement = ref(null)

const playVideo = async () => {
  if (!videoElement.value) return

  videoElement.value.load()
  try {
    await videoElement.value.play()
  } catch (error) {
    console.error('Erreur de lecture vidéo (souvent due aux restrictions du navigateur):', error)
  }
}

onMounted(() => {
  playVideo()
})

watch(() => props.src, () => {
  playVideo()
})
</script>