const popupProfile = document.querySelector('.popup');
const buttonEditProfile = document.querySelector('.edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popUpForm = popupProfile.querySelector('.popup__form');
const nameInput = popUpForm.querySelector('.popup__input_type_name');
const jobInput = popUpForm.querySelector('.popup__input_type_status');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');

const cardTemplate = document.querySelector('.template');
const cards = document.querySelector('.elements');

const popupCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.add-button');
const buttonCloseCardPopup = popupCard.querySelector('.popup__close-button_type_add');
const cardPopupForm = popupCard.querySelector('.popup__form_type_add');
const imageTitleInput = popupCard.querySelector('.popup__input_type_image-title');
const imageLinkInput = popupCard.querySelector('.popup__input_type_image-link');

const imagePopup = document.querySelector('.popup_type_image');
const buttonCloseImagePopup = document.querySelector('.popup__close-button_type_image');

function openPopUp(popup) {
  popup.classList.add('popup_opened');
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
}

function handleButtonEditProfile() {
  openPopUp(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function handleButtonClose() {
  closePopUp(popupProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopUp(popupProfile);
}

function handleButtonAddCard() {
  openPopUp(popupCard);
}

function handleButtonCloseCardPopup() {
  closePopUp(popupCard);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(imageTitleInput.value, imageLinkInput.value);
  cards.prepend(cardElement);
  closePopUp(popupCard);
  cardPopupForm.reset();
}

function handlePutLike(e) {
  const likeButton = e.target.closest('.elements__like');
  likeButton.classList.toggle('elements__like_active');
}

function handleDelete(e) {
  const cardElement = e.target.closest('.elements__element');
  cardElement.remove();
}

function handleCardFormSubmit(e) {
  const el = e.target.closest('.elements__element');
  imagePopup.querySelector('.popup__image').src = el.querySelector('.elements__image').src;
  imagePopup.querySelector('.popup__figcaption').textContent = el.querySelector('.elements__title').textContent;
  imagePopup.querySelector('.popup__image').setAttribute('alt', el.querySelector('.elements__title').textContent);
  openPopUp(imagePopup);
}

function handleButtonCloseImagePopup() {
  closePopUp(imagePopup);
}

function cardAddListeners(element) {
  element.querySelector('.elements__like').addEventListener('click', handlePutLike);
  element.querySelector('.elements__delete').addEventListener('click', handleDelete);
  element.querySelector('.elements__image').addEventListener('click', handleCardFormSubmit);
}

function createCard(title, img) {
  const newCardElement = cardTemplate.content.cloneNode(true);
  newCardElement.querySelector('.elements__title').textContent = title;
  newCardElement.querySelector('.elements__image').src = img;
  newCardElement.querySelector('.elements__image').setAttribute('alt', title);
  cardAddListeners(newCardElement);
  return newCardElement;
}

initialCards.forEach((object) => {
  cards.prepend(createCard(object.name, object.link));
});

buttonEditProfile.addEventListener('click', handleButtonEditProfile);
buttonClose.addEventListener('click', handleButtonClose);
popUpForm.addEventListener('submit', handleProfileFormSubmit);

buttonAddCard.addEventListener('click', handleButtonAddCard);
buttonCloseCardPopup.addEventListener('click', handleButtonCloseCardPopup);
cardPopupForm.addEventListener('submit', handleAddFormSubmit);

buttonCloseImagePopup.addEventListener('click', handleButtonCloseImagePopup);


