<template>
  <section class="projet">
    <div class="project__heading">
      <h2>{{ title }}</h2>
      <ProjectLabel v-if="type" :type="type" />
    </div>

    <div v-if="intro || description" class="projet__text">
      <p v-if="description" class="line-height--150">{{ description }}</p>
    </div>

    <div v-if="hasInfos" class="infos">
      <div v-if="services.length" class="services">
        <h3 class="text--secondary">Services</h3>
        <p v-for="(service, index) in services" :key="`${service}-${index}`">{{ service }}</p>
      </div>
      <div v-if="team.length" class="team">
        <h3 class="text--secondary">En collaboration avec</h3>
        <LinkItem v-for="(item, index) in team" :key="`${item.label}-${index}`" :href="item.href" :to="item.to"
          :label="item.label" :secondary="item.secondary" :external="Boolean(item.external)" />
      </div>
    </div>

    <div v-if="links.length" class="links">
      <LinkItem v-for="(link, index) in links" :key="`${link.label}-${index}`" :href="link.href" :to="link.to"
        :label="link.label" :secondary="link.secondary" :external="Boolean(link.external)" />
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
    max-width: 64%;
  }

  @media screen and (min-width: 1700px) {
    max-width: 50%;
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
