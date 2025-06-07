import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
} from '../../services/cartService';

const initialState = {
  cartItems: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
  success: false,
};

// Get user cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      return await getUserCart();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch cart';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await addItemToCart(productId, quantity);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await updateCartItemQuantity(productId, quantity);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart item';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (productId, thunkAPI) => {
    try {
      return await removeCartItem(productId);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Clear cart
export const emptyCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    try {
      return await clearCart();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.items;
        state.totalPrice = action.payload.data.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.cartItems = action.payload.data.items;
        state.totalPrice = action.payload.data.totalPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.cartItems = action.payload.data.items;
        state.totalPrice = action.payload.data.totalPrice;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.cartItems = action.payload.data.items;
        state.totalPrice = action.payload.data.totalPrice;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Clear cart
      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.cartItems = [];
        state.totalPrice = 0;
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;