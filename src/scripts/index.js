import '../pages/index.css';
import MainApi from './api/MainApi';

require('../images/image-03.jpg');
require('../images/image-03-mini.jpg');
require('../images/logout.svg');
require('../images/logout_black.svg');
require('../images/image_08.jpg');
require('../images/image_01.jpg');
require('../images/image_04.jpg');
require('../images/image_05.jpg');
require('../images/image_07.jpg');
require('../images/image_06.jpg');
require('../images/N.svg');

const MAIN_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://nomoreparties.co'
  : 'http://localhost:3000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY1Njg3YWZmZmZlOTE1YTY4ZjlkYjYiLCJpYXQiOjE2MDk5MjIyNDQsImV4cCI6MTYxMDUyNzA0NH0.rXWtAgQOKSqZGISJc1DzKsotME-On0QimNwKleZGTro'

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

// api.signup({
//   name: 'volodya',
//   email: 'volodya@mail.ru',
//   password: '12345678',
// });

// api.signin({
//   email: 'volodya@mail.ru',
//   password: '12345678',
// })
//   .then((res) => console.log(res));

// api.getUserData().then((res) => console.log(res));
