/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId, tourPrice) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/bookings/createBookingRecord/${tourId}`,
      data: {
        price: tourPrice,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Тур був успішно заброньований!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
