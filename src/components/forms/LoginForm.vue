<script setup lang="ts">
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue';

defineOptions({
  name: 'LoginForm',
});

const emit = defineEmits<{
  'update:changeRender': ['login' | 'register'];
}>();


const email = ref<string>('');
const password = ref<string>('');

async function login() {
  const userData = {
    email: email.value,
    password: password.value,
  };

  const response = await api.post('/login', userData);
  if (!response.data.token && !response.data) {
    console.error('Dados ou Token não encontrados', response.data);
  }

  localStorage.setItem('AuthToken', response.data.token);
  useUserStore().setToken(response.data.token);

  return 'Login Realizado com sucesso.!';
}
</script>

<template>
  <div class="q-pa-md">
    <q-form class="q-pa-md bg-grey-3 fixed-center form-auth">
      <div class="text-h5 text-center q-mb-md">Login</div>
      <div class="column q-gutter-y-sm">
        <q-input filled v-model="email" type="email" label="Email*" clearable dense />
        <q-input filled type="password" v-model="password" label="Senha *" clearable dense />
      </div>
      <div class="row justify-end items-center q-mt-sm">
        <q-btn
          label="Cadastrar"
          @click="emit('update:changeRender', 'register')"
          color="black"
          flat
          unelevated
          size="md"
        />
        <q-btn @click="login" label="Entrar" color="primary" class="q-ml-sm" unelevated size="md" />
      </div>
    </q-form>
  </div>
</template>
