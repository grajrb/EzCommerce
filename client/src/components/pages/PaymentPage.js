import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormHelperText
} from '@mui/material';
import { CreditCard, Payment as PaymentIcon } from '@mui/icons-material';

const steps = ['Shipping Address', 'Payment Method', 'Place Order'];

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [error, setError] = useState('');

  // Check if shipping info exists
  useEffect(() => {
    const shippingInfo = localStorage.getItem('shippingInfo');
    if (!shippingInfo) {
      navigate('/shipping');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }
    
    // Save payment method to local storage
    localStorage.setItem('paymentMethod', paymentMethod);
    
    // Navigate to order placement
    navigate('/placeorder');
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper sx={{ p: 4, mt: 3 }}>
        {/* Checkout Steps */}
        <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Payment Method
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" error={!!error} fullWidth sx={{ mb: 3 }}>
            <FormLabel component="legend">Select Payment Method</FormLabel>
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setError('');
              }}
            >
              <Paper elevation={2} sx={{ p: 2, mb: 2, border: paymentMethod === 'stripe' ? '2px solid #1976d2' : 'none' }}>
                <FormControlLabel 
                  value="stripe" 
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCard sx={{ mr: 1 }} />
                      <Typography>Credit/Debit Card (Stripe)</Typography>
                    </Box>
                  }
                />
              </Paper>
              
              <Paper elevation={2} sx={{ p: 2, mb: 2, border: paymentMethod === 'paypal' ? '2px solid #1976d2' : 'none' }}>
                <FormControlLabel 
                  value="paypal" 
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PaymentIcon sx={{ mr: 1 }} />
                      <Typography>PayPal</Typography>
                    </Box>
                  }
                />
              </Paper>
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button 
              variant="outlined"
              onClick={() => navigate('/shipping')}
            >
              Back to Shipping
            </Button>
            <Button variant="contained" type="submit">
              Continue to Place Order
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentPage;