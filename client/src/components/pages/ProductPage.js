import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Divider,
  TextField,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Snackbar,
  Tab,
  Tabs
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { fetchProductDetails, addProductReview, resetProductAction } from '../../features/products/productSlice';
import { addToCart } from '../../features/cart/cartSlice';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [reviewError, setReviewError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, isLoading, error, success } = useSelector(state => state.products);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(fetchProductDetails(id));
    
    return () => {
      dispatch(resetProductAction());
    };
  }, [dispatch, id]);
  
  useEffect(() => {
    if (success) {
      setRating(0);
      setComment('');
      setOpenSnackbar(true);
      dispatch(resetProductAction());
      dispatch(fetchProductDetails(id));
    }
  }, [success, dispatch, id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.countInStock || 0)) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity }));
    navigate('/cart');
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setReviewError('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      setReviewError('Please enter a comment');
      return;
    }
    
    dispatch(addProductReview({
      productId: id,
      review: { rating, comment }
    }));
    
    setReviewError('');
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
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
      </Container>
    );
  }
  
  if (!product) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 4 }}>Product not found</Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Go Back
      </Button>
      
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Box 
            component="img" 
            sx={{
              width: '100%',
              maxHeight: 500,
              objectFit: 'contain',
              borderRadius: 1,
              boxShadow: 1
            }}
            src={product.images && product.images.length > 0 
              ? product.images[0]
              : 'https://via.placeholder.com/500x500?text=No+Image'
            }
            alt={product.name}
          />
          
          {/* Additional Images */}
          {product.images && product.images.length > 1 && (
            <Box sx={{ display: 'flex', mt: 2, overflowX: 'auto' }}>
              {product.images.map((img, idx) => (
                <Box
                  key={idx}
                  component="img"
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mr: 1,
                    cursor: 'pointer'
                  }}
                  src={img}
                  alt={`${product.name} - Image ${idx + 1}`}
                />
              ))}
            </Box>
          )}
        </Grid>
        
        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Add to Cart section */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Status: {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Typography>
              </Grid>
              
              {product.countInStock > 0 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      label="Quantity"
                      fullWidth
                      InputProps={{ inputProps: { min: 1, max: product.countInStock } }}
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      startIcon={<AddShoppingCart />}
                      onClick={handleAddToCart}
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      
      {/* Tabs for Description and Reviews */}
      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Description" id="tab-0" />
          <Tab label={`Reviews (${product.numReviews})`} id="tab-1" />
        </Tabs>
        
        {/* Description Tab */}
        {tabValue === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">{product.description}</Typography>
          </Box>
        )}
        
        {/* Reviews Tab */}
        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            {product.reviews && product.reviews.length === 0 ? (
              <Alert severity="info">No reviews yet</Alert>
            ) : (
              <List>
                {product.reviews && product.reviews.map((review) => (
                  <Card key={review._id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1">{review.name}</Typography>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {review.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            )}
            
            {/* Add Review Form */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Write a Customer Review
              </Typography>
              
              {!isAuthenticated ? (
                <Alert severity="info">
                  Please <Button onClick={() => navigate('/login')}>sign in</Button> to write a review
                </Alert>
              ) : (
                <Box component="form" onSubmit={handleReviewSubmit}>
                  {reviewError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {reviewError}
                    </Alert>
                  )}
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography component="legend">Rating</Typography>
                      <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Comment"
                        multiline
                        rows={4}
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained">
                        Submit Review
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
      
      {/* Notification for successful review */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Review submitted successfully"
      />
    </Container>
  );
};

export default ProductPage;