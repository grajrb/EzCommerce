import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { placeOrder } from '../../features/orders/orderSlice';

const steps = ['Shipping Address', 'Payment Method', 'Place Order'];

const ShippingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Initialize shipping info state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  // Form errors state
  const [formErrors, setFormErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const errors = {};
    
    const fields = [
      { name: 'fullName', label: 'Full Name' },
      { name: 'address', label: 'Address' },
      { name: 'city', label: 'City' },
      { name: 'postalCode', label: 'Postal Code' },
      { name: 'country', label: 'Country' },
      { name: 'phone', label: 'Phone' }
    ];
    
    fields.forEach(field => {
      if (!shippingInfo[field.name].trim()) {
        errors[field.name] = `${field.label} is required`;
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save shipping info to local storage
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      
      // Navigate to payment page
      navigate('/payment');
    }
  };
  
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper sx={{ p: 4, mt: 3 }}>
        {/* Checkout Steps */}
        <Stepper activeStep={0} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Shipping Address
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="fullName"
                name="fullName"
                label="Full Name"
                fullWidth
                value={shippingInfo.fullName}
                onChange={handleChange}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                value={shippingInfo.address}
                onChange={handleChange}
                error={!!formErrors.address}
                helperText={formErrors.address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                value={shippingInfo.city}
                onChange={handleChange}
                error={!!formErrors.city}
                helperText={formErrors.city}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                fullWidth
                value={shippingInfo.postalCode}
                onChange={handleChange}
                error={!!formErrors.postalCode}
                helperText={formErrors.postalCode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                value={shippingInfo.country}
                onChange={handleChange}
                error={!!formErrors.country}
                helperText={formErrors.country}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                value={shippingInfo.phone}
                onChange={handleChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained" type="submit">
              Continue to Payment
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShippingPage;