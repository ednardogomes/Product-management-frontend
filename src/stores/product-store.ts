import { defineStore } from 'pinia';
import { getProductsService } from 'src/services/product-services';

interface Product {
    id: string
    name: string
    price : number
    description : string | null
}

export const useProductStore = defineStore('store', {
  state: () => ({
    listProducts: [] as Product[],
    loadingProduct: false as boolean,
  }),
  actions: {
    async getProducts() {
        try {
            this.loadingProduct = true
            const response = await getProductsService();
            if(response.status == 200){
                this.listProducts = []
                this.listProducts = response.data.products
            }
        } catch (error) {
            console.error(error)
        } finally {
            this.loadingProduct = false
        }
    }
  },
});
