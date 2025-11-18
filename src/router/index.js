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
    path: '/projet/alpine',
    name: 'alpine',
    component: () => import('@/views/Alpine.vue'),
    meta: {
      headerMode: 'alpine'
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

const getScrollPosition = () => {
  if (typeof window === 'undefined') return 0
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

router.beforeEach(async (to, from) => {
  const navigatingHomeToProject =
    typeof window !== 'undefined' && from?.name === 'home' && to?.name === 'projet'

  if (navigatingHomeToProject && getScrollPosition() > 2) {
    await scrollToTopBeforeProjectNavigation()
  }

  return true
})

export default router
