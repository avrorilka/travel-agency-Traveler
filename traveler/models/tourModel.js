const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'У тура має бути ім*я!'],
      unique: true,
      trim: true,
      maxlength: [40, 'Назва тура повина містити від 10 до 40 символів!'],
      minlength: [10, 'Назва тура повина містити від 10 до 40 символів!'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Тур повинен мати загальну тривалість!'],
    },
    maxGroupSize: {
      type: Number,
      required: [
        true,
        'Тур повинен мати мати значеня максимуму можливих місць!',
      ],
    },
    difficulty: {
      type: String,
      required: [true, 'Тур повинен мати складність!'],
      enum: {
        values: ['легкий', 'середній', 'важкий'],
        message: 'Можливі рівні складності: легкий, середній, важкий',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Рейтинг повинен бути вище 1!'],
      max: [5, 'Рейтинг повинен бути нижче 5!'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Тур повинен мати ціну!'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Ціна по знижчці повинна бути нижча за стандартну ціну!',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Тур повинен мати опис!'],
    },
    description: {
      type: String,
      trim: true,
      default: 'Опис тура',
    },
    imageCover: {
      type: String,
      default: 'default-cover.jpg',
    },
    images: {
      type: [String],
      default: ['default-1.jpg', 'default-2.jpg', 'default-3.jpg'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
