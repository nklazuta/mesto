export default class Card {
    constructor({data, handleCardClick, handleLikeCard, handleDeleteIconClick}, selector, myId) {
        this._name = data.name;
        this._link = data.link;
        this.likes = data.likes;
        this._owner = data.owner;
        this.cardId = data._id;
        this._handleCardClick = handleCardClick;
        this._handleLikeCard = handleLikeCard;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._selector = selector;
        this.myId = myId;
    }

    _getTemplate() {
        const _cardTemplate = document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        
        return _cardTemplate;
    }

    _handleOpenImagePopup() {
        this._handleCardClick();
    }

    _handleLikeButton() {
        this._handleLikeCard();
    }

    _handleDeleteButton() {
        this._handleDeleteIconClick();
    }

    toggleLike() {
        this._cardLikeButton.classList.toggle('card__like-button_active');
    }

    updateCounter({likes}) {
        this.likes = likes;
        this._cardLikesCounter.textContent = this.likes.length;
    }

    isLike() {
        return this.likes.some(like => like._id === this.myId)
    }

    _isOwner() {
        if (this._owner._id !== this.myId) {
            this._cardDeleteButton.classList.add('card__delete-button_hidden');
        }
    }

    _setEventListeners() {
        this._card.querySelector('.card__image').addEventListener('click', () => this._handleOpenImagePopup());
        this._cardLikeButton.addEventListener('click', () => this._handleLikeButton());
        this._cardDeleteButton.addEventListener('click', () => this._handleDeleteButton());
    }

    createCard() {
        this._card = this._getTemplate();
        this._image = this._card.querySelector('.card__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._card.cardId = this.cardId;
        this._card.querySelector('.card__title').textContent = this._name;
        this._cardLikeButton = this._card.querySelector('.card__like-button');
        this._cardDeleteButton = this._card.querySelector('.card__delete-button');
        this._cardLikesCounter = this._card.querySelector('.card__like-counter');
        this._cardLikesCounter.textContent = this.likes.length;
        
        if (this.isLike()) {
            this.toggleLike();
        }
        
        this._isOwner();
        this._setEventListeners();

        return this._card;
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }
}
