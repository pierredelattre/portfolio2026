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

import projectBackground from '@/assets/mba/mba-banner.jpg?optimized'

import contexteFr from '@/assets/mba/mba-contexte-contraintes.jpg?optimized'
import contexteEn from '@/assets/mba/en-mba-contexte-contraintes.jpg?optimized'
import contexteMobileFr from '@/assets/mba/mobile-mba-contexte-contraintes.jpg?optimized'
import contexteMobileEn from '@/assets/mba/en-mobile-mba-contexte-contraintes.jpg?optimized'

import cadrageFr from '@/assets/mba/mba-cadrage.jpg?optimized'
import cadrageEn from '@/assets/mba/en-mba-cadrage.jpg?optimized'
import cadrageMobileFr from '@/assets/mba/mobile-mba-cadrage.jpg?optimized'
import cadrageMobileEn from '@/assets/mba/en-mobile-mba-cadrage.jpg?optimized'

import frictionsFr from '@/assets/mba/mba-frictions.jpg?optimized'
import frictionsEn from '@/assets/mba/en-mba-frictions.jpg?optimized'
import frictionsMobileFr from '@/assets/mba/mobile-mba-frictions.jpg?optimized'
import frictionsMobileEn from '@/assets/mba/en-mobile-mba-frictions.jpg?optimized'

import personasFr from '@/assets/mba/mba-personas.jpg?optimized'
import personasEn from '@/assets/mba/en-mba-personas.jpg?optimized'
import personasMobileFr from '@/assets/mba/mobile-mba-personas.jpg?optimized'
import personasMobileEn from '@/assets/mba/en-mobile-mba-personas.jpg?optimized'

import principesFr from '@/assets/mba/mba-principes.jpg?optimized'
import principesEn from '@/assets/mba/en-mba-principes.jpg?optimized'
import principesMobileFr from '@/assets/mba/mobile-mba-principes.jpg?optimized'
import principesMobileEn from '@/assets/mba/en-mobile-mba-principes.jpg?optimized'

import priorisationFr from '@/assets/mba/mba-priorisation.jpg?optimized'
import priorisationEn from '@/assets/mba/en-mba-priorisation.jpg?optimized'
import priorisationMobileFr from '@/assets/mba/mobile-mba-priorisation.jpg?optimized'
import priorisationMobileEn from '@/assets/mba/en-mobile-mba-priorisation.jpg?optimized'

import arboFr from '@/assets/mba/mba-arbo.jpg?optimized'
import arboEn from '@/assets/mba/en-mba-arbo.jpg?optimized'
import arboMobileFr from '@/assets/mba/mobile-mba-arbo.jpg?optimized'
import arboMobileEn from '@/assets/mba/en-mobile-mba-arbo.jpg?optimized'

import roadmapFr from '@/assets/mba/mba-roadmap.jpg?optimized'
import roadmapEn from '@/assets/mba/en-mba-roadmap.jpg?optimized'
import roadmapMobileFr from '@/assets/mba/mobile-mba-roadmap.jpg?optimized'
import roadmapMobileEn from '@/assets/mba/en-mobile-mba-roadmap.jpg?optimized'

import impactFr from '@/assets/mba/mba-impact.jpg?optimized'
import impactEn from '@/assets/mba/en-mba-impact.jpg?optimized'
import impactMobileFr from '@/assets/mba/mobile-mba-impact.jpg?optimized'
import impactMobileEn from '@/assets/mba/en-mobile-mba-impact.jpg?optimized'

const PROJECT_ROUTE = '/projet/my-business-academy'
const { locale } = useLocale()
const isEnglishLocale = computed(() => locale.value === 'en')
const localizedImage = (frImage, enImage) => (isEnglishLocale.value ? enImage ?? frImage : frImage)

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: "← Retour à l'accueil",
    contextAlt: 'Contexte business et contraintes',
    contextTitle: 'Contexte business et contraintes',
    contextText: `My Business Academy est un projet de création d'une plateforme pour un organisme de formation français certifié Qualiopi.

J'ai réalisé la phase stratégique en cadrant les enjeux avant la production visuelle, avec une approche centrée utilisateurs. La contrainte principale était d'aligner acquisition SEO, réassurance, lisibilité des parcours et maintenabilité du contenu.

Les livrables alimentent aussi une base de connaissance interne, à partir de contenus publics et de documents internes, pour la documentation interne et les usages IA.`,
    discoveryTitle: 'Cadrage, recueil des besoins et recherche exploratoire',
    discoveryText: `J'ai structuré le cadrage en partant du besoin utilisateur, puis en transformant les informations métier en contenus actionnables et en parcours concrets à implémenter.

Le recueil des besoins a été mené à partir des décisions produit à prendre, et non de demandes d'interface isolées. Trois besoins se sont imposés : rendre l'offre compréhensible rapidement, réduire la friction de contact, et installer la confiance tôt dans le parcours.

J'ai alors mené une recherche exploratoire sur six concurrents directs en combinant plusieurs méthodes : audit des parcours clés (découverte, fiche formation, financement, contact), analyse concurrentielle UX/SEO, revue des signaux de réassurance (Qualiopi, preuves, conformité), benchmark de lisibilité tarifaire, et synthèse des besoins via ateliers avec les parties prenantes (atelier de cadrage, priorisation des parcours, validation des contenus clés).

Cette analyse m'a permis d'identifier trois points structurants : les parcours les plus performants partent d'une intention utilisateur explicite, la question du financement arrive souvent trop tard dans l'expérience, et les faiblesses récurrentes (navigation confuse, manque de preuve, accessibilité incomplète, tarifs opaques) créent une opportunité de différenciation nette.`,
    needsAlt: 'Synthèse des besoins utilisateurs',
    needsTitle: 'Synthèse des besoins utilisateurs et personas',
    needsText: `J'ai construit des proto-personas opérationnels : reconversion, salarié en évolution, porteur de projet, employeur/RH.

Le besoin transversal était constant : décider vite sans zone d'ombre. Cela implique une information scannable, une hiérarchie claire, des appels à l'action explicites et une réassurance répartie dans tout le parcours.

J'ai écarté l'approche « catalogue complet dès l'entrée », qui augmente la charge cognitive et ralentit la décision.`,
    uxTitle: 'Principes UX et priorisation',
    uxText: `Principes retenus : clarté avant densité, réassurance continue, mobile en priorité, accessibilité par défaut et gouvernance éditoriale explicite.

Définition du parcours principal : page d'accueil -> pages catégories -> fiches formation -> contact et demande d'information contextualisée.

Ce choix a été préféré à une exécution en parallèle de toutes les pages, trop coûteuse en cohérence et en qualité de passation.`,
    archAlt: "Architecture de l'information et parcours",
    archTitle: "Architecture de l'information, parcours et réassurance",
    archText: `L'architecture repose sur une hiérarchie robuste : accueil -> catalogue -> catégories -> fiches formation, avec des pages transverses dédiées au financement, à l'organisme, au contact et aux obligations légales.

Parcours utilisateurs clés : reconversion (recherche -> fiche -> financement -> contact) et employeur (preuve de conformité -> offre ciblée -> demande de proposition).

La personnalisation reste progressive et pragmatique : préremplissage contextuel des formulaires, appels à l'action adaptés à l'intention et formulations orientées situation.`,
    roadmapAlt: 'Feuille de route design',
    roadmapTitle: 'Feuille de route design et prochaines étapes',
    roadmapText: `Le socle stratégique est posé : cadrage, recherche, architecture, principes UX et gouvernance.

Prochaines étapes : traduire les principes en maquettes, préparer la passation front, lancer une première version instrumentée puis itérer sur des signaux réels.`,
    impactAlt: "Cadre d'impact business",
    impactTitle: "Cadre d'impact business",
    impactText: `Indicateurs prévus :
- taux de conversion visite -> demande
- temps d'accès à l'information clé
- taux de clic sur les appels à l'action principaux
- qualité des leads
- progression dans l'entonnoir
- conformité éditoriale (structure, SEO, accessibilité RGAA)`
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Business context and constraints',
    contextTitle: 'Business context and constraints',
    contextText: `My Business Academy is a platform creation project for a French training organization certified Qualiopi.

I carried out the strategic phase by framing the key challenges before visual production, with a user-centered approach. The main constraint was aligning SEO acquisition, reassurance, journey clarity, and content maintainability.

The deliverables also feed an internal knowledge base, built from public content and internal documents, for internal documentation and AI use.`,
    discoveryTitle: 'Framing, needs collection, and exploratory research',
    discoveryText: `I structured framing from user needs, then turned business information into actionable content and concrete journeys to implement.

Needs collection focused on product decisions, not isolated interface requests. Three priorities emerged: make the offer quickly understandable, reduce contact friction, and build trust early in the journey.

I then ran exploratory research on six direct competitors using multiple methods: audit of key journeys (discovery, training page, funding, contact), UX/SEO competitive analysis, review of reassurance signals (Qualiopi, proof points, compliance), pricing readability benchmark, and needs synthesis through stakeholder workshops (framing workshop, journey prioritization workshop, key-content validation workshop).

This analysis highlighted three structuring points: top-performing journeys start from explicit user intent, funding questions come too late in many experiences, and recurring weaknesses (confusing navigation, weak proof, incomplete accessibility, opaque pricing) create a clear differentiation opportunity.`,
    needsAlt: 'User needs synthesis',
    needsTitle: 'User needs synthesis and personas',
    needsText: `I built operational proto-personas: career switcher, employee in progression, entrepreneur profile, and employer/HR.

The cross-cutting need was consistent: help people decide fast, with no blind spots. This translates into scannable information, clear hierarchy, explicit calls to action, and reassurance distributed across the journey.

I rejected the "full catalog first" approach at entry level because it increased cognitive load and slowed down decisions.`,
    uxTitle: 'UX principles and prioritization',
    uxText: `Selected principles: clarity before density, continuous reassurance, mobile-first approach, accessibility by default, and explicit editorial governance.

Main journey definition: homepage -> category pages -> training pages -> contact and contextual information request.

This was chosen over parallel production of all pages, which would have been too costly in consistency and handoff quality.`,
    archAlt: 'Information architecture and journeys',
    archTitle: 'Information architecture, journeys, and reassurance',
    archText: `The architecture relies on a clear hierarchy: home -> catalog -> categories -> training pages, with transversal pages for funding, organization, contact, and legal obligations.

Key user journeys: career switcher (search -> training page -> funding -> contact) and employer (compliance proof -> targeted offer -> proposal request).

Personalization stays progressive and pragmatic: contextual form prefill, intent-based calls to action, and situation-specific wording.`,
    roadmapAlt: 'Design roadmap',
    roadmapTitle: 'Design roadmap and next steps',
    roadmapText: `The strategic foundation is in place: framing, research, architecture, UX principles, and governance.

Next steps: translate principles into mockups, prepare front-end handoff, launch an instrumented first version, then iterate based on real signals.`,
    impactAlt: 'Business impact framework',
    impactTitle: 'Business impact framework',
    impactText: `Planned indicators:
- visitor-to-request conversion rate
- time to key information
- click rate on primary calls to action
- lead quality
- funnel progression
- editorial compliance (structure, SEO, accessibility)`
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const contexteImage = computed(() => localizedImage(contexteFr, contexteEn))
const contexteMobileImage = computed(() => localizedImage(contexteMobileFr, contexteMobileEn))

const cadrageImage = computed(() => localizedImage(cadrageFr, cadrageEn))
const cadrageMobileImage = computed(() => localizedImage(cadrageMobileFr, cadrageMobileEn))

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
const roadmapMobileImage = computed(() => localizedImage(roadmapMobileFr, roadmapMobileEn))

const arboImage = computed(() => localizedImage(arboFr, arboEn))
const arboMobileImage = computed(() => localizedImage(arboMobileFr, arboMobileEn))

const impactImage = computed(() => localizedImage(impactFr, impactEn))
const impactMobileImage = computed(() => localizedImage(impactMobileFr, impactMobileEn))


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
