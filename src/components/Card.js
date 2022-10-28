export default class Card {
  constructor({ data, templateSelector, userId }, handleCardClick, handlePutLike, handleRemoveLike, { handleDeleteClick }) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handlePutLike = handlePutLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteClick = handleDeleteClick;
    this._cardId = data._id;
    this._ownerId = data.owner;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  like(likeCount) {
    this._buttonPutLike.classList.toggle('elements__like_active');
    this._numberOfLikes.textContent = likeCount;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonPutLike.addEventListener('click', () => {
      if (this._buttonPutLike.classList.contains('elements__like_active')) {
        this._handleRemoveLike(this._cardId, this);
      } else {
        this._handlePutLike(this._cardId, this);
      }
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonPutLike = this._element.querySelector('.elements__like');
    this._cardImage = this._element.querySelector('.elements__image');
    this._numberOfLikes = this._element.querySelector('.elements__like-counter');
    this._buttonDelete = this._element.querySelector('.elements__delete');
    if (this._userId === this._ownerId) {
      this._buttonDelete.classList.add('elements__delete_enabled');
    }
    for (let i = 0; i < this._data.likes.length; i++) {
      if (this._data.likes[i]._id === this._userId) {
        this._buttonPutLike.classList.add('elements__like_active');
        break;
      }
    }

    this._setEventListeners();

    this._cardImage.src = this._data.image;
    this._cardImage.alt = this._data.title;
    this._element.querySelector('.elements__title').textContent = this._data.title;
    this._numberOfLikes.textContent = this._data.likes.length;

    return this._element;
  }
}
