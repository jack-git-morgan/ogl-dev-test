import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../pages/ProductList.vue'
import CustomerList from '../pages/CustomerList.vue'
import Map from '../pages/Map.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/products',
      name: 'products',
      component: ProductList
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomerList
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    }
  ]
})

export default router
