/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const newReview = async (tourId, stars, text) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/reviews/sendNewReview/${tourId}`,
      data: {
        review: text,
        rating: stars,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Дякуємо за відгук!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const updateReview = async (reviewID, stars, text) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/reviews/${reviewID}`,
      data: {
        review: text,
        rating: stars,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Данні оновлені успішно!`);
      window.setTimeout(() => {
        location.assign('/all-reviews');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
