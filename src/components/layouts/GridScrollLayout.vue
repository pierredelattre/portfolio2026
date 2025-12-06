<template>
  <section class="layout layout-grid-scroll">
    <div class="col images-grid">
      <OptimizedImage
        v-for="(image, index) in parsedImages"
        :key="`${image.src?.img?.src || image.src}-${index}`"
        class="grid-scroll-image"
        img-class="grid-scroll-image-media"
        :source="image.src"
        :mobile-source="image.mobileSrc"
        :alt="image.alt || title"
        sizes="(min-width: 1280px) 25vw, 100vw"
      />
    </div>
    <div class="col text">
      <h3>{{ title }}</h3>
      <template v-if="hasRichText">
        <div v-for="(block, index) in richTextBlocks" :key="`rich-text-${index}`" class="grid-scroll-text__block">
          <p v-if="block.description" class="line-height--150" v-html="block.description"></p>
          <div v-if="block.ideas.length" class="grid-scroll-text__ideas">
            <div v-for="idea in block.ideas" :key="`idea-${idea.label}-${index}`" class="grid-scroll-text__idea">
              <span class="grid-scroll-text__idea-index">{{ idea.label }}</span>
              <p class="grid-scroll-text__idea-text" v-html="idea.text"></p>
            </div>
          </div>
        </div>
      </template>
      <p v-else class="line-height--150" v-html="text"></p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import OptimizedImage from '@/components/OptimizedImage.vue'

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
    type: [String, Array],
    required: true
  }
})

const ideaKeys = ['1', '2', '3']

const richTextBlocks = computed(() => {
  if (!Array.isArray(props.text)) {
    return []
  }

  return props.text
    .map((block = {}) => {
      const ideas = ideaKeys
        .map((key) => {
          const value = block?.[key]

          if (!value) {
            return null
          }

          return {
            label: key,
            text: value
          }
        })
        .filter(Boolean)

      return {
        description: block?.description || '',
        ideas
      }
    })
    .filter((block) => block.description || block.ideas.length)
})

const hasRichText = computed(() => richTextBlocks.value.length > 0)

const isPicture = (value) => typeof value === 'object' && value !== null && 'img' in value && 'sources' in value

const parsedImages = computed(() =>
  props.images.map((image) => {
    if (typeof image === 'string' || isPicture(image)) {
      return { src: image, mobileSrc: '', alt: '' }
    }
    return {
      src: image?.src || '',
      mobileSrc: image?.mobileSrc || '',
      alt: image?.alt || ''
    }
  })
)
</script>

<style scoped>
.layout-grid-scroll {
  position: relative;

  &>.images-grid {
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

    & :deep(.grid-scroll-image) {
      width: 100%;
      height: auto;
      display: block;
    }

    & :deep(.grid-scroll-image-media) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    & :deep(.grid-scroll-image:nth-child(1)) {
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

    & :deep(.grid-scroll-image:nth-child(2)),
    & :deep(.grid-scroll-image:nth-child(3)) {
      @media screen and (min-width: 768px) and (max-width: 1280px) {
        height: 320px;
      }
    }

    @media screen and (max-width: 768px) {
      & :deep(.grid-scroll-image) {
        height: 320px;
        grid-column: 1 / 3;
      }
    }
  }

  &>.text {
    grid-column: 9 / 17;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: start;
    gap: 1rem;

    & p {
      max-width: 64%;
      line-height: 1.5;
      white-space: pre-line;

      @media screen and (min-width: 1700px) {
        max-width: 50%;
      }


      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }

    .grid-scroll-text__block {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .grid-scroll-text__ideas {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .grid-scroll-text__idea {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: .5rem;
    }

    .grid-scroll-text__idea-index {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: var(--primary);
      padding: .25rem;
      border-radius: 999px;
      width: 16px;
      height: 16px;
    }

    .grid-scroll-text__idea:nth-child(1) .grid-scroll-text__idea-index {
      background-color: #DB1D1D;
      color: white;
    }

    .grid-scroll-text__idea:nth-child(2) .grid-scroll-text__idea-index {
      background-color: #259d1f;
      color: white;
    }

    .grid-scroll-text__idea:nth-child(3) .grid-scroll-text__idea-index {
      background-color: #2262B6;
      color: white;
    }

    .grid-scroll-text__idea-text {
      margin: 0;
      line-height: 1.5;
    }

    @media screen and (min-width: 1280px) {
      top: 8rem;
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
