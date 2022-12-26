import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { store } from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['user/loggedIn'];

  const pagesOnlyForAuthorized = ['/'];
  const loginPage = '/login';
  if (to.path === loginPage) {
    if (loggedIn) {
      return next({ name: 'home' });
    }
    return next();
  }

  if (pagesOnlyForAuthorized.includes(to.path)) {
    if (loggedIn) {
      return next();
    }
    return next({ name: 'login' });
  }

  return next();
});

export default router;
