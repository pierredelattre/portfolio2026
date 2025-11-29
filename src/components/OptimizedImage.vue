<template>
  <picture v-if="shouldRenderPicture" v-bind="rootAttrs">
    <template v-if="hasMobileSources">
      <template v-for="(srcset, type) in mobileSources" :key="`mobile-${type}`">
        <source :srcset="srcset" :type="type" :media="mobileMediaQuery" :sizes="sizesAttr" />
      </template>
      <source
        v-if="mobileFallbackSrcset"
        :srcset="mobileFallbackSrcset"
        :media="mobileMediaQuery"
        :sizes="sizesAttr"
      />
    </template>
    <template v-for="(srcset, type) in resolvedSources" :key="type">
      <source :srcset="srcset" :type="type" :sizes="sizesAttr" />
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
      :class="imgClass"
    />
  </picture>
  <img
    v-else
    v-bind="rootAttrs"
    :src="imgAttrs.src"
    :alt="alt"
    :loading="loadingAttr"
    :decoding="decoding"
    :fetchpriority="fetchpriority"
    :sizes="sizesAttr"
    :class="imgClass"
  />
</template>

<script setup>
import { computed, useAttrs } from 'vue'

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
const rootAttrs = computed(() => attrs)
const mobileMediaQuery = computed(() => props.mobileMedia)
</script>
