<template>
  <section v-if="project" class="project">
    <section class="projet" v-if="project.highlights?.length">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
      <ProjectCard v-for="(highlight, index) in project.highlights" :key="`${highlight.title}-${index}`"
        :title="highlight.title" :description="highlight.description" :tags="highlight.tags" />
    </section>
  </section>
  <section v-else class="project">
    <h2>Projet introuvable</h2>
    <p>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ProjectCard from '@/components/ProjectCard.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { projects } from '@/data/content'

const route = useRoute()

const project = computed(() => projects.find((p) => p.slug === route.params.slug))
const projectBg = computed(() => project.value?.background || '')

usePageLoaded(projectBg)
</script>
