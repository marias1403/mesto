import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import { validationConfig } from './validationConfig.js';

const popupProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.edit-button');
const popUpForm = popupProfile.querySelector('.popup__form');
const nameInput = popUpForm.querySelector('.popup__input_type_name');
const jobInput = popUpForm.querySelector('.popup__input_type_status');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

const cardList = document.querySelector('.elements');

const popupCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.add-button');
const cardPopupForm = popupCard.querySelector('.popup__form_type_add');
const imageTitleInput = popupCard.querySelector('.popup__input_type_image-title');
const imageLinkInput = popupCard.querySelector('.popup__input_type_image-link');

const formProfileValidator = new FormValidator(validationConfig, popUpForm);
const formCardValidator = new FormValidator(validationConfig, cardPopupForm);

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

const renderElements = () => {
  cardList.innerHTML = '';
  initialCards.forEach((item) => {
    const card = new Card({
      image: item.link,
      title: item.name,
    });
    cardList.append(card.generateCard());
  });
}

renderElements();

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
  document.addEventListener('keydown', closePopupOnEsc);
}

function handleButtonEditProfile() {
  openPopUp(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopUp(popupProfile);
}


buttonEditProfile.addEventListener('click', handleButtonEditProfile);
popUpForm.addEventListener('submit', handleProfileFormSubmit);


function handleButtonAddCard() {
  openPopUp(popupCard);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = new Card({
    image: imageLinkInput.value,
    title: imageTitleInput.value,
  });
  cardList.prepend(cardElement.generateCard());
  closePopUp(popupCard);
  cardPopupForm.reset();
}

buttonAddCard.addEventListener('click', handleButtonAddCard);
cardPopupForm.addEventListener('submit', handleAddFormSubmit);


// function handlePutLike(e) {
//   const likeButton = e.target.closest('.elements__like');
//   likeButton.classList.toggle('elements__like_active');
// }
//
// function handleDelete(e) {
//   const cardElement = e.target.closest('.elements__element');
//   cardElement.remove();
// }
//
// function handleCardFormSubmit(e) {
//   const el = e.target.closest('.elements__element');
//   imagePopup.querySelector('.popup__image').src = el.querySelector('.elements__image').src;
//   imagePopup.querySelector('.popup__figcaption').textContent = el.querySelector('.elements__title').textContent;
//   imagePopup.querySelector('.popup__image').setAttribute('alt', el.querySelector('.elements__title').textContent);
//   openPopUp(imagePopup);
// }

// function addCardListeners(element) {
//   element.querySelector('.elements__like').addEventListener('click', handlePutLike);
//   element.querySelector('.elements__delete').addEventListener('click', handleDelete);
//   element.querySelector('.elements__image').addEventListener('click', handleCardFormSubmit);
// }
//
// function createCard(title, img) {
//   const newCardElement = cardTemplate.content.querySelector('.elements__element').cloneNode(true);
//   newCardElement.querySelector('.elements__title').textContent = title;
//   const imageElement = newCardElement.querySelector('.elements__image');
//   imageElement.src = img;
//   imageElement.setAttribute('alt', title);
//   addCardListeners(newCardElement);
//   return newCardElement;
// }

// initialCards.forEach((object) => {
//   cardList.prepend(createCard(object.name, object.link));
// });

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
