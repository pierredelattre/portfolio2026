<template>
  <section class="home">
    <div id="works">
      <h3>Réalisations</h3>
      <WorkCard v-for="work in worksData" :key="work.slug" :work="work" />
    </div>

    <div id="playground">
      <h3>Playground</h3>
      <div class="playground__content">
        <div class="col" v-for="(column, columnIndex) in playgroundData" :key="`column-${columnIndex}`">
          <PlaygroundCard
            v-for="(item, itemIndex) in column"
            :key="`item-${columnIndex}-${itemIndex}`"
            :title="item.title"
            :date="item.date"
            :image="item.image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import PlaygroundCard from '@/components/PlaygroundCard.vue'
import WorkCard from '@/components/WorkCard.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { playgroundColumns, works } from '@/data/content'

const worksData = works
const playgroundData = playgroundColumns

usePageLoaded()
</script>
