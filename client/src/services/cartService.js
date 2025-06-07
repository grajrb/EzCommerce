import api from './api';

// Get user cart
export const getUserCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

// Add item to cart
export const addItemToCart = async (productId, quantity = 1) => {
  const response = await api.post('/cart/items', { productId, quantity });
  return response.data;
};

// Update cart item quantity
export const updateCartItemQuantity = async (productId, quantity) => {
  const response = await api.put('/cart/items', { productId, quantity });
  return response.data;
};

// Remove item from cart
export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/items/${productId}`);
  return response.data;
};

// Clear cart
export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data;
};