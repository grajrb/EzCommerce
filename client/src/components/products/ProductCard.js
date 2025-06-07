import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Box,
  Chip
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';

import { addToCart } from '../../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      {product.countInStock === 0 && (
        <Chip 
          label="Out of Stock" 
          color="error" 
          size="small" 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            zIndex: 1 
          }} 
        />
      )}
      
      {product.discount > 0 && (
        <Chip 
          label={`${product.discount}% OFF`} 
          color="secondary" 
          size="small" 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            zIndex: 1 
          }} 
        />
      )}
      
      <CardActionArea 
        component={RouterLink} 
        to={`/product/${product._id}`} 
        sx={{ flexGrow: 1 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image || 'https://via.placeholder.com/300x300?text=Product+Image'}
          alt={product.name}
        />
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            noWrap
            sx={{ textOverflow: 'ellipsis' }}
          >
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating || 0} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.numReviews || 0})
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {product.discount > 0 ? (
              <>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="primary" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Button 
          size="small" 
          variant="outlined" 
          startIcon={<FavoriteBorder />}
          sx={{ minWidth: 'auto' }}
        >
          Save
        </Button>
        
        <Button 
          size="small" 
          color="primary" 
          variant="contained" 
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;