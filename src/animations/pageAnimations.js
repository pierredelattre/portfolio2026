import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let initialized = false
let projectBackground = ''
const PROJECT_BG_HEIGHT = 600
const MAIN_START_Y = -PROJECT_BG_HEIGHT
const MAIN_INTRO_MIN_HEIGHT = '70vh'
const HEADER_ITEMS_SELECTOR =
  '.header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links'

export function initPageAnimations() {
  if (initialized || typeof window === 'undefined') {
    return
  }

  initialized = true
  gsap.registerPlugin(ScrollTrigger)

  const docEl = document.documentElement
  docEl.style.scrollBehavior = 'auto'
  window.scrollTo(0, 99999)
  document.body.style.visibility = 'hidden'

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const handlePageLoaded = () => {
    const header = document.querySelector('header')
    const mainEl = document.querySelector('main')
    const pageBg = document.querySelector('#page-bg')
    const projectSection = document.querySelector('section.projet')
    const footer = document.querySelector('footer')

    if (projectSection) {
      const projChildren = projectSection.querySelectorAll(':scope > *')
      projChildren.forEach((el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(40px)'
      })
    }

    if (footer) {
      const footerItems = footer.querySelectorAll(':scope > *')
      footerItems.forEach((el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(60px)'
      })
    }

    if (!header || !mainEl || !pageBg) return

    if (!projectBackground) {
      header.classList.remove('has-background', 'is-floating')
      header.style.removeProperty('min-height')
      header.style.removeProperty('top')
      document.body.classList.remove('project-page')
      header.style.height = 'auto'
      header.style.opacity = '1'
      header.style.paddingTop = ''
      header.style.paddingBottom = ''

      pageBg.style.opacity = '0'
      pageBg.style.backgroundImage = ''
      pageBg.style.height = `${PROJECT_BG_HEIGHT}px`

      gsap.killTweensOf(mainEl)
      gsap.set(mainEl, { clearProps: 'transform' })
      mainEl.style.removeProperty('min-height')

      const items = header.querySelectorAll(HEADER_ITEMS_SELECTOR)
      items.forEach((el) => {
        el.style.display = 'flex'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })

      if (footer) {
        const footerItems = footer.querySelectorAll(':scope > *')
        footerItems.forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
        gsap.killTweensOf(footer)
        gsap.set(footer, { clearProps: 'transform' })
      }

      return
    }

    header.classList.add('has-background', 'is-floating')
    document.body.classList.add('project-page')
    header.style.opacity = '1'
    header.style.height = 'auto'
    header.style.paddingTop = '32px'
    header.style.paddingBottom = '32px'

    pageBg.style.opacity = '0'
    pageBg.style.backgroundImage = `url('${projectBackground}')`
    pageBg.style.height = `${PROJECT_BG_HEIGHT}px`

    gsap.killTweensOf(mainEl)
    mainEl.style.minHeight = MAIN_INTRO_MIN_HEIGHT
    gsap.set(mainEl, { y: MAIN_START_Y })

    const headerItems = header.querySelectorAll(HEADER_ITEMS_SELECTOR)
    if (!headerItems.length) return
    headerItems.forEach((el) => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })

    const tlProject = gsap.timeline({ paused: true })
    const toHide = header.querySelectorAll('.header__intro, .header__links')

    if (toHide.length) {
      tlProject.to(toHide, {
        opacity: 0,
        y: -20,
        duration: 0.35,
        stagger: 0.06,
        ease: 'power2.inOut'
      })

      tlProject.set(toHide, { display: 'none' })
    }

    tlProject.to(
      pageBg,
      {
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out'
      },
      toHide.length ? '-=0.1' : '+=0'
    )

    tlProject.fromTo(
      mainEl,
      { y: MAIN_START_Y },
      { y: 0, duration: 1.1, ease: 'power3.out' },
      '<'
    )

    if (projectSection) {
      gsap.set('section.projet > *', { opacity: 0, y: 40 })
      tlProject.to(
        'section.projet > *',
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out'
        },
        '+=0.1'
      )
    }

    if (footer) {
      const footerChildren = footer.querySelectorAll(':scope > *')
      if (footerChildren.length > 0) {
        tlProject.set(footerChildren, { opacity: 0, y: 60 })
        tlProject.to(
          footerChildren,
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'power3.out'
          },
          '+=0.15'
        )
      }
    }

    tlProject.call(() => {
      header.classList.remove('is-floating')
      gsap.set(mainEl, { clearProps: 'transform' })
      mainEl.style.removeProperty('min-height')
    })

    tlProject.play()
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 0)

      ScrollTrigger.clearScrollMemory()
      ScrollTrigger.refresh(true)

      if (window.innerWidth >= 1280) {
        gsap.set('body', { scale: 0.95, opacity: 0 })
      }

      const worksItems = document.querySelectorAll('#works > *')
      const playgroundSection = document.querySelector('#playground')
      const playgroundTitle = playgroundSection?.querySelector(':scope > h3') || null
      const playgroundItems = playgroundSection
        ? playgroundSection.querySelectorAll('.col > *')
        : []

      if (worksItems.length) {
        gsap.set(worksItems, { opacity: 0, y: 40 })
      }
      if (playgroundTitle) {
        gsap.set(playgroundTitle, { opacity: 0, y: 40 })
      }
      if (playgroundItems.length) {
        gsap.set(playgroundItems, { opacity: 0, y: 40 })
      }

      const header = document.querySelector('header')
      const mainEl = document.querySelector('main')
      const isProjectPage = window.location.pathname.includes('/projet')
      const headerItems = header?.querySelectorAll(
        '.header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links'
      )

      if (header && headerItems) {
        if (!isProjectPage) {
          gsap.set(header, {
            height: 0,
            overflow: 'hidden',
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0
          })
        }
        gsap.set(headerItems, { opacity: 0, y: 20 })

        const tl = gsap.timeline({ delay: 0.4 })

        if (!isProjectPage) {
          tl.to(header, {
            height: 'auto',
            opacity: 1,
            paddingTop: '32px',
            paddingBottom: '32px',
            duration: 1.4,
            ease: 'power4.inOut'
          })
        }

        tl.to(
          headerItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out'
          },
          '-=0.5'
        )

        if (worksItems.length) {
          tl.to(
            worksItems,
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.8,
              ease: 'power3.out'
            },
            '-=0.2'
          )
        }

        if (window.innerWidth >= 1280) {
          tl.fromTo(
            'body',
            { scale: 0.96, opacity: 0.6 },
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out' },
            '-=0.6'
          )
        }

        tl.call(() => {
          if (isProjectPage) {
            mainEl?.style.removeProperty('min-height')
          }
        })
      }

      if (isProjectPage) {
        const pageBg = document.querySelector('#page-bg')
        const projectMain = document.querySelector('main')

        if (header) {
          header.style.opacity = '1'
          header.style.paddingTop = '32px'
          header.style.paddingBottom = '32px'
          header.classList.add('has-background', 'is-floating')
        }

        document.body.classList.add('project-page')

        if (pageBg) {
          pageBg.style.opacity = '0'
          pageBg.style.height = `${PROJECT_BG_HEIGHT}px`
        }

        if (projectMain) {
          projectMain.style.minHeight = MAIN_INTRO_MIN_HEIGHT
          gsap.set(projectMain, { y: MAIN_START_Y })
        }
      }

      if (playgroundSection && playgroundTitle) {
        gsap.to(playgroundTitle, {
          scrollTrigger: {
            trigger: playgroundSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      }

      if (playgroundSection && playgroundItems.length) {
        gsap.to(playgroundItems, {
          scrollTrigger: {
            trigger: playgroundSection,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true
          },
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: 'power3.out'
        })
      }

      requestAnimationFrame(() => {
        document.body.style.visibility = 'visible'
        document.body.classList.add('ready')
      })
    }, 100)

    document.addEventListener('pageLoaded', (event) => {
      projectBackground = event?.detail?.projectBg || ''
      handlePageLoaded()
    })
  })
}
