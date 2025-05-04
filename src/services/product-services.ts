import { api } from "src/boot/axios"

const baseUrl = 'product'

interface Product {
    id: string
    name: string
    price : number
    description : string | null
}

export const getProductsService = (): Promise<{
   status: number
   data: {
    products: Product []
   } 
}> => {
    return api.get(`${baseUrl}/`)
}