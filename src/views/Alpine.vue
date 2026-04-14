<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src=philosophie :image-alt="pageContent.philoAlt" :title="pageContent.philoTitle"
      :text="pageContent.philoText" />

    <GridScrollLayout :images="benchmarkGrid" :title="pageContent.benchmarkTitle" :text="pageContent.benchmarkText" />

    <ImageFullWidthLayout secondary :image-src=uikit :image-mobile-src=uikitMobile :image-alt="pageContent.uiKitAlt"
      :title="pageContent.uiKitTitle" :text="pageContent.uiKitText" />

    <GridScrollLayout :images="gridScrollImages" :title="pageContent.finalTitle" :text="pageContent.finalText" />
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
import { getWorksByLocale } from '@/data/content'
import { useLocale } from '@/i18n'
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
const { locale } = useLocale()

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: '← Retour à l’accueil',
    philoAlt: 'Interface Alpine: philosophie et cockpit',
    philoTitle: 'Philosophie',
    philoText:
      "Adapté à l'identité de la marque, l'infodivertissement est défini par un parcours utilisateur adapté à la voiture : une interface centrée conducteur qui met en avant les informations de monitoring du véhicule.",
    benchmarkTitle: 'Benchmark',
    benchmarkText:
      `Découverte des bonnes pratiques constructeurs en ergonomie automobile et recherche des meilleures idées et fonctionnalités proposées par les concurrents. 
      
      <strong>Sources utilisées</strong> : Apple CarPlay, Google Design for Driving, AutoInterfaces.com`,
    uiKitAlt: "Réalisation d'un UI Kit",
    uiKitTitle: "Réalisation d'un UI Kit",
    uiKitText:
      "Création d'un UI Kit avec les composants nécessaires au maquettage : boutons, inputs, éléments de navigation, médias. Les bonnes pratiques Alpine ont été appliquées aux composants, avec la typographie de marque, les logos, le drapeau français et des nuances dédiées à l'accessibilité.",
    finalTitle: 'Du concept aux écrans finaux',
    finalText:
      "Les écrans finaux ont été construits à partir de l'UI Kit pour donner vie à l'infodivertissement. Trois modules ont été développés : navigation (paramétrage simple et destinations prédéfinies), tableau de bord (autonomie, consommation, résumé média et navigation), et multimédia (playlists, albums et sources audio) avec une attention particulière à la réduction de la distraction.",
    altNav: 'Navigation GPS',
    altDashboard: 'Tableau de bord',
    altResearch: 'Recherche multimédia',
    altBenchDashboard: "Tableau de bord de l'interface",
    altBenchClim: 'Climatisation et chauffage',
    altBenchBattery: 'Batterie et autonomie'
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    philoAlt: 'Alpine interface philosophy and cockpit',
    philoTitle: 'Philosophy',
    philoText:
      "Aligned with Alpine's brand identity, the infotainment system is also shaped by a driver-focused journey, emphasizing key vehicle monitoring information.",
    benchmarkTitle: 'Benchmark',
    benchmarkText:
      `Review of automotive UX best practices and competitor ideas/features. 
      
      <strong>Sources used</strong>: Apple CarPlay, Google Design for Driving, AutoInterfaces.com`,
    uiKitAlt: 'UI Kit production',
    uiKitTitle: 'UI Kit production',
    uiKitText:
      "Built a UI kit with all components required for screen design : buttons, inputs, navigation, and media elements. Alpine-specific guidelines were applied, including brand typography, logos, French flag details, and additional color shades for accessibility.",
    finalTitle: 'From concept to final screens',
    finalText:
      "Final screens were built from the UI kit to shape the infotainment experience. Three core modules were delivered : navigation (driver-centered setup and saved destinations), dashboard (range, consumption, media and navigation summaries), and multimedia (quick access to playlists, albums, and audio sources) while minimizing driver distraction.",
    altNav: 'GPS navigation',
    altDashboard: 'Dashboard',
    altResearch: 'Media search',
    altBenchDashboard: 'Dashboard benchmark',
    altBenchClim: 'Climate and heating',
    altBenchBattery: 'Battery and range'
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const gridScrollImages = computed(() => [
  { src: nav, mobileSrc: navMobile, alt: pageContent.value.altNav },
  { src: dashboard, mobileSrc: dashboardMobile, alt: pageContent.value.altDashboard },
  { src: research, mobileSrc: researcMobile, alt: pageContent.value.altResearch }
])

const benchmarkGrid = computed(() => [
  { src: benchDashboard, mobileSrc: benchDashboardMobile, alt: pageContent.value.altBenchDashboard },
  { src: benchClim, mobileSrc: benchClimMobile, alt: pageContent.value.altBenchClim },
  { src: benchBatterie, mobileSrc: benchBatterieMobile, alt: pageContent.value.altBenchBattery }
])
  

const hasProject = computed(() => Boolean(projectData.value))
const projectLabel = computed(() =>
  hasProject.value
    ? `${locale.value === 'fr' ? 'Projet' : 'Project'} ${projectData.value.title}`
    : pageContent.value.projectNotFound
)

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
