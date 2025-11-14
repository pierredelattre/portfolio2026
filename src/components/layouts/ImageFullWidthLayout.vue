<template>
  <section class="layout layout__image-fwidth">
    <img :src="imageSrc" :alt="imageAlt" />
    <div class="text">
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
</script>

<style scoped>
.layout.layout__image-fwidth {
  position: relative;
  overflow: hidden;

  &>img {
    grid-column: 1;
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
      max-width: 40%;
      line-height: 1.5;

      @media screen and (min-width: 768px) and (max-width: 1280px) {
        max-width: 70%;
      }

      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }

    &>p,
    &>h3 {
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
