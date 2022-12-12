import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ItemMusic from '../views/ItemMusic.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import infoUser from '../views/infoUser.vue'
import {useMusic} from "../store/music.js"


// const routes = []
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/itemMusic',
            name: 'ItemMusic',
            component: ItemMusic
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/infoUser',
            name: 'InfoUser',
            component: infoUser,
            // beforeEnter: (to, from, next) => {
            //     if () {
            //         next()
            //     } else {
            //         next('/login')
            //     }
            // }
        }
    ]
})
export default router

