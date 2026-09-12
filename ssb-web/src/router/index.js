import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import SliderVerification from '../views/SliderVerification.vue';

const routes = [
    { path: '/login', component: LoginPage },
    {
        path: '/slider',
        component: SliderVerification,
        props: (route) => ({ phone: route.query.phone })
    },
    { path: '/', redirect: '/login' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;