import { userSetter } from "core-js/fn/symbol";

export default class Card {
    constructor({data, handleCardClick, handleLikeCard, handleDeleteIconClick}, selector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleLikeCard = handleLikeCard;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._selector = selector;
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

    _isOwner(userId) {
        if (this._ownerId !== userId) {
            this._cardDeleteButton.classList.add('card__delete-button_hidden');
        }
    }

    _setEventListeners() {
        this._card.querySelector('.card__image').addEventListener('click', () => this._handleOpenImagePopup());
        this._cardLikeButton.addEventListener('click', () => this._handleLikeButton());
        this._cardDeleteButton.addEventListener('click', () => this._handleDeleteButton());
    }

    createCard(userId) {
        this._card = this._getTemplate();
        this._image = this._card.querySelector('.card__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._card.querySelector('.card__title').textContent = this._name;
        this._cardLikeButton = this._card.querySelector('.card__like-button');
        this._cardDeleteButton = this._card.querySelector('.card__delete-button');
        this._cardLikesCounter = this._card.querySelector('.card__like-counter');
        this._cardLikesCounter.textContent = this._likes.length;

        this._isOwner(userId);
        this._setEventListeners();

        return this._card;
    }
}
