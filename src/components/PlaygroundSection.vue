<template>
  <div id="playground">
    <h3>Playground</h3>
    <div class="playground__content">
      <div class="col" v-for="(column, columnIndex) in columns" :key="`column-${columnIndex}`">
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
</template>

<script setup>
import PlaygroundCard from '@/components/PlaygroundCard.vue'

defineProps({
  columns: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
#playground {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.playground__content {
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    gap: 1rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    &:nth-child(4) {
      display: none;
    }
  }
}

@media screen and (min-width: 1281px) {
  .playground__content .col:nth-child(3) :deep(.playground__item:nth-child(2)),
  .playground__content .col:nth-child(2) :deep(.playground__item:nth-child(1)) {
    height: 340px !important;
  }

  .playground__content .col:nth-child(4) :deep(.playground__item:nth-child(1)) {
    height: 620px !important;
  }
}
</style>
