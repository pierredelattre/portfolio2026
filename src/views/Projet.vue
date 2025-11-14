<template>
  <section class="project">
    <section class="projet" v-if="highlights.length">
      <div class="project__heading">
        <h2>{{ title }}</h2>
        <ProjectLabel v-if="type" :type="type" />
      </div>
      <p>{{ description }}</p>

      <article
        v-for="(highlight, index) in highlights"
        :key="`${highlight.title}-${index}`"
        class="project-card"
      >
        <div class="project-card__content">
          <div class="project-card__title">
            <h4>{{ highlight.title }}</h4>
            <div v-if="highlight.tags?.length" class="project-card__tags">
              <TagItem v-for="tag in highlight.tags" :key="tag" :label="tag" />
            </div>
          </div>
          <p class="text--secondary">{{ highlight.description }}</p>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ProjectLabel from '@/components/ProjectLabel.vue'
import TagItem from '@/components/TagItem.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import projectBackground from '@/assets/Frame3288.png'

const title = 'Projet'
const description = 'Case study complet du projet'
const type = 'school'

const highlights = [
  {
    title: 'Contexte',
    description:
      'Lorem ipsum dolor sit amet consectetur. Tellus sit odio duis mattis enim ipsum. Lorem placerat amet augue arcu curabitur duis non eu.',
    tags: ['UX Research']
  },
  {
    title: 'Approche',
    description:
      'Augue sit elit morbi consectetur lacus leo ullamcorper. Ornare proin viverra malesuada phasellus leo rhoncus.',
    tags: ['UI Design', 'Prototype']
  },
  {
    title: 'Impact',
    description:
      'Egestas natoque condimentum massa pellentesque sed vitae aliquam. Integer sapien erat bibendum cursus lacus.',
    tags: ['Delivery']
  }
]

const projectBg = computed(() => projectBackground)

usePageLoaded(projectBg)
</script>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.project__heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-card__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.project-card__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25rem;
}
</style>
