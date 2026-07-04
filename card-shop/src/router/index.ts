import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import ProductDashboard from '../views/ProductDashboard.vue';
import CustomerDashboard from '../views/CustomerDashboard.vue';
import SellerPage from '../views/SellerPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: ProductDashboard,
        },
        {
          path: 'seller',
          name: 'seller',
          component: SellerPage,
        },
        {
          path: 'customer',
          name: 'customer',
          component: CustomerDashboard,
        },
      ],
    },
  ],
});

export default router
