import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import { validationConfig } from './validationConfig.js';

const popupProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.edit-button');
const popUpForm = popupProfile.querySelector('.popup__form');
const nameInput = popUpForm.querySelector('.popup__input_type_name');
const jobInput = popUpForm.querySelector('.popup__input_type_status');
const buttonSubmitProfile = popUpForm.querySelector('.popup__submit-button');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

const cardList = document.querySelector('.elements');

const popupCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.add-button');
const cardPopupForm = popupCard.querySelector('.popup__form_type_add');
const imageTitleInput = popupCard.querySelector('.popup__input_type_image-title');
const imageLinkInput = popupCard.querySelector('.popup__input_type_image-link');
const buttonSubmitCard = popupCard.querySelector('.popup__submit-button');

const formProfileValidator = new FormValidator(validationConfig, popUpForm, buttonSubmitProfile);
const formCardValidator = new FormValidator(validationConfig, cardPopupForm, buttonSubmitCard);

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

function addNewCard(link, title, templateSelector, popupFunction, isPrepend) {
  const cardElement = new Card({
    image: link,
    title: title,
  }, templateSelector, popupFunction)
  if (isPrepend) {
    cardList.prepend(cardElement.generateCard());
  } else {
    cardList.append(cardElement.generateCard());
  }
}

const renderInitialCards = () => {
  cardList.innerHTML = '';
  initialCards.forEach((cardData) => {
    addNewCard(cardData.link, cardData.name, '.template', openPopUp, false);
  });
}

renderInitialCards();

const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopUp(openedPopup);
  }
}

function openPopUp(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function handleClickButtonEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  openPopUp(popupProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopUp(popupProfile);
}


buttonEditProfile.addEventListener('click', handleClickButtonEditProfile);
popUpForm.addEventListener('submit', handleProfileFormSubmit);


function handleButtonAddCard() {
  openPopUp(popupCard);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addNewCard(imageLinkInput.value, imageTitleInput.value, '.template', openPopUp, true);
  closePopUp(popupCard);
  cardPopupForm.reset();
  buttonSubmitCard.disabled = true;
  buttonSubmitCard.classList.add('popup__submit-button_disabled');
}

buttonAddCard.addEventListener('click', handleButtonAddCard);
cardPopupForm.addEventListener('submit', handleAddFormSubmit);

function initializeClosePopup() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
        closePopUp(popup);
      }
    });
  });
}

initializeClosePopup();
