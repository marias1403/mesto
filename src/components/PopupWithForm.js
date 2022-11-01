import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( { popupSelector, handleFormSubmit } ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__submit-button');
    this._buttonSubmitText = this._buttonSubmit.textContent
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    console.log(this._inputList);
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  _renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._buttonSubmitText = loadingText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
        // .then(() => this.close())
      //   .finally(() => {
      //     this._renderLoading(false);
      // })
    });
  }
}
