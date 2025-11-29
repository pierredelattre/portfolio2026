<template>
  <div id="playground">
    <h3>Playground</h3>
    <div class="playground__content">
      <div class="col" v-for="(column, columnIndex) in columns" :key="`column-${columnIndex}`">
        <PlaygroundCard
          v-for="(item, itemIndex) in column"
          :key="`item-${columnIndex}-${itemIndex}`"
          v-bind="item"
          @select="() => openModal(item)"
        />
      </div>
    </div>

    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="selectedItem" class="playground-modal" @click.self="closeModal">
          <div class="playground-modal__content">
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
                      :src="activeMedia.src"
                      :poster="activeMedia.poster"
                      playsinline
                      preload="metadata"
                      autoplay
                      muted
                      loop
                    ></video>
                  </template>
                  <template v-else>
                    <OptimizedImage
                      class="playground-modal__image"
                      img-class="playground-modal__image-media"
                      :source="activeMedia.src"
                      :alt="activeMedia.alt || selectedItem?.title"
                      sizes="(min-width: 1024px) 70vw, 100vw"
                    />
                  </template>
                </div>
              </transition>

              <button
                v-if="hasMultipleMedia"
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
                v-if="hasMultipleMedia"
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

            <div class="playground-modal__text__div" v-if="modalText">
              <p class="playground-modal__text">
              {{ modalText }}
            </p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PlaygroundCard from '@/components/PlaygroundCard.vue'
import OptimizedImage from '@/components/OptimizedImage.vue'
import closeIcon from '@/assets/x-mark.svg'

defineProps({
  columns: {
    type: Array,
    required: true
  }
})

const selectedItem = ref(null)
const activeMediaIndex = ref(0)
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
const transitionDirection = ref('next')
const scrollPosition = ref(0)

const mediaItems = computed(() => {
  if (!selectedItem.value) return []
  if (Array.isArray(selectedItem.value.media) && selectedItem.value.media.length > 0) {
    return selectedItem.value.media
  }

  if (selectedItem.value.image) {
    return [{ type: 'image', src: selectedItem.value.image, alt: selectedItem.value.title }]
  }

  return []
})

const activeMedia = computed(() => mediaItems.value[activeMediaIndex.value] || null)
const hasMultipleMedia = computed(() => mediaItems.value.length > 1)
const modalText = computed(() => selectedItem.value?.modalText || selectedItem.value?.title || '')

const openModal = (item) => {
  selectedItem.value = item
  activeMediaIndex.value = 0
  transitionDirection.value = 'next'
}

const closeModal = () => {
  selectedItem.value = null
}

const goToNextMedia = () => {
  if (!mediaItems.value.length) return
  transitionDirection.value = 'next'
  activeMediaIndex.value = (activeMediaIndex.value + 1) % mediaItems.value.length
}

const goToPrevMedia = () => {
  if (!mediaItems.value.length) return
  transitionDirection.value = 'prev'
  activeMediaIndex.value = (activeMediaIndex.value - 1 + mediaItems.value.length) % mediaItems.value.length
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

const lockScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const body = document.body
  const html = document.documentElement
  scrollPosition.value = window.scrollY || html.scrollTop || body.scrollTop || 0

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

  body.style.overflow = 'hidden'
  body.style.position = 'fixed'
  body.style.top = `-${scrollPosition.value}px`
  body.style.width = '100%'
  html.style.overflow = 'hidden'
}

const unlockScroll = () => {
  if (typeof document === 'undefined') return
  const body = document.body
  const html = document.documentElement
  const { body: bodyStyles, html: htmlStyles } = previousStyles.value

  body.style.overflow = bodyStyles.overflow || ''
  body.style.position = bodyStyles.position || ''
  body.style.top = bodyStyles.top || ''
  body.style.width = bodyStyles.width || ''
  html.style.overflow = htmlStyles.overflow || ''

  if (typeof window !== 'undefined') {
    window.scrollTo(0, scrollPosition.value || 0)
  }
}

watch(
  () => selectedItem.value,
  (value) => {
    if (value) {
      lockScroll()
    } else {
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
  flex-direction: row;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
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
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  font-size: 0.85rem;
  padding: 0.2rem 0.75rem;
  /* border-radius: 999px; */
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
