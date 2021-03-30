import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item) {
        this._popup.querySelector('.popup__picture-title').textContent = item.name;
        this._popup.querySelector('.popup__picture').src = item.link;
        super.open();
    }
}