<template>
  <q-layout view="hHr LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu"></q-btn>
        <q-toolbar-title>Painél do usuário</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label>Produtos</q-item-label>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(true);
</script>
