import { createApp } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import router from './router'
import { initPageAnimations } from './animations/pageAnimations'

import './styles/main.css'

const lenis = new Lenis({
  duration: 1.4,
  smooth: true,
  smoothTouch: true,
  lerp: 0.12,
  easing: (t) => t
})

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (typeof value === 'number') {
      lenis.scrollTo(value, { immediate: true })
    } else {
      return window.scrollY || document.documentElement.scrollTop || 0
    }
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
  }
})

lenis.on('scroll', () => {
  ScrollTrigger.update()
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

initPageAnimations()

createApp(App).use(router).mount('#app')
