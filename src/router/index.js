import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      headerMode: 'home'
    }
  },
  {
    path: '/projet/talkie',
    name: 'talkie',
    component: () => import('@/views/Talkie.vue'),
    meta: {
      headerMode: 'project'
    }
  },
  {
    path: '/projet/alpine',
    name: 'alpine',
    component: () => import('@/views/Alpine.vue'),
    meta: {
      headerMode: 'project'
    }
  },
  {
    path: '/projet/septiemeseance',
    name: 'septiemeseance',
    component: () => import('@/views/Septiemeseance.vue'),
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
  if (typeof window === 'undefined') return true

  const navigatingHomeToProject = from?.name === 'home' && isProjectRoute(to)
  const switchingProjects = isProjectRoute(from) && isProjectRoute(to)

  if ((navigatingHomeToProject || switchingProjects) && getScrollPosition() > 2) {
    await scrollToTopBeforeProjectNavigation()
  }

  return true
})

export default router
