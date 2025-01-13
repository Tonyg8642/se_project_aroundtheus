// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMessage);
  inputEl.classList.add(inputErrorClass);
  errorMessage.textContent = inputEl.validationMessage;
  errorMessage.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessage.textContent = "";
  errorMessage.classList.remove(errorClass);
}
//adding the "!" in the if(!inputEl.validity.valid) is saying "if its not true then show the input error
//    } else {hideInputError(formEl, inputEl, options) this means that if theres not an error then remove it
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
    console.log("Not Valid");
  } else {
    console.log("Valid");
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

//disableFunction task

// function disabledButton(submitButton, inactiveButtonClass) {
//   submitButton.classList.add(inactiveButtonClass);
//   submitButton.disabled = true;
// }

// function enableButton(submitButton, inactiveButtonClass) {
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

//EnableFunction task

function toggleButtonState(inputEls, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputEls)) {
    // disabledButton(submitButton, inactiveButtonClass);
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    // enableButton();
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

//document.addEventListener("keydown", closeModalOnEsc);

//This listens for any key presses on the entire document.
//Check for the Escape Key:

//if (event.key === "Escape") ensures the function runs only when the Escape key is pressed.
//Find Open Modal:

//document.querySelector(".modal_opened") finds the currently open popup (modal).
//Close the Modal:

//Calls the closeModal function on the modal found, removing it from the screen.

//look for all inputs inside of form. Using the const inputsEls then formEls querySelectorAll
//looks for everything inside the form tag in your index.html file
function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  console.log(submitButton);
  //loop through all the inputs to see if all are valid

  toggleButtonState(inputEls, submitButton);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options.inactiveButtonClass);
    });
  });
}

//STEP: 2.........
//The code below calls the "const config" and calls all the objects inside. The (config) is called the parameter.
//The code below defines "enableValidation"
//The const formEl = document.querySelectorAll("form"); calls all the form tags inside of index.html
//"Array.from" creates a new array with the item inside of it
//The "..." is called a spread operator. What it does is it grabs anything thats an Array "[]" or an Array object.
//In this case, the spread operator will grab the form because it's inside an array
//The Spread Operator does the same thing as the "Array.from" method.
//The "formEls.forEach()" loops through each element
function enableValidation(options) {
  const formEls = document.querySelectorAll(options.formSelector);
  // const formEls = [...document.querySelectorAll("options.formSelector")];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      console.log(formEls);
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    //look for all inputs inside of form
    //loop through all the inputs to see if all are valid
    //if input is not valid
    //grab the validation message
    //add error class to input
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error message
  });
}

//STEP: 1.....
//The variable is called "config"
//The code below "const config" defines config and everything inside
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
//STEP: 3...........
//This calles "enableValidation" and passes config
//What you pass () below is going to be the perameter on line 7()
enableValidation(config);
