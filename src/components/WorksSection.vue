<template>
  <div id="works">
    <h3>Réalisations</h3>
    <WorkCard v-for="work in works" :key="work.id" :work="work" />
  </div>
</template>

<script setup>
import WorkCard from '@/components/WorkCard.vue'

defineProps({
  works: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
#works {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 2rem;
  row-gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto auto auto auto auto auto;
    gap: 1.5rem;
    row-gap: 1rem;
  }

  @media screen and (min-width: 769px) and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto auto;
    gap: 2rem;
    row-gap: 2rem;
  }
}

#works h3 {
  grid-column: 1 / 2;
  grid-row: 1;

  @media screen and (min-width: 769px) and (max-width: 1280px) {
    grid-column: 1 / 3;
    grid-row: 1;
  }
}

#works > div {
  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
  }
}

#works :deep(.projet) {
  grid-row: 2;
}

@media screen and (max-width: 768px) {
  #works :deep(.projet) {
    grid-column: 1 / 2;
    grid-row: auto;
  }
}

@media screen and (min-width: 769px) and (max-width: 1280px) {
  #works :deep(.projet) {
    grid-column: auto;
    grid-row: auto;
  }
}

@media screen and (min-width: 1281px) {
  #works :deep(.projet:nth-child(2) .projet__image) {
    height: 600px;
  }

  #works :deep(.projet:nth-child(3) .projet__image) {
    height: 440px;
  }

  #works :deep(.projet:nth-child(4) .projet__image) {
    height: 520px;
  }

  #works :deep(.projet:nth-child(5) .projet__image) {
    height: 600px;
  }
}
</style>
