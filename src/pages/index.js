import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
    /*initialCards,*/
    configValidation,
    configApi,
    cardTemplateSelector,
    cardsListContainer,
    imagePopupSelector,
    editPopupSelector,
    updateAvatarPopupSelector,
    addPopupSelector,
    confirmPopupSelector,
    editForm,
    addForm,
    updateAvatarForm,
    profileName,
    profileAbout,
    profileAvatar,
    editButton,
    addButton,
    nameField, 
    aboutField,
    likeButtonSelector
} from '../utils/constants.js';

const deleteCardConfirm = card => {
    confirmPopup.setSubmitAction(card);
    confirmPopup.open();
};

const addNewCard = item => {
    const newCard = createNewCard(item);
    cardList.addItem(newCard.createCard(userId))
}

const api = new Api(configApi);
const profile = new UserInfo(profileName, profileAbout, profileAvatar);

const createNewCard = item => {
    const card = new Card({
        data: {
            name: item.name,
            link: item.link,
            owner: item.owner,
            likes: item.likes,
            cardId: item._id
        },
        handleCardClick: () => popupWithImage.open(item),
        handleLikeCard: card => card.querySelector(likeButtonSelector).classList.toggle('card__like-button_active'),
        handleDeleteIconClick: card => deleteCardConfirm(card)
    }, cardTemplateSelector);

    return card;
};

const cardList = new Section({
    renderer: item => addNewCard(item)
}, cardsListContainer);

const popupWithImage = new PopupWithImage(imagePopupSelector);

const editPopup = new PopupWithForm(editPopupSelector, {
    handleSubmitForm: newInfo => {
        api.handleEditProfile(newInfo)
            .then(res => {
                profile.setUserInfo(res);
                editPopup.close();
            })
            .catch(err => console.log('Ошибка: ', err));
    }
});

const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, {
    handleSubmitForm: newAvatar => {
        api.handleUpdateAvatar(newAvatar)
            .then(res => {
                profile.setUserAvatar(res);
                updateAvatarPopup.close();
            })
            .catch(err => console.log('Ошибка: ', err));
    }
});

const addPopup = new PopupWithForm(addPopupSelector, {
    handleSubmitForm: item => {
        api.handleAddCard(item)
            .then(res => {
                addNewCard(res);
                addPopup.close();
            })
            .catch(err => console.log('Ошибка: ', err));
    }
});

const confirmPopup = new PopupWithConfirm(confirmPopupSelector, {
    handleSubmitForm: () => {
        api.handleDeleteCard(card)
            .then(() => {
                card.remove();
                card = null;
                confirmPopup.close();
            })
            .catch(err => console.log('Ошибка: ', err))
    }
});

const editFormValidator = new FormValidator(configValidation, editForm);
const updateAvatarFormValidator = new FormValidator(configValidation, updateAvatarForm);
const addFormValidator = new FormValidator(configValidation, addForm);

editButton.addEventListener('click', () => {
    profile.putUserInfo(nameField, aboutField);
    editPopup.open();
});

addButton.addEventListener('click', () => {
    addFormValidator.toggleButtonState();
    addPopup.open();
});

editPopup.setEventListeners();
addPopup.setEventListeners();
confirmPopup.setEventListeners();
popupWithImage.setEventListeners();

editFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();
addFormValidator.enableValidation();

api.getInitialCards()
    .then(res => {
        cardList.renderItems(res)})
    .catch(err => console.log('Ошибка: ', err));

api.getUserInfo()
    .then(res => {
        profile.setUserInfo(res);
        profile.setUserAvatar(res);
        return userId = profile.setUserId(res);
    })
    .catch(err => console.log('Ошибка: ', err));