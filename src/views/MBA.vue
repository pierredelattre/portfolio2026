<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src="contexteImage" :image-mobile-src="contexteMobileImage"
      :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle" :text="pageContent.contextText" />

    <ImageFullWidthLayout secondary :image-src="cadrageImage" :image-mobile-src="cadrageMobileImage"
      :image-alt="pageContent.discoveryTitle" :title="pageContent.discoveryTitle" :text="pageContent.discoveryText" />

    <GridScrollLayoutRows :images="needsImages" :title="pageContent.needsTitle" :text="pageContent.needsText" />

    <GridScrollLayoutRows :images="principlesImages" :title="pageContent.uxTitle" :text="pageContent.uxText" />

    <ImageFullWidthLayout secondary :image-src="arboImage" :image-mobile-src="arboMobileImage"
      :image-alt="pageContent.archAlt" :title="pageContent.archTitle" :text="pageContent.archText" />

    <ColumnTextLayout :image-src="roadmapImage" :image-mobile-src="roadmapMobileImage"
      :image-alt="pageContent.roadmapAlt" :title="pageContent.roadmapTitle" :text="pageContent.roadmapText" />

    <ColumnTextLayout :image-src="impactImage" :image-mobile-src="impactMobileImage"
      :image-alt="pageContent.impactAlt" :title="pageContent.impactTitle" :text="pageContent.impactText" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import ColumnTextLayout from '@/components/layouts/ColumnTextLayout.vue'
import ImageFullWidthLayout from '@/components/layouts/ImageFullWidthLayout.vue'
import GridScrollLayoutRows from '@/components/layouts/GridScrollLayoutRows.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { getWorksByLocale } from '@/data/content'
import { useLocale } from '@/i18n'
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/mba/mba-banner.jpg?optimized&format=webp;jpg'

import contexteFr from '@/assets/mba/mba-contexte-contraintes.jpg?optimized&format=webp;jpg'
import contexteEn from '@/assets/mba/en-mba-contexte-contraintes.jpg?optimized&format=webp;jpg'
import contexteMobileFr from '@/assets/mba/mobile-mba-contexte-contraintes.jpg?optimized&format=webp;jpg'
import contexteMobileEn from '@/assets/mba/en-mobile-mba-contexte-contraintes.jpg?optimized&format=webp;jpg'

import cadrageFr from '@/assets/mba/mba-cadrage.jpg?optimized&format=webp;jpg'
import cadrageEn from '@/assets/mba/en-mba-cadrage.jpg?optimized&format=webp;jpg'
import cadrageMobileFr from '@/assets/mba/mobile-mba-cadrage.jpg?optimized&format=webp;jpg'
import cadrageMobileEn from '@/assets/mba/en-mobile-mba-cadrage.jpg?optimized&format=webp;jpg'

import frictionsFr from '@/assets/mba/mba-frictions.jpg?optimized&format=webp;jpg'
import frictionsEn from '@/assets/mba/en-mba-frictions.jpg?optimized&format=webp;jpg'
import frictionsMobileFr from '@/assets/mba/mobile-mba-frictions.jpg?optimized&format=webp;jpg'
import frictionsMobileEn from '@/assets/mba/en-mobile-mba-frictions.jpg?optimized&format=webp;jpg'

import personasFr from '@/assets/mba/mba-personas.jpg?optimized&format=webp;jpg'
import personasEn from '@/assets/mba/en-mba-personas.jpg?optimized&format=webp;jpg'
import personasMobileFr from '@/assets/mba/mobile-mba-personas.jpg?optimized&format=webp;jpg'
import personasMobileEn from '@/assets/mba/en-mobile-mba-personas.jpg?optimized&format=webp;jpg'

import principesFr from '@/assets/mba/mba-principes.jpg?optimized&format=webp;jpg'
import principesEn from '@/assets/mba/en-mba-principes.jpg?optimized&format=webp;jpg'
import principesMobileFr from '@/assets/mba/mobile-mba-principes.jpg?optimized&format=webp;jpg'
import principesMobileEn from '@/assets/mba/en-mobile-mba-principes.jpg?optimized&format=webp;jpg'

import priorisationFr from '@/assets/mba/mba-priorisation.jpg?optimized&format=webp;jpg'
import priorisationEn from '@/assets/mba/en-mba-priorisation.jpg?optimized&format=webp;jpg'
import priorisationMobileFr from '@/assets/mba/mobile-mba-priorisation.jpg?optimized&format=webp;jpg'
import priorisationMobileEn from '@/assets/mba/en-mobile-mba-priorisation.jpg?optimized&format=webp;jpg'

import arboFr from '@/assets/mba/mba-arbo.jpg?optimized&format=webp;jpg'
import arboEn from '@/assets/mba/en-mba-arbo.jpg?optimized&format=webp;jpg'
import arboMobileFr from '@/assets/mba/mobile-mba-arbo.jpg?optimized&format=webp;jpg'
import arboMobileEn from '@/assets/mba/en-mobile-mba-arbo.jpg?optimized&format=webp;jpg'

import roadmapFr from '@/assets/mba/mba-roadmap.jpg?optimized&format=webp;jpg'
import roadmapEn from '@/assets/mba/en-mba-roadmap.jpg?optimized&format=webp;jpg'
import roadmapMobileFr from '@/assets/mba/mobile-mba-roadmap.jpg?optimized&format=webp;jpg'
import roadmapMobileEn from '@/assets/mba/en-mobile-mba-roadmap.jpg?optimized&format=webp;jpg'

import impactFr from '@/assets/mba/mba-impact.jpg?optimized&format=webp;jpg'
import impactEn from '@/assets/mba/en-mba-impact.jpg?optimized&format=webp;jpg'
import impactMobileFr from '@/assets/mba/mobile-mba-impact.jpg?optimized&format=webp;jpg'
import impactMobileEn from '@/assets/mba/en-mobile-mba-impact.jpg?optimized&format=webp;jpg'

const PROJECT_ROUTE = '/projet/mba-formations'
const { locale } = useLocale()
const isEnglishLocale = computed(() => locale.value === 'en')
const localizedImage = (frImage, enImage) => (isEnglishLocale.value ? enImage ?? frImage : frImage)

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: "← Retour à l'accueil",
    contextAlt: 'Contexte et enjeux',
    contextTitle: 'Contexte et enjeux',
    contextText: `Organisme de formation certifié Qualiopi. J'ai accompagné le cadrage pour rendre une offre complexe plus facile à comprendre et à choisir.

Le périmètre couvrait le site public et une base de connaissance interne, pensée pour documenter les choix et préparer certains usages liés à l'IA.`,
    discoveryTitle: 'Contexte business et contraintes',
    discoveryText: `Six concurrents analysés : structure des pages, signaux de réassurance, clarté des offres, accès au financement, logique de contact.

Les meilleurs parcours partent d'une intention claire. Le financement apparaît trop tard chez la plupart des acteurs, alors que c'est une des premières questions côté utilisateur.`,
    needsAlt: 'Besoins utilisateurs et personas',
    needsTitle: 'Besoins utilisateurs et personas',
    needsText: `Quatre profils : reconversion, salarié en évolution, porteur de projet, employeur ou RH. Tous ont besoin de comprendre vite s'ils sont au bon endroit.

D'où le choix de ne pas montrer le catalogue complet en entrée : trop de charge mentale, décision ralentie.`,
    uxTitle: 'Principes UX et priorisation',
    uxText: `Le parcours principal : accueil -> catégories -> fiches formation -> contact. Chaque page a un rôle précis.

J'ai conçu page par page plutôt qu'en parallèle : plus lent au départ, mais plus cohérent à livrer et plus facile à passer ensuite.`,
    archAlt: "Architecture de l'information",
    archTitle: "Architecture de l'information",
    archText: `Deux parcours de référence : la personne en reconversion, qui cherche une formation puis le financement, et l'employeur, qui a besoin de preuves avant de faire une demande.

La personnalisation est légère : formulaires préremplis selon le contexte, CTA adaptés, formulations proches de la situation de l'utilisateur.`,
    roadmapAlt: 'Roadmap et prochaines étapes',
    roadmapTitle: 'Roadmap et prochaines étapes',
    roadmapText: `Prochaines étapes : maquettes, passation front, lancement d'une première version instrumentée, puis itérations à partir de signaux réels.`,
    impactAlt: 'Cadre d’impact business',
    impactTitle: 'Cadre d’impact business',
    impactText: `J'ai défini les indicateurs avant les maquettes pour aligner les choix UX sur des signaux mesurables : conversion, time-to-info, taux de clic, qualité des leads, progression dans le funnel.`,
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Project intro',
    contextTitle: 'Project intro',
    contextText: `MBA is a Qualiopi-certified training organization. I led the framing phase to make a complex offer easier to understand and choose.

Scope covered both the public website and an internal knowledge base, designed to document decisions and prepare AI-related use cases.`,
    discoveryTitle: 'Business context and constraints',
    discoveryText: `Six competitors analyzed: page structure, reassurance signals, offer clarity, funding access, and contact logic.

Best journeys start from clear intent. Funding appears too late for most players, while it is one of users' first questions.`,
    needsAlt: 'User needs and personas',
    needsTitle: 'User needs and personas',
    needsText: `Four profiles: career switcher, employee in progression, project holder, employer or HR. All need to quickly confirm they are in the right place.

So we did not show the full catalog at entry: too much cognitive load, slower decisions.`,
    uxTitle: 'UX principles and prioritization',
    uxText: `Main journey: home -> categories -> training pages -> contact. Each page has a specific role.

I designed page by page instead of in parallel: slower at first, but more coherent to deliver and easier to hand off.`,
    archAlt: 'Information architecture',
    archTitle: 'Information architecture',
    archText: `Two reference journeys: career switcher (finds training, then funding), and employer (needs proof before making a request).

Personalization stays light: context-based prefilled forms, adapted CTAs, and wording aligned with the user's situation.`,
    roadmapAlt: 'Roadmap and next steps',
    roadmapTitle: 'Roadmap and next steps',
    roadmapText: `Next steps: mockups, front-end handoff, launch of a first instrumented version, then iterations based on real signals.`,
    impactAlt: 'Business impact framework',
    impactTitle: 'Business impact framework',
    impactText: `I defined indicators before mockups to align UX decisions with measurable signals: conversion, time-to-info, click rate, lead quality, and funnel progression.`,
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const contexteImage = computed(() => localizedImage(contexteFr, contexteEn))
const contexteMobileImage = computed(() =>
  localizedImage(contexteMobileFr, contexteMobileEn)
)

const cadrageImage = computed(() => localizedImage(cadrageFr, cadrageEn))
const cadrageMobileImage = computed(() =>
  localizedImage(cadrageMobileFr, cadrageMobileEn)
)

const needsImages = computed(() => [
  {
    src: localizedImage(personasFr, personasEn),
    mobileSrc: localizedImage(personasMobileFr, personasMobileEn),
    alt: pageContent.value.needsAlt
  },
  {
    src: localizedImage(frictionsFr, frictionsEn),
    mobileSrc: localizedImage(frictionsMobileFr, frictionsMobileEn),
    alt: pageContent.value.discoveryTitle
  }
])

const principlesImages = computed(() => [
  {
    src: localizedImage(principesFr, principesEn),
    mobileSrc: localizedImage(principesMobileFr, principesMobileEn),
    alt: pageContent.value.uxTitle
  },
  {
    src: localizedImage(priorisationFr, priorisationEn),
    mobileSrc: localizedImage(priorisationMobileFr, priorisationMobileEn),
    alt: pageContent.value.uxTitle
  }
])

const roadmapImage = computed(() => localizedImage(roadmapFr, roadmapEn))
const roadmapMobileImage = computed(() =>
  localizedImage(roadmapMobileFr, roadmapMobileEn)
)

const arboImage = computed(() => localizedImage(arboFr, arboEn))
const arboMobileImage = computed(() =>
  localizedImage(arboMobileFr, arboMobileEn)
)

const impactImage = computed(() => localizedImage(impactFr, impactEn))
const impactMobileImage = computed(() =>
  localizedImage(impactMobileFr, impactMobileEn)
)


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
