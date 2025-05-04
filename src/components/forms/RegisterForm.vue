<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'RegisterForm',
});

const emit = defineEmits<{
  'update:changeRender': ['login' | 'register'];
}>();

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

function register(e: Event) {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  console.log(userData);
}
</script>

<template>
  <div class="q-pa-md">
    <q-form class="q-pa-md bg-grey-3 fixed-center form-auth">
      <div class="text-h5 text-center q-mb-md">Cadastre-se</div>
      <div class="column q-gutter-y-sm">
        <q-input filled type="text" v-model="name" label="Nome*" />
        <q-input filled type="email" v-model="email" label="Email*" />
        <q-input filled type="password" v-model="password" label="Senha *" />
      </div>
      <div class="row justify-end items-center q-mt-sm">
        <q-btn @click="emit('update:changeRender', 'login')" label="Entrar" color="black" flat />
        <q-btn @click="register" label="Cadastrar" color="primary" class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
