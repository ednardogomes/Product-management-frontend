import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('pages/InitialPage.vue'),
  // },

  {
    path: '/',
    component: () => import('pages/AuthPage.vue'),
    children: [
      { path: '', component: () => import('components/LoginForm.vue') },
      { path: '', component: () => import('components/RegisterForm.vue') },
    ],
  },

  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
