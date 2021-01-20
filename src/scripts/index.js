import '../pages/index.css';
import MainApi from './api/MainApi';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import SearchForm from './components/SearchForm';
import PopupMessage from './components/PopupMessage';
import Card from './components/Card';
import CardList from './components/CardList';
import NewsApi from './api/NewsApi';
import createElementFromString from './utils/createElementFromString';
import authFormLayot from './templates/authFormLayot';
import regFormLayot from './templates/regFormLayot';
import successMessageLayot from './templates/successMessageLayot';

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
const header = new Header(headerElements, popup);
const successMessage = new PopupMessage(popup, successMessageElement);
const regForm = new Form(
  regFormElement,
  mainApi.signup.bind(mainApi),
  successMessage.showInPopup.bind(successMessage),
  popup,
);

const setUserName = (userName) => {
  localStorage.setItem('userName', userName);
  header.render({ isLoggedIn: true, userName });
};

const setToken = (token) => {
  localStorage.setItem('token', token);
  mainApi.setToken(token);
  mainApi.getUserData()
    .then((userData) => {
      setUserName(userData.name);
      [... document.querySelectorAll('.card__btn')].forEach((element) => {
        element.removeAttribute('disabled');
      });
    });
};

const signin = (formData) => mainApi.signin(formData)
  .then((res) => {
    setToken(res.token);
  });

const authForm = new Form(
  authFormElement,
  signin,
  () => {
    popup.close();
    popup.setContent(authForm.formElement);
  },
);

const formRegButton = authFormElement.querySelector('.form__link');
const formAuthButton = regFormElement.querySelector('.form__link');
const messageButton = successMessageElement.querySelector('.message__link');
popup.setContent(authForm.formElement);
const regButtonHandler = () => { popup.setContent(regForm.formElement); };
const authButtonHandler = () => { popup.setContent(authForm.formElement); };
formRegButton.addEventListener('click', regButtonHandler);
formAuthButton.addEventListener('click', authButtonHandler);
messageButton.addEventListener('click', authButtonHandler);

mainApi.setToken(localStorage.getItem('token'));
mainApi.getUserData()
  .then((res) => header.render({ userName: res.name, isLoggedIn: true }))
  .catch(() => header.render({ isLoggedIn: false }));

const newsApi = new NewsApi(APIkey);
const searchFormElement = document.querySelector('.search__form');
const resultsSection = document.querySelector('.section_background_blue');
const createCardFunc = (cardData) => {
  const card = new Card(cardData, { type: 'notMarked', active: true }, mainApi);
  return card.cardElement;
};
const cardList = new CardList([], createCardFunc, resultsSection);
// resultsSection.appendChild(cardList.element);
const searchForm = new SearchForm(searchFormElement, cardList, newsApi);
searchFormElement.addEventListener('submit', searchForm.submitHandler.bind(this));

require('../images/image-03.jpg');
require('../images/image-03-mini.jpg');
require('../images/logout.svg');
require('../images/logout_black.svg');
require('../images/N.svg');
