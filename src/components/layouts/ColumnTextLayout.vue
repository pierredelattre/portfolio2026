<template>
  <section class="layout layout__column-text">
    <div class="col image">
      <OptimizedImage
        class="layout__column-text-image"
        img-class="layout__column-text-image-media"
        :source="imageSrc"
        :mobile-source="imageMobileSrc"
        :alt="imageAlt"
        sizes="(min-width: 1600px) 90vw, (min-width: 1280px) 95vw, 90vw"
      />
    </div>
    <div class="col text">
      <h3>{{ title }}</h3>
      <p v-html="text"></p>
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
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.layout__column-text {
  &>.image {
    grid-column: 1 / 9;
    height: 540px;

    & :deep(.layout__column-text-image) {
      width: 100%;
      height: 100%;
      display: block;
    }

    & :deep(.layout__column-text-image-media) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-drag: none;
      -webkit-user-drag: none;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    @media screen and (max-width: 1280px) {
      height: 440px;
    }

    @media screen and (max-width: 768px) {
      grid-column: 1;
      height: 320px;
    }
  }

  &>.text {
    grid-column: 9 / 17;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: .5rem;

    @media screen and (max-width: 768px) {
      justify-content: flex-start;
    }

    & p {
      line-height: 1.5;
      max-width: 64%;
      white-space: pre-line;

      @media screen and (min-width: 1700px) {
        max-width: 50%;
      }

      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }

    @media screen and (max-width: 768px) {
      grid-column: 1;
    }
  }
}
</style>
