<script setup lang="ts">
import LoginForm from 'src/components/forms/LoginForm.vue';
import RegisterForm from 'src/components/forms/RegisterForm.vue';
import { ref } from 'vue';

defineOptions({
  name: 'AuthPage',
});

const render = ref<'login' | 'register'>('login');

const handleChangeRender = (value: 'login' | 'register') => {
  render.value = value;
};
</script>

<template>
  <main>
    <LoginForm v-if="render == 'login'" @update:change-render="handleChangeRender" />
    <RegisterForm v-else @update:change-render="handleChangeRender" />
  </main>
</template>
