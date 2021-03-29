import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
constructor(popupSelector, {handleSubmitForm}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
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
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.formData = this._getInputValues();
            this._handleSubmitForm(this.formData);
        });
    }
}