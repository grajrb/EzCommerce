const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      // If no cart exists, create a new one
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalPrice: 0
      });
    }

    res.status(200).json({
      status: 'success',
      data: cart
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    // Check if product is in stock
    if (product.countInStock < quantity) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product is out of stock'
      });
    }

    // Find user cart
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      // Create a new cart if one doesn't exist
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalPrice: 0
      });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Product not in cart, add it
      cart.items.push({
        product: productId,
        name: product.name,
        quantity,
        price: product.price,
        image: product.images[0]
      });
    }

    // Calculate cart total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );

    // Save cart
    await cart.save();

    // Return the updated cart
    res.status(200).json({
      status: 'success',
      data: cart
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate input
    if (quantity < 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'Quantity must be at least 1'
      });
    }

    // Find the product to check stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    // Check if product is in stock
    if (product.countInStock < quantity) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product does not have enough stock'
      });
    }

    // Find user cart
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found'
      });
    }

    // Find the item in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Item not found in cart'
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    // Recalculate cart total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );

    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find user cart
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found'
      });
    }

    // Filter out the item
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    // Recalculate cart total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );

    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found'
      });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};