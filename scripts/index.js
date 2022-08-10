const popUp = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const closeIcon = document.querySelector('.popup__close-icon');
const popUpForm = popUp.querySelector('.popup__form');
const nameInput = popUpForm.querySelector('.popup__item_name');
const jobInput = popUpForm.querySelector('.popup__item_status');

function openPopup() {
  popUp.classList.add('popup_opened');
}

function closePopup() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const profile = document.querySelector('.profile');
  const profileName = profile.querySelector('.profile__name');
  const profileStatus = profile.querySelector('.profile__status');
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeIcon.addEventListener('click', closePopup);
popUpForm.addEventListener('submit', formSubmitHandler);
