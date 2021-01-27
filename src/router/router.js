import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Sign from "../components/Sign";


Vue.use(VueRouter);

// const routes = [
//
//     {
//         path: "/home",
//         name: "Home",
//         // components: () => {
//         //     import("./components/Home")
//         // }
//         component: Home
//     }
// ];

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Sign
        },

        {
            path: "/home",
            component: Home
        }
    ]
});

export default router;
