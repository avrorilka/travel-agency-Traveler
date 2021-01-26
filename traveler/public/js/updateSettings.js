/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} данні оновлені успішно!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateRecord = async (userID, name, email, role) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/${userID}`,
      data: {
        name,
        email,
        role,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Данні оновлені успішно!`);
      window.setTimeout(() => {
        location.assign('/all-users');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
