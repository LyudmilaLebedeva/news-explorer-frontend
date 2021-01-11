import '../pages/index.css';
import MainApi from './api/MainApi';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import PopupMessage from './components/PopupMessage';

import createElementFromString from './utils/createElementFromString';

import authFormLayot from './templates/authFormLayot';
import regFormLayot from './templates/regFormLayot';
import successMessageLayot from './templates/successMessageLayot';

const MAIN_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://nomoreparties.co'
  : 'http://localhost:3000';

const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close');

const successMessageElement = createElementFromString(successMessageLayot);

const authFormElement = createElementFromString(authFormLayot);
const regFormElement = createElementFromString(regFormLayot);

const headerElement = document.querySelector('.header');
const authButton = headerElement.querySelector('.header__auth-button');
const logOutButton = headerElement.querySelector('.header__logout-img');
const savedLink = headerElement.querySelector('.header__menu-item_unselected_white');
const headerElements = { authButton, logOutButton, savedLink };

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const popup = new Popup(popupElement, closeButton);
const successMessage = new PopupMessage(popup, successMessageElement);

const setToken = (obj) => { localStorage.setItem('token', obj.token); };

const authForm = new Form(
  authFormElement,
  mainApi.signin.bind(mainApi),
  setToken.bind(this),
  popup,
);

const regForm = new Form(
  regFormElement,
  mainApi.signup.bind(mainApi),
  successMessage.showInPopup.bind(successMessage),
  popup,
);

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
