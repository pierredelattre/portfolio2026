import { computed, ref } from 'vue'

const STORAGE_KEY = 'preferred-locale'
const FALLBACK_LOCALE = 'fr'
const SUPPORTED_LOCALES = ['fr', 'en']

const messages = {
  fr: {
    header: {
      homeAriaLabel: 'Retour à l\'accueil',
      role: 'Product Designer',
      cityLabel: 'Villes',
      city: 'Lille – Paris',
      servicesLabel: 'Services',
      services: ['Product Design', 'Webdesign', 'Framer, Webflow, Shopify & Wordpress'],
      emailLabel: 'Email',
      intro:
        'Designer UX/UI orienté produit, spécialisé dans la conception d\'interfaces accessibles et la création de design systems cohérents. Expérience en e-commerce, intégration front-end et recherche utilisateur.',
      resume: 'CV',
      localeSwitchLabel: 'Changer de langue',
      localeButton: {
        fr: 'FR',
        en: 'EN'
      },
      themeSwitch: {
        darkToLight: 'Passer en mode clair',
        lightToDark: 'Passer en mode sombre'
      }
    },
    footer: {
      previousProject: 'Projet précédent',
      nextProject: 'Projet suivant',
      projectVisual: 'Visuel de {title}',
      links: 'Liens',
      email: 'Email',
      resume: 'CV',
      copyright: 'Portfolio 2026'
    },
    projectType: {
      school: "Cas d'école",
      freelance: 'Freelance',
      perso: 'Perso'
    }
  },
  en: {
    header: {
      homeAriaLabel: 'Back to homepage',
      role: 'Product Designer',
      cityLabel: 'Cities',
      city: 'Lille – Paris',
      servicesLabel: 'Services',
      services: ['Product Design', 'Web Design', 'Framer, Webflow, Shopify & WordPress'],
      emailLabel: 'Email',
      intro:
        'Product-oriented UX/UI Designer focused on building accessible interfaces and consistent design systems. Experience in e-commerce, front-end integration, and user research.',
      resume: 'Resume',
      localeSwitchLabel: 'Switch language',
      localeButton: {
        fr: 'FR',
        en: 'EN'
      },
      themeSwitch: {
        darkToLight: 'Switch to light mode',
        lightToDark: 'Switch to dark mode'
      }
    },
    footer: {
      previousProject: 'Previous project',
      nextProject: 'Next project',
      projectVisual: 'Visual for {title}',
      links: 'Links',
      email: 'Email',
      resume: 'Resume',
      copyright: 'Portfolio 2026'
    },
    projectType: {
      school: 'School project',
      freelance: 'Freelance',
      perso: 'Side project'
    }
  }
}

const getNestedMessage = (locale, key) => {
  const parts = key.split('.')
  let cursor = messages[locale]

  for (const part of parts) {
    if (cursor && typeof cursor === 'object' && part in cursor) {
      cursor = cursor[part]
      continue
    }

    return null
  }

  return cursor
}

const normalizeLocale = (value) => {
  if (typeof value !== 'string') return null
  const lowered = value.toLowerCase().trim()
  if (lowered.startsWith('fr')) return 'fr'
  if (SUPPORTED_LOCALES.includes(lowered)) return lowered
  return 'en'
}

const detectFromNavigator = () => {
  if (typeof navigator === 'undefined') return FALLBACK_LOCALE
  const browserLocales = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language]

  const hasFrench = browserLocales.some((item) => typeof item === 'string' && item.toLowerCase().startsWith('fr'))
  return hasFrench ? 'fr' : 'en'
}

const resolveInitialLocale = () => {
  if (typeof window === 'undefined') return FALLBACK_LOCALE

  const saved = normalizeLocale(window.localStorage.getItem(STORAGE_KEY))
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved
  }

  return detectFromNavigator()
}

const locale = ref(resolveInitialLocale())

const applyDocumentLang = (value) => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('lang', value)
}

const setLocale = (value) => {
  const normalized = normalizeLocale(value)
  if (!normalized || !SUPPORTED_LOCALES.includes(normalized)) return

  locale.value = normalized

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, normalized)
  }

  applyDocumentLang(normalized)
}

const translate = (key, params = {}) => {
  const localized = getNestedMessage(locale.value, key)
  const fallback = getNestedMessage(FALLBACK_LOCALE, key)
  const template = localized ?? fallback

  if (typeof template !== 'string') {
    return template ?? key
  }

  return Object.entries(params).reduce((result, [name, value]) => {
    return result.replaceAll(`{${name}}`, String(value))
  }, template)
}

const initializeLocale = () => {
  applyDocumentLang(locale.value)
}

export const useLocale = () => {
  return {
    locale: computed(() => locale.value),
    setLocale,
    t: translate,
    supportedLocales: SUPPORTED_LOCALES
  }
}

export { initializeLocale }
