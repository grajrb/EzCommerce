import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { placeOrder, resetOrderState } from '../../features/orders/orderSlice';
import { emptyCart } from '../../features/cart/cartSlice';

const steps = ['Shipping Address', 'Payment Method', 'Place Order'];

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const { cartItems, totalPrice } = useSelector(state => state.cart);
  const { order, isLoading, error, success } = useSelector(state => state.orders);
  
  // Tax and shipping costs - these could be calculated dynamically
  const taxRate = 0.15; // 15% tax rate
  const itemsPrice = totalPrice;
  const taxPrice = Math.round(itemsPrice * taxRate * 100) / 100;
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const orderTotal = (itemsPrice + taxPrice + shippingPrice).toFixed(2);

  // Check if shipping and payment info exist
  useEffect(() => {
    const storedShippingInfo = localStorage.getItem('shippingInfo');
    const storedPaymentMethod = localStorage.getItem('paymentMethod');
    
    if (!storedShippingInfo) {
      navigate('/shipping');
    }
    
    if (!storedPaymentMethod) {
      navigate('/payment');
    }
    
    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo));
    }
    
    if (storedPaymentMethod) {
      setPaymentMethod(storedPaymentMethod);
    }
  }, [navigate]);

  // Redirect to order page after successful order placement
  useEffect(() => {
    if (success && order) {
      navigate(`/order/${order._id}`);
      
      // Clear cart and reset order state
      dispatch(emptyCart());
      dispatch(resetOrderState());
    }
  }, [success, order, navigate, dispatch]);

  const handlePlaceOrder = () => {
    dispatch(placeOrder({
      orderItems: cartItems.map(item => ({
        product: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      })),
      shippingAddress: shippingInfo,
      paymentMethod: paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice: parseFloat(orderTotal)
    }));
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper sx={{ p: 4, mt: 3 }}>
        {/* Checkout Steps */}
        <Stepper activeStep={2} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Order Summary
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Order Info */}
          <Grid item xs={12} md={8}>
            {/* Shipping Address */}
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Shipping
              </Typography>
              {shippingInfo && (
                <>
                  <Typography variant="body1">
                    <strong>Name:</strong> {shippingInfo.fullName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city},{' '}
                    {shippingInfo.postalCode}, {shippingInfo.country}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {shippingInfo.phone}
                  </Typography>
                </>
              )}
            </Paper>
            
            {/* Payment Method */}
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Typography variant="body1">
                <strong>Method:</strong> {paymentMethod === 'stripe' ? 'Credit/Debit Card (Stripe)' : 'PayPal'}
              </Typography>
            </Paper>
            
            {/* Order Items */}
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              {cartItems.length === 0 ? (
                <Alert severity="info">Your cart is empty</Alert>
              ) : (
                <List disablePadding>
                  {cartItems.map((item) => (
                    <React.Fragment key={item.product}>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <Box
                          component="img"
                          sx={{ width: 50, height: 50, mr: 2, objectFit: 'contain' }}
                          src={item.image || 'https://via.placeholder.com/50x50?text=No+Image'}
                          alt={item.name}
                        />
                        <ListItemText
                          primary={item.name}
                          secondary={`Quantity: ${item.quantity}`}
                        />
                        <Typography variant="body2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
          
          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Items" />
                  <Typography variant="body1">${itemsPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Shipping" />
                  <Typography variant="body1">${shippingPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Tax" />
                  <Typography variant="body1">${taxPrice.toFixed(2)}</Typography>
                </ListItem>
                <Divider />
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    ${orderTotal}
                  </Typography>
                </ListItem>
              </List>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePlaceOrder}
                disabled={isLoading || cartItems.length === 0}
                sx={{ mt: 2 }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PlaceOrderPage;