import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let initialized = false
let projectBackground = ''
const PROJECT_BG_HEIGHT = 600
const MAIN_START_Y = -PROJECT_BG_HEIGHT
const MAIN_INTRO_MIN_HEIGHT = '70vh'
let worksIntroCompleted = false
const worksIntroWaiters = []
const HEADER_ITEMS_SELECTOR =
  '.header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links'
const SCROLL_LOCK_CLASS = 'scroll-locked'
let lockedScrollY = null
let scrollLockCount = 0

const getHeaderPaddingValue = () => (typeof window !== 'undefined' && window.innerWidth < 768 ? '16px' : '32px')

const lockScroll = () => {
  if (typeof window === 'undefined') return

  if (scrollLockCount === 0) {
    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0
    document.documentElement.classList.add(SCROLL_LOCK_CLASS)
    document.body.classList.add(SCROLL_LOCK_CLASS)
    document.body.style.top = `-${lockedScrollY}px`
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
  }

  scrollLockCount += 1
}

const unlockScroll = () => {
  if (typeof window === 'undefined' || scrollLockCount === 0) return

  scrollLockCount -= 1

  if (scrollLockCount === 0) {
    document.documentElement.classList.remove(SCROLL_LOCK_CLASS)
    document.body.classList.remove(SCROLL_LOCK_CLASS)
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('width')

    if (lockedScrollY !== null) {
      window.scrollTo(0, lockedScrollY)
      lockedScrollY = null
    }
  }
}

const resetWorksIntroState = () => {
  worksIntroCompleted = false
  worksIntroWaiters.length = 0
}

const markWorksIntroComplete = () => {
  if (worksIntroCompleted) return
  worksIntroCompleted = true
  while (worksIntroWaiters.length) {
    const waiter = worksIntroWaiters.shift()
    waiter?.()
  }
}

const runWhenWorksIntroComplete = (callback) => {
  if (worksIntroCompleted) {
    callback()
  } else {
    worksIntroWaiters.push(callback)
  }
}

const createDeferredScrollReveal = ({ targets, trigger, start, vars }) => {
  if (!trigger || !targets) return
  const hasLength = typeof targets.length === 'number'
  if (hasLength && targets.length === 0) return

  const tween = gsap.to(targets, { ...vars, paused: true })
  ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => runWhenWorksIntroComplete(() => tween.play())
  })
}

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
    const headerPadding = getHeaderPaddingValue()

    // --- HARD RESET to avoid broken animations on refresh ---
    gsap.killTweensOf([header, mainEl, pageBg, projectSection, footer])
    gsap.set([header, mainEl, pageBg, projectSection, footer], { clearProps: 'all' })
    gsap.globalTimeline.clear()
    ScrollTrigger.getAll().forEach(st => st.kill())
    // --- END RESET ---

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
    header.style.paddingTop = headerPadding
    header.style.paddingBottom = headerPadding

    lockScroll()

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

    tlProject.call(() => {
      header.classList.remove('is-floating')
      gsap.set(mainEl, { clearProps: 'transform' })
      mainEl.style.removeProperty('min-height')
      unlockScroll()
    })

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

    tlProject.eventCallback('onComplete', unlockScroll)
    tlProject.eventCallback('onInterrupt', unlockScroll)

    tlProject.play()
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      resetWorksIntroState()
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
      const isProjectPage = window.location.pathname.includes('/projet')
      const footer = document.querySelector('footer')
      const footerItems = footer ? footer.querySelectorAll(':scope > *') : []

      if (worksItems.length) {
        gsap.set(worksItems, { opacity: 0, y: 40 })
      }
      if (playgroundTitle) {
        gsap.set(playgroundTitle, { opacity: 0, y: 40 })
      }
      if (playgroundItems.length) {
        gsap.set(playgroundItems, { opacity: 0, y: 40 })
      }
      if (!isProjectPage && footerItems.length) {
        gsap.set(footerItems, { opacity: 0, y: 60 })
      }

      const header = document.querySelector('header')
      const mainEl = document.querySelector('main')
      const headerItems = header?.querySelectorAll(
        '.header__title, .header__cities, .header__services, .header__email, .header__intro, .header__links'
      )
      const themeSwitch = header?.querySelector('.switch') || null
      const headerPadding = getHeaderPaddingValue()
      const measuredHeaderHeight = header ? header.getBoundingClientRect().height || header.scrollHeight : null

      if (header && headerItems) {
        const shouldAnimateHeaderHeight = isProjectPage
        if (!isProjectPage) {
          lockScroll()
          gsap.set(header, { opacity: 0 })
        }
        if (shouldAnimateHeaderHeight) {
          gsap.set(header, {
            height: 0,
            overflow: 'hidden',
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0
          })
        }
        gsap.set(headerItems, { opacity: 0, y: 20 })
        if (themeSwitch) {
          gsap.set(themeSwitch, { opacity: 0, y: 20 })
        }

        const tl = gsap.timeline({ delay: 0.4 })
        const introStartLabel = 'introStart'
        const headerRevealCompleteLabel = 'headerRevealComplete'
        const releaseScroll = () => {
          if (!isProjectPage) {
            unlockScroll()
          }
        }
        const finalizeHeaderDimensions = () => {
          if (!isProjectPage && header) {
            header.style.removeProperty('overflow')
            header.style.removeProperty('height')
          }
        }
        tl.addLabel(introStartLabel, 0)

        if (shouldAnimateHeaderHeight) {
          tl.to(header, {
            height: measuredHeaderHeight || 'auto',
            opacity: 1,
            paddingTop: headerPadding,
            paddingBottom: headerPadding,
            duration: 1.4,
            ease: 'power4.inOut'
          }, introStartLabel)
        } else {
          tl.to(
            header,
            {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out'
            },
            introStartLabel
          )
        }

        if (window.innerWidth >= 1280) {
          tl.fromTo(
            'body',
            { scale: 0.96, opacity: 0.6 },
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out' },
            introStartLabel
          )
        }

        if (themeSwitch) {
          const switchStart = `${introStartLabel}+=0.2`
          tl.fromTo(
            themeSwitch,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out'
            },
            switchStart
          )
        }

        const headerItemsStart = themeSwitch ? `${introStartLabel}+=0.55` : '-=0.5'

        tl.to(
          headerItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out'
          },
          headerItemsStart
        )
        tl.addLabel(headerRevealCompleteLabel)
        tl.call(finalizeHeaderDimensions, null, headerRevealCompleteLabel)
        tl.call(releaseScroll, null, headerRevealCompleteLabel)

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
            `${headerRevealCompleteLabel}-=0.2`
          )
        }

        tl.call(() => {
          if (isProjectPage) {
            mainEl?.style.removeProperty('min-height')
          }
        })

        tl.eventCallback('onComplete', () => {
          markWorksIntroComplete()
          releaseScroll()
        })
        tl.eventCallback('onInterrupt', () => {
          releaseScroll()
          markWorksIntroComplete()
        })
      } else {
        markWorksIntroComplete()
      }

      if (isProjectPage) {
        const pageBg = document.querySelector('#page-bg')
        const projectMain = document.querySelector('main')

        if (header) {
          const headerPadding = getHeaderPaddingValue()
          header.style.opacity = '1'
          header.style.paddingTop = headerPadding
          header.style.paddingBottom = headerPadding
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
        createDeferredScrollReveal({
          targets: playgroundTitle,
          trigger: playgroundSection,
          start: 'top 80%',
          vars: {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }
        })
      }

      if (playgroundSection && playgroundItems.length) {
        createDeferredScrollReveal({
          targets: playgroundItems,
          trigger: playgroundSection,
          start: 'top 75%',
          vars: {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 1.2,
            ease: 'power3.out'
          }
        })
      }

      if (!isProjectPage && footer && footerItems.length) {
        createDeferredScrollReveal({
          targets: footerItems,
          trigger: footer,
          start: 'top 85%',
          vars: {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'power3.out'
          }
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
