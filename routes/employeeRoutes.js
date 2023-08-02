import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit';
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

import {
  addEmployee
} from '../controllers/authController.js';

import testUser from '../middleware/testUser.js';

// router.route('/').post(testUser, createJob).get(getAllJobs);
// // remember about :id
// router.route('/stats').get(showStats);
// router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob);
router.route('/addEmployee').post(apiLimiter, addEmployee);

export default router;
