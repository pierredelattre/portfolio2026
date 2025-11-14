<template>
  <section class="layout layout-grid-scroll">
    <div class="col images-grid">
      <img
        v-for="(image, index) in parsedImages"
        :key="`${image.src}-${index}`"
        :src="image.src"
        :alt="image.alt || title"
      />
    </div>
    <div class="col text">
      <h3>{{ title }}</h3>
      <p class="line-height--150">{{ text }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
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

const parsedImages = computed(() =>
  props.images.map((image) => {
    if (typeof image === 'string') {
      return { src: image, alt: '' }
    }
    return {
      src: image?.src || '',
      alt: image?.alt || ''
    }
  })
)
</script>

<style scoped>
.layout-grid-scroll {
  position: relative;

  & > .images-grid {
    position: relative;
    grid-column: 1 / 9;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media screen and (max-width: 768px) {
      grid-column: 1 / 17;
      grid-row: 2;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media screen and (min-width: 768px) and (max-width: 1280px) {
      grid-column: 1 / 17;
      grid-row: 2;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto auto;
    }

    & > img {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;

      &:nth-child(1) {
        height: 540px;
        grid-column: 1 / 3;
        grid-row: 1;

        @media screen and (max-width: 768px) {
          height: 320px;
        }

        @media screen and (min-width: 768px) and (max-width: 1280px) {
          grid-column: 1 / 3;
          grid-row: 1;
        }
      }

      &:nth-child(2),
      &:nth-child(3) {
        @media screen and (min-width: 768px) and (max-width: 1280px) {
          height: 320px;
        }
      }

      @media screen and (max-width: 768px) {
        height: 320px;
        grid-column: 1 / 3;
      }
    }
  }

  & > .text {
    grid-column: 9 / 17;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: start;
    gap: 1rem;

    & p {
      max-width: 70%;
      line-height: 1.5;

      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }

    @media screen and (min-width: 1280px) {
      top: 2rem;
      position: sticky;
    }

    @media screen and (max-width: 1280px) {
      grid-column: 1 / 17;
      grid-row: 1;
    }

    @media screen and (max-width: 768px) {
      grid-column: 1 / 17;
    }
  }
}
</style>
