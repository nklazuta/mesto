import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({name, link}, popupSelector) {
        this._name = name;
        this._link = link;
        super(popupSelector);
    }

    open() {
        this._popup.querySelector('.popup__picture-title').textContent = this._name;
        this._popup.querySelector('.popup__picture').src = this._link;
        super.open();
    }
}