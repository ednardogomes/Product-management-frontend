<template>
  <q-page class="flex flex-center column">
    <div class="text-h3 q-mb-md">Seja bem-vindo!</div>

    <div class="q-mt-xl text-center">
      <p class="text-h5 q-mb-lg">Já tem uma conta?</p>
      <q-btn color="primary" label="Login" @click="$emit('change-view', 'login')" size="lg" />
    </div>

    <div class="q-mt-xl text-center">
      <p class="text-h5 q-mb-lg">Não tem conta?</p>
      <q-btn
        color="positive"
        label="Registrar"
        @click="$emit('change-view', 'register')"
        size="lg"
        outline
      />
    </div>
  </q-page>
</template>

<style scoped>
.q-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}
</style>
