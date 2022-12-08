import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ItemMusic from '../views/ItemMusic.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/itemMusic',
        name: 'ItemMusic',
        component: ItemMusic
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router

