<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src=contexte :video-src="liraDemo" :video-mobile-src="liraDemoMobile"
      :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle" :text="pageContent.contextText" />

    <GridScrollLayoutRows :images="rechercheUX" :title="pageContent.researchTitle" :text="pageContent.researchText" />

    <GridScrollLayout :images="reader" :title="pageContent.readerTitle" :text="pageContent.readerText" />

    <ImageFullWidthLayout :image-src=biblio :image-mobile-src=biblioMobile secondary :image-alt="pageContent.libraryAlt"
      :title="pageContent.libraryTitle" :text="pageContent.libraryText" />

    <GridScrollLayout :images="revision" :title="pageContent.reviewTitle" :text="pageContent.reviewText" />

    <GridScrollLayout :images="design" :title="pageContent.designTitle" :text="pageContent.designText" />
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
import { getWorksByLocale } from '@/data/content'
import { useLocale } from '@/i18n'
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/lira/lira-banner.jpg?optimized'
import contexteFr from '@/assets/lira/contexte.jpg?optimized'
import contexteEn from '@/assets/lira/contexte-EN.jpg?optimized'
import liraDemo from '@/assets/lira/lira-demo.mp4'
import liraDemoMobile from '@/assets/lira/lira-demo-mobile.mp4'
import biblioFr from '@/assets/lira/biblio.jpg?optimized'
import biblioEn from '@/assets/lira/biblio-EN.jpg?optimized'
import biblioMobileFr from '@/assets/lira/biblio-mobile.jpg?optimized'
import biblioMobileEn from '@/assets/lira/biblio-mobile-EN.jpg?optimized'
import persona1Fr from '@/assets/lira/persona-01.jpg?optimized&w=1920;2560;3200&quality=92'
import persona1En from '@/assets/lira/persona-01-EN.jpg?optimized&w=1920;2560;3200&quality=92'
import persona2Fr from '@/assets/lira/persona-02.jpg?optimized&w=1920;2560;3200&quality=92'
import persona2En from '@/assets/lira/persona-02-EN.jpg?optimized&w=1920;2560;3200&quality=92'
import persona3Fr from '@/assets/lira/persona-03.jpg?optimized&w=1920;2560;3200&quality=92'
import persona3En from '@/assets/lira/persona-03-EN.jpg?optimized&w=1920;2560;3200&quality=92'
import reader1Fr from '@/assets/lira/reader-large.jpg?optimized'
import reader1En from '@/assets/lira/reader-large-EN.jpg?optimized'
import reader2MobileFr from '@/assets/lira/reader-mobile-mobile.jpg?optimized'
import reader2MobileEn from '@/assets/lira/reader-mobile-mobile-EN.jpg?optimized'
import reader3MobileFr from '@/assets/lira/reader-definitions-mobile.jpg?optimized'
import reader3MobileEn from '@/assets/lira/reader-définitions-mobile-EN.jpg?optimized'
import reader2Fr from '@/assets/lira/reader-definitions.jpg?optimized'
import reader2En from '@/assets/lira/reader-définitions-EN.jpg?optimized'
import reader3Fr from '@/assets/lira/reader-mobile.jpg?optimized'
import reader3En from '@/assets/lira/reader-mobile-EN.jpg?optimized'
import entretiensMobile from '@/assets/talkie/mobile-entr.jpg?optimized'
import fonctionsMobile from '@/assets/talkie/mobile-fonctions.jpg?optimized'
import crossFr from '@/assets/lira/crossword.jpg?optimized'
import crossEn from '@/assets/lira/crossword-EN.jpg?optimized'
import statsFr from '@/assets/lira/stats.jpg?optimized'
import statsEn from '@/assets/lira/stats-EN.jpg?optimized'
import statsMobileFr from '@/assets/lira/stats-mobile.jpg?optimized'
import statsMobileEn from '@/assets/lira/stats-mobile-EN.jpg?optimized'
import quizFr from '@/assets/lira/revision.jpg?optimized'
import quizEn from '@/assets/lira/revision-EN.jpg?optimized'
import quizMobileFr from '@/assets/lira/revision-mobile.jpg?optimized'
import quizMobileEn from '@/assets/lira/revision-mobile-EN.jpg?optimized'
import landingFr from '@/assets/lira/landing.jpg?optimized'
import landingEn from '@/assets/lira/landing-EN.jpg?optimized'
import darkFr from '@/assets/lira/dark.jpg?optimized'
import darkEn from '@/assets/lira/dark-EN.jpg?optimized'
import darkMobileFr from '@/assets/lira/dark-mobile.jpg?optimized'
import darkMobileEn from '@/assets/lira/dark-mobile-EN.jpg?optimized'
import profilFr from '@/assets/lira/profil.jpg?optimized'
import profilEn from '@/assets/lira/profil-EN.jpg?optimized'
import profilMobileFr from '@/assets/lira/profil-mobile.jpg?optimized'
import profilMobileEn from '@/assets/lira/profil-mobile-EN.jpg?optimized'

const PROJECT_ROUTE = '/projet/lira'
const { locale } = useLocale()

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: '← Retour à l’accueil',
    contextAlt: 'Contexte et enjeux',
    contextTitle: 'Contexte et enjeux',
    contextText: `Les apps d'apprentissage des langues ont toutes un angle mort différent.

Duolingo construit l'habitude mais le contenu est artificiel et le plafond B1-B2 arrive vite. Anki a l'algorithme le plus rigoureux du marché, mais préparer ses cartes prend plus de temps que les réviser. LingQ propose l'approche la plus proche de ce que je cherchais, lire du contenu authentique avec une traduction intégrée, mais l'interface reste difficile à prendre en main.

Lira a été construit pour répondre à un besoin : lire du vrai contenu, sauvegarder les mots en contexte, les réviser ensuite avec un algorithme sérieux. Pas de configuration, pas de gamification.

Le projet est en production depuis mars 2026.`,
    researchTitle: 'Recherche et positionnement',
    researchText: `La recherche s'est faite en desk research avant le lancement : Reddit (r/languagelearning, r/Anki, r/duolingo, r/busuu...), forums LingQ, reviews App Store, exports en batch de commentaires sur des vidéos YouTube. Pas d'interviews primaires à ce stade.

Ce type de source a un biais évident : les utilisateurs qui postent sont plus frustrés que la moyenne. J'en ai tenu compte.

Ce qui ressort : le passage B1-B2 est la zone de blocage la plus décrite. Les utilisateurs avancés convergent naturellement vers la lecture, ce n'est pas un besoin à créer. Un besoin de vocabulaire ciblé par domaine ou contexte ressort aussi clairement. La création manuelle de cartes Anki est souvent citée comme raison d'abandon.

J'ai construit trois proto-personas depuis ces données : le polyglotte qui connaît le FSRS et veut zéro friction, l'expatrié qui veut lire la presse locale sans perdre le fil de sa lecture, et celui qui a des mois de streak Duolingo mais ne sent plus de progression.`,
    readerTitle: 'Le reader',
    readerText: `Le reader est la partie centrale du projet. L'objectif était que la lecture reste l'activité principale, pas la traduction.

Un clic sur un mot affiche un panneau : deux onglets : traduction et définition. L'utilisateur voit la phonétique, peut lancer une prononciation audio de l'expression ou du mot via un algorithme local de synthèse vocale (PiperTTS). Sans changer de page, sans perdre le fil du texte. Un clic de plus pour sauvegarder. La carte FSRS est générée automatiquement avec la phrase source comme contexte de mémorisation.`,
    libraryAlt: 'Bibliothèque',
    libraryTitle: 'Bibliothèque et import',
    libraryText: `L'import accepte une URL, un texte, un EPUB ou un PDF. L'utilisateur lit ce qu'il veut, sans bibliothèque imposée.

Pour ceux qui cherchent un point de départ, Lira intègre Project Gutenberg : plusieurs milliers de livres du domaine public, directement dans l'app. Romans, nouvelles, essais en espagnol, allemand, anglais, italien et d'autres langues.

Les textes importés et les livres Gutenberg s'organisent dans la même bibliothèque personnelle. Chaque texte affiche la progression de lecture et le nombre de mots sauvegardés.`,
    reviewTitle: 'Révision et mots croisés',
    reviewText: `La révision utilise le FSRS avec un rappel contextuel : l'utilisateur doit retrouver la traduction ou le mot original selon le mode. Un indice est proposé si l'utilisateur ne trouve pas la réponse : la phrase originale dont il est provient afin d'apporter du contexte. La mémorisation passe par le mot isolé mais aussi le contexte.

Après quelques minutes de lecture et au moins 3 mots sauvegardés, un mini-quiz apparaît sur les mots de la session en cours. Court, optionnel.

Les mots croisés sont générés depuis le vocabulaire personnel. Une façon de réviser différente du format flashcard, pour les sessions où l'on veut changer de registre.`,
    designTitle: 'Design',
    designText: `La police de lecture est Literata, une serif taillée pour les longs textes sur écran. L'interface utilise Satoshi. Le fond est un blanc cassé chaud plutôt qu'un blanc neutre. Deux couleurs : un vert forêt pour les actions et la marque, un brun foncé pour le texte.

Pas de streaks, pas de notifications de pression, pas de classements. La progression est personnelle.

Le dark mode reprend les mêmes tokens avec un fond très sombre et le vert adapté au contraste.`,
    revisionAlt1: 'Mots croisés',
    revisionAlt2: 'Flashcards en quiz',
    revisionAlt3: 'Statistiques',
    designAlt2: 'Dark mode',
    designAlt3: 'Profil et paramètres',
    readerAlt1: 'Persona: polyglotte',
    readerAlt2: "Persona: travaille à l'étranger",
    readerAlt3: 'Persona: Duolingo 559 daily streaks'
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Context and challenges',
    contextTitle: 'Context and challenges',
    contextText: `Language-learning apps each have their own blind spot.

Duolingo builds habits but its content is artificial, and most learners hit a B1-B2 ceiling quickly. Anki has one of the most rigorous algorithms on the market, but preparing cards often takes longer than reviewing them. LingQ is closer to what I wanted, reading real content with integrated translation, but the interface remains hard to navigate.

Lira was built to solve a simple need : read real content, save words in context, and review them with a serious algorithm. No complex setup, no gamification.

The product has been live since March 2026.`,
    researchTitle: 'Research and positioning',
    researchText: `Research was run as desk research before launch : Reddit (r/languagelearning, r/Anki, r/duolingo, r/busuu...), LingQ forums, App Store reviews, and batch exports of YouTube comments. No primary interviews at this stage.

This data has an obvious bias : users who post are often more frustrated than average.

Main insight : the B1-B2 transition is the most commonly reported plateau. Advanced learners naturally move toward reading, this is not a need you create. A strong need for domain-specific vocabulary also appeared clearly. Manual Anki card creation is often cited as a dropout reason.

From this data, I built three proto-personas : a polyglot familiar with FSRS (a Free Spaced Repetition Scheduler algorithm) who wants zero friction, an expat who wants to read local news without breaking the reading flow, and a long-term Duolingo user with a big streak but no real sense of progress.`,
    readerTitle: 'Reader',
    readerText: `The reader is the core of the product. The objective was to keep reading as the main activity, not translation.

Clicking a word opens a panel with two tabs : translation and definition (beta). The user sees phonetics and can trigger audio pronunciation for a word or expression using local Text-to-Speech (PiperTTS). No page switch, no loss of reading flow. One more click saves the word. FSRS cards are generated automatically using the original sentence as memory context.`,
    libraryAlt: 'Library',
    libraryTitle: 'Library and import',
    libraryText: `Import accepts a URL, plain text, EPUB, or PDF. Users read what they want, with no imposed catalog.

For people who want a starting point, Lira integrates Project Gutenberg: some public-domain books directly available in the app, including novels, short stories, and essays in Spanish, German, English, Italian, and more.

Imported texts and Gutenberg books live in the same personal library. Each text shows reading progress and saved-word count.`,
    reviewTitle: 'Review and crosswords',
    reviewText: `Review uses FSRS with contextual recall : the learner needs to translate the word (or the original word if he switched languages). If he can't manage to find it, he can see the original context where the word if from. Memorization happens through both isolated words and sentence context.

After a few minutes of reading and at least three saved words, a short optional mini-quiz appears for words from the current session.

Crosswords are generated from personal vocabulary. It gives users an alternative review format to classic flashcards.`,
    designTitle: 'Design',
    designText: `Reading uses Literata, a serif tuned for long-form screen reading. The interface uses Satoshi. The background is a warm off-white instead of neutral white. Two core colors : a forest green for actions and brand, and a dark brown for text.

No streaks, no pressure notifications, no leaderboards. Progress stays personal.

Dark mode reuses the same tokens with a very dark background and contrast-safe green values.`,
    revisionAlt1: 'Crosswords',
    revisionAlt2: 'Flashcard quiz',
    revisionAlt3: 'Statistics',
    designAlt2: 'Dark mode',
    designAlt3: 'Profile and settings',
    readerAlt1: 'Persona: polyglot',
    readerAlt2: 'Persona: works abroad',
    readerAlt3: 'Persona: Duolingo 559 daily streaks'
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)
const isEnglishLocale = computed(() => locale.value === 'en')
const localizedImage = (frImage, enImage) => (isEnglishLocale.value ? enImage ?? frImage : frImage)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const revision = computed(() => [
  { src: localizedImage(crossFr, crossEn), alt: pageContent.value.revisionAlt1 },
  {
    src: localizedImage(quizFr, quizEn),
    mobileSrc: localizedImage(quizMobileFr, quizMobileEn),
    alt: pageContent.value.revisionAlt2
  },
  {
    src: localizedImage(statsFr, statsEn),
    mobileSrc: localizedImage(statsMobileFr, statsMobileEn),
    alt: pageContent.value.revisionAlt3
  }
])

const design = computed(() => [
  { src: localizedImage(landingFr, landingEn), alt: 'Landing page' },
  {
    src: localizedImage(darkFr, darkEn),
    mobileSrc: localizedImage(darkMobileFr, darkMobileEn),
    alt: pageContent.value.designAlt2
  },
  {
    src: localizedImage(profilFr, profilEn),
    mobileSrc: localizedImage(profilMobileFr, profilMobileEn),
    alt: pageContent.value.designAlt3
  }
])

const reader = computed(() => [
  { src: localizedImage(reader1Fr, reader1En), alt: pageContent.value.readerAlt1 },
  {
    src: localizedImage(reader2Fr, reader2En),
    mobileSrc: localizedImage(reader2MobileFr, reader2MobileEn),
    alt: pageContent.value.readerAlt2
  },
  {
    src: localizedImage(reader3Fr, reader3En),
    mobileSrc: localizedImage(reader3MobileFr, reader3MobileEn),
    alt: pageContent.value.readerAlt3
  }
])

const rechercheUX = computed(() => [
  { src: localizedImage(persona1Fr, persona1En), alt: pageContent.value.readerAlt1 },
  { src: localizedImage(persona2Fr, persona2En), alt: pageContent.value.readerAlt2 },
  { src: localizedImage(persona3Fr, persona3En), alt: pageContent.value.readerAlt3 }
])

const contexte = computed(() => localizedImage(contexteFr, contexteEn))
const biblio = computed(() => localizedImage(biblioFr, biblioEn))
const biblioMobile = computed(() => localizedImage(biblioMobileFr, biblioMobileEn))

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
