import {ESC} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
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