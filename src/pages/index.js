import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
    initialCards,
    configValidation,
    cardTemplateSelector,
    cardsListContainer,
    imagePopupSelector,
    editPopupSelector,
    addPopupSelector,
    editForm,
    addForm,
    profileName,
    profileAbout,
    editButton,
    addButton,
    nameInput,
    aboutInput
} from '../utils/constants.js';

const createNewCard = item => {
const card = new Card(item, cardTemplateSelector, () => popupWithImage.open(item));
    cards.addItem(card.createCard());
};

const cards = new Section({
    items: initialCards,
    renderer: item => createNewCard(item)
}, cardsListContainer);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'd085da0d-b1b0-4d58-957f-4994aa967a4e',
        'Content-Type': 'application/json'
    }
});
api.getServerUserInfo(profileName, profileAbout, profileAvatar);

const userInfo = new UserInfo(profileName, profileAbout);
let userInfoData = userInfo.getUserInfo();

const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

const editPopup = new PopupWithForm(editPopupSelector, {
    handleSubmitForm: newData => {
        userInfo.setUserInfo(newData, profileName, profileAbout);
        userInfoData = {
            name: profileName.textContent,
            about: profileAbout.textContent
        };
        
        editPopup.close();
    }
});

const addPopup = new PopupWithForm(addPopupSelector, {
    handleSubmitForm: item => {
        createNewCard(item);
        addPopup.close();
    }
});

const editFormValidator = new FormValidator(configValidation, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(configValidation, addForm);
addFormValidator.enableValidation();

editButton.addEventListener('click', () => {
    nameInput.value = userInfoData.name;
    aboutInput.value = userInfoData.about;
    editPopup.open();
});

addButton.addEventListener('click', () => {
    addFormValidator.toggleButtonState();
    addPopup.open();
});

editPopup.setEventListeners();
addPopup.setEventListeners();

cards.renderItems();