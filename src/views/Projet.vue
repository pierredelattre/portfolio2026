<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="Aperçu visuel du projet" title="Titre"
      text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia ab magnam ducimus accusamus pariatur. Tempora vitae quaerat asperiores quae, cupiditate mollitia quidem dignissimos consectetur atque deleniti neque debitis, est sequi!" />
    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="Illustration plein écran du projet" title="Titre"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero." />

    <GridScrollLayout :images="gridScrollImages" title="Titre" :text="gridScrollText" />

    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="Maquette plein écran" title="Titre"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero." />

    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="Autre visuel du projet" title="Titre"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero." />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import ColumnTextLayout from '@/components/layouts/ColumnTextLayout.vue'
import ImageFullWidthLayout from '@/components/layouts/ImageFullWidthLayout.vue'
import GridScrollLayout from '@/components/layouts/GridScrollLayout.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { works } from '@/data/content'

const PROJECT_ROUTE = '/projet/projet'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const gridScrollImages = [
  { src: 'https://placehold.co/400x600/EEE/31343C', alt: "Visuel principal du projet" },
  { src: 'https://placehold.co/400x600/EEE/31343C', alt: "Détail d’interface" },
  { src: 'https://placehold.co/400x600/EEE/31343C', alt: "Troisième capture du projet" }
]

const gridScrollText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero.'

const hasProject = computed(() => Boolean(projectData))
const projectLabel = computed(() =>
  hasProject.value ? `Projet ${projectData.title}` : 'Projet introuvable'
)

const projectBg = computed(() => projectBackground)

usePageLoaded(projectBg)
</script>

<style scoped>
.project {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  row-gap: 7rem;
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
    grid-template-rows: auto;
  }

  & .layout {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    gap: 2rem;
    grid-column: 1 / 17;

    & h3 {
      border-bottom: 1px solid var(--inactive);
      padding-bottom: .5rem;
      margin-bottom: .5rem;
    }

    @media screen and (max-width: 768px) {
      grid-column: 1;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 1rem;
    }

    &.layout__image-fwidth {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 2rem;
      height: 700px;
    }

  }
}
</style>
