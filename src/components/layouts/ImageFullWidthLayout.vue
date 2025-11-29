<template>
  <section class="layout layout__image-fwidth">
    <OptimizedImage
      class="layout__image-fwidth-media"
      img-class="layout__image-fwidth-img"
      :source="imageSrc"
      :mobile-source="imageMobileSrc"
      :alt="imageAlt"
      sizes="100vw"
    />
    <div class="text">
      <h3 :style="secondary ? 'color: oklch(14% 0 271)' : ''">{{ title }}</h3>
      <p :style="secondary ? 'color: oklch(14% 0 271)' : ''">{{ text }}</p>
    </div>
  </section>
</template>

<script setup>
import OptimizedImage from '@/components/OptimizedImage.vue'

defineProps({
  imageSrc: {
    type: [String, Object],
    required: true
  },
  imageMobileSrc: {
    type: [String, Object],
    default: ''
  },
  imageAlt: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  secondary: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.layout.layout__image-fwidth {
  position: relative;
  overflow: hidden;

  & :deep(.layout__image-fwidth-media) {
    grid-column: 1;
    width: 100%;
    height: 100%;
    display: block;
  }

  & :deep(.layout__image-fwidth-img) {
    grid-column: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  &>.text {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;
    width: calc(100% - 4rem);

    @media screen and (max-width: 768px) {
      bottom: 1rem;
      left: 1rem;
      width: calc(100% - 2rem);
    }

    &>p {
      max-width: 30%;
      line-height: 1.5;
      white-space: pre-line;

      @media screen and (min-width: 768px) and (max-width: 1280px) {
        max-width: 64%;
      }

      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }

    &>p:not(.text--secondary),
    &>h3:not(.text--secondary) {
      color: var(--surface);
    }
  }

  @media screen and (max-width: 768px) {

    &>h3,
    &>p {
      grid-column: 1;
    }
  }
}
</style>
