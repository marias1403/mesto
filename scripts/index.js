const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popUp = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popUpForm = popUp.querySelector('.popup__form');
const nameInput = popUpForm.querySelector('.popup__input_type_name');
const jobInput = popUpForm.querySelector('.popup__input_type_status');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

const cardTemplate = document.querySelector('.template');
const cards = document.querySelector('.elements');

const addCardPopup = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.add-button');
const closeAddPopupButton = addCardPopup.querySelector('.popup__close-button_type_add');
const addPopUpForm = addCardPopup.querySelector('.popup__form_type_add');
const imageTitleInput = addCardPopup.querySelector('.popup__input_type_image-title');
const imageLinkInput = addCardPopup.querySelector('.popup__input_type_image-link');

const imagePopup = document.querySelector('.popup_type_image');
const closeImagePopupButton = document.querySelector('.popup__close-button_type_image');


function openPopup() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function closePopup() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popUpForm.addEventListener('submit', formSubmitHandler);


function openAddPopup() {
  addCardPopup.classList.add('popup_opened');
}

function closeAddPopup() {
  addCardPopup.classList.remove('popup_opened');
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = createCard(imageTitleInput.value, imageLinkInput.value);
  cards.prepend(cardElement);
  closeAddPopup();
}

addButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
addPopUpForm.addEventListener('submit', addFormSubmitHandler);


function handlePutLike(e) {
  const likeButton = e.target.closest('.elements__like');
  likeButton.classList.toggle('elements__like_active');
}

function handleDelete(e) {
  const cardElement = e.target.closest('.elements__element');
  cardElement.remove();
}

function handlePreviewImage(e) {
  const el = e.target.closest('.elements__element');
  imagePopup.querySelector('.popup__image').src = el.querySelector('.elements__image').src;
  imagePopup.querySelector('.popup__figcaption').textContent = el.querySelector('.elements__title').textContent;
  imagePopup.classList.add('popup_opened');
}

function closePreviewImage() {
  imagePopup.classList.remove('popup_opened');
}

closeImagePopupButton.addEventListener('click', closePreviewImage);

function cardAddListeners(element) {
  element.querySelector('.elements__like').addEventListener('click', handlePutLike);
  element.querySelector('.elements__delete').addEventListener('click', handleDelete);
  element.querySelector('.elements__image').addEventListener('click', handlePreviewImage);
}

function createCard(title, img) {
  const newCardElement = cardTemplate.content.cloneNode(true);
  newCardElement.querySelector('.elements__title').textContent = title;
  newCardElement.querySelector('.elements__image').src = img;
  cardAddListeners(newCardElement);
  return newCardElement;
}

initialCards.forEach((object) => {
  cards.prepend(createCard(object.name, object.link));
});
