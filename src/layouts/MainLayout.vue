<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const drawer = ref<boolean>(true);

const isActive = (routeName: string) => {
  return route.name === routeName;
};
</script>

<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated >
      <q-toolbar>
        <q-toolbar-title>Amazon</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            clickable
            :to="{ name: 'admin-product' }"
            :active="isActive('admin-product')"
            active-class="text-primary text-bold"
          >
            <q-item-section avatar>
              <q-icon name="inventory_2" />
            </q-item-section>
            <q-item-section> Produtos </q-item-section>
          </q-item>
          <q-item
            clickable
            :to="{ name: 'admin-user' }"
            :active="isActive('admin-user')"
            active-class="text-primary text-bold"
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> Usuários </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
