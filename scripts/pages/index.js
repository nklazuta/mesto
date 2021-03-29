import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
    initialCards,
    configValidation,
    cardTemplateSelector,
    cardsListContainer,
    imagePopupSelector,
    editPopupSelector,
    addPopupSelector,
    formList,
    profileName,
    profileAbout,
    editButton,
    addButton,
    nameInput,
    aboutInput
} from '../utils/constants.js';

const createNewCard = item => {
    const popupWithImage = new PopupWithImage(item, imagePopupSelector);
        popupWithImage.setEventListeners();
        const card = new Card(item, cardTemplateSelector, () => popupWithImage.open());
        cards.addItem(card.createCard());
};

const cards = new Section({
    items: initialCards,
    renderer: item => createNewCard(item)
}, cardsListContainer);

const userInfo = new UserInfo(profileName, profileAbout);
let userInfoData = userInfo.getUserInfo();

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

formList.forEach(formElement => {
    const formValidator = new FormValidator(configValidation, formElement);
    formValidator.enableValidation();
});

editButton.addEventListener('click', () => {
    nameInput.value = userInfoData.name;
    aboutInput.value = userInfoData.about;
    editPopup.open();
});

addButton.addEventListener('click', () => addPopup.open());

editPopup.setEventListeners();
addPopup.setEventListeners();

cards.renderItems();