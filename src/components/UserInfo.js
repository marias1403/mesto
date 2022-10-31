export default class UserInfo {
  constructor({ userNameSelector, userStatusSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userStatus = document.querySelector(userStatusSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      status: this._userStatus.textContent
    }
  }

  getUserAvatar() {
    return {
      avatar: this._userAvatar.src
    }
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userStatus.textContent = about;
  }

  setAvatar({avatar}) {
    this._userAvatar.src = avatar;
  }
}
