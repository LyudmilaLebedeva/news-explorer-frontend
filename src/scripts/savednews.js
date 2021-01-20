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

const newCardFunc = (cardData) => {
  const card = new Card(cardData, { active: true, type: 'saved' }, mainApi);
  return card.cardElement;
};

const resultsSection = document.querySelector('.section_background_blue');
const cardList = new CardList([], newCardFunc, resultsSection);

const helloElement = document.querySelector('.saved__subtitle');

const getEnds = (numb) => {
  switch (numb) {
    case 1:
      return ['ая', 'ья'];
    case 2:
    case 3:
    case 4:
      return ['ые', 'ьи'];
    default:
      return ['ых', 'ей'];
  }
};

mainApi.setToken(localStorage.getItem('token'));
mainApi.getUserData()
  .then((res) => {
    header.render({ userName: res.name, isLoggedIn: true });
    localStorage.setItem('userName', res.name);
    return mainApi.getArticles();
  })
  .then((res) => {
    cardList.cardsData = res;
    cardList.renderResults();
    resultsSection.appendChild(cardList.element);
    return res.map((article) => article.keyword);
  })
  .then((keywords) => {
    const freq = {};
    keywords.forEach((keyword) => { freq[keyword] = (freq[keyword] += 1) || 1; });
    const freqArr = Object.entries(freq).sort((a, b) => (b[1] - a[1]));
    const userName = localStorage.getItem('userName', 'res.name');
    const numb = keywords.length;
    const ends = getEnds(numb);
    helloElement.textContent = `${userName}, у вас ${numb} сохраненн${ends[0]} стат${ends[1]}`;
  })
  .catch(() => header.render({ isLoggedIn: false }));
