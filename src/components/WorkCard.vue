<template>
  <div class="projet">
    <component :is="imageLinkComponent" v-bind="imageLinkProps" data-link>
      <div class="projet__image">
        <template v-if="isVideo">
          <video
            class="projet__image-media"
            :poster="videoPoster"
            autoplay
            muted
            loop
            playsinline
            webkit-playsinline
            preload="auto"
          >
            <source v-if="videoMobileSrc" :src="videoMobileSrc" media="(max-width: 768px)" />
            <source :src="videoSrc" />
          </video>
        </template>
        <OptimizedImage
          v-else
          class="projet__image-media"
          img-class="projet__image-tag"
          :source="work.cover"
          :alt="work.title"
          sizes="(min-width: 1600px) 70vw, (min-width: 1280px) 75vw, (min-width: 768px) 90vw, 90vw"
          :loading="priority ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : 'auto'"
        />
      </div>
    </component>
    <div class="projet__content">
      <div class="projet__content__title">
        <h4>{{ work.title }}</h4>
        <div class="tags">
          <TagItem v-for="tag in work.tags" :key="tag" :label="tag" />
        </div>
      </div>
      <p class="text--secondary">{{ work.intro }}</p>
    </div>
    <LinkItem 
      v-bind="linkProps" 
    />
  </div>
</template>

<script setup>
import { computed, toRef } from 'vue'
import { RouterLink } from 'vue-router'
import LinkItem from './LinkItem.vue'
import TagItem from './TagItem.vue'
import OptimizedImage from '@/components/OptimizedImage.vue'

const props = defineProps({
  work: {
    type: Object,
    required: true
  },
  priority: {
    type: Boolean,
    default: false
  }
})

const work = toRef(props, 'work')
const workLink = computed(() => work.value.route || '/')
const isVideo = computed(() => work.value.cover && typeof work.value.cover === 'object' && work.value.cover.src)

const normalizeVideoAsset = (asset) => {
  if (!asset) return ''
  if (typeof asset === 'string') return asset
  if (typeof asset === 'object') {
    if (asset.src) return asset.src
    if (asset.img && asset.img.src) return asset.img.src
  }
  return ''
}

const videoSrc = computed(() => (isVideo.value ? normalizeVideoAsset(work.value.cover.src) : ''))
const videoMobileSrc = computed(() => (isVideo.value ? normalizeVideoAsset(work.value.cover.mobile) : ''))
const videoPoster = computed(() => (isVideo.value ? normalizeVideoAsset(work.value.cover.poster) : ''))

const imageLinkComponent = computed(() => {
  // Si le projet a des liens externes et pas de route interne, utiliser un lien externe
  if (work.value.links && work.value.links.length > 0 && !work.value.route) {
    return 'a'
  }
  // Sinon, utiliser RouterLink pour les liens internes
  return 'RouterLink'
})

const imageLinkProps = computed(() => {
  // Si c'est un lien externe
  if (imageLinkComponent.value === 'a') {
    const firstLink = work.value.links[0]
    return {
      href: firstLink.href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  // Si c'est un lien interne
  return {
    to: workLink.value
  }
})

const linkProps = computed(() => {
  // Si il y a des liens externes et pas de route interne, utiliser le premier lien externe
  if (work.value.links && work.value.links.length > 0 && !work.value.route) {
    const firstLink = work.value.links[0]
    return {
      href: firstLink.href,
      label: firstLink.label || 'Découvrir',
      external: firstLink.external || false,
      secondary: firstLink.secondary || false
    }
  }
  
  // Sinon, utiliser le lien interne vers la page projet
  return {
    to: workLink.value,
    label: 'Découvrir'
  }
})
</script>

<style scoped>
.projet {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  & a:has(.projet__image) {
    width: 100%;
  }

  & .projet__content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > p {
      line-height: 1.5;
    }
  }

  & .projet__content__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  & .projet__image {
    overflow: hidden;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      width: 100%;
      height: auto;
    }

    @media screen and (min-width: 769px) and (max-width: 1280px) {
      width: 100%;
      height: auto;
    }

    & :deep(.projet__image-media) {
      display: block;
      width: 100%;
      height: 100%;
    }

    & :deep(video) {
      transition: transform 0.4s ease;
    }
 
    & :deep(.projet__image-tag) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;

      @media screen and (max-width: 768px) {
        height: 320px;
      }

      @media screen and (min-width: 769px) and (max-width: 1280px) {
        height: 340px;
      }
    }

    & video {
      @media screen and (min-width: 769px) and (max-width: 1280px) {
        height: 340px!important;
        object-fit: cover;
      }
    }
  }

  & .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
}

.projet:hover .projet__image :deep(.projet__image-tag),
.projet:hover .projet__image video {
  transform: scale(1.05);
}
</style>
