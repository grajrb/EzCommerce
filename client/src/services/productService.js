import api from './api';

// Get all products with optional filtering
export const getProducts = async (queryParams = {}) => {
  const { keyword, pageNumber = 1, category, sortBy, limit = 10 } = queryParams;
  
  let url = `/products?page=${pageNumber}&limit=${limit}`;
  
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  
  if (category) {
    url += `&category=${category}`;
  }
  
  if (sortBy) {
    url += `&sort=${sortBy}`;
  }
  
  const response = await api.get(url);
  return response.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Create product review
export const createProductReview = async (productId, review) => {
  const response = await api.post(`/products/${productId}/reviews`, review);
  return response.data;
};

// Admin: Create new product
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

// Admin: Update product
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Admin: Delete product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};