const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('tourCard', {
    title: 'Всі тури',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Тур`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Увійдіть до вашого облікового запису',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Створіть власний обліковий запис',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Oбліковий запис',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIDs = bookings.map((el) => el.tour);
  const userIDs = bookings.map((el) => el.user);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  const users = await User.find({ _id: { $in: userIDs } });

  res.status(200).render('tableBooking', {
    title: 'Мої тури',
    tours,
    users,
    bookings,
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });

  const tourIDs = reviews.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('tableReviews', {
    title: 'Мої Відгуки',
    reviews,
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  const tourIDs = reviews.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('tableReviews', {
    title: 'Всі відгуки',
    tours,
    reviews,
  });
});
exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  const tourIDs = bookings.map((el) => el.tour);
  const userIDs = bookings.map((el) => el.user);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  const users = await User.find({ _id: { $in: userIDs } });

  res.status(200).render('tableBooking', {
    title: 'Всі бронювання',
    tours,
    users,
    bookings,
  });
});
exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('tableTours', {
    title: 'Всі тури',
    tours,
  });
});
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).render('tableUsers', {
    title: 'Всі користувачі',
    users,
  });
});

exports.getUserRecord = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).render('updateUser', {
    title: 'Oбліковий запис',
    user,
  });
});
exports.updateReviewRecord = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).render('updateReview', {
    title: 'Oбліковий запис',
    review,
  });
});
exports.updateTourRecord = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).render('updateTour', {
    title: 'Oбліковий запис',
    tour,
  });
});

exports.createTourForm = (req, res) => {
  res.status(200).render('createTour', {
    title: 'Створити тур',
  });
};
