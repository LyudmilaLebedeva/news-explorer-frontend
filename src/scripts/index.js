import '../pages/index.css';
import MainApi from './api/MainApi';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';

import authFormLayot from './templates/authFormLayot';
import regFormLayot from './templates/regFormLayot';

const template = document.createElement('div');
template.insertAdjacentHTML('beforeend', authFormLayot);
const formTemplate = template.firstElementChild;

const regTemplate = document.createElement('div');
regTemplate.insertAdjacentHTML('beforeend', regFormLayot);
const regFormTemplate = template.firstElementChild;

const MAIN_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://nomoreparties.co'
  : 'http://localhost:3000';

const headerElement = document.querySelector('.header');
const authButton = headerElement.querySelector('.header__auth-button');
const logOutButton = headerElement.querySelector('.header__logout-img');
const savedLink = headerElement.querySelector('.header__menu-item_unselected_white');

const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close');

const headerElements = { authButton, logOutButton, savedLink };

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const popup = new Popup(popupElement, closeButton);
const authForm = new Form(formTemplate, mainApi, popup);
const header = new Header(headerElements, authForm);

mainApi.setToken(localStorage.getItem('token'));
mainApi.getUserData()
  .then((res) => header.render({ userName: res.name, isLoggedIn: true }))
  .catch(() => header.render({ isLoggedIn: false }));

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
