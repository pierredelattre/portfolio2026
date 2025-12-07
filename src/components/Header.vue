<template>
  <header id="header">
    <div class="switch" role="button" tabindex="0" :aria-pressed="theme === 'dark'" @click="toggleTheme"
      @keydown.enter.prevent="toggleTheme"></div>
    <div class="header__title">
      <RouterLink to="/" class="header__home-link">
        <h1 class="text--secondary">Pierre Delattre</h1>
      </RouterLink>
      <RouterLink to="/" class="header__home-link">
        <h2>Product Designer</h2>
      </RouterLink>
    </div>

    <div class="header__cities">
      <p class="text--secondary">Lille — Paris</p>
    </div>

    <div class="header__services">
      <p class="text--secondary">Services</p>
      <p>UX Research</p>
      <p>UI Design</p>
      <p>Website Design</p>
      <p>Framer, Webflow, Shopify &amp; Wordpress</p>
    </div>

    <div class="header__email">
      <p class="text--secondary">Email</p>
      <LinkItem href="mailto:hello@pierredelattre.fr" label="hello@pierredelattre.fr" external />
    </div>

    <div class="header__intro">
      <p>
        Designer UX/UI orienté produit, spécialisé dans la conception d’interfaces accessibles et la création de design systems cohérents. Expérience en e-commerce, intégration front-end et recherche utilisateur.
      </p>
    </div>

    <div class="header__links">
      <LinkItem :href=resumePdf label="CV" secondary external />
      <!-- <LinkItem href="https://www.cosmos.so/pierreddd" label="Cosmos" secondary external /> -->
      <LinkItem href="#" label="Freelance" secondary external />
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LinkItem from './LinkItem.vue'

const THEME_KEY = 'theme-preference'
const theme = ref('light')
import resumePdf from '@/assets/CV Delattre Pierre.pdf'
let prefersDarkMedia

const applyTheme = (value) => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = value
  theme.value = value
}

const toggleTheme = () => {
  const next = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem(THEME_KEY, next)
  applyTheme(next)
}

const handlePreferenceChange = (event) => {
  if (localStorage.getItem(THEME_KEY)) return
  applyTheme(event.matches ? 'dark' : 'light')
}

onMounted(() => {
  prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)')
  const stored = localStorage.getItem(THEME_KEY)

  if (stored) {
    applyTheme(stored)
  } else {
    applyTheme(prefersDarkMedia.matches ? 'dark' : 'light')
  }

  prefersDarkMedia.addEventListener('change', handlePreferenceChange)
})

onUnmounted(() => {
  prefersDarkMedia?.removeEventListener('change', handlePreferenceChange)
})
</script>

<style scoped lang="css">
header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: auto auto auto;
  gap: 2rem;
  row-gap: 4rem;
  padding: 2rem;
  transition: height 0.5s ease;

  @media screen and (max-width: 768px) {
    /* grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto auto auto auto; */
    gap: 1.5rem;
    row-gap: 3rem;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  @media screen and (min-width: 769px) and (max-width: 1280px) {
    /* grid-template-columns: repeat(8, 1fr);
    grid-template-rows: auto auto auto auto auto auto; */
    row-gap: 3rem;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    &>*:not(.switch, .header__links, .header__intro) {
      width: calc((100% / 2) - 1rem);
    }
  }

  & .switch {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background-color: var(--switch);
    cursor: pointer;
    transition: background-color 0.4s ease;
    z-index: 1000;
    border: 1px solid var(--text-primary);

    @media screen and (max-width: 768px) {
      top: 1rem;
      right: 1rem;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      top: 2rem;
      right: 2rem;
    }
  }

  & .header__title {
    grid-column: 1 / 5;
    grid-row: 1;

    @media screen and (max-width: 768px) {
      grid-column: 1 / 5;
      grid-row: 1;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      grid-column: 1 / 5;
      grid-row: 1;
    }
  }

  & .header__home-link {
    color: inherit;
    text-decoration: none;
    display: inline-block;
  }

  & .header__cities {
    grid-column: 5 / 9;
    grid-row: 1;

    @media screen and (max-width: 768px) {
      grid-column: 1 / 5;
      grid-row: 2;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      grid-column: 5 / 9;
      grid-row: 1;
    }
  }

  & .header__services {
    grid-column: 9 / 13;
    grid-row: 1;

    @media screen and (max-width: 768px) {
      grid-column: 1 / 5;
      grid-row: 3;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      grid-column: 1 / 5;
      grid-row: 2;
    }
  }

  & .header__email {
    grid-column: 13 / 17;
    grid-row: 1;

    @media screen and (max-width: 768px) {
      grid-column: 1 / 5;
      grid-row: 4;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      grid-column: 5 / 9;
      grid-row: 2;
    }
  }

  & .header__intro {
    grid-column: 9 / 17;
    grid-row: 2;

    @media screen and (min-width: 520px) and (max-width: 768px) {
      grid-column: 1 / 3;
    }

    @media screen and (max-width: 768px) {
      grid-column: 1 / 5;
      grid-row: 5;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      grid-column: 1 / 5;
      grid-row: 3;
    }

    @media screen and (min-width: 1100px) and (max-width: 1280px) {
      grid-column: 1 / 4;
      grid-row: 3;
    }
  }

  & .header__intro p {
    line-height: 1.5;

    @media screen and (min-width: 768px) {
      max-width: 64%;
    }

    @media screen and (min-width: 1700px) {
      max-width: 50%;
    }
  }

  & .header__links {
    grid-column: 9 / 17;
    grid-row: 3;

    @media screen and (max-width: 768px) {
      grid-column: 1 / 5;
      grid-row: 6;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      grid-column: 1 / 9;
      grid-row: 4;
    }
  }

  &>div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.25rem;
  }

  &.has-background {
    min-height: 600px;
    /* Force dark-mode token set inside header regardless of system or theme */
    --primary: oklch(88% 0 271);
    --secondary: oklch(66% 0 271);
    --inactive: oklch(51% 0 271);
    --surface: oklch(14% 0 271);
    --switch: oklch(88% 0 271);
    color: var(--switch);
  }

  &.has-background .header__intro,
  &.has-background .header__links {
    display: none;
  }

  &.has-background.is-floating {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    transform: none;
    height: 600px;
    z-index: 2;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
