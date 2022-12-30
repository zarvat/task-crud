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
    {
      path: '/typescript',
      name: 'typescript',
      component: () => import('../views/TypescriptView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const pagesOnlyForAuthorized = ['/'];
  const loginPage = '/login';

  if (!pagesOnlyForAuthorized.includes(to.path) && to.path !== loginPage) {
    return next();
  }

  store
    .dispatch('user/checkIfUserLoggedIn')
    .then((loggedIn) => {
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
    })
    .catch((e) => {
      return next({ name: 'login' });
      throw new Error(e);
    });
});

export default router;
