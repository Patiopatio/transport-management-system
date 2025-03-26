import { createRouter, createWebHistory } from 'vue-router'
import DriversView from '@/views/DriversView.vue'
import ToursView from '@/views/ToursView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/drivers',
    },
    {
      path: '/drivers',
      name: 'Drivers',
      component: DriversView,
    },
    {
      path: '/tours',
      name: 'Tours',
      component: ToursView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
