import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup, deleteMe } from './auth';
import { updateSettings, updateRecord } from './updateSettings';
import { bookTour } from './booking';
import { newReview, updateReview } from './review';
import { deleteRecord, editRecord } from './tableManager';
import { updateTourRecord, createTourRecord } from './tours';

const mapBox = document.getElementById('map');

const loginForm = document.getElementById('form-login');
const signupForm = document.getElementById('form-signup');
const logOutButton = document.getElementById('logout');

const delMeButton = document.getElementById('delMe');
const userDataForm = document.querySelector('.form-user-data');
const userUpdateRecord = document.querySelector('.form-user-data-update');
const userPasswordForm = document.querySelector('.form-user-password');

const updateTourForm = document.querySelector('.update-tour-form');
const createTourForm = document.querySelector('.create-tour');

const sendReviewButton = document.getElementById('send-review');
const updateReviewButton = document.getElementById('update-review');
const bookButton = document.getElementById('book-tour');

const openAsideButton = document.getElementById('asideBtn');
const closeAsideButton = document.getElementById('closebtn');

const editTableRecord = document.querySelectorAll('.change');
const delTableRecord = document.querySelectorAll('.del');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (openAsideButton)
  openAsideButton.addEventListener('click', (e) => {
    document.getElementById('mySidenav').style.width = '250px';
  });

if (closeAsideButton)
  closeAsideButton.addEventListener('click', (e) => {
    document.getElementById('mySidenav').style.width = '0';
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(email, name, password, passwordConfirm);
  });

if (logOutButton) logOutButton.addEventListener('click', logout);
if (delMeButton) delMeButton.addEventListener('click', deleteMe);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });

if (userUpdateRecord) {
  userUpdateRecord.addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = e.target.dataset.id;
    const form = new FormData();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    updateRecord(userId, name, email, role);
  });
}

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn-save-password').textContent = 'Оновлюється...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn-save-password').textContent =
      'Зберегти пароль';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (sendReviewButton)
  sendReviewButton.addEventListener('click', (e) => {
    const tourId = e.target.dataset.tourId;
    const stars = Number(document.getElementById('stars').value);
    const text = document.getElementById('reviewText').value;
    newReview(tourId, stars, text);
  });

if (updateReviewButton)
  updateReviewButton.addEventListener('click', (e) => {
    e.preventDefault();
    const reviewId = e.target.dataset.id;
    const stars = Number(document.getElementById('stars').value);
    const text = document.getElementById('reviewText').value;
    updateReview(reviewId, stars, text);
  });

if (bookButton)
  bookButton.addEventListener('click', (e) => {
    e.target.textContent = 'Додаємо...';

    const tourId = e.target.dataset.tourId;
    const tourPrice = e.target.dataset.tourPrice;

    bookTour(tourId, tourPrice);
    e.target.textContent = 'Готово!';
  });

if (editTableRecord)
  editTableRecord.forEach((item) => {
    item.addEventListener('click', (e) => {
      const dataType = e.target.dataset.type;
      const dataId = e.target.dataset.id;

      editRecord(dataType, dataId);
    });
  });

if (delTableRecord)
  delTableRecord.forEach((item) => {
    item.addEventListener('click', (e) => {
      const dataType = e.target.dataset.type;
      const dataId = e.target.dataset.id;

      deleteRecord(dataType, dataId);
    });
  });

if (updateTourForm)
  updateTourForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tourId = e.target.dataset.id;
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('duration', document.getElementById('duration').value);
    form.append('maxGroupSize', document.getElementById('maxGroupSize').value);
    form.append('price', document.getElementById('price').value);
    form.append('difficulty', document.getElementById('difficulty').value);
    form.append('summary', document.getElementById('summary').value);
    form.append('description', document.getElementById('description').value);

    updateTourRecord(tourId, form);
  });

if (createTourForm)
  createTourForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    const name = document.getElementById('name').value;
    const duration = document.getElementById('duration').value;
    const maxGroupSize = document.getElementById('maxGroupSize').value;
    const price = document.getElementById('price').value;
    const difficulty = document.getElementById('difficulty').value;
    const summary = document.getElementById('summary').value;
    const description = document.getElementById('description').value;

    const latitude = Number(document.getElementById('latitude').value);
    const longitude = Number(document.getElementById('longitude').value);
    const coordinates = [latitude, longitude];

    console.log(coordinates);

    createTourRecord(
      name,
      duration,
      maxGroupSize,
      price,
      difficulty,
      summary,
      description,
      coordinates
    );
  });
