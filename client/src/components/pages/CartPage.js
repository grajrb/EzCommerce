import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  TextField,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon, ShoppingCart } from '@mui/icons-material';
import { 
  fetchCart, 
  updateCartItem, 
  removeFromCart,
  emptyCart 
} from '../../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { cartItems, totalPrice, isLoading, error } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);
  
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    dispatch(updateCartItem({
      productId,
      quantity: newQuantity
    }));
  };
  
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  const handleClearCart = () => {
    dispatch(emptyCart());
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=shipping');
    }
  };
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  
  if (!cartItems || cartItems.length === 0) {
    return (
      <Container sx={{ mt: 4, minHeight: '60vh' }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          sx={{
                            width: 60,
                            height: 60,
                            objectFit: 'contain',
                            mr: 2
                          }}
                          src={item.image || 'https://via.placeholder.com/60x60?text=No+Image'}
                          alt={item.name}
                        />
                        <Box>
                          <Typography
                            component={RouterLink}
                            to={`/product/${item.product}`}
                            sx={{ textDecoration: 'none', color: 'inherit' }}
                            variant="body1"
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                          size="small"
                          onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <TextField
                          type="number"
                          variant="outlined"
                          size="small"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product, Number(e.target.value))}
                          inputProps={{ min: 1, style: { textAlign: 'center' } }}
                          sx={{ width: 60, mx: 1 }}
                        />
                        <Button
                          size="small"
                          onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="error"
                        onClick={() => handleRemoveItem(item.product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/"
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        
        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">Calculated at checkout</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Tax</Typography>
              <Typography variant="body1">Calculated at checkout</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;