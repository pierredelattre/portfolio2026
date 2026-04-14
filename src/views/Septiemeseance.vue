<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src="contextImage" :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle"
      :text="pageContent.contextText" />

    <ImageFullWidthLayout secondary :image-mobile-src="geolocationImageMobile" :image-src="geolocationImage"
      :image-alt="pageContent.geoAlt" :title="pageContent.geoTitle" :text="pageContent.geoText" />

    <GridScrollLayout :images="gridScrollImages" :title="pageContent.filtersTitle" :text="gridScrollFiltersText" />

    <ImageFullWidthLayout secondary :image-mobile-src="projectionsImageMobile" :image-src="projectionsImage"
      :image-alt="pageContent.listAlt" :title="pageContent.listTitle" :text="pageContent.listText" />

    <GridScrollLayout :images="upgrades" :title="pageContent.futureTitle" :text="pageContent.futureText" />
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

import projectBackground from '@/assets/septiemeseance/002.jpg?optimized'
import contextImage from '@/assets/septiemeseance/contexte.jpg?optimized'
import geolocationImage from '@/assets/septiemeseance/geoloc.jpg?optimized'
import geolocationImageMobile from '@/assets/septiemeseance/mobile-geoloc.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import projectionsImage from '@/assets/septiemeseance/projections.jpg?optimized'
import projectionsImageMobile from '@/assets/septiemeseance/mobile-projections.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterFilmsImage from '@/assets/septiemeseance/filter-films.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import filterFilmsMobileImage from '@/assets/septiemeseance/mobile-filter-films.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterPerimeterImage from '@/assets/septiemeseance/filter-perimetre.jpg?optimized'
import filterPerimeterMobileImage from '@/assets/septiemeseance/mobile-filter-perimetre.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterLanguageImage from '@/assets/septiemeseance/filter-langue.jpg?optimized'
import filterLanguageMobileImage from '@/assets/septiemeseance/mobile-filter-langue.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import notesImage from '@/assets/septiemeseance/notes.jpg?optimized'
import alertsImage from '@/assets/septiemeseance/alertes.jpg?optimized'
import alertsImageMobile from '@/assets/septiemeseance/mobile-alertes.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import letterboxdImage from '@/assets/septiemeseance/letterboxd.jpg?optimized'
import letterboxdMobileImage from '@/assets/septiemeseance/mobile-letterboxd.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'

const PROJECT_ROUTE = '/projet/septiemeseance'
const { locale } = useLocale()

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: '← Retour à l’accueil',
    contextAlt: 'Vue écran du contexte du service',
    contextTitle: 'Contexte et enjeu',
    contextText: `La plupart des services existants autour du cinéma proposent beaucoup d'informations, mais rarement de manière directe. L'utilisateur doit souvent naviguer entre plusieurs écrans avant d'avoir les projections proches de lui. Certaines plateformes ne tiennent pas compte de la position de l'utilisateur, même lorsqu'il l'a autorisée.

L'enjeu était de créer un service plus fluide qui répond vraiment au besoin central : voir rapidement ce qui se joue autour de soi et choisir une séance sans perdre de temps.

Le service a fonctionné jusqu'à la restriction d'accès à l'API tierce utilisée pour les données de séances. Le projet reste dans ce portfolio car il représente un cycle complet, de la recherche au lancement.`,
    geoAlt: 'Géolocalisation ou recherche manuelle',
    geoTitle: 'Géolocalisation ou recherche manuelle',
    geoText:
      "L'accueil propose soit d'activer la géolocalisation, soit de rechercher manuellement une ville, un cinéma ou un film. La géolocalisation affiche les cinémas à proximité (périmètre modifiable). La recherche est rapide, tolérante aux fautes et dotée d'autocomplétion.",
    filtersTitle: 'Filtres de recherche',
    listAlt: 'Liste des projections autour',
    listTitle: 'Liste des projections autour',
    listText:
      "Une fois la géolocalisation acceptée, la liste des films projetés dans le périmètre apparaît. Les salles sont triées par proximité, avec un accès rapide aux séances du jour. La présentation est pensée pour le mobile : lisible, simple et compacte.",
    futureTitle: 'Futures améliorations',
    futureText: `Lors des tests, plusieurs utilisateurs ont tapé le nom de leur cinéma plutôt que d'activer la géolocalisation. Ils cherchaient le programme de la salle sur la semaine. Cela a conduit à deux décisions : recherche par cinéma avec autocomplétion, et vue salle sur plusieurs jours.

Parmi les évolutions prévues : affichage des prix, mise en avant de la prochaine séance, alertes mobiles personnalisées, détails de séance (3D, avant-première), notes/avis, distinctions, compteur de résultats en temps réel dans la bottom sheet, bouton de réinitialisation des filtres, et connexion Letterboxd/Trakt.`,
    filtersDescription:
      'Pour accompagner la recherche, des filtres ont été ajoutés afin de permettre un tri plus précis selon les situations.',
    filtersOne:
      'Certains filtres affinent les résultats : genre, année, durée et option films récents vs films cultes encore projetés. Les utilisateurs peuvent aussi filtrer par abonnements acceptés (UGC, Pathé...).',
    filtersTwo:
      "L'utilisateur peut définir la distance autour du point géolocalisé ou autour de la ville/cinéma choisi manuellement. Il peut aussi choisir la date souhaitée pour voir les projections correspondantes.",
    filtersThree:
      "La gestion des langues et sous-titres fait aussi partie des options. L'idée est de laisser chacun adapter l'affichage selon ses contraintes.",
    altFilters1: 'Filtrer les films',
    altFilters2: 'Périmètre de recherche et date',
    altFilters3: 'Choix des langues et sous-titres',
    altUpgrades1: 'Ajout des notes et critiques',
    altUpgrades2: "Alerte de projection autour de chez soi",
    altUpgrades3: 'Connexion Letterboxd'
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Service context overview',
    contextTitle: 'Context and challenge',
    contextText: `Most existing cinema services provide a lot of information, but rarely in a direct way. Users often have to navigate multiple screens before seeing nearby showtimes. Some platforms still ignore user location even when permission is granted.

The challenge was to create a more fluid service focused on the core need: quickly see what is playing nearby and pick a session without friction.

The service ran until access to the third-party showtimes API was restricted. It remains in this portfolio because it represents a full cycle, from research to launch.`,
    geoAlt: 'Geolocation or manual search',
    geoTitle: 'Geolocation or manual search',
    geoText:
      'Home offers two options : enable geolocation, or manually search by city, cinema, or movie. Geolocation instantly shows nearby cinemas (with adjustable radius). Search is fast, typo-tolerant, and includes autocomplete.',
    filtersTitle: 'Search filters',
    listAlt: 'Nearby showtimes list',
    listTitle: 'Nearby showtimes list',
    listText:
      'Once geolocation is enabled, projected movies in the selected area appear. Cinemas are sorted by distance with quick access to same-day sessions. The layout is mobile-first: readable, simple, and compact for rapid scanning.',
    futureTitle: 'Future improvements',
    futureText: `User tests showed that several people searched by cinema name instead of enabling geolocation. They wanted a weekly theater schedule, not only a single session view. This led to two roadmap decisions : cinema-name search with autocomplete, and multi-day cinema pages.

Planned improvements include prices, highlighting the next session directly in results, personalized mobile alerts, specific metadatas (3D, premieres), ratings/reviews, distinctions, real-time result counts in mobile filter sheets, reset filters action, and Letterboxd/Trakt integrations.`,
    filtersDescription:
      'To support search, filters were added to enable more precise and useful sorting across different user contexts.',
    filtersOne:
      'Some filters refine results by genre, year, duration, and by distinguishing recent movies from cult classics still being screened. Users can also filter by accepted subscriptions (UGC, Pathe...).',
    filtersTwo:
      'Users can define distance around the detected location or around a manually selected city/cinema. They can also set a desired date to view matching showtimes.',
    filtersThree:
      'Language and subtitle preferences are also available. The goal is to let users tailor the experience to their constraints.',
    altFilters1: 'Filter movies',
    altFilters2: 'Search radius and date',
    altFilters3: 'Language and subtitle preferences',
    altUpgrades1: 'Ratings and reviews',
    altUpgrades2: 'Showtime notifications nearby',
    altUpgrades3: 'Letterboxd account link'
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const gridScrollImages = computed(() => [
  { src: filterFilmsImage, mobileSrc: filterFilmsMobileImage, alt: pageContent.value.altFilters1 },
  { src: filterPerimeterImage, mobileSrc: filterPerimeterMobileImage, alt: pageContent.value.altFilters2 },
  { src: filterLanguageImage, mobileSrc: filterLanguageMobileImage, alt: pageContent.value.altFilters3 }
])

const upgrades = computed(() => [
  { src: notesImage, alt: pageContent.value.altUpgrades1 },
  { src: alertsImage, mobileSrc: alertsImageMobile, alt: pageContent.value.altUpgrades2 },
  { src: letterboxdImage, mobileSrc: letterboxdMobileImage, alt: pageContent.value.altUpgrades3 }
])

const gridScrollFiltersText = computed(() => [
  {
    description: pageContent.value.filtersDescription,
    1: pageContent.value.filtersOne,
    2: pageContent.value.filtersTwo,
    3: pageContent.value.filtersThree,
  }
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
@media screen and (max-width: 768px) {
  section.layout.layout-grid-scroll:nth-child(2) img:nth-child(2) {
    height: 100%!important;
  }
}

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
