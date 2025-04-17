import Popup from "./Popup.js";

export default class DeleteConfirmation extends Popup {
  constructor({ popupSelector, handleDeleteSubmit }) {
    super({ popupSelector });
    this._popupButton = this._popupElement.querySelector(".modal__button");
    this._handleDeleteSubmit = handleDeleteSubmit;
    this._card = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit(this._card, this._id);
     
    });
  }

  open(card, _id) {
    this._card = card;
    this._id = _id;

    super.open();
  }
}
