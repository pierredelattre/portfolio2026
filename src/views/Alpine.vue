<template>
  <section class="project">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout :image-src=philosophie image-alt="Philosphie" title="Philosophie"
      text="Adapté à l’identité de la marque, l’infodivertissement se voit aussi définit un parvcours utilisateur adapté à la voiture : interface centrée conducteur, mise en avant des informations de monitoring des organes de la voiture." />

    <GridScrollLayout :images="benchmarkGrid" title="Benchmark" :text="benchGridText" />

    <ImageFullWidthLayout secondary :image-src=uikit :image-mobile-src=uikitMobile image-alt="Réalisation d’un UI Kit"
      title="Réalisation d’un UI Kit"
      text="Création d’un UI Kit proposant les composants nécessaires pour passer à la phase de maquettes : boutons, inputs, éléments de navigation, multimédias...

Les bonnes pratiques de la marque ont été appliquées aux composants. On retrouve notamment la police utilisée par Alpine, les logos, le drapeau français ainsi que des couleurs propres à la marque mais aussi une proposition de nuances différentes pour une bonne accessibilité." />

    <GridScrollLayout :images="gridScrollImages" title="Du concept aux écrans finaux" :text="gridScrollText" />
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
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/alpine/alpine-mockup.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import philosophie from '@/assets/alpine/philosophie.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import nav from '@/assets/alpine/nav.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import dashboard from '@/assets/alpine/dashboard.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import research from '@/assets/alpine/research.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import navMobile from '@/assets/alpine/mobile-nav.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import dashboardMobile from '@/assets/alpine/mobile-dashboard.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import researcMobile from '@/assets/alpine/mobile-research.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import uikit from '@/assets/alpine/uikit.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import uikitMobile from '@/assets/alpine/mobile-uikit.jpg?optimized&w=1280;1600;1920&quality=96&lossless=true'

import benchBatterie from '@/assets/alpine/bench-batterie.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import benchClim from '@/assets/alpine/bench-clim.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import benchDashboard from '@/assets/alpine/bench-dashboard.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'

import benchBatterieMobile from '@/assets/alpine/mobile-bench-batterie.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import benchClimMobile from '@/assets/alpine/mobile-bench-clim.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import benchDashboardMobile from '@/assets/alpine/mobile-bench-dashboard.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'

const PROJECT_ROUTE = '/projet/alpine'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const gridScrollImages = [
  { src: nav, mobileSrc: navMobile, alt: "Navigation GPS" },
  { src: dashboard, mobileSrc: dashboardMobile, alt: "Tableau de bord" },
  { src: research, mobileSrc: researcMobile, alt: "Recherche multimédia" }
]

const benchmarkGrid = [
  { src: benchDashboard, mobileSrc: benchDashboardMobile, alt: "Tableau de bord de l'interface" },
  { src: benchClim, mobileSrc: benchClimMobile, alt: "Climatisation & chauffage" },
  { src: benchBatterie, mobileSrc: benchBatterieMobile, alt: "Batterie & autonomie" }
]

const gridScrollText =
  'Les différents écrans ont ensuite été conçus à partir de l’UI Kit pour donner vie à l’infodivertissement complet. Trois modules essentiels ont été développés : la navigation, avec un parcours de paramétrage simple et centré conducteur, des destinations prédéfinies (résidence & travail) ; le tableau de bord, qui met en avant les informations clés de la voiture électrique comme l’autonomie, la consommation, un résumé de lu multimédia et un résumé du de la navigation. Enfin, le système multimédia, est pensé pour naviguer rapidement entre playlists, albums et sources audio tout en minimisant la distraction du conducteur.'

const benchGridText =
  'Découverte des bonnes pratiques constructeurs en ergonomie automobile & recherche des bonnes idées et fonctionnalités proposées par les concurrents. Sources utilises : Apple Carplay, Google Design for Driving, Auto Interfaces.'

const hasProject = computed(() => Boolean(projectData))

const projectBg = computed(() => resolveOptimizedImageSrc(projectBackground))

usePageLoaded(projectBg)
</script>

<style>
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
