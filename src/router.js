import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import HelloWorld from "./components/demos/HelloWorld.vue";
import Login from "./components/Login.vue";
import Conta from "./components/user/Conta.vue"
// import Login from "./views/Login.vue";
// import Register from "./views/Register.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/signin'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter(to, from, next) {
                if (store.getters.idToken) {
                    next();
                } else {
                    next('/signin');
                }
            }
        },
        {
            path: '/conta',
            name: 'conta',
            component: Conta,
            beforeEnter(to, from, next) {
                if (store.getters.idToken) {
                    next();
                } else {
                    next("/signin");
                }
            }
        },
        {
            path: '/hello',
            name: 'hello',
            component: HelloWorld,
            // beforeEnter(to, from, next) {
            //     if (store.getters.idToken) {
            //         next();
            //     } else {
            //         next('/login');
            //     }
            // }
        },
        {
            path: '/signin',
            name: 'login',
            component: Login,
            // beforeEnter(to, from, next) {
            //     if (store.getters.idToken) {
            //         next();
            //     } else {
            //         next('/login');
            //     }
            // }
        },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: Login,
        //     beforeEnter(to, from, next) {
        //         if (store.getters.idToken) {
        //             next('/'); //トークンがあったらログインしなくて良い
        //         } else {
        //             next();
        //         }
        //     }
        // },
        // {
        //     path: '/register',
        //     name: 'register',
        //     component: Register,
        //     beforeEnter(to, from, next) {
        //         if (store.getters.idToken) {
        //             next("/");
        //         } else {
        //             next();
        //         }
        //     }
        // },
    ]
});