import createElementFromString from '../utils/createElementFromString';

class CardList {
  constructor(cardsData, createCardFunc, parentElement, title) {
    this.cardsData = cardsData;
    this.createCardFunc = (cardData) => createCardFunc(cardData);
    this.parentElement = parentElement;
    this.cardCounter = 0;

    const loaderLayot = `
    <div class="section__content">
    <i class="section__preloader"></i>
    <h3 class="section__message">Идет поиск новостей...</h3>
    </div>
    `;
    const cardContainerLayot = `
      <div class="card-container">
      </div>
    `;

    const errorLayot = `
    <div class="section__content">
      <div class="section__bad-face"></div>
      <h3 class="section__nothing">Ничего не найдено</h3>
      <p class="section__message">
        К сожалению по вашему запросу ничего не найдено.
      </p>
    </div>
    `;
    this.contentElement = createElementFromString(
      `<div class="section__content">
      </div>`,
    );

    if (title) {
      this.contentElement.appendChild(createElementFromString(
        `<h2 class="section__title">${title}</h2>`,
      ));
    }

    this.cardContainer = createElementFromString(cardContainerLayot);
    this.loaderElement = createElementFromString(loaderLayot);
    this.errorElement = createElementFromString(errorLayot);

    this.showMoreElement = createElementFromString(
      '<button class="card-container__more style="display: none;">Показать еще</button>',
    );
    this.showMoreElement.addEventListener('click', this.showMore.bind(this));

    this.contentElement.appendChild(this.cardContainer);
    this.contentElement.appendChild(this.showMoreElement);
  }

  renderResults(a = 0, b = this.cardsData.length) {
    this.parentElement.textContent = '';
    this.parentElement.appendChild(this.contentElement);
    if (a === 0) {
      this.cardContainer.textContent = '';
    }
    let maxNumb = b;
    if (b >= this.cardsData.length) {
      maxNumb = this.cardsData.length;
      this.showMoreElement.setAttribute('style', 'display: none');
    } else this.showMoreElement.removeAttribute('style');
    for (let i = a; i < maxNumb; i += 1) {
      this.addCard(this.cardsData[i]);
    }
    this.cardCounter = b;
  }

  addCard(cardData) {
    this.cardContainer.appendChild(this.createCardFunc(cardData));
  }

  showMore() {
    this.renderResults(this.cardCounter, this.cardCounter + 3);
  }

  renderError(err) {
    this.parentElement.textContent = '';
    this.parentElement.appendChild(this.errorElement);
    console.log(err);
  }

  renderLoader() {
    this.parentElement.textContent = '';
    this.parentElement.appendChild(this.loaderElement);
  }
}

export default CardList;
