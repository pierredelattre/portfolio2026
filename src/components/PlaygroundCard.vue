<template>
  <div class="playground__item">
    <img :src="image" :alt="title" loading="lazy" />
    <p class="title">{{ title }}</p>
    <p class="date text--secondary">{{ date }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.playground__item {
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 100%;
}

.playground__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.playground__item .title {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  transition: left 0.4s ease;
}

.playground__item .date {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  transition: right 0.4s ease;
}

.playground__item:hover .date {
  right: 1.5rem;
}

.playground__item:hover .title {
  left: 1.5rem;
}

.playground__item:hover img {
  transform: scale(1.05);
}
</style>
