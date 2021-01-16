import '../pages/index.css';
import MainApi from './api/MainApi';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import SearchForm from './components/SearchForm';
import PopupMessage from './components/PopupMessage';
import Card from './components/Card';

import NewsApi from './api/NewsApi';

import createElementFromString from './utils/createElementFromString';

import authFormLayot from './templates/authFormLayot';
import regFormLayot from './templates/regFormLayot';
import successMessageLayot from './templates/successMessageLayot';
import CardList from './components/CardList';

const MAIN_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://nomoreparties.co'
  : 'http://localhost:3000';

const APIkey = '0403a27a7eab4af4ac93acad206d2cfa';

const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close');

const successMessageElement = createElementFromString(successMessageLayot);

const authFormElement = createElementFromString(authFormLayot);
const regFormElement = createElementFromString(regFormLayot);

const headerElement = document.querySelector('.header');
const authButton = headerElement.querySelector('.header__auth-button');
const savedLink = headerElement.querySelector('.header__menu-item_unselected_white');
const menuButton = headerElement.querySelector('.header__menu-button');
const headerElements = {
  authButton, savedLink, menuButton, headerElement,
};

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const popup = new Popup(popupElement, closeButton);
const successMessage = new PopupMessage(popup, successMessageElement);

const signin = (formData) => mainApi.signin(formData)
  .then((res) => {
    localStorage.setItem('token', res.token);
    mainApi.setToken(res.token);
    return mainApi.getUserData();
  })
  .then((res) => (res));

const authForm = new Form(
  authFormElement,
  signin,
  () => {},
  popup,
);

const regForm = new Form(
  regFormElement,
  mainApi.signup.bind(mainApi),
  successMessage.showInPopup.bind(successMessage),
  popup,
);

const formRegButton = authFormElement.querySelector('.form__link');
const formAuthButton = regFormElement.querySelector('.form__link');
const messageButton = successMessageElement.querySelector('.message__link');

const regButtonHandler = () => {
  popup.clearContent();
  popup.setContent(regForm.formElement);
  popup.open();
};
const authButtonHandler = () => {
  popup.clearContent();
  popup.setContent(authForm.formElement);
  popup.open();
};

formRegButton.addEventListener('click', regButtonHandler);
formAuthButton.addEventListener('click', authButtonHandler);
messageButton.addEventListener('click', authButtonHandler);

const header = new Header(headerElements, authForm, popup);

mainApi.setToken(localStorage.getItem('token'));
mainApi.getUserData()
  .then((res) => header.render({ userName: res.name, isLoggedIn: true }))
  .catch(() => header.render({ isLoggedIn: false }));

const newsApi = new NewsApi(APIkey);

const searchFormElement = document.querySelector('.search__form');
// const cardContainer = document.querySelector('.card-container');
const resultsSection = document.querySelector('.section_background_blue');

const createCardFunc = (cardData) => {
  const card = new Card(cardData, 'notMarked', mainApi);
  return card.cardElement;
};

const cardList = new CardList([], createCardFunc);
resultsSection.appendChild(cardList.element);

const searchForm = new SearchForm(searchFormElement, cardList, newsApi);
searchFormElement.addEventListener('submit', searchForm.submitHandler.bind(this));

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
