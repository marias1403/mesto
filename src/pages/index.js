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

import { buttonEditProfile, cardsContainer, buttonAddCard, buttonEditAvatar } from '../utils/constants';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: 'ae672644-5499-4af4-bef5-295b969af30e',
    'Content-Type': 'application/json',
  }
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

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
    userInfo.setUserInfo({name: user.name, about: user.about});
    userInfo.setAvatar({avatar: user.avatar});
  })
  .catch((err) => {
    console.log(err);
  })

const popupProfileElement = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (inputValues) => {
    api.editProfile({ name: inputValues.name, about: inputValues.status })
      .then((res) => {
        userInfo.setUserInfo({name: res.name, about: res.about});
        popupProfileElement.close();
      })
      .catch((err) => {
        console.log('Error while editing profile', err);
      })
  }
});

popupProfileElement.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  formValidators['user-info'].disableButton();
  formValidators['user-info'].resetValidation();
  const { name, status } = userInfo.getUserInfo();
  popupProfileElement.setInputValues({ name: name, status: status });
  popupProfileElement.open();
});

const popupCardElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (inputValues) => {
    api.addCard({ link: inputValues.link, name: inputValues.title })
      .then((res) => {
        const cardElement = createCard(
          {
            data: {image: res.link, title: res.name, likes: res.likes, _id: res._id, owner: res.owner._id },
            templateSelector: '.template', userId: userId}, handleCardClick, handlePutLike, handleRemoveLike);
        cardsContainer.prepend(cardElement);
        popupCardElement.close();
      })
      .catch((err) => {
        console.log('Error while adding card', err);
      })
  }
});

popupCardElement.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  formValidators['card-element'].disableButton();
  formValidators['card-element'].resetValidation();
  popupCardElement.open();
});

const popupConfirmDelete = new PopupWithConfirmation({ popupSelector: '.popup_type_delete' });

popupConfirmDelete.setEventListeners();

const popupProfileAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (inputValues) => {
    api.changeAvatar({ avatar: inputValues.avatar })
      .then((res) => {
        userInfo.setAvatar({avatar: res.avatar});
        popupProfileAvatar.close();
      })
      .catch((err) => {
        console.log('Error while changing avatar', err);
      })
  }
});

popupProfileAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  formValidators['user-avatar'].disableButton();
  formValidators['user-avatar'].resetValidation();
  const { avatar } = userInfo.getUserAvatar();
  popupProfileAvatar.setInputValues({ avatar: avatar });
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
