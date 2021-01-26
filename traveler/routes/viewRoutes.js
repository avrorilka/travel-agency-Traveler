const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);

router.get(
  '/all-reviews',
  authController.protect,
  viewsController.getAllReviews
);
router.get(
  '/all-bookings',
  authController.protect,
  viewsController.getAllBookings
);
router.get('/all-tours', authController.protect, viewsController.getAllTours);
router.get('/all-users', authController.protect, viewsController.getAllUsers);

router.get(
  '/update-users/:id',
  authController.protect,
  viewsController.getUserRecord
);
router.get(
  '/update-reviews/:id',
  authController.protect,
  viewsController.updateReviewRecord
);
router.get(
  '/update-tours/:id',
  authController.protect,
  viewsController.updateTourRecord
);
router.get(
  '/create-tour',
  authController.protect,
  viewsController.createTourForm
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
