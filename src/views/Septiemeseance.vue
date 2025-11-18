<template>
  <section class="project">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="alt de l'image"
      title="Contexte & Enjeu"
      text="Les utilisateurs qui veulent simplement trouver une séance de cinéma se heurtent généralement à des plateformes denses, chargées et peu adaptées au mobile. Septième Séance est né de cette frustration : proposer un service clair, rapide, recentré sur l’essentiel.
L’objectif était simple : permettre à n’importe qui de découvrir les films en cours et de voir en quelques secondes les horaires dans les cinémas proches." />
    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="alt de l'image"
      title="Conception du service"
      text="Le cœur du produit repose sur un parcours fluide : afficher immédiatement les cinémas autour de l’utilisateur, permettre de consulter les séances du jour en un geste, et offrir une page film qui rassemble toutes les informations utiles — sans superflu.
L’accent a été mis sur la rapidité d’accès et sur la réduction de la charge cognitive. Trouver une séance devait devenir une action instinctive, presque automatique." />

    <GridScrollLayout :images="gridScrollImages" title="Architecture" :text="gridScrollText" />

    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="alt de l'image" title="Titre"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero." />

    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="alt de l'image" title="Titre"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero." />

    <GridScrollLayout :images="gridScrollImages" title="Améliorations" :text="upgradesText" />
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
import projectBackground from '@/assets/Frame3288.png'

const gridScrollText =
  'L’application s’organise autour d’un parcours clair. L’accueil propose soit d’utiliser la géolocalisation, soit de rechercher un film, une ville ou un cinéma, ce qui permet de s’adapter aux besoins de chaque utilisateur. Une fois la zone définie, la liste des cinémas apparaît et chacun possède sa propre page avec les séances du jour, ainsi qu’un changement de date rapide. La page film regroupe l’essentiel (infos, résumé et toutes les séances disponibles) pour comparer facilement sans naviguer partout. L’ensemble reste léger, logique et pensé pour un usage mobile, que l’utilisateur cherche ce qu\'il se passe près de lui ou qu\'il prépare une sortie ailleurs.'

const upgradesText= "Letterboxd watchlists friends, App mobile, Alertes, Notes des films, prix gagnés"

const PROJECT_ROUTE = '/projet/septiemeseance'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const gridScrollImages = [
  { src: 'https://placehold.co/400x600/EEE/31343C', alt: "alt de l'image" },
  { src: 'https://placehold.co/400x600/EEE/31343C', alt: "alt de l'image" },
  { src: 'https://placehold.co/400x600/EEE/31343C', alt: "alt de l'image" }
]

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
