<template>
  <section class="project">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout :image-src="contextImage" image-alt="alt de l'image"
      title="Contexte & Enjeu"
      text="La plupart des services existants autour du cinéma proposent beaucoup d’informations, mais rarement de manière directe. L’utilisateur doit souvent naviguer entre plusieurs écrans avant d’avoir les projections proches de lui. Certaines plateformes ne tiennent pas compte de la position de l’utilisateur, même lorsqu’il l’a autorisée, et obligent à passer par une fiche film ou une fiche cinéma avant d’afficher des résultats.

L’enjeu était de créer un service plus fluide, qui répond vraiment au besoin central : voir rapidement ce qui se joue autour de soi et choisir une séance sans perdre de temps." />

    <ImageFullWidthLayout secondary :image-mobile-src="geolocationImageMobile" :image-src="geolocationImage"
      image-alt="Géolocalisation ou recherche manuelle" title="Géolocalisation ou recherche manuelle"
      text="L’accueil propose soit d’activer la géolocalisation, soit de rechercher manuellement une ville, un cinéma ou un film. La géolocalisation permet d’afficher les cinémas dans un périmètre proche (modifiable) dès qu’elle est autorisée. La recherche est, quant à elle, conçue pour être rapide, tolérante aux fautes de frappe et dôtée d'autocomplétion." />

    <GridScrollLayout :images="gridScrollImages" title="Filtres de recherche" :text="gridScrollFiltersText" />

    <ImageFullWidthLayout secondary :image-mobile-src="projectionsImageMobile" :image-src="projectionsImage"
      image-alt="Liste des projections autour" title="Liste des projections autour"
      text="Une fois la géolocalisation acceptée par, la liste des films projetés dans le périmètre défini apparaît. Les salles sont triées par proximité, avec un accès rapide aux séances du jour. <strong>La présentation est pensée</strong> pour le mobile : lisible, simple, et suffisamment compacte pour permettre un balayage rapide." />

    <GridScrollLayout :images="upgrades" title="Futures améliorations" text="Plusieurs évolutions sont prévues : l’affichage des prix, la mise en avant de la prochaine séance directement dans les résultats, ainsi qu’une version mobile avec alertes personnalisées (nouveau film, séance proche, rappel dans une salle favorite). S’ajouteraient aussi les infos spécifiques des séances (3D, avant-première…), l’intégration de notes/avis et des distinctions des films. 
    
    Lorsqu'une recherche a été effectué, afficher le nombre de résultats en temps réel lors de la sélection des filtres dans la bottom sheet mobile ainsi qu'un bouton réinitialiser les filtres. Enfin, une connexion à Letterboxd ou Trakt permettrait de n’afficher que les séances issues de sa watchlist et d’activer des alertes dédiées." />
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

import projectBackground from '@/assets/septiemeseance/002.jpg?optimized'
import contextImage from '@/assets/septiemeseance/contexte.jpg?optimized'
import geolocationImage from '@/assets/septiemeseance/geoloc.jpg?optimized'
import geolocationImageMobile from '@/assets/septiemeseance/mobile-geoloc.jpg?optimized'
import projectionsImage from '@/assets/septiemeseance/projections.jpg?optimized'
import projectionsImageMobile from '@/assets/septiemeseance/mobile-projections.jpg?optimized'
import filterFilmsImage from '@/assets/septiemeseance/filter-films.jpg?optimized'
import filterFilmsMobileImage from '@/assets/septiemeseance/mobile-filter-films.jpg?optimized'
import filterPerimeterImage from '@/assets/septiemeseance/filter-perimetre.jpg?optimized'
import filterPerimeterMobileImage from '@/assets/septiemeseance/mobile-filter-perimetre.jpg?optimized'
import filterLanguageImage from '@/assets/septiemeseance/filter-langue.jpg?optimized'
import filterLanguageMobileImage from '@/assets/septiemeseance/mobile-filter-langue.jpg?optimized'
import notesImage from '@/assets/septiemeseance/notes.jpg?optimized'
import alertsImage from '@/assets/septiemeseance/alertes.jpg?optimized'
import alertsImageMobile from '@/assets/septiemeseance/mobile-alertes.jpg?optimized'
import letterboxdImage from '@/assets/septiemeseance/letterboxd.jpg?optimized'
import letterboxdMobileImage from '@/assets/septiemeseance/mobile-letterboxd.jpg?optimized'

const PROJECT_ROUTE = '/projet/septiemeseance'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const gridScrollImages = [
  { src: filterFilmsImage, mobileSrc: filterFilmsMobileImage, alt: 'Filtrer les films' },
  { src: filterPerimeterImage, mobileSrc: filterPerimeterMobileImage, alt: 'Périmètre de recherche & date' },
  { src: filterLanguageImage, mobileSrc: filterLanguageMobileImage, alt: 'Choix des langues et des sous-titres' }
]

const upgrades = [
  { src: notesImage, alt: "Ajout des notes et critiques des films" },
  { src: alertsImage, mobileSrc: alertsImageMobile, alt: "Être notifié de la projection d'un film autour de chez soi" },
  { src: letterboxdImage, mobileSrc: letterboxdMobileImage, alt: "Lier son compte à Letterboxd" }
]

const gridScrollFiltersText = [
  {
    description:
      'Pour accompagner la recherche, des filtres ont été ajoutés afin de permettre un tri plus précis et plus utile selon les situations.',
    1: 'Certains filtres viennent affiner les résultats, notamment le genre du film, son année, sa durée et une option permettant de distinguer les films récents des “films cultes” encore projetés. Les utilisateurs peuvent également filtrer selon les abonnements acceptés par chaque salle, par exemple UGC ou Pathé.',
    2: 'L’utilisateur peut définir la distance autour du point détecté en géolocalisation ou autour de la ville/cinéma qu’il a choisi manuellement. Cela permet d’élargir ou de réduire facilement la zone couverte. Il peut aussi choisir la date de sa séance souhaitée pour voir les projections à cette date.',
    3: 'La gestion des langues et des sous-titres fait aussi partie des options disponibles. L’idée générale est de laisser à chacun la possibilité d’adapter l’affichage en fonction de ses contraintes. On retrouve aussi ces filtres sur la page film afin de filter dans les séances.',
  }
]

const gridScrollUpgradesText = [
  {
    description:
      "Plusieurs évolutions sont prévues : l’affichage des prix, la mise en avant de la prochaine séance directement dans les résultats, ainsi qu’une version mobile avec alertes personnalisées (nouveau film, séance proche, rappel dans une salle favorite). S’ajouteraient aussi les infos spécifiques des séances (3D, avant-première…), l’intégration de notes/avis et des distinctions des films. Lorsqu'une recherche a été effectué, afficher le nombre de résultats en temps réel lors de la sélection des filtres dans la bottom sheet mobile ainsi qu'un bouton réinitialiser les filtres. Enfin, une connexion à Letterboxd ou Trakt permettrait de n’afficher que les séances issues de sa watchlist et d’activer des alertes dédiées."
  }
]

const hasProject = computed(() => Boolean(projectData))

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
