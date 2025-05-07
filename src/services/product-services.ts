import { api } from 'src/boot/axios';

const baseUrl = 'product';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
}

export const getProductsService = (): Promise<{
  status: number;
  data: {
    products: Product[];
  };
}> => {
  return api.get(`${baseUrl}/`);
};
export const createProductService = (
  name: string,
  price: number,
  description: string | null,
): Promise<{
  status: number;
  data: {
    products: Product[];
    message: string;
  };
}> => {
  return api.post(`${baseUrl}/`, {
    name,
    price,
    description,
  });
};

export const updateProductService = (
  id: number,
  name: string,
  price: number,
  description: string | null,
): Promise<{
  status: number;
  data: {
    products: Product[];
    message: string;
  };
}> => {
  return api.put(`${baseUrl}/${id}`, {
    name,
    price,
    description,
  });
};

export const deleteProductService = (
  id: number,
): Promise<{
  status: number;
  data: {
    message: string;
  };
}> => {
  return api.delete(`${baseUrl}/${id}`);
};
