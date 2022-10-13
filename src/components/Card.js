export default class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  _handlePutLike() {
    this._buttonPutLike.classList.toggle('elements__like_active');
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonPutLike.addEventListener('click', () => {
      this._handlePutLike();
    });

    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._openImagePopup(this._data);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonPutLike = this._element.querySelector('.elements__like');
    this._cardImage = this._element.querySelector('.elements__image');

    this._setEventListeners();

    this._cardImage.src = this._data.image;
    this._cardImage.alt = this._data.title;
    this._element.querySelector('.elements__title').textContent = this._data.title;

    return this._element;
  }
}
