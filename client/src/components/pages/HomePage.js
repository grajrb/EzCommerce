import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Container,
  Pagination,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import ProductCard from '../products/ProductCard';
import { fetchProducts } from '../../features/products/productSlice';
import Layout from '../layout/Layout';

const featuredProducts = [
  {
    _id: 'banner1',
    image: 'https://via.placeholder.com/1200x400?text=Summer+Sale',
    title: 'Summer Sale',
    description: 'Up to 50% off on selected items'
  },
  {
    _id: 'banner2',
    image: 'https://via.placeholder.com/1200x400?text=New+Arrivals',
    title: 'New Arrivals',
    description: 'Check out our latest products'
  },
  {
    _id: 'banner3',
    image: 'https://via.placeholder.com/1200x400?text=Special+Offers',
    title: 'Special Offers',
    description: 'Limited time deals'
  }
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, page, pages } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber: 1 }));
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    dispatch(fetchProducts({ pageNumber: value }));
  };

  return (
    <Layout>
      <Box sx={{ mb: 5 }}>
        {/* Hero Carousel */}
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {featuredProducts.map((banner) => (
            <Box
              key={banner._id}
              sx={{
                height: { xs: 200, sm: 300, md: 400 },
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${banner.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  p: 4,
                  borderRadius: 2,
                  width: { xs: '80%', md: '50%' },
                  textAlign: 'center'
                }}
              >
                <Typography variant="h4" gutterBottom>{banner.title}</Typography>
                <Typography variant="subtitle1">{banner.description}</Typography>
              </Box>
            </Box>
          ))}
        </Carousel>

        {/* Featured Categories */}
        <Container sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Shop by Categories
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            {['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Beauty'].map((category) => (
              <Grid item xs={6} sm={4} md={2.4} key={category}>
                <Card
                  sx={{
                    textAlign: 'center',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Latest Products */}
        <Container sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Latest Products
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={pages} 
                  page={page} 
                  onChange={handlePageChange}
                  color="primary" 
                />
              </Box>
            </>
          )}
        </Container>

        {/* Special Offers */}
        <Container sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Special Offers
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 200,
                  backgroundImage: 'url(https://via.placeholder.com/600x200?text=Deal+Of+The+Day)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  p: 3
                }}
              >
                <Box sx={{ maxWidth: '60%', color: 'white' }}>
                  <Typography variant="h5" gutterBottom>
                    Deal of the Day
                  </Typography>
                  <Typography variant="body1">
                    Get up to 70% off on selected items
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 200,
                  backgroundImage: 'url(https://via.placeholder.com/600x200?text=Limited+Time+Offer)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  p: 3
                }}
              >
                <Box sx={{ maxWidth: '60%', color: 'white' }}>
                  <Typography variant="h5" gutterBottom>
                    Flash Sale
                  </Typography>
                  <Typography variant="body1">
                    Limited time offers - Ends in 24 hours
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default HomePage;