export default class Card {
  constructor({ name, link }, cardSelector) {
    console.log({ name, link });
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //."card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.handleLikeIcon();
        console.log("click");
      });
    console.log(this._cardElement.querySelector(".card__like-button"));
    //."card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDeleteCard);
  }

  _handleDeleteCard(evt) {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    console.log(this._cardElement);

    // select title and image elements
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._name;
    this._cardImageElement.src = this._link;

    // set the src, textContent and alt text
    this._cardImageElement.alt = this._name;

    //get card View
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
