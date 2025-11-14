<template>
  <section class="home">
    <WorksSection :works="worksData" />
    <PlaygroundSection :columns="playgroundData" />
  </section>
</template>

<script setup>
import PlaygroundSection from '@/components/PlaygroundSection.vue'
import WorksSection from '@/components/WorksSection.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { playgroundColumns, works } from '@/data/content'

const worksData = works
const playgroundData = playgroundColumns

usePageLoaded()
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
</style>
