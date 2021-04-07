import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, {handleSubmitForm}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmitForm = handleSubmitForm;
    }

    setSubmitAction(card) {
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._card);
        });
    }
}