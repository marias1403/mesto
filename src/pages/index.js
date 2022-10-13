import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from '../utils/cards.js';
import { validationConfig } from '../utils/validationConfig.js';
import './index.css';

import { buttonEditProfile, popUpForm, buttonSubmitProfile, cardsContainer, buttonAddCard, cardPopupForm, buttonSubmitCard  } from '../utils/constants';

const formProfileValidator = new FormValidator(validationConfig, popUpForm, buttonSubmitProfile);
const formCardValidator = new FormValidator(validationConfig, cardPopupForm, buttonSubmitCard);

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

function createCard({link, title}, templateSelector, popupFunction) {
  const card = new Card({
    image: link,
    title: title,
  }, templateSelector, popupFunction)
  return card.generateCard();
}

const cardList = new Section({
  renderer: (cardData) => {
    const cardElement = createCard({link: cardData.link, title: cardData.name}, '.template', handleCardClick);
    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.renderItems(initialCards);

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

function handleCardClick(cardData) {
  popupWithImage.open({ image: cardData.image, title: cardData.title });
}

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userStatusSelector: '.profile__status' });

const popupProfileElement = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo({name: inputValues.name, status: inputValues.status});
    popupProfileElement.close();
  }
});

popupProfileElement.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  const { name, status } = userInfo.getUserInfo();
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_status');
  nameInput.value = name;
  jobInput.value = status;
  popupProfileElement.open();
});

const popupCardElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (inputValues) => {
    const cardElement = createCard({ link: inputValues.link, title: inputValues.title }, '.template', handleCardClick);
    cardsContainer.prepend(cardElement);
    popupCardElement.close();
    formCardValidator.disableButton();
  }
});

popupCardElement.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupCardElement.open();
});
