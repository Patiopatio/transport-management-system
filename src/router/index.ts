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
  ],
})

export default router
