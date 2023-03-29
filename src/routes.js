import * as VueRouter from 'vue-router';
import Todo from './components/Todo.vue';
import About from './components/About.vue';

const routes = [
    { path: '/', component: Todo },
    { path: '/about', component: About },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

export default router;