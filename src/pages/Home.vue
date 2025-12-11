<template>
  <section class="home">
    <WorksSection :works="worksData" />
    <PlaygroundSection :items="playgroundItemsData" />
  </section>
</template>

<script setup>
import PlaygroundSection from '@/components/PlaygroundSection.vue'
import WorksSection from '@/components/WorksSection.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { playgroundItems, works } from '@/data/content'

const worksData = works
const playgroundItemsData = playgroundItems

usePageLoaded()
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

@media screen and (min-width: 1280px) {
  #works>.projet:last-child {
    grid-column: 3 / 5;

    &>div,
    &>a:has(div.link) {
      max-width: calc(64%);
    }
  }
}
</style>
