import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import login from '../views/Login.vue';
import books from '../views/Books.vue';
import erro from '../views/Erro.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/books',
        name: 'books',
        component: books,
        meta: { requiresAuth: true }
    },
    {
        path: '/erro',
        name: 'erro',
        component: erro
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.StateUser) {
            next();
        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }
});

export default router;
