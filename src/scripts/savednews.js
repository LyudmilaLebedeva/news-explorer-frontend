import '../pages/savednews.css';

import MainApi from './api/MainApi';
import Header from './components/Header';
import CardList from './components/CardList';
import Card from './components/Card';

const MAIN_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://nomoreparties.co'
  : 'http://localhost:3000';

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const headerElement = document.querySelector('.header');
const authButton = headerElement.querySelector('.header__auth-button');
const savedLink = headerElement.querySelector('.header__menu-item_underline_black');
const menuButton = headerElement.querySelector('.header__menu-button');
const headerElements = {
  authButton, menuButton, savedLink, headerElement,
};

const header = new Header(headerElements);

mainApi.setToken(localStorage.getItem('token'));
mainApi.getUserData()
  .then((res) => header.render({ userName: res.name, isLoggedIn: true }))
  .catch(() => header.render({ isLoggedIn: false }));

const newCardFunc = (cardData) => {
  const card = new Card(cardData, 'saved', mainApi);
  return card.cardElement;
};
const cardList = new CardList([], newCardFunc);
const resultsSection = document.querySelector('.section_background_blue');

mainApi.getArticles()
  .then((res) => {
    cardList.renderResults(res);
    resultsSection.appendChild(cardList.element);
    return res.map((article) => article.keyword);
  })
  .then((keywords) => {
    const freq = {};
    keywords.forEach((keyword) => { freq[keyword] = (freq[keyword] += 1) || 1; });
    const freqArr = Object.entries(freq).sort((a, b) => (b[1] - a[1]));
  });
