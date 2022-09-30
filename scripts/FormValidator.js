export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
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

  _disableButton = (buttonSubmit) => {
    buttonSubmit.classList.add(this._config.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', 'disabled');
  };

  _enableButton = (buttonSubmit) => {
    buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled', 'disabled');
  };

  _toggleButtonState = (input, buttonSubmit) => {
    if (this._hasInvalidInputs(input)) {
      this._disableButton(buttonSubmit);
    } else {
      this._enableButton(buttonSubmit);
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


