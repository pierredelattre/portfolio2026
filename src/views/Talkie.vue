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
      text="Le projet part d’un constat simple : la majorité des outils existants pour chercher une séance de cinéma sont lourds, peu directs et rarement pensés pour un usage immédiat. Les grands acteurs du marché demandent souvent de passer par une fiche film, une fiche cinéma ou plusieurs menus avant d’obtenir un simple horaire. Dans certains cas, même après avoir autorisé la géolocalisation, les résultats ne sont pas affichés.
      
      L’enjeu était donc de proposer une expérience qui commence vraiment par la question que se pose l’utilisateur : qu’est-ce qui passe autour de moi, maintenant ou ce soir ? L’objectif était d’éviter la navigation en cascade, de réduire la friction et de rendre la recherche plus naturelle, que ce soit en utilisant sa position ou en choisissant manuellement une ville ou un cinéma." />
    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="alt de l'image"
      title="Conception du service"
      text="La conception s’est d’abord concentrée sur la manière dont les utilisateurs effectuent réellement leur recherche. Certains veulent simplement savoir ce qui se joue près d’eux, d’autres préparent une sortie dans une autre ville, et d’autres encore partent d’un film qu’ils ont envie de voir. À partir de ces comportements, plusieurs points clés ont été définis.
      
      L’accueil doit permettre deux entrées : géolocalisation ou recherche manuelle. La géolocalisation affiche les cinémas les plus proches dès qu’elle est autorisée. La recherche, elle, doit être rapide : nom de ville, nom de cinéma ou même titre de film, le tout affiché par autocomplétion et une tolérance d'erreurs.
Une fois la zone choisie, la liste des films apparaît, chacun ayant une page dédiée.

La page film joue un rôle central. Elle réunit les informations essentielles et surtout toutes les séances disponibles autour du périmètre défini, quel que soit le cinéma. Cela permet d’avoir une vision d’ensemble sans perdre le fil." />

    <GridScrollLayout :images="gridScrollImages" title="Architecture" text="L’application s’organise autour d’un parcours clair. L’accueil propose soit d’utiliser la géolocalisation, soit de rechercher un film, une ville ou un cinéma, ce qui permet de s’adapter aux besoins de chaque utilisateur. Une fois la zone définie, la liste des cinémas apparaît et chacun possède sa propre page avec les séances du jour, ainsi qu’un changement de date rapide. La page film regroupe l’essentiel (infos, résumé et toutes les séances disponibles) pour comparer facilement sans naviguer partout. L’ensemble reste léger, logique et pensé pour un usage mobile, que l’utilisateur cherche ce qu\'il se passe près de lui ou qu\'il prépare une sortie ailleurs." />

    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="alt de l'image" title="Titre"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero." />

    <ImageFullWidthLayout image-src="https://placehold.co/400x600/EEE/31343C" image-alt="alt de l'image" title="Titre"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum incidunt ipsa neque esse deleniti et. Officiis hic aliquid nihil tempore repellat voluptatum repudiandae placeat deleniti! Placeat quidem doloribus libero." />

    <GridScrollLayout :images="gridScrollImages" title="Futures améliorations" text="Suite à la mise en production, plusieurs évolutions sont déjà envisagées pour enrichir l’expérience. Les points clés sont la récupération et l'affichage des prix des séances ainsi que l'affichage de la prochaine séance disponible dès la page des résultats. Une version mobile dédiée permettrait d’activer des alertes personnalisées : sortie d’un film attendu, séance disponible dans un rayon donné, ou rappel lorsqu’un film arrive dans une salle préférée. L'affichage des options plus spécifiques des séances : séances 3D, avant-premières...
    
    Enfin, l’intégration de notes et d’avis provenant de différentes plateformes renforcerait également la découverte, tout comme l’affichage des prix et distinctions reçus par les films. Une connexion optionnelle à Letterboxd ou Trakt est envisagée afin afficher uniquement les séances des films présents dans sa watchlist, et filtrer toute la recherche en fonction de celle-ci, avoir les alertes." />
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

const PROJECT_ROUTE = '/projet/talkie'
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
