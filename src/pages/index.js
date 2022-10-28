import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import { validationConfig } from '../utils/validationConfig.js';
import './index.css';

import { buttonEditProfile, popUpForm, buttonSubmitProfile, cardsContainer, buttonAddCard, cardPopupForm, buttonSubmitCard, buttonEditAvatar, avatarForm, buttonSubmitAvatar } from '../utils/constants';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: 'ae672644-5499-4af4-bef5-295b969af30e',
    'Content-Type': 'application/json',
  }
});

const formProfileValidator = new FormValidator(validationConfig, popUpForm, buttonSubmitProfile);
const formCardValidator = new FormValidator(validationConfig, cardPopupForm, buttonSubmitCard);
const formAvatarValidator = new FormValidator(validationConfig, avatarForm, buttonSubmitAvatar);

formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();

function createCard({data, templateSelector}, handleCardClick, handlePutLike, handleRemoveLike) {
  const card = new Card({ data, templateSelector, userId },
    handleCardClick,
    handlePutLike,
    handleRemoveLike,
    {
      handleDeleteClick: (cardId) => {
        popupConfirmDelete.open();
        popupConfirmDelete.setSubmitAction(() => {
          api
            .deleteCard(cardId)
            .then(() => {
              card.handleDeleteCard();
              popupConfirmDelete.close();
            })
            .catch((err) => {
              console.log('Error while deleting card', err);
            });
        });
      }
    }
  );
  return card.generateCard();
}

const cardList = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(
      {
        data: {image: cardData.link, title: cardData.name, likes: cardData.likes, _id: cardData._id, owner: cardData.owner._id},
        templateSelector: '.template', userId: userId }, handleCardClick, handlePutLike, handleRemoveLike);
    cardList.addItem(cardElement);
  }
}, '.elements');

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

function handleCardClick(cardData) {
  popupWithImage.open({ image: cardData.image, title: cardData.title });
}

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userStatusSelector: '.profile__status', userAvatarSelector: '.profile__avatar'});

let userId = null;

Promise.all([
  api.getInitialsCards(),
  api.getUserInfo(),
])
  .then(([cards, user]) => {
    userId = user._id;
    cardList.renderItems(cards);
    userInfo.setUserInfo({name: user.name, status: user.about});
    userInfo.setAvatar({avatar: user.avatar});
  })
  .catch((err) => {
    console.log(err);
  })

const popupProfileElement = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (inputValues) => {
    buttonSubmitProfile.textContent = 'Сохранение...';
    api.editProfile({ name: inputValues.name, about: inputValues.status })
      .then((res) => {
        userInfo.setUserInfo({name: res.name, status: res.about});
        popupProfileElement.close();
      })
      .catch((err) => {
        console.log('Error while editing profile', err);
      })
      .finally(() => {buttonSubmitProfile.textContent = 'Сохранить'});
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
    buttonSubmitCard.textContent = 'Создание...';
    api.addCard({ link: inputValues.link, name: inputValues.title })
      .then((res) => {
        const cardElement = createCard(
          {
            data: {link: res.link, title: res.title},
            templateSelector: '.template', userId: userId}, handleCardClick, handlePutLike, handleRemoveLike);
        cardsContainer.prepend(cardElement);
        popupCardElement.close();
        formCardValidator.disableButton();
      })
      .catch((err) => {
        console.log('Error while adding card', err);
      })
      .finally(() => {buttonSubmitProfile.textContent = 'Создать'});
  }
});

popupCardElement.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupCardElement.open();
});

const popupConfirmDelete = new PopupWithConfirmation({ popupSelector: '.popup_type_delete' });

popupConfirmDelete.setEventListeners();

const popupProfileAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (inputValues) => {
    buttonSubmitAvatar.textContent = 'Сохранение...';
    api.changeAvatar({ avatar: inputValues.avatar })
      .then((res) => {
        userInfo.setAvatar({avatar: res.avatar});
        popupProfileAvatar.close();
      })
      .catch((err) => {
        console.log('Error while changing avatar', err);
      })
      .finally(() => {buttonSubmitAvatar.textContent = 'Сохранение...'});
  }
});

popupProfileAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  const { avatar } = userInfo.getUserAvatar();
  const avatarInput = document.querySelector('.popup__input_type_avatar');
  avatarInput.value = avatar;
  popupProfileAvatar.open();
});

function handlePutLike(cardId, cardElement) {
  api.putLike(cardId)
    .then((res) => {
      cardElement.like(res.likes.length);
    })
    .catch((err) => {
      console.log('Error while putting like', err);
    })
}

function handleRemoveLike(cardId, cardElement) {
  api.deleteLike(cardId)
    .then((res) => {
      cardElement.like(res.likes.length);
    })
    .catch((err) => {
      console.log('Error while removing like', err);
    })
}
