import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initPageAnimations } from './animations/pageAnimations'

import './styles/main.css'

initPageAnimations()

createApp(App).use(router).mount('#app')
