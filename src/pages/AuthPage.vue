<template>
  <div v-if="true">
    <Login />
  </div>

  <div v-if="false">
    <Register />
  </div>
</template>

<script setup lang="ts">
import Login from 'src/components/LoginForm.vue';
import Register from 'src/components/RegisterForm.vue';
</script>
