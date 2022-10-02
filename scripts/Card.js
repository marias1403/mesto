export class Card {
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

  _getImagePopup() {
    return document.querySelector('.popup_type_image');
  }

  _handlePutLike() {
    const buttonPutLike = this._element.querySelector('.elements__like');
    buttonPutLike.classList.toggle('elements__like_active');
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleOpenPopup() {
    const popupImage = this._imagePopup.querySelector('.popup__image');
    popupImage.src = this._data.image;
    popupImage.alt = this._data.title;
    this._imagePopup.querySelector('.popup__figcaption').textContent = this._data.title;
    this._openImagePopup(this._imagePopup);
  }

  _handleClosePopup() {
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handlePutLike();
    });

    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._handleDelete();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._imagePopup.querySelector('.popup__close-button_type_image').addEventListener('click', () => {
      this._handleClosePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imagePopup = this._getImagePopup();

    this._setEventListeners();

    const cardImage = this._element.querySelector('.elements__image');
    cardImage.src = this._data.image;
    cardImage.alt = this._data.title;
    this._element.querySelector('.elements__title').textContent = this._data.title;

    return this._element;
  }
}
