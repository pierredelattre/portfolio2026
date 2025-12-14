<template>
  <section id="playground" aria-labelledby="playground-title">
    <h3 id="playground-title">Playground</h3>
    <div class="playground__content playground__content--grid">
      <div class="col" v-for="(column, columnIndex) in orderedColumns" :key="`column-${columnIndex}`">
        <PlaygroundCard
          v-for="(item, itemIndex) in column"
          :key="`item-${columnIndex}-${itemIndex}`"
          v-bind="item"
          @select="() => openModal(item)"
        />
      </div>
    </div>
    <div class="playground__content playground__content--stacked">
      <PlaygroundCard
        v-for="(item, itemIndex) in props.items"
        :key="`stacked-${itemIndex}`"
        v-bind="item"
        @select="() => openModal(item)"
      />
    </div>

    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="selectedItem" class="playground-modal" @click.self="closeModal">
          <div
            class="playground-modal__content"
            role="dialog"
            aria-modal="true"
            :aria-label="selectedItem?.title || 'Aperçu Playground'"
          >
            <button class="playground-modal__close" type="button" aria-label="Fermer l’aperçu" @click="closeModal">
              (fermer)
            </button>

            <div class="playground-modal__media">
              <transition :name="`slide-${transitionDirection}`">
                <div
                  v-if="activeMedia"
                  class="playground-modal__media-inner"
                  :key="`${selectedItem?.title || 'media'}-${activeMediaIndex}`"
                >
                  <template v-if="activeMedia.type === 'video'">
                    <video
                      ref="videoPlayer"
                      :key="activeMedia.src"
                      :poster="getVideoPosterSrc(activeMedia)"
                      :playsinline="true"
                      :webkit-playsinline="true"
                      preload="auto"
                      :autoplay="true"
                      :muted="true"
                      :loop="true"
                    >
                      <source v-if="activeMedia.mobileSrc" :src="activeMedia.mobileSrc" media="(max-width: 768px)" />
                      <source :src="activeMedia.src" />
                    </video>
                  </template>
                  <template v-else>
                    <OptimizedImage
                      class="playground-modal__image"
                      img-class="playground-modal__image-media"
                      :source="activeMedia.src"
                      :mobile-source="activeMedia.mobileSrc || activeMedia.src"
                      :alt="activeMedia.alt || selectedItem?.title"
                      sizes="(min-width: 1024px) 70vw, 100vw"
                    />
                  </template>
                </div>
              </transition>

              <button
                v-if="hasMultipleMedia && hasPrev"
                class="playground-modal__control playground-modal__control--prev"
                type="button"
                aria-label="Voir le visuel précédent"
                @click.stop="goToPrevMedia"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </button>
              <button
                v-if="hasMultipleMedia && hasNext"
                class="playground-modal__control playground-modal__control--next"
                type="button"
                aria-label="Voir le visuel suivant"
                @click.stop="goToNextMedia"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </button>
            </div>

            <div class="playground-modal__text-row" v-if="modalText || hasMultipleMedia">
              <div class="playground-modal__text__div" v-if="modalText">
                <p class="playground-modal__text">
                  {{ modalText }}
                </p>
              </div>
              <div v-if="hasMultipleMedia" class="playground-modal__counter">
                {{ activeMediaIndex + 1 }} / {{ mediaItems.length }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import PlaygroundCard from '@/components/PlaygroundCard.vue'
import OptimizedImage from '@/components/OptimizedImage.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const COLUMN_COUNT = 4
const orderedColumns = computed(() => {
  const buckets = Array.from({ length: COLUMN_COUNT }, () => [])
  const source = Array.isArray(props.items) ? props.items : []

  source.forEach((item, index) => {
    const columnIndex = index % COLUMN_COUNT
    buckets[columnIndex].push(item)
  })

  return buckets
})

const selectedItem = ref(null)
const videoPlayer = ref(null)
const activeMediaIndex = ref(0)
const transitionDirection = ref('next')
const previousStyles = ref({
  body: {
    overflow: '',
    position: '',
    top: '',
    width: ''
  },
  html: {
    overflow: ''
  }
})
const scrollPosition = ref(0)

const mediaItems = computed(() => {
  if (!selectedItem.value) {
    return []
  }

  // Cas 1: L'item a une propriété `media` (le cas le plus courant)
  if (Array.isArray(selectedItem.value.media) && selectedItem.value.media.length > 0) {
    return selectedItem.value.media.map((media) => {
      // On s'assure que le poster est une chaîne de caractères
      if (media.type === 'video' && media.poster && typeof media.poster === 'object') {
        return { ...media, poster: media.poster.src }
      }
      return media
    })
  }

  // Cas 2: L'item n'a pas de `media`, mais une propriété `image` (fallback)
  const { image, mobileImage, title } = selectedItem.value
  if (image) {
    // Si l'image principale est une vidéo
    if (typeof image === 'object' && image.type === 'video') {
      return [{
        type: 'video',
        src: image.src,
        mobileSrc: image.mobileSrc,
        poster: image.poster?.src || image.poster,
        alt: title
      }]
    }
    // Si c'est une image simple
    return [
      { type: 'image', src: image, mobileSrc: mobileImage || image, alt: title }
    ]
  }

  return []
})

const activeMedia = computed(() => mediaItems.value[activeMediaIndex.value] || null)
const hasMultipleMedia = computed(() => mediaItems.value.length > 1)
const modalText = computed(() => selectedItem.value?.modalText || selectedItem.value?.title || '')
const hasPrev = computed(() => activeMediaIndex.value > 0)
const hasNext = computed(() => activeMediaIndex.value < mediaItems.value.length - 1)

const getVideoPosterSrc = (media) => {
  if (!media || !media.poster) return ''
  return typeof media.poster === 'object' ? media.poster.src : media.poster
}

const playActiveVideo = async () => {
  console.log('[playActiveVideo] Tentative de lecture vidéo.')
  // On attend que Vue mette à jour le DOM pour que `videoPlayer` soit disponible
  await nextTick()

  const media = activeMedia.value
  console.log('[playActiveVideo] Média actif:', media)

  if (media?.type === 'video' && videoPlayer.value) {
    console.log('[playActiveVideo] Élément vidéo trouvé:', videoPlayer.value)

    // Forcer le rechargement de la source. C'est crucial.
    videoPlayer.value.load()
    console.log('[playActiveVideo] Appel de video.load()')

    try {
      const playPromise = videoPlayer.value.play()
      if (playPromise !== undefined) {
        console.log('[playActiveVideo] Appel de video.play() en cours...')
        await playPromise
        console.log('[playActiveVideo] SUCCÈS: La vidéo est en cours de lecture.')
      }
    } catch (error) {
      console.error('[playActiveVideo] ERREUR lors de la lecture vidéo:', error.name, error.message)
      // On peut tenter de jouer en mode `muted` si ce n'est pas déjà le cas,
      // mais les attributs sont déjà sur la balise.
      // L'erreur est probablement due à une politique du navigateur (ex: mode économie d'énergie).
    }
  } else if (media?.type === 'video') {
    console.warn('[playActiveVideo] Le média est une vidéo, mais l\'élément <video> (ref="videoPlayer") n\'a pas été trouvé dans le DOM.')
  } else {
    console.log('[playActiveVideo] Le média actif n\'est pas une vidéo.')
  }
}

const openModal = async (item) => {
  selectedItem.value = item
  activeMediaIndex.value = 0
  transitionDirection.value = 'next'
  await playActiveVideo()
}

const closeModal = () => {
  selectedItem.value = null
}

const goToNextMedia = async () => {
  if (!mediaItems.value.length || activeMediaIndex.value >= mediaItems.value.length - 1) return
  transitionDirection.value = 'next'
  activeMediaIndex.value = Math.min(activeMediaIndex.value + 1, mediaItems.value.length - 1)
  await playActiveVideo()
}

const goToPrevMedia = async () => {
  if (!mediaItems.value.length || activeMediaIndex.value <= 0) return
  transitionDirection.value = 'prev'
  activeMediaIndex.value = Math.max(activeMediaIndex.value - 1, 0)
  await playActiveVideo()
}

const handleKeydown = (event) => {
  if (!selectedItem.value) return
  if (event.key === 'Escape') {
    closeModal()
  } else if (event.key === 'ArrowRight' && hasMultipleMedia.value) {
    goToNextMedia()
  } else if (event.key === 'ArrowLeft' && hasMultipleMedia.value) {
    goToPrevMedia()
  }
}

const getLenisInstance = () => (typeof window !== 'undefined' ? window.__lenis : null)

const getScrollValue = () => {
  if (typeof document === 'undefined') return 0

  const body = document.body
  const html = document.documentElement
  return window.scrollY || html.scrollTop || body.scrollTop || 0
}

const lockScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const lenis = getLenisInstance()
  const body = document.body
  const html = document.documentElement
  scrollPosition.value = getScrollValue()

  previousStyles.value = {
    body: {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width
    },
    html: {
      overflow: html.style.overflow
    }
  }

  lenis?.stop?.()
  body.style.overflow = 'hidden'
  body.style.position = 'fixed'
  body.style.top = `-${scrollPosition.value}px`
  body.style.width = '100%'
  html.style.overflow = 'hidden'
}

const unlockScroll = () => {
  if (typeof document === 'undefined') return
  const lenis = getLenisInstance()
  const body = document.body
  const html = document.documentElement
  const { body: bodyStyles, html: htmlStyles } = previousStyles.value

  body.style.overflow = bodyStyles.overflow || ''
  body.style.position = bodyStyles.position || ''
  body.style.top = bodyStyles.top || ''
  body.style.width = bodyStyles.width || ''
  html.style.overflow = htmlStyles.overflow || ''

  if (typeof window !== 'undefined') {
    const target = scrollPosition.value || 0
    window.scrollTo(0, target)
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { immediate: true })
    }
    lenis?.start?.()
  }
}

watch(
  () => selectedItem.value,
  (value) => {
    if (value) {
      document.body.classList.add('playground-open')
      lockScroll()
    } else {
      document.body.classList.remove('playground-open')
      unlockScroll()
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  unlockScroll()
})
</script>

<style scoped>
#playground {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.playground__content {
  display: flex;
  gap: 2rem;
}

.playground__content--grid {
  flex-direction: row;

  @media screen and (max-width: 768px) {
    display: none;
  }
}

.playground__content--stacked {
  display: none;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
  }
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    gap: 1rem;
    display: none;
  }

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    &:nth-child(4) {
      display: none;
    }
  }
}

@media screen and (min-width: 1281px) {
  .playground__content .col:nth-child(3) :deep(.playground__item:nth-child(2)),
  .playground__content .col:nth-child(2) :deep(.playground__item:nth-child(1)) {
    /* height: 320px !important; */
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.35s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.playground-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(10, 10, 16, 0.65);
  backdrop-filter: blur(16px);
  animation: overlay-in 0.35s ease forwards;
  z-index: 999;
}

@keyframes overlay-in {
  from {
    background: rgba(10, 10, 16, 0.08);
    backdrop-filter: blur(0px);
  }
  to {
    background: rgba(10, 10, 16, 0.35);
    backdrop-filter: blur(16px);
  }
}

.playground-modal__content {
  position: relative;
  width: min(960px, 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  color: #fff;
}

.playground-modal__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  /* border-radius: 1rem; */
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.playground-modal__media-inner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.playground-modal__media video,
:deep(.playground-modal__image) {
  width: 100%;
  height: 100%;
  display: block;
}

:deep(.playground-modal__image-media),
.playground-modal__media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.5s ease;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  position: absolute !important;
  inset: 0;
  width: 100%;
  height: 100%;
}

.slide-next-enter-from,
.slide-prev-leave-to {
  transform: translateX(100%);
}

.slide-next-leave-to,
.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-next-enter-to,
.slide-next-leave-from,
.slide-prev-enter-to,
.slide-prev-leave-from {
  transform: translateX(0);
}

.playground-modal__text {
  font-size: 0.95rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  max-width: 80ch;
}

.playground-modal__text__div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.playground-modal__text-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.playground-modal__close {
  top: -1rem;
  right: -1rem;
  background-color: transparent;
  color: #FFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.playground-modal__control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.playground-modal__control:hover {
  background: rgba(0, 0, 0, 0.65);
  border-color: rgba(255, 255, 255, 0.6);
}

.playground-modal__control svg {
  width: 1.2rem;
  height: 1.2rem;
}

.playground-modal__control--prev {
  left: 1rem;
}

.playground-modal__control--next {
  right: 1rem;
}

.playground-modal__counter {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
}

@media screen and (max-width: 768px) {
  .playground-modal {
    padding: 1.5rem;
  }

  .playground-modal__content {
    width: 100%;
  }

  .playground-modal__media {
    aspect-ratio: 4 / 5;
  }

  .playground-modal__close {
    top: -0.5rem;
    right: -0.5rem;
  }
}
</style>
