import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'


createApp(App).use(Vue3Marquee).use(createPinia()).use(router).mount('#app')
