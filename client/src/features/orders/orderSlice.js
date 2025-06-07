import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  createPaymentIntent,
  getPaymentStatus,
  getAllOrders,
  updateOrderToDelivered
} from '../../services/orderService';

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null,
  success: false,
  paymentIntent: null,
  paymentStatus: null
};

// Create order
export const placeOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, thunkAPI) => {
    try {
      return await createOrder(orderData);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create order';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get order by ID
export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (id, thunkAPI) => {
    try {
      return await getOrderById(id);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch order';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Pay for order
export const payOrder = createAsyncThunk(
  'orders/payOrder',
  async ({ orderId, paymentResult }, thunkAPI) => {
    try {
      return await updateOrderToPaid(orderId, paymentResult);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to process payment';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user's orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, thunkAPI) => {
    try {
      return await getUserOrders();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch orders';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create payment intent
export const getPaymentIntent = createAsyncThunk(
  'orders/createPaymentIntent',
  async (orderId, thunkAPI) => {
    try {
      return await createPaymentIntent(orderId);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create payment intent';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Check payment status
export const fetchPaymentStatus = createAsyncThunk(
  'orders/fetchPaymentStatus',
  async (orderId, thunkAPI) => {
    try {
      return await getPaymentStatus(orderId);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch payment status';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Get all orders
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, thunkAPI) => {
    try {
      return await getAllOrders();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch all orders';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Mark order as delivered
export const deliverOrder = createAsyncThunk(
  'orders/deliverOrder',
  async (orderId, thunkAPI) => {
    try {
      return await updateOrderToDelivered(orderId);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to mark order as delivered';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
    resetOrder: (state) => {
      state.order = null;
      state.paymentIntent = null;
      state.paymentStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.order = action.payload.data;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch order
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.data;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Pay order
      .addCase(payOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.order = action.payload.data;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create payment intent
      .addCase(getPaymentIntent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPaymentIntent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentIntent = action.payload;
      })
      .addCase(getPaymentIntent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch payment status
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(fetchPaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch all orders (admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Mark order as delivered (admin)
      .addCase(deliverOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.order = action.payload.data;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;