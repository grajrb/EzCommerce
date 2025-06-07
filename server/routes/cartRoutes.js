const express = require('express');
const {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All cart routes are protected
router.use(protect);

router.get('/', getCart);
router.post('/items', addItemToCart);
router.put('/items', updateCartItem);
router.delete('/items/:productId', removeCartItem);
router.delete('/', clearCart);

module.exports = router;