<template>
  <section class="project">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout
        image-src="https://placehold.co/400x600/EEE/31343C"
        image-alt="alt de l'image"
        title="Titre"
        text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia ab magnam ducimus accusamus pariatur. Tempora vitae quaerat asperiores quae, cupiditate mollitia quidem dignissimos consectetur atque deleniti neque debitis, est sequi!"
      />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import ColumnTextLayout from '@/components/layouts/ColumnTextLayout.vue'
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

  & .layout {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    gap: 2rem;
    grid-column: 1 / 17;
    overflow: hidden;

    @media screen and (max-width: 768px) {
      grid-column: 1;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto;
    }
  }
}
</style>
