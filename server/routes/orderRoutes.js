const express = require('express');
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getAllOrders
} = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes - requires authentication
router.post('/', protect, createOrder);
router.get('/myorders', protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin routes - requires admin role
router.get('/', protect, restrictTo('admin'), getAllOrders);
router.put('/:id/deliver', protect, restrictTo('admin'), updateOrderToDelivered);

module.exports = router;