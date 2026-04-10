<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src=contexte :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle"
      :text="pageContent.contextText" />

    <GridScrollLayout :images="rechercheUX" :title="pageContent.researchTitle" :text="pageContent.researchText" />

    <ImageFullWidthLayout :image-src=flows :image-mobile-src=flowsMobile secondary :image-alt="pageContent.archAlt"
      :title="pageContent.archTitle" :text="pageContent.archText" />

    <GridScrollLayout :images=uiGridImages :title="pageContent.uiTitle" :text="pageContent.uiText" />

    <ColumnTextLayout :image-src=designsystem :image-alt="pageContent.dsAlt" :title="pageContent.dsTitle"
      :text="pageContent.dsText" />

    <ColumnTextLayout :image-src=tests :image-alt="pageContent.testsAlt" :title="pageContent.testsTitle"
      :text="pageContent.testsText" />
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

import projectBackground from '@/assets/talkie/banner.jpg?optimized'
import contexte from '@/assets/talkie/contexte.jpg?optimized'
import flows from '@/assets/talkie/flows.jpg?optimized'
import flowsMobile from '@/assets/talkie/mobile-flows.jpg?optimized'
import designsystemFr from '@/assets/talkie/designsystem.jpg?optimized'
import designsystemEn from '@/assets/talkie/designsystem-EN.jpg?optimized'
import apprentissage from '@/assets/talkie/apprentissage.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import quiz from '@/assets/talkie/quiz.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import duels from '@/assets/talkie/duels.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import testsFr from '@/assets/talkie/tests.jpg?optimized'
import testsEn from '@/assets/talkie/tests-EN.jpg?optimized'

import personaFr from '@/assets/talkie/per.jpg?optimized'
import personaEn from '@/assets/talkie/per-EN.jpg?optimized'
import entretiensFr from '@/assets/talkie/entr.jpg?optimized'
import entretiensEn from '@/assets/talkie/entr-EN.jpg?optimized'
import entretiensMobile from '@/assets/talkie/mobile-entr.jpg?optimized'
import fonctionsFr from '@/assets/talkie/fonctions.jpg?optimized'
import fonctionsEn from '@/assets/talkie/fonctions-EN.jpg?optimized'
import fonctionsMobile from '@/assets/talkie/mobile-fonctions.jpg?optimized'

const PROJECT_ROUTE = '/projet/talkie'
const { locale } = useLocale()

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: '← Retour à l’accueil',
    contextAlt: 'Contexte et enjeux',
    contextTitle: 'Contexte et enjeux',
    contextText:
      "Les apps d'apprentissage les plus populaires ont un problème que leurs métriques ne montrent pas : les utilisateurs les ouvrent tous les jours, mais n'apprennent pas vraiment. Duolingo s'est progressivement transformé en app de divertissement. Les streaks, les notifications, la pression sociale sont là pour la rétention, pas pour l'acquisition. C'est ce que les entretiens ont confirmé. On voulait partir d'une contrainte différente : est-ce qu'on peut concevoir une app où la progression est réellement visible, et où les situations d'entraînement ressemblent à quelque chose ?",
    researchTitle: 'Recherche utilisateur',
    researchText: `Trois entretiens semi-directifs de 30 minutes, avec des utilisateurs actifs d'apps concurrentes.

Le premier utilise Duolingo pour apprendre l'espagnol avant un voyage. Il bute sur la progression : impossible de sauter les notions déjà maîtrisées, et il confond régulièrement des mots similaires d'une langue à l'autre. L'app n'en tient pas compte.

Le second utilise MemRise dans un cadre pro. Ce qui l'a fait décrocher : les exercices sont trop simples pour son niveau, la répétition est mécanique, et il ne voit pas où il en est.

Le dernier ne peut pas cibler son apprentissage selon son domaine métier. Tout le vocabulaire est généraliste, peu importe ses besoins.

Les trois avaient la même situation de départ : ils voulaient apprendre. Le problème n'était pas la motivation. Aucune des apps ne leur donnait le sentiment de vraiment progresser.`,
    archAlt: 'Architecture et parcours',
    archTitle: 'Architecture et parcours',
    archText:
      "L'expérience est structurée autour de cinq zones : Accueil, Apprendre, Quiz, Quêtes et Profil. Nous avons conçu des parcours fluides pour le duel, les quiz thématiques et l'apprentissage guidé, en garantissant une navigation claire.",
    uiTitle: 'Conception UI',
    uiText: `L'UI a été conçue pour simplifier la diversité des formats (cours, quiz, duels, quêtes) grâce à des patterns réutilisables : cartes de contenus, blocs de progression, modules de quiz et header cohérent.

La hiérarchie d'information a été pensée pour être immédiate : titres clairs, actions primaires visibles, actions secondaires accessibles sans distraire.

Les feedbacks (réponses, progression, score) jouent un rôle central pour soutenir la dimension gamifiée et garder l'utilisateur engagé.
L'ensemble vise une interface prévisible et fluide, où chaque écran reprend les mêmes logiques pour réduire la charge cognitive.`,
    dsAlt: 'Design system',
    dsTitle: 'Design system',
    dsText:
      "Le projet couvre cinq sections (Accueil, Apprendre, Quiz, Quêtes, Profil) développées en parallèle par deux designers. Sans référentiel commun, les sections auraient divergé. On a construit un design system complet : tokens, fondations, composants documentés par usage, templates et documentation publiée sur Zeroheight, synchronisée depuis Figma.",
    testsAlt: 'Tests utilisateurs',
    testsTitle: 'Tests utilisateurs',
    testsText: `Tests réalisés avec 3 participants sur deux parcours distincts.

Les deux parcours ont été complétés à 100 %. La navigation était fluide, personne ne s'est perdu.

Les tests ont quand même révélé des problèmes précis. Sur le parcours quiz : confusion devant les "réponses connues" affichées dès le premier écran alors que l'utilisateur n'avait pas encore joué, et impossibilité d'inviter plusieurs amis. Sur le parcours Apprendre : boutons non cliquables dans le prototype, absence de titre de page, pas de moyen de quitter puis reprendre un cours.

Ce qui a changé : clarification de l'écran initial du quiz, récapitulatif de fin de partie revu, états manquants ajoutés.`,
    uiAlt1: 'Lessons',
    uiAlt2: 'Solo quizzes',
    uiAlt3: 'Player duels',
    uxAlt2: 'Interviews',
    uxAlt3: 'Features'
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Context and challenges',
    contextTitle: 'Context and challenges',
    contextText:
      "Popular language-learning apps share a problem their metrics usually hide: users open them daily, but do not necessarily learn effectively. Duolingo gradually shifted toward entertainment. Streaks, notifications, and social pressure optimize retention, not acquisition. Interviews confirmed this. We started from a different constraint: can we design an app where progress is truly visible and training situations feel realistic?",
    researchTitle: 'User research',
    researchText: `Three 30-minute semi-structured interviews with active users of competing apps.

The first one uses Duolingo to learn Spanish before traveling. His frustration: no way to skip already mastered concepts, and frequent confusion between similar words across languages.

The second uses MemRise for work. He dropped off because exercises were too easy for his level, repetition felt mechanical, and progress tracking was unclear.

The last one targets learning around job-specific vocabulary. Everything stays generic regardless of real needs.

All three had the same starting point: they wanted to learn. Motivation was not the issue. None of the apps made them feel real progress.`,
    archAlt: 'Architecture and flows',
    archTitle: 'Architecture and flows',
    archText:
      'The experience is structured around five areas: Home, Learn, Quiz, Quests, and Profile. We designed fluid paths for duels, themed quizzes, and guided learning while keeping navigation clear.',
    uiTitle: 'UI design',
    uiText: `The UI was designed to simplify multiple formats (lessons, quizzes, duels, quests) through reusable patterns: content cards, progress blocks, quiz modules, and a consistent header.

Information hierarchy was built for immediacy: clear titles, visible primary actions, and accessible secondary actions without distraction.

Feedback (answers, progress, score) is central to support the gamified layer and keep users engaged.
The whole product aims for a predictable and fluid interface where each screen reuses the same logic to reduce cognitive load.`,
    dsAlt: 'Design system',
    dsTitle: 'Design system',
    dsText:
      'The project covered five sections (Home, Learn, Quiz, Quests, Profile) developed in parallel by two designers. Without a shared foundation, sections would diverge. We built a complete design system: tokens, foundations, documented components by usage, templates, and documentation published on Zeroheight and synced from Figma.',
    testsAlt: 'User testing',
    testsTitle: 'User testing',
    testsText: `Tests were run with 3 participants across two distinct flows.

Both flows were completed with a 100% success rate. Navigation was fluid and nobody got lost.

However, testing surfaced specific issues. In the quiz flow: confusion about "known answers" displayed on the first screen before playing, and inability to invite multiple friends. In the Learn flow: non-clickable buttons in the prototype, missing page title, and no way to exit then resume a lesson.

What changed: clarified initial quiz screen, redesigned end-of-game summary, and added missing states.`,
    uiAlt1: 'Lessons',
    uiAlt2: 'Solo quizzes',
    uiAlt3: 'Player duels',
    uxAlt2: 'Interviews',
    uxAlt3: 'Features'
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)
const isEnglishLocale = computed(() => locale.value === 'en')
const localizedImage = (frImage, enImage) => (isEnglishLocale.value ? enImage ?? frImage : frImage)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const uiGridImages = computed(() => [
  { src: apprentissage, alt: pageContent.value.uiAlt1 },
  { src: quiz, alt: pageContent.value.uiAlt2 },
  { src: duels, alt: pageContent.value.uiAlt3 }
])

const rechercheUX = computed(() => [
  { src: localizedImage(personaFr, personaEn), alt: "Persona" },
  {
    src: localizedImage(entretiensFr, entretiensEn),
    mobileSrc: entretiensMobile,
    alt: pageContent.value.uxAlt2
  },
  {
    src: localizedImage(fonctionsFr, fonctionsEn),
    mobileSrc: fonctionsMobile,
    alt: pageContent.value.uxAlt3
  }
])

const designsystem = computed(() => localizedImage(designsystemFr, designsystemEn))
const tests = computed(() => localizedImage(testsFr, testsEn))

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
