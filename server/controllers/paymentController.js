const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');

// Create payment intent with Stripe
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Find the order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found'
      });
    }
    
    // Check if the order belongs to the logged in user
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Not authorized to process payment for this order'
      });
    }
    
    // Check if order is already paid
    if (order.isPaid) {
      return res.status(400).json({
        status: 'fail',
        message: 'Order is already paid'
      });
    }
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString()
      }
    });
    
    res.status(200).json({
      status: 'success',
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Process Stripe webhook
exports.stripeWebhook = async (req, res) => {
  let event;
  
  try {
    // Verify the webhook signature
    const signature = req.headers['stripe-signature'];
    
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  
  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      // Update order status
      const order = await Order.findById(paymentIntent.metadata.orderId);
      
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: paymentIntent.receipt_email
        };
        
        await order.save();
      }
    } catch (error) {
      console.error('Error updating order after payment: ', error);
    }
  }
  
  // Return a response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

// Get payment status
exports.getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find the order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Order not found'
      });
    }
    
    // Check if the order belongs to the logged in user
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Not authorized to check payment status for this order'
      });
    }
    
    res.status(200).json({
      status: 'success',
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      paymentResult: order.paymentResult
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};