import createElementFromString from '../utils/createElementFromString';

class CardList {
  constructor(cardsData, createCardFunc) {
    this.cardData = cardsData;
    this.createCardFunc = createCardFunc;
    const elementLayot = '<div class="section__content"></div>';
    const loaderLayot = `
    <div>
    <i class="section__preloader"></i>
    <h3 class="section__message">Идет поиск новостей...</h3>
    </div>
    `;
    const cardContainerLayot = '<div class="card-container"></div>';
    const errorLayot = `
    <div>
      <div class="section__bad-face"></div>
      <h3 class="section__nothing">Ничего не найдено</h3>
      <p class="section__message">
        К сожалению по вашему запросу ничего не найдено.
      </p>
    </div>
    `;

    this.cardContainer = createElementFromString(cardContainerLayot);
    this.element = createElementFromString(elementLayot);
    this.loaderElement = createElementFromString(loaderLayot);
    this.errorElement = createElementFromString(errorLayot);
    this.cardCounter = 3;
  }

  addCard(cardData) {
    this.cardContainer.appendChild(this.createCardFunc(cardData));
  }

  showMore() {
    this.cardCounter += 3;
    for (let i = this.cardCounter; i < this.cardCounter + 3 && i < this.cardsData.length; i += 1) {
      this.addCard(this.cardsData[i]);
    }
  }

  renderLoader() {
    this.element.textContent = '';
    this.element.appendChild(this.loaderElement);
  }

  renderError(err) {
    this.element.textContent = '';
    this.element.appendChild(this.errorElement);
    console.log(err);
  }

  renderResults(cardsData) {
    this.cardContainer.textContent = '';
    cardsData.forEach((card) => {
      this.addCard(card);
    });
    this.element.textContent = '';
    this.element.appendChild(this.cardContainer);
  }
}

export default CardList;
