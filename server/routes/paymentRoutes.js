const express = require('express');
const {
  createPaymentIntent,
  stripeWebhook,
  getPaymentStatus
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes - requires authentication
router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/status/:orderId', protect, getPaymentStatus);

// Webhook route - unprotected, accessed by Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;