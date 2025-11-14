<template>
  <section class="layout layout__column-text">
    <div class="col image">
      <img :src="imageSrc" :alt="imageAlt" />
    </div>
    <div class="col text">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  imageSrc: {
    type: String,
    required: true
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

    & img {
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
      max-width: 70%;

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
