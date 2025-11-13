<template>
  <header id="header">
    <div class="switch" role="button" tabindex="0" :aria-pressed="theme === 'dark'" @click="toggleTheme"
      @keydown.enter.prevent="toggleTheme"></div>
    <div class="header__title">
      <h1 class="text--secondary">Pierre Delattre</h1>
      <h2>Product Designer</h2>
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
      <LinkItem href="mailto:hello@pierredelattre.fr" label="hello@pierredelattre.fr" target="_blank"
        rel="noreferrer noopener">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" />
        </svg>
      </LinkItem>
    </div>

    <div class="header__intro">
      <p>
        Lorem ipsum dolor sit amet consectetur. Enim integer sapien erat bibendum cursus lacus nec. Augue sit elit
        morbi consectetur lacus leo ullamcorper. Ornare proin viverra malesuada phasellus leo rhoncus. Egestas natoque
        condimentum massa pellentesque.
      </p>
    </div>

    <div class="header__links">
      <LinkItem href="#" label="CV" secondary target="_blank" rel="noreferrer noopener">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" />
        </svg>
      </LinkItem>
      <LinkItem href="#" label="Cosmos" secondary target="_blank" rel="noreferrer noopener">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" />
        </svg>
      </LinkItem>
      <LinkItem href="#" label="Are.na" secondary target="_blank" rel="noreferrer noopener">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" />
        </svg>
      </LinkItem>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import LinkItem from './LinkItem.vue'

const THEME_KEY = 'theme-preference'
const theme = ref('light')
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
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto auto auto auto;
    gap: 1.5rem;
    row-gap: 3rem;
    padding: 1rem;
  }

  @media screen and (min-width: 769px) and (max-width: 1280px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: auto auto auto auto auto auto;
    gap: 1.5rem;
    row-gap: 3rem;
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
    grid-column: 9 / 13;
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
    --switch: oklch(100% 0 275);

    color: var(--primary);
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
