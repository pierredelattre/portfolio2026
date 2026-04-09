import { createRouter, createWebHistory } from 'vue-router'
import { setLocale } from '@/i18n'

import Home from '@/pages/Home.vue'

const CHUNK_RELOAD_KEY = 'route-chunk-reload-once'
const CHUNK_LOAD_ERROR_PATTERNS = [
  'Failed to fetch dynamically imported module',
  'Importing a module script failed',
  'Unable to preload CSS'
]

const lazyWithChunkReload = (importer) => async () => {
  try {
    return await importer()
  } catch (error) {
    const message = String(error?.message || '')
    const isChunkLoadError = CHUNK_LOAD_ERROR_PATTERNS.some((pattern) => message.includes(pattern))

    if (isChunkLoadError && typeof window !== 'undefined') {
      const hasReloaded = window.sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1'
      if (!hasReloaded) {
        window.sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
        window.location.reload()
        return new Promise(() => {})
      }
      window.sessionStorage.removeItem(CHUNK_RELOAD_KEY)
    }

    throw error
  }
}

const LOCALE_SEGMENTS = ['fr', 'en']
const buildLocalizedAliases = (path) => {
  if (path === '/') {
    return LOCALE_SEGMENTS.map((locale) => `/${locale}`)
  }
  return LOCALE_SEGMENTS.map((locale) => `/${locale}${path}`)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    alias: buildLocalizedAliases('/'),
    meta: {
      headerMode: 'home'
    }
  },
  {
    path: '/projet/lira',
    name: 'lira',
    component: lazyWithChunkReload(() => import('@/views/Lira.vue')),
    alias: buildLocalizedAliases('/projet/lira'),
    meta: {
      headerMode: 'project'
    }
  },
  {
    path: '/projet/talkie',
    name: 'talkie',
    component: lazyWithChunkReload(() => import('@/views/Talkie.vue')),
    alias: buildLocalizedAliases('/projet/talkie'),
    meta: {
      headerMode: 'project'
    }
  },
  {
    path: '/projet/alpine',
    name: 'alpine',
    component: lazyWithChunkReload(() => import('@/views/Alpine.vue')),
    alias: buildLocalizedAliases('/projet/alpine'),
    meta: {
      headerMode: 'project'
    }
  },
  {
    path: '/projet/septiemeseance',
    name: 'septiemeseance',
    component: lazyWithChunkReload(() => import('@/views/Septiemeseance.vue')),
    alias: buildLocalizedAliases('/projet/septiemeseance'),
    meta: {
      headerMode: 'project'
    }
  }
]

const PROJECT_ROUTE_PREFIX = '/projet'
const projectRouteNames = routes
  .filter((route) => route.path.startsWith(PROJECT_ROUTE_PREFIX))
  .map((route) => route.name)
  .filter(Boolean)

const getLenisScrollPosition = () => {
  if (typeof window === 'undefined') return null
  const lenisInstance = window.__lenis
  if (!lenisInstance) return null

  const candidates = [
    lenisInstance.animatedScroll,
    lenisInstance.actualScroll,
    lenisInstance.targetScroll,
    lenisInstance.scroll
  ]

  for (const value of candidates) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }
  }

  return null
}

const getScrollPosition = () => {
  if (typeof window === 'undefined') return 0

  const lenisScroll = getLenisScrollPosition()
  if (typeof lenisScroll === 'number') {
    return lenisScroll
  }

  return window.scrollY || document.documentElement.scrollTop || 0
}

let pendingScrollToTop = null
const SCROLL_TO_TOP_DURATION = 0.3
const MAX_SCROLL_WAIT = 1200

const scrollToTopBeforeProjectNavigation = () => {
  if (typeof window === 'undefined') return Promise.resolve()
  if (pendingScrollToTop) return pendingScrollToTop

  pendingScrollToTop = new Promise((resolve) => {
    const lenisInstance = window.__lenis
    let rafId = null
    let timeoutId = null

    const clearTimers = () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (timeoutId) clearTimeout(timeoutId)
      pendingScrollToTop = null
    }

    const finish = () => {
      clearTimers()
      resolve()
    }

    const monitor = () => {
      if (getScrollPosition() <= 2) {
        finish()
        return
      }
      rafId = requestAnimationFrame(monitor)
    }

    if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
      lenisInstance.scrollTo(0, { duration: SCROLL_TO_TOP_DURATION })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    monitor()
    timeoutId = setTimeout(finish, MAX_SCROLL_WAIT)
  })

  return pendingScrollToTop
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const isProjectRoute = (route) => {
  if (!route) return false

  if (typeof route.path === 'string' && route.path.startsWith(PROJECT_ROUTE_PREFIX)) {
    return true
  }

  if (typeof route.fullPath === 'string' && route.fullPath.startsWith(PROJECT_ROUTE_PREFIX)) {
    return true
  }

  if (typeof route.name === 'string' && projectRouteNames.includes(route.name)) {
    return true
  }

  return false
}

router.beforeEach(async (to, from) => {
  const localeMatch = to.path.match(/^\/(fr|en)(?:\/|$)/i)
  if (localeMatch) {
    setLocale(localeMatch[1].toLowerCase())
  }

  if (typeof window === 'undefined') return true

  const navigatingHomeToProject = from?.name === 'home' && isProjectRoute(to)
  const switchingProjects = isProjectRoute(from) && isProjectRoute(to)

  if ((navigatingHomeToProject || switchingProjects) && getScrollPosition() > 2) {
    await scrollToTopBeforeProjectNavigation()
  }

  return true
})

export default router
