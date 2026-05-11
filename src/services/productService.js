import axios from 'axios';
import MOCK_PRODUCTS from "../mockdata/mock_products";

const BASE_URL = 'https://fakestoreapi.com/products';

const mapProduct = (product) => ({
    ...product,
    rate: product.rating?.rate || 0,
});

export const getProducts = async () => {
  try {
      const response = await axios.get(BASE_URL);
      return response.data.map(mapProduct);
  } catch (error) {
      console.error("Error fetching products from FakeStoreAPI, using fallback mock data:", error);
      return [...MOCK_PRODUCTS].sort((a, b) => Number(a.id) - Number(b.id));
  }
};

export const getProductById = async (id) => {
  try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (response.data) {
          return mapProduct(response.data);
      }
  } catch (error) {
      console.error(`Error fetching product ${id} from FakeStoreAPI, using fallback mock data:`, error);
  }
  
  // Fallback if API fails or returns empty data
  const product = MOCK_PRODUCTS.find(
    (item) => Number(item.id) === Number(id),
  );
  return product ?? null;
};

export const getCategories = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
  } catch (error) {
      console.error("Error fetching categories from FakeStoreAPI, returning empty list:", error);
      return [];
  }
};
