<template>
  <section class="home">
    <WorksSection :key="`works-${locale}`" :works="worksData" />
    <PlaygroundSection :key="`playground-${locale}`" :items="playgroundItemsData" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PlaygroundSection from '@/components/PlaygroundSection.vue'
import WorksSection from '@/components/WorksSection.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { getPlaygroundItemsByLocale, getWorksByLocale } from '@/data/content'
import { useLocale } from '@/i18n'

const { locale } = useLocale()

const worksData = computed(() => getWorksByLocale(locale.value))
const playgroundItemsData = computed(() => getPlaygroundItemsByLocale(locale.value))

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
    & img {
      object-position: right;
    }
  }

  #works>.projet:nth-child(2) {
    & video {
      object-fit: cover;
    }
  }
}
</style>
