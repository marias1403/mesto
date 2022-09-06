const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (input, buttonSubmit) => {
  if (hasInvalidInput(input)) {
    buttonSubmit.classList.add('popup__submit-button_disabled');
  } else {
    buttonSubmit.classList.remove('popup__submit-button_disabled');
  }
};

function validateInput(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    error.classList.add(config.errorClass);
    error.textContent = input.validationMessage;
  } else {
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
    error.textContent = '';
  }
}

function setHandlers (form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonSubmit = form.querySelector('.popup__submit-button');
  toggleButtonState(inputs, buttonSubmit);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input,config);
      toggleButtonState(inputs, buttonSubmit);
    });
  });
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setHandlers(form, config);
  });
}

enableValidation(validationConfig);
