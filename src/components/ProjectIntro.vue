<template>
  <section class="projet">
    <div class="project__heading">
      <h2>{{ title }}</h2>
      <ProjectLabel v-if="type" :type="type" />
    </div>

    <div v-if="intro || description" class="projet__text">
      <p v-if="intro" class="line-height--150">{{ intro }}</p>
      <p v-if="description" class="line-height--150">{{ description }}</p>
    </div>

    <div v-if="hasInfos" class="infos">
      <div v-if="services.length" class="services">
        <h3 class="text--secondary">Services</h3>
        <p v-for="(service, index) in services" :key="`${service}-${index}`">{{ service }}</p>
      </div>
      <div v-if="team.length" class="team">
        <h3 class="text--secondary">En collaboration avec</h3>
        <LinkItem
          v-for="(item, index) in team"
          :key="`${item.label}-${index}`"
          :href="item.href"
          :to="item.to"
          :label="item.label"
          :secondary="item.secondary"
          :target="item.target"
          :rel="item.rel"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            />
          </svg>
        </LinkItem>
      </div>
    </div>

    <div v-if="links.length" class="links">
      <LinkItem
        v-for="(link, index) in links"
        :key="`${link.label}-${index}`"
        :href="link.href"
        :to="link.to"
        :label="link.label"
        :secondary="link.secondary"
        :target="link.target"
        :rel="link.rel"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5V9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
          />
        </svg>
      </LinkItem>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import LinkItem from './LinkItem.vue'
import ProjectLabel from './ProjectLabel.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: ''
  },
  intro: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  services: {
    type: Array,
    default: () => []
  },
  team: {
    type: Array,
    default: () => []
  },
  links: {
    type: Array,
    default: () => []
  }
})

const hasInfos = computed(() => props.services.length > 0 || props.team.length > 0)
</script>

<style scoped>
.projet {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  grid-column: 9 / 17;

  & p {
    max-width: 70%;
  }

  @media screen and (max-width: 768px) {
    grid-column: 1;

    & p {
      max-width: 100%;
    }
  }

  & .infos {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;

    & .services,
    & .team {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.5rem;
      width: 100%;
    }
  }

  & .project__heading {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}
</style>
