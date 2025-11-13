<template>
  <div class="projet">
    <RouterLink :to="`/projet/${work.slug}`" data-link>
      <div class="projet__image">
        <img :src="work.cover" :alt="work.title" loading="lazy" />
      </div>
    </RouterLink>
    <div class="projet__content">
      <div class="projet__content__title">
        <h4>{{ work.title }}</h4>
        <div class="tags">
          <TagItem v-for="tag in work.tags" :key="tag" :label="tag" />
        </div>
      </div>
      <p class="text--secondary">{{ work.description }}</p>
    </div>
    <LinkItem :to="`/projet/${work.slug}`" label="Découvrir" />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import LinkItem from './LinkItem.vue'
import TagItem from './TagItem.vue'

defineProps({
  work: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.projet {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  & a:has(.projet__image) {
    width: 100%;
  }

  & .projet__content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  & .projet__content__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  & .projet__image {
    overflow: hidden;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      width: 100%;
      height: auto;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      width: 100%;
      height: auto;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;

      @media screen and (max-width: 768px) {
        height: 320px;
      }

      @media screen and (min-width: 769px) and (max-width: 1280px) {
        height: 340px;
      }
    }
  }

  & .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
}

.projet:hover .projet__image img {
  transform: scale(1.05);
}
</style>
