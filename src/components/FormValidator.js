export default class FormValidator {
  constructor(config, formElement, buttonSubmit) {
    this._config = config;
    this._formElement = formElement;
    this._buttonSubmit = buttonSubmit;
    this._inputs = Array.from(formElement.querySelectorAll(this._config.inputSelector));
  }

  _showInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.classList.add(this._config.errorClass);
    error.textContent = input.validationMessage;
  };

  _hideInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    error.classList.remove(this._config.errorClass);
    error.textContent = '';
  };

  _validateInput = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  _hasInvalidInputs = () => {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    })
  };

  disableButton = () => {
    this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  };

  _enableButton = () => {
    this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = false;
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInputs()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}


