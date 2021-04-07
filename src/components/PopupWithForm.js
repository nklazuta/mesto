import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
constructor(popupSelector, {handleSubmitForm}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._loadingButton = this._popup.querySelector('.popup__loading-button');
        this._handleSubmitForm = handleSubmitForm;
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this.inputValues = {};
        this._inputList.forEach(input => {
            this.inputValues[input.name] = input.value;
        });
        
        return this.inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', event => {
            event.preventDefault();
            this.formData = this._getInputValues();
            this._handleSubmitForm(this.formData);
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.classList.add('popup__submit-button_hidden');
            this._loadingButton.classList.add('popup__loading-button_visible');
        } else {
            this._submitButton.classList.remove('popup__submit-button_hidden');
            this._loadingButton.classList.remove('popup__loading-button_visible');
        }
    }
}