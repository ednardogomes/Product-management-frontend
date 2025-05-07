import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import {
  createProductService,
  getProductsService,
  updateProductService,
} from 'src/services/product-services';

interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string | null;
}

export const useProductStore = defineStore('store', {
  state: () => ({
    listProducts: [] as Product[],
    loadingProduct: false as boolean,
  }),
  actions: {
    async getProducts() {
      try {
        this.loadingProduct = true;
        const response = await getProductsService();

        if (response.status == 200) {
          this.listProducts = [];
          this.listProducts = response.data.products;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingProduct = false;
      }
    },

    async createProduct(name: string, price: number, description: string | null) {
      try {
        this.loadingProduct = true;
        const response = await createProductService(name, price, description);
        if (response.status == 201) {
          this.listProducts = [];
          this.listProducts = response.data.products;
          Notify.create({
            message: response.data.message,
            type: 'success',
          });
        }
        return response;
      } catch (error) {
        console.error(error);
        return null;
      } finally {
        this.loadingProduct = false;
      }
    },

    async updateProduct(
      id: string | number,
      name: string,
      price: number,
      description: string | null,
    ) {
      try {
        this.loadingProduct = true;
        const response = await updateProductService(id, name, price, description);
        if (response.status == 200) {
          this.listProducts = [];
          this.listProducts = response.data.products;
          Notify.create({
            message: response.data.message,
            type: 'Atualizado com sucesso',
          });
        }
        return response;
      } catch (error) {
        console.error(error);
        return null;
      } finally {
        this.loadingProduct = false;
      }
    },
  },
});
