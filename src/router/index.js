import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const NotFound = () => import('../views/NotFound.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/:pathMatch(.*)',
      component: NotFound }
  ],
});
