<template>
  <header id="header">
    <button
      class="locale-switch"
      type="button"
      :aria-label="localeSwitchLabel"
      :title="localeSwitchLabel"
      @click="toggleLocale"
    >
      <svg class="locale-switch__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18Zm0 0c2.2 2.4 3.5 5.6 3.5 9s-1.3 6.6-3.5 9m0-18C9.8 5.4 8.5 8.6 8.5 12s1.3 6.6 3.5 9m-8.8-6h17.6M3.2 9h17.6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>{{ t(`header.localeButton.${locale}`) }}</span>
    </button>
    <!-- <button
      class="switch"
      type="button"
      :aria-pressed="theme === 'dark'"
      :aria-label="themeLabel"
      :title="themeLabel"
      @click="toggleTheme"
      @keydown.enter.prevent="toggleTheme"
      @keydown.space.prevent="toggleTheme"
    ></button> -->
    <div class="header__title">
      <RouterLink to="/" class="header__home-link" :aria-label="t('header.homeAriaLabel')">
        <h1 class="text--secondary">Pierre Delattre</h1>
        <h2>{{ t('header.role') }}</h2>
      </RouterLink>
    </div>

    <div class="header__cities">
      <p class="text--secondary">{{ t('header.cityLabel') }}</p>
      <p>{{ t('header.city') }}</p>
    </div>

    <div class="header__services">
      <p class="text--secondary">{{ t('header.servicesLabel') }}</p>
      <p v-for="service in services" :key="service">{{ service }}</p>
    </div>

    <div class="header__email">
      <p class="text--secondary">{{ t('header.emailLabel') }}</p>
      <LinkItem href="mailto:hello@pierredelattre.fr" label="hello@pierredelattre.fr" external />
    </div>

    <div class="header__intro">
      <p>
        {{ t('header.intro') }}
      </p>
    </div>

    <div class="header__links">
      <LinkItem :href="resumePdf" :label="t('header.resume')" secondary external />
      <!-- <LinkItem href="https://www.cosmos.so/pierreddd" label="Cosmos" secondary external /> -->
      <!-- <LinkItem href="#" label="Freelance" secondary external /> -->
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LinkItem from './LinkItem.vue'
import { useLocale } from '@/i18n'

import resumePdf from '@/assets/CV Delattre Pierre.pdf'
const { locale, setLocale, t } = useLocale()

const theme = ref('dark')
const nextLocale = computed(() => (locale.value === 'fr' ? 'en' : 'fr'))
const localeSwitchLabel = computed(() =>
  nextLocale.value === 'en' ? 'Passer le site en anglais' : 'Switch site to French'
)
const services = computed(() => t('header.services'))

const themeLabel = computed(() =>
  theme.value === 'dark' ? t('header.themeSwitch.darkToLight') : t('header.themeSwitch.lightToDark')
)

const applyTheme = (value) => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = value
  theme.value = value
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

const toggleLocale = () => {
  setLocale(nextLocale.value)
}

// Keep explicit default in code: no auto system detection.
onMounted(() => {
  applyTheme('dark')
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
  align-content: start;
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

    &>*:not(.switch, .locale-switch, .header__links, .header__intro) {
      width: calc((100% / 2) - 1rem);
    }
  }

  & .switch {
    position: absolute;
    top: 2rem;
    right: 4.75rem;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background-color: var(--switch);
    cursor: pointer;
    transition: background-color 0.4s ease;
    z-index: 1000;
    border: 1px solid var(--text-primary);
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    appearance: none;

    @media screen and (max-width: 768px) {
      top: 1rem;
      right: 3.75rem;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      top: 2rem;
      right: 4.75rem;
    }
  }

  & .locale-switch {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: auto;
    min-width: 52px;
    height: 24px;
    border-radius: 999px;
    border: 0;
    background: #282828;
    color: var(--secondary);
    font-size: .875rem;
    line-height: 1;
    cursor: pointer;
    z-index: 1000;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
  }

  & .locale-switch__icon {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }

  @media screen and (max-width: 768px) {
    & .locale-switch {
      top: 1rem;
      right: 1rem;
    }
  }

  & .header__title {
    grid-column: 1 / 5;
    grid-row: 1;

    &>a {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

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
