<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <component :is="currentComponent" @change-view="handleViewChange" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { UseUserStore } from './stores/userUserStore';

import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import InitialPage from './pages/InitialPage.vue';
import UserLayout from './layouts/UserLayout.vue';

const useUserStore = UseUserStore();

onMounted(() => {
  if (localStorage.getItem('AuthToken')) {
    useUserStore.setToken(localStorage.getItem('AuthToken') || '');
  }
});

const currentComponent = shallowRef(UserLayout);

const handleViewChange = (view) => {
  switch (view) {
    case 'login':
      currentComponent.value = LoginForm;
      break;

    case 'register':
      currentComponent.value = RegisterForm;
      break;

    case 'user-layout':
      currentComponent.value = UserLayout;
      break;

    case 'initial-page':
      currentComponent.value = InitialPage;
      break;
  }
};
</script>
