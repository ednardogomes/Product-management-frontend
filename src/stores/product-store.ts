import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import {
  createProductService,
  deleteProductService,
  getProductsService,
  updateProductService,
} from 'src/services/product-services';

interface Product {
  id: number;
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

    async updateProduct(id: number, name: string, price: number, description: string | null) {
      try {
        this.loadingProduct = true;
        const response = await updateProductService(id, name, price, description);
        if (response.status == 200) {
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

    async deleteProduct(id: number) {
      try {
        this.loadingProduct = true;
        const response = await deleteProductService(id);
        if (response.status == 200) {
          this.listProducts = this.listProducts.filter((item) => item.id != id);
          Notify.create({
            message: response.data.message,
            type: 'sucess',
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
