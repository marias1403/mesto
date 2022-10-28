import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor( { popupSelector } ) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(callback) {
    this._submitAction = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitAction();
    });
  }
}
