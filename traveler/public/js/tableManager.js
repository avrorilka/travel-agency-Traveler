import axios from 'axios';
import { showAlert } from './alerts';

export const deleteRecord = async (dataType, dataId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/${dataType}/${dataId}`,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Помилка при спробі видалити обліковий запис!');
  }
};
export const editRecord = async (dataType, dataId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/update-${dataType}/${dataId}`,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Помилка при спробі завантажити інфо про обліковий запис!'
    );
  }
};
