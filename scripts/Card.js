export class Card {
  constructor(data) {
    this._data = data;
  }

  _getTemplate() {
    return document
      .querySelector('.template')
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  _getImagePopup() {
    return document.querySelector('.popup_type_image');
  }

  _handlePutLike() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleOpenPopup() {
    const popupImage = this._imagePopup.querySelector('.popup__image');
    popupImage.src = this._data.image;
    popupImage.setAttribute('alt', this._data.title);
    this._imagePopup.querySelector('.popup__figcaption').textContent = this._data.title;
    this._imagePopup.classList.add('popup_opened');
  }

  _handleClosePopup() {
    this._imagePopup.classList.remove('popup_opened');
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

    this._element.querySelector('.elements__image').src = this._data.image;
    this._element.querySelector('.elements__image').setAttribute('alt', this._data.title);
    this._element.querySelector('.elements__title').textContent = this._data.title;

    return this._element;
  }
}
