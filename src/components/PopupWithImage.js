import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  }

  open({ image, title }) {
    this._popupImage.src = image;
    this._popupImage.alt = title;
    this._popupFigcaption.textContent = title;
    super.open();
  }
}
