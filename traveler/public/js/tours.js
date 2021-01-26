/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateTourRecord = async (tourId, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/tours/${tourId}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Данні оновлені успішно!`);
      window.setTimeout(() => {
        location.assign('/all-tours');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createTourRecord = async (
  name,
  duration,
  maxGroupSize,
  price,
  difficulty,
  summary,
  description,
  coordinates
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/tours/`,
      data: {
        name,
        duration,
        maxGroupSize,
        price,
        difficulty,
        summary,
        description,
        startLocation: {
          coordinates,
        },
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Створення туру пройшло успішно!`);
      window.setTimeout(() => {
        location.assign('/all-tours');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
