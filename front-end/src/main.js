import { createApp } from 'vue';
import App from './App.vue';
import './main.css';

import * as VueRouter from 'vue-router';

import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import CourseDetailPage from './pages/CourseDetailPage.vue';
import CoursesPage from './pages/CoursesPage.vue';
import PageNotFound from './pages/PageNotFound.vue';

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/cart',
        component: ShoppingCartPage,
    }, {
        path: '/courses/:courseId',
        component: CourseDetailPage,
    }, {
        path: '/courses',
        component: CoursesPage
    }, {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
    }]
}))
.mount('#app')
