import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initPageAnimations } from './animations/pageAnimations'

import './styles/main.css'
import './styles/home.css'
import './styles/project.css'

initPageAnimations()

createApp(App).use(router).mount('#app')
