<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import TitlePage from 'src/components/shared/TitlePage.vue';
import { useProductStore } from 'src/stores/product-store';
import { storeToRefs } from 'pinia';

interface QuasarTable {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: 'center' | 'left' | 'right';
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  headerClasses?: string;
  style?: string;
  classes?: string;
}

const {loadingProduct, listProducts} = storeToRefs(useProductStore())
const filterProduct = ref<string>('')
const columnsProducts = reactive<QuasarTable[]>([
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left',
  },
  {
    name: 'description',
    label: 'Descrição',
    field: 'description',
    align: 'left',
  },
  {
    name: 'price',
    label: 'Preço',
    field: 'price',
    align: 'left',
  },
  {
    name: 'action',
    label: 'Ação',
    field: 'action',
    align: 'right',
  },
]);

onMounted(async () => {
  await useProductStore().getProducts()
})

</script>
<template>
  <section>
    <header
      :class="
        !$q.screen.lt.sm
          ? 'row justify-between no-wrap bg-grey-1'
          : 'column justify-between no-wrap bg-grey-1'
      "
    >
      <div :class="!$q.screen.lt.sm ? 'col-5' : 'col-12'">
        <TitlePage title="Gerenciamento de categorias" />
      </div>
      <div
        class="col-6 row items-center justify-end "
        :class="!$q.screen.lt.sm ? '' : 'q-mb-sm'"
      >
        <q-btn
          icon-right="add"
          label="Produto"
          class="q-mr-lg bg-contabilidade"
          unelevated
          color="primary"
        />
      </div>
    </header>
    <q-scroll-area class="main-scroll"
    >
      <main
        class="q-pa-sm q-mb-md"
        :style="!$q.screen.lt.sm ? '' : 'width: 98vw'"
      >
        <q-table
          :rows="listProducts"
          :columns="columnsProducts"
          :filter="filterProduct"
          :loading="loadingProduct"
          flat
          bordered
          dense
          row-key="index"
          no-data-label="Nenhum produto para mostrar"
          virtual-scroll
          :rows-per-page-options="[20]"
        >
          <template v-slot:top>
            <div
              :class="!$q.screen.lt.md ? 'row full-width' : 'column full-width'"
            >
              <span class="text-subtitle2">Lista de produtos</span>
              <q-space />
              <div  class="row">
                <q-input
                  filled
                  v-model="filterProduct"
                  dense
                  label="Pesquisar"
                  :style="!$q.screen.lt.sm ? 'width: 200px' : 'width: 49%'"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>
          </template>
          <template v-slot:body="props">
            <q-tr
              :props="props"
              style="height: 28px"
            >
              <q-td
                key="name"
                :props="props"
                class="text-left"
              >
                <span >{{ props.row.name }}</span>
              </q-td>
              <q-td
                key="price"
                :props="props"
                class="text-left"
              >
                <span >R$ {{ props.row.price }}</span>
              </q-td>
              <q-td
                key="category"
                :props="props"
                class="text-left"
              >
                <span >{{ props.row.category }}</span>
              </q-td>
              <q-td
                key="description"
                :props="props"
                class="text-left"
              >
                <span >{{ props.row.description }}</span>
              </q-td>
              <q-td key="action" :props="props">
                <q-btn
                  size="sm"
                  flat
                  round
                  color="black"
                  icon="edit"
                />
                <q-btn
                  size="sm"
                  flat
                  round
                  color="negative"
                  icon="delete"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </main>
    </q-scroll-area>
  </section>
</template>
