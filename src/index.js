import "./pages/index.css";
import PopupWithForm from "./components/PopupWithForm.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage";
import Section from "./components/Section";
import UserInfo from "./components/UserInfo";
import { initialCards, config } from "./utils/constants";

// DOM Elements
//tells JavaScript, "This is the spot where we’ll put the cards!"
const cardsWrap = document.querySelector(".cards__list");

const editProfileModalEl = document.querySelector("#profile__edit-modal");
const profileEditForm = editProfileModalEl.querySelector(".modal__form");

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});

console.log(userInfo.getUserInfo());

const editProfileModal = new PopupWithForm({
  popupSelector: "#profile__edit-modal",
  //
  handleFormSubmit: (formValues) => {
    // use data from formValues instead of accessing .value directly
    userInfo.setUserInfo({
      userName: formValues.title,
      userDescription: formValues.description,
    });
    // move functionality for submit here
  },
});
editProfileModal.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    section.addItem(renderCard(data));
    addCardFormElement.reset();

    // const name = cardTitleInput.value.trim();
    // const link = cardUrlInput.value.trim();
    // renderCard({ name, link }, cardsWrap);
    // cardTitleInput.value = "";
    // cardUrlInput.value = "";
    addCardFormValidator.disabledButtonState();
  },
});

addCardPopup.setEventListeners();

const popupWithImage = new PopupWithImage("#image-modal");
popupWithImage.setEventListeners();

// create const for add modal with new popupwith form
//and add event listener

const addCardModal = document.querySelector("#add-card-modal");
const profileEditBtn = document.querySelector("#profile__edit-button");
// const profileModalCloseBtn = editProfileModal.querySelector(
//   "#profile-close-button"
// );
const modalCaption = document.querySelector(".modal__caption");
const imgModal = document.querySelector("#image-modal");

//The code below selects the close button from the index.html file.
//just to confirm do console.log after
const addNewButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const modalImage = document.querySelector(".modal__image");

const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");

const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const editProfileFormValidator = new FormValidator(config, profileEditForm);
console.log("line 87");
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();

// Helper Functions

// function closeModalOnEsc(event) {
//   if (event.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     if (openModal) {
//       closeModal(openModal);
//     }
//   }
// }

//This function allows for the modal to close when clicking outside of the modal
//What it does: Defines a function named handleOverlayClick.
//Purpose: Reacts to a click event (evt) on the modal.
//if (evt.target.classList.contains("modal")) { What it does: Checks if the element that was clicked (evt.target) has a CSS class named modal.
//Purpose: Ensures the function only runs if the click was on the modal overlay.
//"const openModal = document.querySelector(".modal_opened");"
//"closeModal(openModal);". What it does: Calls the closeModal function and passes the currently opened modal (openModal) to it.
//Purpose: Closes the modal window.
// function handleOverlayClick(evt) {
//   if (evt.target.classList.contains("modal")) {
//     //const openModal = document.querySelector(".modal_opened");
//     closeModal(evt.target);
//   }
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   modal.addEventListener("click", handleOverlayClick);
//   // Add event listener to listen for key presses
//   document.addEventListener("keydown", closeModalOnEsc);
//
// }

// pass to card constructor
function handleImageClick({ name, link }) {
  // console.log({ name, link });
  // modalImage.src = link;
  // modalImage.alt = name;
  // modalCaption.textContent = name;
  // // openModal(imgodal);
  // // ...
  // imgModal.open();
  popupWithImage.open({ name, link });
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Set up card content
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  // Add event listeners
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  // choose between redundant code function on 137
  cardImageEl.addEventListener("click", () => {
    console.log("heres your card click event bro");
    modalImage.src = cardImageEl.src;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    imgModal.open();
  });

  //deleteButton.addEventListener("click", handleDeleteCard);

  function handleDeleteCard() {
    cardElement.remove();
  }
  return cardElement;
}

function renderCard(cardData, cardsWrap) {
  console.log(cardData);
  const card = new Card(cardData, "#card-template", handleImageClick);
  // Inside your card.js you have a PUBLIC function called getView, here you are calling your Card.js function
  const cardElement = card.getView();
  return cardElement;
  // use section class's addItem
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.userName;
  profileDescriptionInput.value = currentUserInfo.userDescription;
  editProfileModal.open();
});

addNewButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Adding a click event listener to the imgModal close button
//calling our closeModal function when the button which is the x button
// TODO remove
// { items: initialCards, renderer: function that gets called to add each item to DOM }
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      section.addItem(renderCard(data));
    },
  },
  ".cards__list"
  // cardsWrap.prepend('');
);

// Render initial cards
// Section class's renderItems will replace
// initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
section.renderItems(initialCards);

//There should be a caption under the image in the picture popup with the name of the
