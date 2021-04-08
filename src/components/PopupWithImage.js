import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageTitle = this._popup.querySelector('.popup__picture-title');
        this._imageLink = this._popup.querySelector('.popup__picture');
    }

    open(item) {
        this._imageTitle.textContent = item.name;
        this._imageLink.src = item.link;
        super.open();
    }
}