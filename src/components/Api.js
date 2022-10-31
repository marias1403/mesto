export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.headers;
  }

  getUserInfo() {
    return this._request(this._baseUrl + 'users/me', { headers: this._header })
  }

  changeAvatar({ avatar }) {
    return this._request(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify( { avatar }),
    })
  }

  editProfile({ name, about}) {
    return this._request(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify( { name, about }),
    })
  }

  getInitialsCards() {
    return this._request(this._baseUrl + 'cards', { headers: this._header })
  }

  addCard({ name, link }) {
    return this._request(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify( { name, link }),
    })
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + 'cards/' + cardId, {
      method: 'DELETE',
      headers: this._header,
    })
  }

  putLike(cardId) {
    return this._request(this._baseUrl + 'cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._header,
    })
  }

  deleteLike(cardId) {
    return this._request(this._baseUrl + 'cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._header,
    })
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }
}

