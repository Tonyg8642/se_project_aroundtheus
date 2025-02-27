import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
  }

  close() {
    this._popupForm.reset(); // Ensure the form resets
    super.close(); // Call parent class close method
  }

  // declare a method _getInputValues
  // gather all input values into an object
  // return the object

  _getInputValues() {
    let values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // PAss the _getInputValues() return value to this function
      this._handleFormSubmit(this._getInputValues());
      this.close(); // Close after submission
    });
  }
}
