import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import ProductDashboard from '../views/ProductPage.vue';
import CustomerDashboard from '../views/CustomerPage.vue';
import SellerPage from '../views/SellerPage.vue';
import NotFound from "../layouts/NotFound.vue";
import ContactAdmin from "../layouts/ContactAdmin.vue";
import Dashboard from "../views/DashboardPage.vue";

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
          component: Dashboard,
        },
        {
          path: 'product',
          name: 'product',
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
        {
          path: 'contact-admin',
          name: 'contact-admin',
          component: ContactAdmin,
        },
      ],
    },

    // error link not found
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router
