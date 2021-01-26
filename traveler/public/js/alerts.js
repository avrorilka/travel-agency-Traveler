/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  const alertHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                      <strong>Повідомлення</strong> ${msg}!
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times</span></button></div>`;

  document.querySelector('body').insertAdjacentHTML('beforebegin', alertHTML);

  window.setTimeout(hideAlert, 5000);
};
