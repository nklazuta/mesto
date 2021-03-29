import {ESC} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', event => this._handleEscClose(event));
        this._popup.addEventListener('click', event => this._handleOverlayClose(event));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', event => this._handleEscClose(event));
        this._popup.removeEventListener('click', event => this._handleOverlayClose(event));
    }

    _handleEscClose(event) {
        if (event.code === ESC) {
            this.close(this._popup);
        }
    }

    _handleOverlayClose(event) {
        if (event.target === event.currentTarget) {
            this.close(this._popup);
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close(this._popup));
    }
}