import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let initialized = false
let projectBackground = ''

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
    const headerBg = document.querySelector('header .background')

    const projectSectionInit = document.querySelector('section.projet')
    if (projectSectionInit) {
      const projChildren = projectSectionInit.querySelectorAll(':scope > *')
      projChildren.forEach((el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(40px)'
      })
    }

    const footerInit = document.querySelector('footer')
    if (footerInit) {
      const footerItems = footerInit.querySelectorAll(':scope > *')
      footerItems.forEach((el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(60px)'
      })
    }

    if (!headerBg) return

    headerBg.style.opacity = '0'
    headerBg.style.display = 'block'
    headerBg.style.height = '0px'

    if (!projectBackground) {
      const headerEl = document.querySelector('header')
      if (headerEl) headerEl.classList.remove('has-background')
      headerBg.style.display = 'block'
      headerBg.style.opacity = '0'
      headerBg.style.height = '0px'

      const header = document.querySelector('header')
      const items = header?.querySelectorAll(
        '.header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links'
      )

      if (header) {
        header.style.height = 'auto'
        header.style.paddingTop = '32px'
        header.style.paddingBottom = '32px'
      }

      items?.forEach((el) => {
        el.style.display = 'flex'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })

      return
    }

    const headerEl = document.querySelector('header')
    if (headerEl) headerEl.classList.add('has-background')
    headerBg.style.display = 'block'

    const header = document.querySelector('header')
    const headerItems = header?.querySelectorAll(
      '.header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links'
    )

    if (!header || !headerItems) return

    header.style.opacity = '1'

    const mainEls = header.querySelectorAll('.header__title, .header__cities, .header__services, .header__email')
    mainEls.forEach((el) => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })

    headerBg.style.backgroundPosition = 'center'
    headerBg.style.backgroundSize = 'cover'
    headerBg.style.backgroundImage = `url('${projectBackground}')`
    headerBg.style.backgroundRepeat = 'no-repeat'
    headerBg.style.backgroundAttachment = 'scroll'
    headerBg.style.backgroundPosition = 'center top'

    const tlProject = gsap.timeline()
    const toHide = header.querySelectorAll('.header__intro, .header__links')

    tlProject.to(toHide, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      stagger: 0.06,
      ease: 'power2.inOut'
    })

    tlProject.set(toHide, { display: 'none' })

    tlProject.to(
      header,
      {
        height: '120px',
        duration: 0.55,
        ease: 'power3.inOut'
      },
      '-=0.2'
    )

    tlProject.to(header, {
      height: '600px',
      duration: 1.0,
      ease: 'power3.out'
    })

    const bg = document.querySelector('header .background')

    tlProject.fromTo(
      bg,
      { height: 0, opacity: 0, scale: 1, transformOrigin: 'top center' },
      { height: '600px', opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
      '-=1.0'
    )

    const bgImg = new Image()
    bgImg.src = projectBackground

    bgImg.onload = () => {
      if (!bg) return

      tlProject.set(bg, { display: 'block' })

      const toShow = header.querySelectorAll('.header__title, .header__cities, .header__services, .header__email')
      tlProject.set(toShow, { opacity: 1, y: 0 })

      const projectSection = document.querySelector('section.projet')
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

      const footer = document.querySelector('footer')
      if (footer) {
        const footerChildren = footer.querySelectorAll(':scope > *')
        if (footerChildren.length > 0) {
          gsap.set(footerChildren, { opacity: 0, y: 60 })
          gsap.to(footerChildren, {
            scrollTrigger: {
              trigger: footer,
              start: 'top 80%',
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
      }
    }
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
      const headerItems = header?.querySelectorAll(
        '.header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links'
      )

      if (header && headerItems) {
        gsap.set(header, {
          height: 0,
          overflow: 'hidden',
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0
        })
        gsap.set(headerItems, { opacity: 0, y: 20 })

        const tl = gsap.timeline({ delay: 0.4 })

        tl.to(header, {
          height: 'auto',
          opacity: 1,
          paddingTop: '32px',
          paddingBottom: '32px',
          duration: 1.4,
          ease: 'power4.inOut'
        })

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
