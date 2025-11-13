<template>
  <header id="header">
    <div
      class="switch"
      role="button"
      tabindex="0"
      :aria-pressed="theme === 'dark'"
      @click="toggleTheme"
      @keydown.enter.prevent="toggleTheme"
    ></div>
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
      <a href="mailto:hello@pierredelattre.fr" target="_blank" rel="noreferrer noopener">
        <div class="link">
          <div class="link__label">
            <p>hello@pierredelattre.fr</p>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
              />
            </svg>
          </div>
          <div class="link__border"></div>
          <div class="link__border--hover"></div>
        </div>
      </a>
    </div>

    <div class="header__intro">
      <p>
        Lorem ipsum dolor sit amet consectetur. Enim integer sapien erat bibendum cursus lacus nec. Augue sit elit
        morbi consectetur lacus leo ullamcorper. Ornare proin viverra malesuada phasellus leo rhoncus. Egestas natoque
        condimentum massa pellentesque.
      </p>
    </div>

    <div class="header__links">
      <a href="#" target="_blank" rel="noreferrer noopener">
        <div class="link">
          <div class="link__label text--secondary">
            <p>CV</p>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
              />
            </svg>
          </div>
          <div class="link__border"></div>
          <div class="link__border--hover"></div>
        </div>
      </a>
      <a href="#" target="_blank" rel="noreferrer noopener">
        <div class="link">
          <div class="link__label text--secondary">
            <p>Cosmos</p>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
              />
            </svg>
          </div>
          <div class="link__border"></div>
          <div class="link__border--hover"></div>
        </div>
      </a>
      <a href="#" target="_blank" rel="noreferrer noopener">
        <div class="link">
          <div class="link__label text--secondary">
            <p>Are.na</p>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
              />
            </svg>
          </div>
          <div class="link__border"></div>
          <div class="link__border--hover"></div>
        </div>
      </a>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

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
