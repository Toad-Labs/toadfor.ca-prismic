import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const BlogLandingPage = () => import('../views/BlogLandingPage.vue');
const BlogPostPage = () => import('../views/BlogPostPage.vue');
const LandingPage = () => import('../views/LandingPage.vue');
const ContentPage = () => import('../views/ContentPage.vue');
const NotFound = () => import('../views/NotFound.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/blog',
      name: 'blog-posts',
      component: BlogLandingPage
    },
    {
      path: '/blog/:uid',
      name: 'blog-post',
      component: BlogPostPage
    },
    {
      path: '/landing/:uid',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/page/:uid',
      name: 'content-page',
      component: ContentPage
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect:
      {
        name: 'not-found'
      }
    }
  ],
});
