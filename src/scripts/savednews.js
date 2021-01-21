import '../pages/savednews.css';

import MainApi from './api/MainApi';
import Header from './components/Header';
import CardList from './components/CardList';
import Card from './components/Card';
import createElementFromString from './utils/createElementFromString';

const keywordsCounter = (keywords) => {
  const freq = {};
  keywords.forEach((keyword) => { freq[keyword] = (freq[keyword] += 1) || 1; });
  return Object.entries(freq).sort((a, b) => (b[1] - a[1]));
};

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

const createKeywordsElement = (topKeywords) => {
  if (topKeywords.length === 1) {
    return createElementFromString(
      `<p class="saved__keywords">По ключевому
      слову: <span class="saved__keyword"> ${topKeywords[0][0]}</span></p>`,
    );
  }

  let text = `<p class="saved__keywords">По ключевым
  словам: <span class="saved__keyword">${topKeywords[0][0]}</span>,
  <span class="saved__keyword">${topKeywords[1][0]}</span>`;

  if (topKeywords.length === 3) {
    text += `, <span class="saved__keyword">${topKeywords[2][0]}</span></p>`;
  } else if (topKeywords.length > 3) {
    text += `и <span class="saved__keyword">${topKeywords.length - 2} другим</span></p>`;
  }

  return createElementFromString(text);
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
    // resultsSection.appendChild(cardList.element);
    return res.map((article) => article.keyword);
  })
  .then((keywords) => {
    const topKeywords = keywordsCounter(keywords);
    console.log(topKeywords);
    const userName = localStorage.getItem('userName', 'res.name');
    const numb = keywords.length;
    const ends = getEnds(numb);
    helloElement.textContent = `${userName}, у вас ${numb || 'нет'} сохраненн${ends[0]} стат${ends[1]}`;
    if (numb) helloElement.append(createKeywordsElement(topKeywords));
  })
  .catch((err) => {
    // header.render({ isLoggedIn: false })
    console.log(err);
  });
