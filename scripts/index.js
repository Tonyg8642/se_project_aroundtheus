const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// DOM Elements
//tells JavaScript, "This is the spot where we’ll put the cards!"
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile__edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileModalCloseBtn = editProfileModal.querySelector(
  "#profile-close-button"
);
const modalCaption = document.querySelector(".modal__caption");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close");
const imgModal = document.querySelector("#image-modal");

//The code below selects the close button from the index.html file.
//just to confirm do console.log after
const imgModalCloseBtn = imgModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const modalImage = document.querySelector(".modal__image");

const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");
const profileEditForm = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Helper Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function closeModalOnEsc(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

// Add event listener to listen for key presses
document.addEventListener("keydown", closeModalOnEsc);
function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleOverlayClick);
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

  cardImageEl.addEventListener("click", () => {
    modalImage.src = cardImageEl.src;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openModal(imgModal);
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value.trim();
  const link = cardUrlInput.value.trim();

  if (name && link) {
    renderCard({ name, link }, cardsWrap);
    cardTitleInput.value = "";
    cardUrlInput.value = "";
    closeModal(addCardModal);
  } else {
    alert("Please fill out both fields!");
  }
}

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value.trim();
  profileDescription.textContent = profileDescriptionInput.value.trim();
  closeModal(editProfileModal);
}

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

profileModalCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);

// Adding a click event listener to the imgModal close button
//calling our closeModal function when the button which is the x button
imgModalCloseBtn.addEventListener("click", () => closeModal(imgModal));

addNewButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseBtn.addEventListener("click", () => closeModal(addCardModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Render initial cards
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

//There should be a caption under the image in the picture popup with the name of the
