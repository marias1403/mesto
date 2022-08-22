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
const addButton = document.querySelector('.add-button');

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


function handlePutLike(e) {
  const likeButton = e.target.closest('.elements__like');
  likeButton.classList.toggle('elements__like_active');
}

function handleDelete(e) {
  const cardElement = e.target.closest('.elements__element');
  cardElement.remove();
}

function handleZoomImage(e) {
  const cardImage = e.target.closest('.elements__image');
}

function cardAddListeners(element) {
  element.querySelector('.elements__like').addEventListener('click', handlePutLike);
  element.querySelector('.elements__delete').addEventListener('click', handleDelete);
  element.querySelector('.elements__image').addEventListener('click', handleZoomImage);
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
