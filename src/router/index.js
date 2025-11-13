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
    path: '/projet',
    redirect: '/projet/projet'
  },
  {
    path: '/projet/:slug',
    name: 'project',
    component: () => import('@/pages/Project.vue'),
    props: true,
    meta: {
      headerMode: 'project'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
