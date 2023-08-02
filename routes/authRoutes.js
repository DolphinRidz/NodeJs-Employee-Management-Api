import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit';
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
  addEmployee,
  getAllEmployees
} from '../controllers/authController.js';



import authenticateUser from '../middleware/auth.js';
import testUser from '../middleware/testUser.js';
router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.get('/logout', logout);
router.route('/addEmployee').post(apiLimiter, addEmployee);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/').post(testUser, addEmployee).get(getAllEmployees);

export default router;
