<template>
  <section class="project">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout :image-src=contexte image-alt="Contexte & Enjeux" title="Contexte & Enjeux" text="Talkie naît du constat que les applications d’apprentissage souffrent souvent de répétitivité, faible profondeur et manque d’immersion. Nous avons cherché à concevoir une expérience qui combine gamification, mise en situation et flexibilité totale, en intégrant des modules solo, duels, quiz thématiques et un apprentissage guidé.
L’objectif : rendre l’apprentissage motivant, répétable, personnalisé et culturellement enrichissant." />

    <GridScrollLayout :images="rechercheUX" title="Recherche utilisateur" text="Entretiens qualitatifs, proto-personas et recherches secondaires ont mis en lumière des attentes clés :
– variété dans les formats d’apprentissage,
– scénarios réels pour pratiquer,
– progression claire,
– sessions courtes,
– dimension sociale motivante.

Ces insights ont nourri l’arborescence et les parcours." />

    <ImageFullWidthLayout :image-src=flows :image-mobile-src=flowsMobile secondary image-alt="Architecture & parcours"
      title="Architecture & parcours"
      text="L’expérience est structurée autour de cinq zones : Accueil, Apprendre, Quiz, Quêtes et Profil.
Nous avons conçu des parcours fluides pour le duel, les quizz thématiques et l’apprentissage guidé, en garantissant une navigation claire." />

    <GridScrollLayout :images=uiGridImages title="Conception UI"
      text="L’UI a été conçue pour simplifier la diversité des formats (cours, quiz, duels, quêtes) grâce à des patterns réutilisables : cartes de contenus, blocs de progression, modules de quiz et header cohérent.

La hiérarchie d’information a été pensée pour être immédiate : titres clairs, actions primaires visibles, actions secondaires accessibles sans distraire.

Les feedbacks (réponses, progression, score) jouent un rôle central pour soutenir la dimension gamifiée et garder l’utilisateur engagé.
L’ensemble vise, quant à elle, une interface prévisible et fluide, où chaque écran reprend les mêmes logiques pour réduire la charge cognitive." />

    <ColumnTextLayout :image-src=designsystem image-alt="Design system" title="Design system" text="La première itération du produit abouti sur un device mobile néanmoins afin de se positionner en tant qu’acteurs dans ce marché, une présence tablettes & desktop est nécessaire. Un besoin cohérence a été identifié pour les futures version mais aussi une maintenance plus facile et des perspectives d’évolutions envisageables. De plus, face aux différentes fonctionnalités et services gérés par les différentes équipes, un design language est à mettre en place.

Cela résulterait en une meilleure communication entre les équipes et une meilleure efficience. 

Un design system complet a alors été créé : design tokens, fondations, composants, templates et documentation Zeroheight, synchronisée avec Figma." />

<ColumnTextLayout :image-src=tests image-alt="Tests utilisateurs" title="Tests utilisateurs" text="Les tests ont révélé des ajustements essentiels : clarifier certains éléments de progression (comme les “réponses connues”), ajouter un récapitulatif de fin de quiz plus valorisant, et améliorer la visibilité d’actions clés (inviter un ami, quitter ou reprendre un cours).
Ils ont aussi mis en lumière le besoin de titres de page, de pictos plus lisibles et de feedbacks interactifs plus explicites.

Ces retours ont permis d’améliorer la hiérarchie visuelle, la compréhension immédiate des écrans et la cohérence des interactions, tout en confirmant la fluidité globale des parcours proposés." />
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

import projectBackground from '@/assets/talkie/banner.jpg'
import contexte from '@/assets/talkie/contexte.jpg'
import flows from '@/assets/talkie/flows.jpg'
import flowsMobile from '@/assets/talkie/mobile-flows.jpg'
import designsystem from '@/assets/talkie/designsystem.jpg'
import apprentissage from '@/assets/talkie/apprentissage.jpg'
import quiz from '@/assets/talkie/quiz.jpg'
import duels from '@/assets/talkie/duels.jpg'
import tests from '@/assets/talkie/tests.jpg'

import persona from '@/assets/talkie/per.jpg'
import entretiens from '@/assets/talkie/entr.jpg'
import entretiensMobile from '@/assets/talkie/mobile-entr.jpg'
import fonctions from '@/assets/talkie/fonctions.jpg'
import fonctionsMobile from '@/assets/talkie/mobile-fonctions.jpg'

const PROJECT_ROUTE = '/projet/talkie'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const uiGridImages = [
  { src: apprentissage, alt: "Cours" },
  { src: quiz, alt: "Quizs en solo" },
  { src: duels, alt: "Duels entre joueurs" }
]

const rechercheUX = [
  { src: persona, alt: "Persona" },
  { src: entretiens, mobileSrc: entretiensMobile, alt: "Entretiens" },
  { src: fonctions, mobileSrc: fonctionsMobile, alt: "Fonctionnalités" }
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
