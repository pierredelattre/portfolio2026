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

import projectBackground from '@/assets/mba/mba-banner.jpg'

import contexteFr from '@/assets/mba/mba-contexte-contraintes.jpg'
import contexteFrWebp from '@/assets/mba/mba-contexte-contraintes.webp'
import contexteEn from '@/assets/mba/en-mba-contexte-contraintes.jpg'
import contexteEnWebp from '@/assets/mba/en-mba-contexte-contraintes.webp'
import contexteMobileFr from '@/assets/mba/mobile-mba-contexte-contraintes.jpg'
import contexteMobileFrWebp from '@/assets/mba/mobile-mba-contexte-contraintes.webp'
import contexteMobileEn from '@/assets/mba/en-mobile-mba-contexte-contraintes.jpg'
import contexteMobileEnWebp from '@/assets/mba/en-mobile-mba-contexte-contraintes.webp'

import cadrageFr from '@/assets/mba/mba-cadrage.jpg'
import cadrageFrWebp from '@/assets/mba/mba-cadrage.webp'
import cadrageEn from '@/assets/mba/en-mba-cadrage.jpg'
import cadrageEnWebp from '@/assets/mba/en-mba-cadrage.webp'
import cadrageMobileFr from '@/assets/mba/mobile-mba-cadrage.jpg'
import cadrageMobileFrWebp from '@/assets/mba/mobile-mba-cadrage.webp'
import cadrageMobileEn from '@/assets/mba/en-mobile-mba-cadrage.jpg'
import cadrageMobileEnWebp from '@/assets/mba/en-mobile-mba-cadrage.webp'

import frictionsFr from '@/assets/mba/mba-frictions.jpg'
import frictionsFrWebp from '@/assets/mba/mba-frictions.webp'
import frictionsEn from '@/assets/mba/en-mba-frictions.jpg'
import frictionsEnWebp from '@/assets/mba/en-mba-frictions.webp'
import frictionsMobileFr from '@/assets/mba/mobile-mba-frictions.jpg'
import frictionsMobileFrWebp from '@/assets/mba/mobile-mba-frictions.webp'
import frictionsMobileEn from '@/assets/mba/en-mobile-mba-frictions.jpg'
import frictionsMobileEnWebp from '@/assets/mba/en-mobile-mba-frictions.webp'

import personasFr from '@/assets/mba/mba-personas.jpg'
import personasFrWebp from '@/assets/mba/mba-personas.webp'
import personasEn from '@/assets/mba/en-mba-personas.jpg'
import personasEnWebp from '@/assets/mba/en-mba-personas.webp'
import personasMobileFr from '@/assets/mba/mobile-mba-personas.jpg'
import personasMobileFrWebp from '@/assets/mba/mobile-mba-personas.webp'
import personasMobileEn from '@/assets/mba/en-mobile-mba-personas.jpg'
import personasMobileEnWebp from '@/assets/mba/en-mobile-mba-personas.webp'

import principesFr from '@/assets/mba/mba-principes.jpg'
import principesFrWebp from '@/assets/mba/mba-principes.webp'
import principesEn from '@/assets/mba/en-mba-principes.jpg'
import principesEnWebp from '@/assets/mba/en-mba-principes.webp'
import principesMobileFr from '@/assets/mba/mobile-mba-principes.jpg'
import principesMobileFrWebp from '@/assets/mba/mobile-mba-principes.webp'
import principesMobileEn from '@/assets/mba/en-mobile-mba-principes.jpg'
import principesMobileEnWebp from '@/assets/mba/en-mobile-mba-principes.webp'

import priorisationFr from '@/assets/mba/mba-priorisation.jpg'
import priorisationFrWebp from '@/assets/mba/mba-priorisation.webp'
import priorisationEn from '@/assets/mba/en-mba-priorisation.jpg'
import priorisationEnWebp from '@/assets/mba/en-mba-priorisation.webp'
import priorisationMobileFr from '@/assets/mba/mobile-mba-priorisation.jpg'
import priorisationMobileFrWebp from '@/assets/mba/mobile-mba-priorisation.webp'
import priorisationMobileEn from '@/assets/mba/en-mobile-mba-priorisation.jpg'
import priorisationMobileEnWebp from '@/assets/mba/en-mobile-mba-priorisation.webp'

import arboFr from '@/assets/mba/mba-arbo.jpg'
import arboFrWebp from '@/assets/mba/mba-arbo.webp'
import arboEn from '@/assets/mba/en-mba-arbo.jpg'
import arboEnWebp from '@/assets/mba/en-mba-arbo.webp'
import arboMobileFr from '@/assets/mba/mobile-mba-arbo.jpg'
import arboMobileFrWebp from '@/assets/mba/mobile-mba-arbo.webp'
import arboMobileEn from '@/assets/mba/en-mobile-mba-arbo.jpg'
import arboMobileEnWebp from '@/assets/mba/en-mobile-mba-arbo.webp'

import roadmapFr from '@/assets/mba/mba-roadmap.jpg'
import roadmapFrWebp from '@/assets/mba/mba-roadmap.webp'
import roadmapEn from '@/assets/mba/en-mba-roadmap.jpg'
import roadmapEnWebp from '@/assets/mba/en-mba-roadmap.webp'
import roadmapMobileFr from '@/assets/mba/mobile-mba-roadmap.jpg'
import roadmapMobileFrWebp from '@/assets/mba/mobile-mba-roadmap.webp'
import roadmapMobileEn from '@/assets/mba/en-mobile-mba-roadmap.jpg'
import roadmapMobileEnWebp from '@/assets/mba/en-mobile-mba-roadmap.webp'

import impactFr from '@/assets/mba/mba-impact.jpg'
import impactFrWebp from '@/assets/mba/mba-impact.webp'
import impactEn from '@/assets/mba/en-mba-impact.jpg'
import impactEnWebp from '@/assets/mba/en-mba-impact.webp'
import impactMobileFr from '@/assets/mba/mobile-mba-impact.jpg'
import impactMobileFrWebp from '@/assets/mba/mobile-mba-impact.webp'
import impactMobileEn from '@/assets/mba/en-mobile-mba-impact.jpg'
import impactMobileEnWebp from '@/assets/mba/en-mobile-mba-impact.webp'

const PROJECT_ROUTE = '/projet/my-business-academy'
const { locale } = useLocale()
const isEnglishLocale = computed(() => locale.value === 'en')
const createPictureSource = (webpSrc, jpgSrc) => ({
  sources: {
    webp: webpSrc
  },
  img: {
    src: jpgSrc
  }
})
const localizedPicture = (frWebp, frJpg, enWebp, enJpg) =>
  isEnglishLocale.value
    ? createPictureSource(enWebp ?? frWebp, enJpg ?? frJpg)
    : createPictureSource(frWebp, frJpg)

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: "← Retour à l'accueil",
    contextAlt: 'Contexte',
    contextTitle: 'Contexte',
    contextText: `My Business Academy est un organisme de formation français certifié Qualiopi. J'ai pris en charge la phase stratégique avant toute production visuelle, en partant des utilisateurs.

L'enjeu principal : aligner acquisition SEO, réassurance, lisibilité des parcours et gouvernance du contenu.

Les livrables alimentent aussi une base de connaissance interne pour la documentation entreprise et les usages IA.`,
    discoveryTitle: 'Cadrage et recherche exploratoire',
    discoveryText: `J'ai structuré le cadrage depuis les besoins utilisateurs plutôt que depuis des demandes d'interface. Trois priorités ont émergé : rendre l'offre lisible rapidement, réduire la friction de contact, installer la confiance tôt.

La recherche a porté sur six concurrents directs : audit des parcours clés, analyse UX/SEO, signaux de réassurance, benchmark tarifaire et ateliers avec les parties prenantes.

Trois points ont retenu mon attention : les parcours performants partent d'une intention explicite, le financement arrive trop tard dans la plupart des expériences, et les faiblesses récurrentes (navigation confuse, tarifs opaques, accessibilité incomplète) représentent une vraie opportunité.`,
    needsAlt: 'Synthèse des besoins utilisateurs',
    needsTitle: 'Besoins utilisateurs et personas',
    needsText: `Quatre proto-personas : reconversion, salarié en évolution, porteur de projet, employeur/RH.

Besoin commun : décider vite, sans zone d'ombre. Ça se traduit par une information scannable, une hiérarchie claire et une réassurance distribuée dans tout le parcours.

J'ai écarté l'approche catalogue complet dès l'entrée : trop coûteuse cognitivement, elle ralentit la décision.`,
    uxTitle: 'Principes UX et priorisation',
    uxText: `Principes retenus : clarté avant densité, réassurance continue, mobile d'abord, accessibilité par défaut, gouvernance éditoriale.

Parcours principal : accueil -> catégories -> fiches formation -> contact.

J'ai préféré une production page par page, pour préserver la cohérence et la qualité de passation.`,
    archAlt: "Architecture de l'information",
    archTitle: "Architecture de l'information",
    archText: `Hiérarchie claire : accueil -> catalogue -> catégories -> fiches formation, avec des pages transverses pour le financement, l'organisme, le contact et les mentions légales.

Deux parcours clés : reconversion (recherche -> fiche -> financement -> contact) et employeur (preuve de conformité -> offre ciblée -> demande).

La personnalisation est pragmatique : préremplissage contextuel, appels à l'action adaptés à l'intention, formulations orientées situation.`,
    roadmapAlt: 'Roadmap et prochaines étapes',
    roadmapTitle: 'Roadmap et prochaines étapes',
    roadmapText: `Le socle est posé : cadrage, recherche, architecture, principes UX, gouvernance.

Prochaine étape : maquettes, passation front, première version instrumentée, puis itérations sur signaux réels.`,
    impactAlt: 'Impact',
    impactTitle: 'Impact',
    impactText: `Indicateurs prévus :
- taux de conversion visite -> demande
- temps d'accès à l'information clé
- taux de clic sur les CTA principaux
- qualité des leads
- progression dans l'entonnoir
- conformité éditoriale (SEO, RGAA)`
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Context',
    contextTitle: 'Context',
    contextText: `My Business Academy is a French training organization certified Qualiopi. I led the strategic phase before any visual production, starting from users.

Main challenge: aligning SEO acquisition, reassurance, journey clarity, and content governance.

The deliverables also feed an internal knowledge base for company documentation and AI use.`,
    discoveryTitle: 'Framing and exploratory research',
    discoveryText: `I structured the framing from user needs, not from interface requests. Three priorities emerged: make the offer quickly understandable, reduce contact friction, build trust early.

Research covered six direct competitors: key journey audits, UX/SEO analysis, reassurance signals, pricing benchmark, and stakeholder workshops.

Three things stood out: top-performing journeys start from explicit user intent, funding comes too late in most experiences, and recurring weaknesses (confusing navigation, opaque pricing, incomplete accessibility) represent a real opportunity.`,
    needsAlt: 'User needs synthesis',
    needsTitle: 'User needs and personas',
    needsText: `Four proto-personas: career switcher, employee in progression, entrepreneur, and employer/HR.

Shared need: decide fast, with no blind spots. That means scannable information, clear hierarchy, and reassurance distributed across the journey.

I ruled out the "full catalog first" approach: too cognitively costly, it slows decisions down.`,
    uxTitle: 'UX principles and prioritization',
    uxText: `Selected principles: clarity before density, continuous reassurance, mobile-first, accessibility by default, editorial governance.

Main journey: homepage -> category pages -> training pages -> contact.

I chose a page-by-page production over a parallel approach, to protect consistency and handoff quality.`,
    archAlt: 'Information architecture',
    archTitle: 'Information architecture',
    archText: `Clear hierarchy: home -> catalog -> categories -> training pages, with transversal pages for funding, organization, contact, and legal.

Two key journeys: career switcher (search -> training page -> funding -> contact) and employer (compliance proof -> targeted offer -> proposal request).

Personalization is pragmatic: contextual form prefill, intent-based CTAs, situation-specific wording.`,
    roadmapAlt: 'Roadmap and next steps',
    roadmapTitle: 'Roadmap and next steps',
    roadmapText: `Foundation in place: framing, research, architecture, UX principles, governance.

Next: mockups, front-end handoff, instrumented first version, then iteration on real signals.`,
    impactAlt: 'Business impact',
    impactTitle: 'Business impact',
    impactText: `Planned indicators:
- visitor-to-request conversion rate
- time to key information
- click rate on primary CTAs
- lead quality
- funnel progression
- editorial compliance (SEO, accessibility)`
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const contexteImage = computed(() => localizedPicture(contexteFrWebp, contexteFr, contexteEnWebp, contexteEn))
const contexteMobileImage = computed(() =>
  localizedPicture(contexteMobileFrWebp, contexteMobileFr, contexteMobileEnWebp, contexteMobileEn)
)

const cadrageImage = computed(() => localizedPicture(cadrageFrWebp, cadrageFr, cadrageEnWebp, cadrageEn))
const cadrageMobileImage = computed(() =>
  localizedPicture(cadrageMobileFrWebp, cadrageMobileFr, cadrageMobileEnWebp, cadrageMobileEn)
)

const needsImages = computed(() => [
  {
    src: localizedPicture(personasFrWebp, personasFr, personasEnWebp, personasEn),
    mobileSrc: localizedPicture(personasMobileFrWebp, personasMobileFr, personasMobileEnWebp, personasMobileEn),
    alt: pageContent.value.needsAlt
  },
  {
    src: localizedPicture(frictionsFrWebp, frictionsFr, frictionsEnWebp, frictionsEn),
    mobileSrc: localizedPicture(frictionsMobileFrWebp, frictionsMobileFr, frictionsMobileEnWebp, frictionsMobileEn),
    alt: pageContent.value.discoveryTitle
  }
])

const principlesImages = computed(() => [
  {
    src: localizedPicture(principesFrWebp, principesFr, principesEnWebp, principesEn),
    mobileSrc: localizedPicture(principesMobileFrWebp, principesMobileFr, principesMobileEnWebp, principesMobileEn),
    alt: pageContent.value.uxTitle
  },
  {
    src: localizedPicture(priorisationFrWebp, priorisationFr, priorisationEnWebp, priorisationEn),
    mobileSrc: localizedPicture(
      priorisationMobileFrWebp,
      priorisationMobileFr,
      priorisationMobileEnWebp,
      priorisationMobileEn
    ),
    alt: pageContent.value.uxTitle
  }
])

const roadmapImage = computed(() => localizedPicture(roadmapFrWebp, roadmapFr, roadmapEnWebp, roadmapEn))
const roadmapMobileImage = computed(() =>
  localizedPicture(roadmapMobileFrWebp, roadmapMobileFr, roadmapMobileEnWebp, roadmapMobileEn)
)

const arboImage = computed(() => localizedPicture(arboFrWebp, arboFr, arboEnWebp, arboEn))
const arboMobileImage = computed(() =>
  localizedPicture(arboMobileFrWebp, arboMobileFr, arboMobileEnWebp, arboMobileEn)
)

const impactImage = computed(() => localizedPicture(impactFrWebp, impactFr, impactEnWebp, impactEn))
const impactMobileImage = computed(() =>
  localizedPicture(impactMobileFrWebp, impactMobileFr, impactMobileEnWebp, impactMobileEn)
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
