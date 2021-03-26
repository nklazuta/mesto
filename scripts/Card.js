import { ESC } from './constants.js';

export default class Card {
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._imagePopup = document.querySelector('.popup_type_image');
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
        this._imagePopup.classList.add('popup_opened');
        this._imagePopup.querySelector('.popup__picture-title').textContent = this._name;
        this._imagePopup.querySelector('.popup__picture').src = this._link;

        this._imagePopup.addEventListener('click', event => this._handleOverlayClose(event));
        document.addEventListener('keydown', event => this._handleEscClose(event));
    }

    _handleCloseImagePopup() {
        this._imagePopup.classList.remove('popup_opened');
        this._imagePopup.removeEventListener('click', event => this._handleOverlayClose(event));
        document.removeEventListener('keydown', event => this._handleEscClose(event));
    }

    _handleEscClose(event) {
        if (event.code === ESC) {
            this._handleCloseImagePopup(this._imagePopup);
        }
    }

    _handleOverlayClose(event) {
        if (event.target === event.currentTarget) {
            this._handleCloseImagePopup(this._imagePopup);
        }
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
