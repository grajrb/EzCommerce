import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getProducts, 
  getProductById, 
  createProductReview,
  createProduct,
  updateProduct,
  deleteProduct 
} from '../../services/productService';

const initialState = {
  products: [],
  product: null,
  page: 1,
  pages: 1,
  isLoading: false,
  error: null,
  success: false,
  totalProducts: 0
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (queryParams, thunkAPI) => {
    try {
      return await getProducts(queryParams);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch products';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch single product
export const fetchProductDetails = createAsyncThunk(
  'products/fetchDetails',
  async (id, thunkAPI) => {
    try {
      return await getProductById(id);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch product details';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create product review
export const addProductReview = createAsyncThunk(
  'products/createReview',
  async ({productId, review}, thunkAPI) => {
    try {
      return await createProductReview(productId, review);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create review';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create product (admin)
export const addProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, thunkAPI) => {
    try {
      return await createProduct(productData);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create product';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update product (admin)
export const editProduct = createAsyncThunk(
  'products/updateProduct',
  async ({id, productData}, thunkAPI) => {
    try {
      return await updateProduct(id, productData);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update product';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete product (admin)
export const removeProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, thunkAPI) => {
    try {
      return await deleteProduct(id);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete product';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductDetails: (state) => {
      state.product = null;
      state.isLoading = false;
      state.error = null;
    },
    resetProductAction: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
        state.totalProducts = action.payload.results || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create product review
      .addCase(addProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductReview.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create product (admin)
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.products = [...state.products, action.payload.data];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update product (admin)
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.products = state.products.map(product => 
          product._id === action.payload.data._id ? action.payload.data : product
        );
        state.product = action.payload.data;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete product (admin)
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.products = state.products.filter(product => 
          product._id !== action.meta.arg
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { resetProductDetails, resetProductAction } = productSlice.actions;
export default productSlice.reducer;