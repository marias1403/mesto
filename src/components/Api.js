export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + 'users/me', { headers: this._header })
      .then(this._checkResponse);
  }

  changeAvatar({ avatar }) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify( { avatar }),
    })
      .then(this._checkResponse);
  }

  editProfile({ name, about}) {
    return fetch(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify( { name, about }),
    })
      .then(this._checkResponse);
  }

  getInitialsCards() {
    return fetch(this._baseUrl + 'cards', { headers: this._header })
      .then(this._checkResponse);
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify( { name, link }),
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId, {
      method: 'DELETE',
      headers: this._header,
    })
      .then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._header,
    })
      .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + 'cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._header,
    })
      .then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }
}

