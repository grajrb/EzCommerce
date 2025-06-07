import api from './api';

// Create new order
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Update order to paid
export const updateOrderToPaid = async (orderId, paymentResult) => {
  const response = await api.put(`/orders/${orderId}/pay`, paymentResult);
  return response.data;
};

// Get logged in user orders
export const getUserOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data;
};

// Create payment intent with Stripe
export const createPaymentIntent = async (orderId) => {
  const response = await api.post('/payments/create-payment-intent', { orderId });
  return response.data;
};

// Get payment status
export const getPaymentStatus = async (orderId) => {
  const response = await api.get(`/payments/status/${orderId}`);
  return response.data;
};

// Admin: Get all orders
export const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

// Admin: Update order to delivered
export const updateOrderToDelivered = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/deliver`);
  return response.data;
};