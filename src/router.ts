import VueRouter from 'vue-router';
import Cards from './views/Cards.vue';
import Vue from 'vue'
import Sign from '@/views/Sign.vue';
import HomePage from "@/views/HomePage.vue";
import SubscribesPage from "@/views/SubscriptionsPage.vue";
import MapPage from "@/views/MapPage.vue";
import FavoritesPage from "@/views/FavoritesPage.vue";
import AppTemplate from "@/views/AppTemplate.vue";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign
    },
    {
      path: '/home',
      name: 'home',
      component: AppTemplate,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomePage,
        }
      ]
    },
    {
      path: '/cards',
      name: 'cards',
      component: Cards
    },
    {
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      path: '/subscriptions',
      name: 'subscriptions',
      component: AppTemplate,
      children: [
        {
          path: "/subscriptions",
          name: "subscriptions",
          component: SubscribesPage
        }
      ]
    },
    {
      path: '/map',
      name: 'map',
      component: AppTemplate,
      children: [
        {
          path: "/map",
          name: "map",
          component: MapPage
        }
      ]
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: AppTemplate,
      children: [
        {
          path: "/favorites",
          name: "favorites",
          component: FavoritesPage
        }
      ]
    }
  ]
});

export default router;
