//creating a variable called "inital cards" and storying an area that contains the six objects below
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

//the code below from line  #33-#37 is an assignment statement that creates a varible
//and assigns the value to the variable
//line #36 pulls from index.html file cards list class
//the left hand side "const ..." is the name of the varible
//the right hand side is the value being stored in that value
//the const cardsWrap on line #34 uses querySelector to select the cards list
//above from lines #2-#27
//line 43 searches from inside the index.html only looks inside the AddCard Modal
//from index.html from line ##74
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile__edit-modal");
//gets the div and its children from #46-#72
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

//Elemnts

const profileEditBtn = document.querySelector("#profile__edit-button");

//below, the code narrows down the search instead of searching the entire html file it goes to
//the specific code required.
const profileModalCloseBtn = editProfileModal.querySelector(
  "#profile-close-button"
);
const profileAddCardModalCloseBtn = addCardModal.querySelector(
  "#profile-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewButton = document.querySelector(".profile__add-button");

//Form data
const profileTitleInput = document.querySelector(".modal__input_type_title");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//The  const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title') searches
//inside the div class index.html from line #85
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const profileEditForm = editProfileModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//The (modal) is called an arguement
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

//function openModal() {
// name.Input.value = profileTitle.textContent;
// jobInput.value = profileDescription.textContent;

// editProfileModal.classList.add("modal_is-opened");
//}

//the (modal) is called the arguemnt in the code below
function openModal(modal) {
  modal.classList.add("modal_opened");
}

//this entire function from line #83-#93 takes care of the entire function in terms of
//getting a new card on our page.
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  //find delete button

  const deleteButton = cardElement.querySelector(".card__delete-button");

  //add the event listerner to the delete button

  deleteButton.addEventListener("click", () => {
    deleteButton.classList.toggle("card__delete-button_active");
  });
  //cardElement.remove();
  //add click listener to the cardImage element
  //openModal with previewImageModal

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  //set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  //set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  //return the ready HTML element with the filled-in data
  return cardElement;
}

function handleAddCardFormSubmit(e) {
  evt.preventDefult();
  const titleValue = cardTitleInput.value;
  const cardElement = getCardElement();
  closePopup(addCardModal);
}

function handleProfileEditSubmit(e) {
  e.preventDefult();
  profileTitle.textContent = profileTitleInput.value;
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  profileDescriptionInput.value = profileDescription.textContent;
  closePopup(editProfileModal);
}

//The function renderCard takes in the CardData for adding a new card
// it grabs the CardElement & its going to call "getCardElement" and its going to
//pass in "CardData"
function renderCard(cardData) {
  const CardElement = getCardElement(cardData);
}

profileEditBtn.addEventListener("click", () => {
  // openModal(editProfileModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//add new card button. The click first, then openModal does the action
addNewButton.addEventListener("click", () => openModal(addCardModal));
profileAddCardModalCloseBtn.addEventListener("click", () =>
  closeModal(addCardModal)
);

//ASK ABOUT WHAT THIS CODE DOES BELOW STEP BY STEP
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
});

//Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//The querySelectoryAll in the code below selects all the like button in the index.html file
//the dot in .card__like-button means class.
//Ask ELIJH ABOUT THE CODE BELOW THIS COMMENT SO YOU KNOW HOW TO DO IT ON YOUR OWN
//STEP BY STEP
//likeButtons.forEach(likeButton => {
// likeButton.addEventListener('click', () => {
// console.log("click");

//The code below this line is the old code. Why was it changed and how would you know how
//or when to change it? ASK AND DONT FORGET!!

//const likeButtons = document.querySelectorAll(".card__like-button");
//likeButtons.forEach((likeButton) => {});

//The code below is the new updated one
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
