<template>
  <div class="optimized-image" :class="[rootClass, { 'is-loaded': isLoaded }]" v-bind="rootAttrs">
    <div class="optimized-image__skeleton" aria-hidden="true"></div>
    <picture v-if="shouldRenderPicture" class="optimized-image__picture">
      <template v-if="hasMobileSources">
        <template v-for="(srcset, type) in mobileSources" :key="`mobile-${type}`">
          <source :srcset="srcset" :type="formatType(type)" :media="mobileMediaQuery" :sizes="sizesAttr" />
        </template>
        <source
          v-if="mobileFallbackSrcset"
          :srcset="mobileFallbackSrcset"
          :media="mobileMediaQuery"
          :sizes="sizesAttr"
        />
      </template>
      <template v-for="(srcset, type) in resolvedSources" :key="type">
        <source :srcset="srcset" :type="formatType(type)" :sizes="sizesAttr" />
      </template>
      <img
        :src="imgAttrs.src"
        :alt="alt"
        :width="imgAttrs.w || undefined"
        :height="imgAttrs.h || undefined"
        :loading="loadingAttr"
        :decoding="decoding"
        :fetchpriority="fetchpriority"
        :sizes="sizesAttr"
        :class="['optimized-image__img', imgClass]"
        @load="handleLoad"
        @error="handleError"
      />
    </picture>
    <img
      v-else
      class="optimized-image__fallback"
      :src="imgAttrs.src"
      :alt="alt"
      :loading="loadingAttr"
      :decoding="decoding"
      :fetchpriority="fetchpriority"
      :sizes="sizesAttr"
      :class="['optimized-image__img', imgClass]"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<script setup>
import { computed, ref, useAttrs, watch } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  source: {
    type: [String, Object],
    required: true
  },
  mobileSource: {
    type: [String, Object],
    default: null
  },
  mobileMedia: {
    type: String,
    default: '(max-width: 768px)'
  },
  alt: {
    type: String,
    default: ''
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['lazy', 'eager', 'auto'].includes(value)
  },
  decoding: {
    type: String,
    default: 'async',
    validator: (value) => ['sync', 'async', 'auto'].includes(value)
  },
  fetchpriority: {
    type: String,
    default: 'auto',
    validator: (value) => ['high', 'low', 'auto'].includes(value)
  },
  sizes: {
    type: String,
    default: '100vw'
  },
  imgClass: {
    type: [String, Array, Object],
    default: ''
  }
})

const attrs = useAttrs()
const isLoaded = ref(false)

const isPictureObject = (value) => typeof value === 'object' && value !== null && 'img' in value && 'sources' in value

const normalizeSource = (value) => {
  if (!value) {
    return {
      isPicture: false,
      sources: {},
      img: { src: '' }
    }
  }

  if (isPictureObject(value)) {
    return {
      isPicture: true,
      sources: value.sources || {},
      img: value.img || { src: '' }
    }
  }

  if (typeof value === 'string') {
    return {
      isPicture: false,
      sources: {},
      img: { src: value }
    }
  }

  if (typeof value === 'object' && 'src' in value) {
    return {
      isPicture: false,
      sources: {},
      img: { src: value.src }
    }
  }

  return {
    isPicture: false,
    sources: {},
    img: { src: '' }
  }
}

const normalizedSource = computed(() => normalizeSource(props.source))
const normalizedMobileSource = computed(() => (props.mobileSource ? normalizeSource(props.mobileSource) : null))

const resolvedSources = computed(() => normalizedSource.value.sources || {})
const mobileSources = computed(() => normalizedMobileSource.value?.sources || {})

const imgAttrs = computed(() => normalizedSource.value.img || { src: '' })

const hasMobileSources = computed(() => {
  if (!normalizedMobileSource.value) return false
  if (Object.keys(mobileSources.value).length > 0) return true
  return Boolean(normalizedMobileSource.value.img?.src)
})

const mobileFallbackSrcset = computed(() => {
  if (!normalizedMobileSource.value) return ''
  if (Object.keys(mobileSources.value).length > 0) return ''
  return normalizedMobileSource.value.img?.src || ''
})

const shouldRenderPicture = computed(() => {
  const hasMainSources = Object.keys(resolvedSources.value).length > 0
  return hasMainSources || hasMobileSources.value
})

const loadingAttr = computed(() => props.loading || 'auto')
const sizesAttr = computed(() => props.sizes || undefined)
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
const rootClass = computed(() => attrs.class)
const mobileMediaQuery = computed(() => props.mobileMedia)

const resetLoadingState = () => {
  isLoaded.value = false
}

const handleLoad = () => {
  isLoaded.value = true
}

const handleError = () => {
  isLoaded.value = true
}

const formatType = (value) => {
  if (!value) return undefined
  return value.includes('/') ? value : `image/${value}`
}

watch(
  () => [props.source, props.mobileSource],
  () => {
    resetLoadingState()
  }
)
</script>

<style scoped>
.optimized-image {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.optimized-image__picture,
.optimized-image__fallback {
  display: block;
  width: 100%;
  height: 100%;
}

.optimized-image__img {
  display: block;
  width: 100%;
  height: 100%;
}

.optimized-image__skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.16) 20%, rgba(255, 255, 255, 0.08) 40%);
  background-size: 200% 100%;
  animation: optimized-image-shimmer 1.6s ease-in-out infinite;
  transition: opacity 0.35s ease;
}

.optimized-image.is-loaded .optimized-image__skeleton {
  opacity: 0;
  pointer-events: none;
}

@keyframes optimized-image-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
