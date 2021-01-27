import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from "./components/Sign";
import HomePage from "@/views/HomePage";
import SubscribesPage from "@/views/SubscriptionsPage";
import MapPage from "@/views/MapPage";
import FavoritesPage from "@/views/FavoritesPage";
import AppTemplate from "@/views/AppTemplate";


Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/sign',
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
