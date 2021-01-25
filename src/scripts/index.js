import '../pages/index.css';
import MainApiExtended from './api/MainApiExtended';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import SearchForm from './components/SearchForm';
import Card from './components/Card';
import CardList from './components/CardList';
import NewsApi from './api/NewsApi';
import FormValidator from './components/FormValidator';
import createElementFromString from './utils/createElementFromString';
import authFormLayot from './templates/authFormLayot';
import regFormLayot from './templates/regFormLayot';
import successMessageLayot from './templates/successMessageLayot';

// Настраиваем MainAPI
const MAIN_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.lyudmila.students.nomoreparties.space'
  : 'http://localhost:3000';
const mainApiOptions = { baseUrl: MAIN_API_URL, headers: { 'Content-Type': 'application/json' } };
const mainApi = new MainApiExtended(mainApiOptions);

// Настраиваем popup
const popupElement = document.querySelector('.popup');
const closeButtonElement = popupElement.querySelector('.popup__close');
const popupElements = { popupElement, closeButtonElement };
const popup = new Popup(popupElements);

// Cообщение об успешной регистрации
const successMessageElement = createElementFromString(successMessageLayot);

// Настраиваем форму авторизации
const authFormElement = createElementFromString(authFormLayot);
const authForm = new Form(authFormElement,
  mainApi.signin.bind(mainApi),
  (res) => {
    localStorage.setItem('token', res.token);
    mainApi.getUserData(res.token);
    popup.close();
  });

// Настраиваем форму регистрации
const regFormElement = createElementFromString(regFormLayot);
const regForm = new Form(
  regFormElement, mainApi.signup.bind(mainApi), popup.setContent(successMessageElement),
);

// Валидация форм
new FormValidator(authForm.formElement);
new FormValidator(regForm.formElement);

// Настраиваем кнопки на формах
const formRegButton = authFormElement.querySelector('.form__link');
const formAuthButton = regFormElement.querySelector('.form__link');
const messageButton = successMessageElement.querySelector('.message__link');

popup.setContent(authForm.formElement);
const regButtonHandler = () => { popup.setContent(regForm.formElement); };
const authButtonHandler = () => { popup.setContent(authForm.formElement); };

formRegButton.addEventListener('click', regButtonHandler);
formAuthButton.addEventListener('click', authButtonHandler);
messageButton.addEventListener('click', authButtonHandler);

// Настраиваем header
const headerElement = document.querySelector('.header');
const authButton = headerElement.querySelector('.header__auth-button');
const savedLink = headerElement.querySelector('.header__menu-item_unselected_white');
const menuButton = headerElement.querySelector('.header__menu-button');
const headerElements = {
  authButton, savedLink, menuButton, headerElement,
};
const authButtonHandlers = {};
const header = new Header(headerElements, authButtonHandlers);

authButtonHandlers.login = () => {
  authForm.clear();
  authForm.clearErrors();
  authForm.setServerError('');
  popup.setContent(authForm.formElement);
  popup.open();
};

authButtonHandlers.logout = () => {
  mainApi.setToken('');
  localStorage.removeItem('token');
  header.render({ isLoggedIn: false });
  if (document.querySelectorAll('.card__btn')) {
    [...document.querySelectorAll('.card__btn')].forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });
  }
};

mainApi.onLoginSuccess = (res) => {
  header.render({ isLoggedIn: true, userName: res.name });
  if (document.querySelectorAll('.card__btn')) {
    [...document.querySelectorAll('.card__btn')].forEach((button) => {
      button.removeAttribute('disabled');
    });
  }
};

mainApi.onLoginFail = () => {
  header.render({ isLoggedIn: false });
};

mainApi.getUserData(localStorage.getItem('token'));

// NewsAPI
const APIkey = '0403a27a7eab4af4ac93acad206d2cfa';
const newsApi = new NewsApi(APIkey);

// Контейнер для карточек
const searchFormElement = document.querySelector('.search__form');
const resultsSection = document.querySelector('.section_background_blue');
const createCardFunc = (cardData) => {
  const card = new Card(cardData, { type: 'notMarked', active: header.isLoggedIn }, mainApi);
  return card.cardElement;
};

const cardList = new CardList([], createCardFunc, resultsSection, 'Результаты поиска');

// Форма поиска
const searchForm = new SearchForm(searchFormElement, cardList, newsApi);
new FormValidator(searchForm.formElement);

// Статичные изображения
require('../images/image-03.jpg');
require('../images/image-03-mini.jpg');
require('../images/logout.svg');
require('../images/logout_black.svg');
require('../images/N.svg');
