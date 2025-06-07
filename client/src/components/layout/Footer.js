import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        bgcolor: 'primary.main',
        color: 'white',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              EZCommerce
            </Typography>
            <Typography variant="body2">
              We provide high-quality products at competitive prices with a seamless shopping experience.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link component={RouterLink} to="/cart" color="inherit" display="block" sx={{ mb: 1 }}>
              Cart
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Link component={RouterLink} to="/category/electronics" color="inherit" display="block" sx={{ mb: 1 }}>
              Electronics
            </Link>
            <Link component={RouterLink} to="/category/clothing" color="inherit" display="block" sx={{ mb: 1 }}>
              Clothing
            </Link>
            <Link component={RouterLink} to="/category/books" color="inherit" display="block" sx={{ mb: 1 }}>
              Books
            </Link>
            <Link component={RouterLink} to="/category/home" color="inherit" display="block" sx={{ mb: 1 }}>
              Home & Kitchen
            </Link>
            <Link component={RouterLink} to="/category/beauty" color="inherit" display="block" sx={{ mb: 1 }}>
              Beauty & Personal Care
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">
                123 Commerce St, Business City, 54321
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                support@ezcommerce.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            © {currentYear} EZCommerce. All rights reserved.
          </Typography>
          <Box>
            <Link color="inherit" sx={{ ml: 2 }}>
              Privacy Policy
            </Link>
            <Link color="inherit" sx={{ ml: 2 }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;