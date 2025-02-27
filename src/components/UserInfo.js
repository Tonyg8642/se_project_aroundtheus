export default class UserInfo {
  constructor({ UserNameSelector, UserDescriptionSelector }) {
    this._userNameElement = document.querySelector(UserNameSelector);
    this._userDescriptionElement = document.querySelector(
      UserDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
    // Grab the text content of each variable for the name and description
  }

  setUserInfo({ userName, userDescription }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
    // Set the textContent of the name and description
  }
}
