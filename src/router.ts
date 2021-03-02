import VueRouter from 'vue-router';
import Cards from './views/Cards.vue';
import Vue from 'vue'
import Sign from '@/views/Sign.vue';
import SignWrapper from '@/views/SignWrapper.vue'
import HomePage from "@/views/HomePage.vue";
import SubscribesPage from "@/views/SubscriptionsPage.vue";
import MapPage from "@/views/MapPage.vue";
import FavoritesPage from "@/views/FavoritesPage.vue";
import AppTemplate from "@/views/AppTemplate.vue";
import Table from '@/components/Table.vue';
import AddingDiscount from '@/views/AddingDiscount.vue';
import Detail from '@/views/Detail.vue';
import ErrorPage from '@/views/ErrorPage.vue';
import StatisticPage from "@/views/StatisticPage.vue"

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    routes: [
        {
            path: '/location',
            name: 'sign',
            component: Sign
        },
        {
            path: '/',
            name: 'signWrapper',
            component: SignWrapper
        },
        // {
        //     path: '/',
        //     name: 'table',
        //     component: Table
        // },
        {
            path: '/home',
            name: 'homePage',
            component: AppTemplate,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: HomePage,
                }
            ]
        },
        {
            path: '/home',
            name: 'home',
            component: AppTemplate,
            children: [
                {
                    path: '/detail/:_id',
                    name: 'detail',
                    component: Detail,
                    props: true
                }]
        },
        // {
        //     path: '/home',
        //     name: 'home',
        //     component: AppTemplate,
        //     children: [
        //         {
        //             path: '/cards',
        //             name: 'cards',
        //             component: Cards,
        //         }
        //     ]
        // },
        {
            path: '/home',
            name: 'home',
            component: AppTemplate,
            children: [
                {
                    path: '/editing/:idOfDiscount',
                    name: 'editingDetails',
                    component: AddingDiscount,
                    props: true
                }]
        },
        {
            path: '/home',
            name: 'home',
            component: AppTemplate,
            children: [
                {
                    path: '/add_discount',
                    name: 'add_discount',
                    component: AddingDiscount,
                }]
        },
        {

            path: '/subscriptions',
            name: 'subscriptionsPage',
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
            name: 'mapPage',
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
            name: 'favoritesPage',
            component: AppTemplate,
            children: [
                {
                    path: "/favorites",
                    name: "favorites",
                    component: FavoritesPage
                }
            ]
        },
        {
            path: '/statistic',
            name: 'statistic',
            component: AppTemplate,
            children: [
                {
                    path: "/statistic",
                    name: "statistic",
                    component: StatisticPage
                }
            ]
        },
        {
            path: '/404',
            name: '404_error',
            component: AppTemplate,
            children: [
                {
                    path: '/404',
                    name: '404_error',
                    component: ErrorPage,
                    props: {
                        code: 404
                    }
                },
            ],
        },
        {
            path: '/502',
            name: '502_error',
            component: AppTemplate,
            children: [
                {
                    path: '/502',
                    name: '502_error',
                    component: ErrorPage,
                    props: {
                        code: 502
                    }
                },
            ],
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

export default router;
