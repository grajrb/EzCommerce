const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  deleteUser 
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes - requires authentication
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes - requires admin role
router.get('/', protect, restrictTo('admin'), getUsers);
router.delete('/:id', protect, restrictTo('admin'), deleteUser);

module.exports = router;