export default class Card {
    constructor({name, link}, selector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
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
        this._card.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }

    _handleDeleteButton() {
        this._card.closest('.card').remove();
    }

    _setEventListeners() {
        this._card.querySelector('.card__image').addEventListener('click', () => this._handleOpenImagePopup());
        this._card.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeButton());
        this._card.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteButton());
    }

    createCard() {
        this._card = this._getTemplate();
        this._setEventListeners();

        this._image = this._card.querySelector('.card__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._card.querySelector('.card__title').textContent = this._name;

        return this._card;
    }
}
