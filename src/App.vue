<template>
  <div id="page-hero">
    <div id="page-bg" aria-hidden="true"></div>
    <!-- <div id="overlay" aria-hidden="true"></div> -->
    <Header />
  </div>
  <main>
    <RouterView :key="`view-${locale}`" />
  </main>
  <Footer :key="`footer-${locale}`" :locale="locale" />
  <SpeedInsights/>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  inject();
});
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { useLocale } from '@/i18n'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { inject } from '@vercel/analytics';

const { locale } = useLocale()
</script>
