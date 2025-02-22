export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  // function openModal(modal) {
  //   modal.classList.add("modal_opened");
  //   modal.addEventListener("click", handleOverlayClick);
  //   // Add event listener to listen for key presses
  //   document.addEventListener("keydown", closeModalOnEsc);
  // }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();  
        }
    
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      console.log(e.target);
      if (
        e.target.classList.contains("modal__close") ||
        e.target.classList.contains("modal")
      ) {
        this.close();
      }
    });
  }
}


