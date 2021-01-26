const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createBookingRecord = catchAsync(async (req, res, next) => {
  await Booking.create({
    tour: req.params.tourId,
    user: req.user.id,
    price: req.body.price,
  });
  res.status(200).json({
    status: 'success',
  });
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
