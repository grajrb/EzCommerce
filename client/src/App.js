import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './components/pages/HomePage';
import ProductPage from './components/pages/ProductPage';
import CartPage from './components/pages/CartPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProfilePage from './components/pages/ProfilePage';
import ShippingPage from './components/pages/ShippingPage';
import PaymentPage from './components/pages/PaymentPage';
import PlaceOrderPage from './components/pages/PlaceOrderPage';
import OrderPage from './components/pages/OrderPage';
import OrderHistoryPage from './components/pages/OrderHistoryPage';

// Admin Components
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import AdminUserListPage from './components/admin/AdminUserListPage';
import AdminProductListPage from './components/admin/AdminProductListPage';
import AdminProductEditPage from './components/admin/AdminProductEditPage';
import AdminOrderListPage from './components/admin/AdminOrderListPage';

// Route Protection
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <main style={{ minHeight: '80vh', padding: '20px 0' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            
            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/orderhistory" element={<OrderHistoryPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUserListPage />} />
              <Route path="products" element={<AdminProductListPage />} />
              <Route path="product/:id/edit" element={<AdminProductEditPage />} />
              <Route path="orders" element={<AdminOrderListPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </ThemeProvider>
  );
}

export default App;