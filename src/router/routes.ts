import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auth',
    component: () => import('pages/AuthPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: { name: 'admin-product' } },
      { path: 'product', name: 'admin-product', component: () => import('src/pages/Product.vue') },
      { path: 'user', name: 'admin-user', component: () => import('src/pages/User.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/ErrorNotFound.vue'),
  },
];

export default routes;
