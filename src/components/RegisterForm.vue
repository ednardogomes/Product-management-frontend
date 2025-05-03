<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md fixed-center">
      <div class="text-h5 text-center q-mb-md">Login</div>
      <q-input
        filled
        type="text"
        v-model="name"
        label="Nome e Sobrenome*"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="email"
        v-model="email"
        label="Email*"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Senha *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>

      <div>
        <q-btn
          label="Página Inicial"
          color="primary"
          @click="$emit('change-view', 'initial-page')"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();

const name = ref(null);
const email = ref(null);
const password = ref(null);

function onSubmit(e: Event) {
  // if (accept.value !== true) {
  //   $q.notify({
  //     color: 'red-5',
  //     textColor: 'white',
  //     icon: 'warning',
  //     message: 'You need to accept the license and terms first',
  //   });
  // } else {
  //   $q.notify({
  //     color: 'green-4',
  //     textColor: 'white',
  //     icon: 'cloud_done',
  //     message: 'Submitted',
  //   });
  // }
  e.preventDefault();
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  console.log(userData);
}

function onReset() {
  name.value = null;
  email.value = null;
  password.value = null;
}
</script>
