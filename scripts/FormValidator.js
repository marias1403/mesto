export class FormValidator {
  constructor(config, formElement, buttonSubmit) {
    this._config = config;
    this._formElement = formElement;
    this._buttonSubmit = buttonSubmit;
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

  _hasInvalidInputs = (inputs) => {
    return inputs.some((input) => {
      return !input.validity.valid;
    })
  };

  _disableButton = () => {
    this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  };

  _enableButton = () => {
    this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = false;
  };

  _toggleButtonState = (input) => {
    if (this._hasInvalidInputs(input)) {
      this._disableButton(this._buttonSubmit);
    } else {
      this._enableButton(this._buttonSubmit);
    }
  };

  _setEventListeners = () => {
    const inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonSubmit = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputs, buttonSubmit);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleButtonState(inputs, buttonSubmit);
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


