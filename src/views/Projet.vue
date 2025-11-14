<template>
  <section class="project">
    <ProjectIntro
      v-if="hasProject"
      :title="projectData.title"
      :type="projectData.type"
      :intro="projectData.intro"
      :description="projectData.description"
      :services="projectData.services"
      :team="projectData.team"
      :links="projectData.links"
    />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { works } from '@/data/content'
import projectBackground from '@/assets/Frame3288.png'

const PROJECT_ROUTE = '/projet/projet'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const hasProject = computed(() => Boolean(projectData))

const projectBg = computed(() => projectBackground)

usePageLoaded(projectBg)
</script>

<style scoped>
.project {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  row-gap: 5rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  transition: height 0.5s ease;

  .project__error {
    grid-column: 9 / 17;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
  }

  /* ProjectIntro handles .projet layout */
}
</style>
