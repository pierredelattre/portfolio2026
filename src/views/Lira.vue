<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout :image-src=contexte :video-src="liraDemo" :video-mobile-src="liraDemoMobile" image-alt="Contexte & Enjeux" title="Contexte & Enjeux"
      text="Les apps d'apprentissage des langues ont toutes un angle mort différent.

Duolingo construit l'habitude mais le contenu est artificiel et le plafond B1-B2 arrive vite. Anki a l'algorithme le plus rigoureux du marché, mais préparer ses cartes prend plus de temps que les réviser. LingQ propose l'approche la plus proche de ce que je cherchais, lire du contenu authentique avec une traduction intégrée, mais l'interface reste difficile à prendre en main.

Lira a été construit pour répondre à un besoin : lire du vrai contenu, sauvegarder les mots en contexte, les réviser ensuite avec un algorithme sérieux. Pas de configuration, pas de gamification. 

Le projet est en production depuis mars 2026." />

    <GridScrollLayoutRows :images="rechercheUX" title="Recherche & Positionnement"
      text="La recherche s'est faite en desk research avant le lancement : Reddit (r/languagelearning, r/Anki, r/duolingo), forums LingQ, reviews App Store, exports en batch de commentaires sur des vidéos YouTube. Pas d'interviews primaires à ce stade.

Ce type de source a un biais évident : les utilisateurs qui postent sont plus frustrés que la moyenne. J'en ai tenu compte.

Ce qui ressort : le passage B1-B2 est la zone de blocage la plus décrite. Les utilisateurs avancés convergent naturellement vers la lecture, ce n'est pas un besoin à créer. Et la création manuelle de cartes Anki est souvent citée comme raison d'abandon.

J'ai construit trois proto-personas depuis ces données : le polyglotte qui connaît le FSRS et veut zéro friction, l'expatrié qui veut lire la presse locale sans perdre le fil de sa lecture, et celui qui a des mois de streak Duolingo mais ne sent plus de progression." />

    <GridScrollLayout :images="reader" title="Le reader"
      text="Le reader est la partie centrale du projet. L'objectif était que la lecture reste l'activité principale, pas la traduction.

Un clic sur un mot affiche un panneau : deux onglets : traduction et définition. L'utilisateur voit la phonétique, peut lancer une prononciation audio de l'expression ou du mot via un algorithme local de synthèse vocale (PiperTTS). Sans changer de page, sans perdre le fil du texte. Un clic de plus pour sauvegarder. La carte FSRS est générée automatiquement avec la phrase source comme contexte de mémorisation." />

    <ImageFullWidthLayout :image-src=biblio :image-mobile-src=biblioMobile secondary image-alt="Bibliothèque"
      title="Bibliothèque & import"
      text="L'import accepte une URL, un texte, un EPUB ou un PDF. L'utilisateur lit ce qu'il veut, sans bibliothèque imposée. 
      
      Pour ceux qui cherchent un point de départ, Lira intègre Project Gutenberg : plusieurs milliers de livres du domaine public, directement dans l'app. Romans, nouvelles, essais en espagnol, allemand, anglais, italien et d'autres langues. 
      
      Les textes importés et les livres Gutenberg s'organisent dans la même bibliothèque personnelle. Chaque texte affiche la progression de lecture et le nombre de mots sauvegardés." />

    <GridScrollLayout :images="revision" title="Révision & Mots croisés"
      text="La révision utilise le FSRS avec un rappel contextuel : le mot est masqué dans sa phrase d'origine, et l'utilisateur doit le retrouver. La mémorisation passe par la phrase, pas par le mot isolé.

Après quelques minutes de lecture et au moins 3 mots sauvegardés, un mini-quiz apparaît sur les mots de la session en cours. Court, optionnel.

Les mots croisés sont générés depuis le vocabulaire personnel. Une façon de réviser différente du format flashcard, pour les sessions où l'on veut changer de registre." />

    <GridScrollLayout :images="design" title="Design"
      text="La police de lecture est Literata, une serif taillée pour les longs textes sur écran. L'interface utilise Satoshi. Le fond est un blanc cassé chaud plutôt qu'un blanc neutre. Deux couleurs : un vert forêt pour les actions et la marque, un brun foncé pour le texte.

Pas de streaks, pas de notifications de pression, pas de classements. La progression est personnelle.

Le dark mode reprend les mêmes tokens avec un fond très sombre et le vert adapté au contraste." />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import ColumnTextLayout from '@/components/layouts/ColumnTextLayout.vue'
import ImageFullWidthLayout from '@/components/layouts/ImageFullWidthLayout.vue'
import GridScrollLayout from '@/components/layouts/GridScrollLayout.vue'
import GridScrollLayoutRows from '@/components/layouts/GridScrollLayoutRows.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { works } from '@/data/content'
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/lira/lira-banner.jpg?optimized'
import contexte from '@/assets/lira/contexte.jpg?optimized'
import liraDemo from '@/assets/lira/lira-demo.mp4'
import liraDemoMobile from '@/assets/lira/lira-demo-mobile.mp4'
import biblio from '@/assets/lira/biblio.jpg?optimized'
import biblioMobile from '@/assets/lira/biblio-mobile.jpg?optimized'
import persona1 from '@/assets/lira/persona-01.jpg?optimized'
import persona2 from '@/assets/lira/persona-02.jpg?optimized'
import persona3 from '@/assets/lira/persona-03.jpg?optimized'
import reader1 from '@/assets/lira/reader-large.jpg?optimized'
import reader2Mobile from '@/assets/lira/reader-mobile-mobile.jpg?optimized'
import reader3Mobile from '@/assets/lira/reader-definitions-mobile.jpg?optimized'
import reader2 from '@/assets/lira/reader-definitions.jpg?optimized'
import reader3 from '@/assets/lira/reader-mobile.jpg?optimized'
import entretiensMobile from '@/assets/talkie/mobile-entr.jpg?optimized'
import fonctionsMobile from '@/assets/talkie/mobile-fonctions.jpg?optimized'
import cross from '@/assets/lira/crossword.jpg?optimized'
import stats from '@/assets/lira/stats.jpg?optimized'
import statsMobile from '@/assets/lira/stats-mobile.jpg?optimized'
import quiz from '@/assets/lira/revision.jpg?optimized'
import quizMobile from '@/assets/lira/revision-mobile.jpg?optimized'
import landing from '@/assets/lira/landing.jpg?optimized'
import dark from '@/assets/lira/dark.jpg?optimized'
import darkMobile from '@/assets/lira/dark-mobile.jpg?optimized'
import profil from '@/assets/lira/profil.jpg?optimized'
import profilMobile from '@/assets/lira/profil-mobile.jpg?optimized'

const PROJECT_ROUTE = '/projet/lira'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const revision = [
  { src: cross, alt: "Mots croisés" },
  { src: quiz, mobileSrc: quizMobile, alt: "Flashcards en quiz" },
  { src: stats, mobileSrc: statsMobile, alt: "Statistiques" }
]

const design = [
  { src: landing, alt: "Landing page" },
  { src: dark, mobileSrc: darkMobile, alt: "Dark mode" },
  { src: profil, mobileSrc: profilMobile, alt: "Profil et paramètres" }
]

const reader = [
  { src: reader1, alt: "Persona : Polyglotte" },
  { src: reader2, mobileSrc: reader2Mobile, alt: "Persona : Travaille à l'étranger" },
  { src: reader3, mobileSrc: reader3Mobile, alt: "Persona : Duolingo 559 daily streaks" }
]

const rechercheUX = [
  { src: persona1, alt: "Persona : Polyglotte" },
  { src: persona2, alt: "Persona : Travaille à l'étranger" },
  { src: persona3, alt: "Persona : Duolingo 559 daily streaks" }
]

const hasProject = computed(() => Boolean(projectData))
const projectLabel = computed(() =>
  hasProject.value ? `Projet ${projectData.title}` : 'Projet introuvable'
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
