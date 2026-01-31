const {register, login, updateProfile, changePassword, getProfile } = require('../controllers/auth.controller');

const { verifyToken } = require('../middleware/auth.middleware');

const express = require('express');
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePassword);

module.exports = router;