export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    console.log(data);
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    //."card__like-button"
    // this._cardElement
    //   .querySelector(".card__like-button")
    //   .addEventListener("click", () => {
    //     this._handleLikeIcon();
    //     console.log("click");
    //   });
    console.log(this._cardElement.querySelector(".card__like-button"));
    //."card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this, this._data._id);

        // this._handleDeleteCard();
      });

    this._cardImageElement.addEventListener("click", () => {
      console.log("hey we mad eit here");
      this._handleImageClick({ name: this._name, link: this._link });
    });

    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this, this._data._id);

        // this._handleDeleteCard();
      });
  }
  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_active");
  }
  // _handleDeleteCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }

  // _handleLikeIcon() {
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .classList.toggle("card__like-button_active");
  // }

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
    this._likeIconElement =
      this._cardElement.querySelector(".card__like-button");
    console.log(this._data);
    if (this._data.isLiked) {
      console.log(this._data.isLiked);
      this._likeIconElement.classList.add("card__like-button_active");
    }

    // set the src, textContent and alt text
    this._cardImageElement.alt = this._name;

    //get card View
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
