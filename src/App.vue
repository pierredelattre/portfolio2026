<template>
  <div id="page-hero">
    <div id="page-bg" aria-hidden="true"></div>
    <!-- <div id="overlay" aria-hidden="true"></div> -->
    <Header />
  </div>
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>
