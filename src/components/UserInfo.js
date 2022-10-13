export default class UserInfo {
  constructor({ userNameSelector, userStatusSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userStatus = document.querySelector(userStatusSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      status: this._userStatus.textContent
    }
  }

  setUserInfo({name, status}) {
    this._userName.textContent = name;
    this._userStatus.textContent = status;
  }
}
