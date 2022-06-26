import { createRouter, createWebHistory } from 'vue-router'
import Salmo from '../views/Salmo.vue'
import Penitenziali from '../views/Penitenziali.vue'
import Words from '../views/Words.vue'
import Book from '../views/Book.vue'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  { path: '/s/:number', name: 'salmo', component: Salmo },
  { path: '/b/:number', name: 'book', component: Book },
  
  { path: '/penitenziali', name: 'penitenziali', component: Penitenziali },
  { path: '/words', name: 'words', component: Words },
  { path: '/favorites', name: 'favorites', component: Favorites },

  { path: '/', name: 'home', component: Home },
  {  path: '/:pathMatch(.*)*', name: 'pagenotfound', component: PageNotFound },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: '/app/salmi/',
  routes
})

export default router
