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
          <div class="tag" v-for="tag in work.tags" :key="tag">{{ tag }}</div>
        </div>
      </div>
      <p class="text--secondary">{{ work.description }}</p>
    </div>
    <RouterLink :to="`/projet/${work.slug}`" data-link>
      <div class="link">
        <div class="link__label">
          <p>Découvrir</p>
        </div>
        <div class="link__border"></div>
        <div class="link__border--hover"></div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  work: {
    type: Object,
    required: true
  }
})
</script>
