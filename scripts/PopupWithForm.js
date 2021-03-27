import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(handleSubmitForm, popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleSubmitForm = handleSubmitForm;
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputsValues() {
        return values = Array.from(this._form.querySelectorAll('.popup__input').value);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitForm);
    }
}