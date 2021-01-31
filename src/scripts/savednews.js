import '../pages/savednews.css';
import MainApiExtended from './api/MainApiExtended';
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
  ? 'https://api.lyudmila.students.nomoreparties.space'
  : 'http://localhost:3000';

const mainApiOptions = {
  baseUrl: MAIN_API_URL,
  headers: { 'Content-Type': 'application/json' },
};

const mainApi = new MainApiExtended(mainApiOptions);

const authButtonHandlers = {
  logout: () => {
    mainApi.setToken('');
    localStorage.removeItem('token');
    window.location.href = '../index.html';
  },
};
const headerElement = document.querySelector('.header');
const authButton = headerElement.querySelector('.header__auth-button');
const savedLink = headerElement.querySelector('.header__menu-item_underline_black');
const menuButton = headerElement.querySelector('.header__menu-button');
const headerElements = {
  authButton, menuButton, savedLink, headerElement,
};

const header = new Header(headerElements, authButtonHandlers);

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
let userName;
const renderKeywords = (keywords) => {
  const topKeywords = keywordsCounter(keywords);
  const numb = keywords.length;
  const ends = getEnds(numb);
  helloElement.textContent = `${userName}, у вас ${numb || 'нет'} сохраненн${ends[0]} стат${ends[1]}`;
  if (numb) document.querySelector('.saved__content').appendChild(createKeywordsElement(topKeywords));
};

mainApi.onLoginFail = () => {
  window.location.href = './index.html';
};

mainApi.onLoginSuccess = (userData) => {
  userName = userData.name;
  header.render({ isLoggedIn: true, userName });

  mainApi.getArticles()
    .then((res) => {
      cardList.cardsData = res;
      cardList.renderResults();
      return res.map((article) => article.keyword);
    })
    .then(renderKeywords)
    .catch((err) => {
      console.log(err);
    });
};

mainApi.getUserData(localStorage.getItem('token'));
