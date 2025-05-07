<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import TitlePage from '../shared/TitlePage.vue';
import { useProductStore } from 'src/stores/product-store';
import { storeToRefs } from 'pinia';
// import { data } from 'autoprefixer';

defineOptions({
  name: 'FormProduct',
});

interface Product {
  id?: number;
  name: string;
  price: number;
  description: string | null;
}

const props = defineProps<{
  open: boolean;
  product: null | Product;
}>();
const emit = defineEmits<{
  'update:changeOpen': [void];
}>();

const { loadingProduct } = storeToRefs(useProductStore());

const dataProduct = reactive({
  name: '' as string,
  price: '' as string,
  description: '' as string,
});

const checkEdit = () => {
  if (props.product) {
    Object.assign(dataProduct, {
      name: props.product.name,
      price: String(props.product.price),
      description: props.product.description ?? '',
    });
  }
};

const clear = () => {
  Object.assign(dataProduct, {
    name: '',
    price: '',
    description: '',
  });
};
const save = async () => {
  const response = await useProductStore().createProduct(
    dataProduct.name,
    Number(dataProduct.price),
    dataProduct.description.trim() !== '' ? dataProduct.description : null,
  );

  if (response?.status == 201) {
    emit('update:changeOpen');
  }
};

const update = async () => {
  const response = await useProductStore().updateProduct(
    props.product?.id ?? 0,
    dataProduct.name,
    Number(dataProduct.price),
    dataProduct.description.trim() !== '' ? dataProduct.description : null,
  );

  if (response?.status == 200) {
    emit('update:changeOpen');
  }
};

const open = computed({
  get: () => props.open,
  set: () => emit('update:changeOpen'),
});

watch(open, () => {
  if (open.value) {
    clear();
    checkEdit();
  }
});
</script>

<template>
  <q-dialog v-model="open" class="q-pa-md">
    <q-card class="bg-grey-2" style="min-width: 700px">
      <q-card-section class="q-pa-none q-py-sm">
        <TitlePage
          :title="props.product ? 'Atualize seu produto' : 'Crie seu produto'"
          class="bg-grey-2"
        />
      </q-card-section>
      <q-card-section class="q-pa-sm q-gutter-y-sm">
        <q-form class="q-gutter-y-sm">
          <div class="column q-gutter-y-sm">
            <q-input filled v-model="dataProduct.name" label="Nome do produto*" clearable dense />
            <q-input
              filled
              v-model="dataProduct.price"
              label="Preço do produto*"
              clearable
              dense
              mask="####.##"
            />
            <q-input
              filled
              v-model="dataProduct.description"
              label="Descrição do produto*"
              clearable
              dense
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          @click="open = false"
          label="Fechar"
          color="red"
          class="q-ml-sm"
          unelevated
          size="md"
          flat
        />
        <q-btn
          v-if="props.product === null"
          label="Salvar"
          color="primary"
          class="q-ml-sm"
          unelevated
          size="md"
          :loading="loadingProduct"
          @click="save"
        />
        <q-btn
          v-else
          label="Atualizar"
          color="primary"
          class="q-ml-sm"
          unelevated
          size="md"
          :loading="loadingProduct"
          @click="update"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
