import { createRouter, createWebHistory } from 'vue-router'
import Salmo from '../views/Salmo.vue'

import Penitenziali from '../views/Penitenziali.vue'
import LibroDeiSalmi from '../views/blog/LibroDeiSalmi.vue'
import changelog from '../views/blog/changelog.vue'

import Words from '../views/Words.vue'
import Book from '../views/Book.vue'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import WordsOfLight from '../views/WordsOfLight.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  { path: '/s/:number', name: 'salmo', component: Salmo },
  { path: '/b/:number', name: 'book', component: Book },
  
  { path: '/penitenziali', name: 'penitenziali', component: Penitenziali },
  { path: '/blog/libro-dei-salmi', name: 'libroDeiSalmi', component: LibroDeiSalmi },
  { path: '/blog/changelog', name: 'changelog', component: changelog },

  { path: '/words', name: 'words', component: Words },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/parole-di-luce', name: 'wordsoflight', component: WordsOfLight },

  { path: '/', name: 'home', component: Home },
  {  path: '/:pathMatch(.*)*', name: 'pagenotfound', component: PageNotFound },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: '/app/salmi/',
  routes
})

export default router
