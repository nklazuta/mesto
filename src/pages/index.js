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
    updateAvatarButton,
    addButton,
    nameField, 
    aboutField
} from '../utils/constants.js';

const handleLike = card => {
    if (card.isLike()) {
        api.handleDeleteLike(card.cardId)
            .then(res => {
                card.updateCounter(res);
                card.toggleLike();
            })
            .catch(err => console.log('Ошибка: ', err));
    } else { 
        api.handlePutLike(card.cardId)
            .then(res => {
                card.updateCounter(res);
                card.toggleLike();
            })
            .catch(err => console.log('Ошибка: ', err));
    }
};

const handleDelete = card => {
    confirmPopup.setSubmitAction(card);
    confirmPopup.open();
};

const createNewCard = (item, myId) => {
    const card = new Card({
        data: {
            name: item.name,
            link: item.link,
            owner: item.owner,
            likes: item.likes,
            _id: item._id
        },
        handleCardClick: () => popupWithImage.open(item),
        handleLikeCard: () => handleLike(card, myId),
        handleDeleteIconClick: () => handleDelete(card)
    }, cardTemplateSelector, myId);
    
    return card;
};

const api = new Api(configApi);

const profile = new UserInfo(profileName, profileAbout, profileAvatar);

const cardList = new Section({
    renderer: (item, myId) => {
        const newCard = createNewCard(item, myId);
        cardList.addItem(newCard.createCard());
    }
}, cardsListContainer);

const popupWithImage = new PopupWithImage(imagePopupSelector);

const editPopup = new PopupWithForm(editPopupSelector, {
    handleSubmitForm: newInfo => {
        editPopup.renderLoading(true);
        api.handleEditProfile(newInfo)
            .then(res => {
                profile.setUserInfo(res);
                editPopup.close();
            })
            .catch(err => console.log('Ошибка: ', err))
            .finally(() => editPopup.renderLoading(false));
    }
});

const updateAvatarPopup = new PopupWithForm(updateAvatarPopupSelector, {
    handleSubmitForm: newAvatar => {
        updateAvatarPopup.renderLoading(true);
        api.handleUpdateAvatar(newAvatar)
            .then(res => {
                profile.setUserAvatar(res);
                updateAvatarPopup.close();
            })
            .catch(err => console.log('Ошибка: ', err))
            .finally(() => updateAvatarPopup.renderLoading(false));
    }
});

const addPopup = new PopupWithForm(addPopupSelector, {
    handleSubmitForm: (item) => {
        addPopup.renderLoading(true);
        api.handleAddCard(item)
            .then(res => {
                const ownerId = res.owner._id;
                const newCard = createNewCard(res, ownerId);
                cardList.addItem(newCard.createCard());
                addPopup.close();
            })
            .catch(err => console.log('Ошибка: ', err))
            .finally(() => addPopup.renderLoading(false));
    }
});

const confirmPopup = new PopupWithConfirm(confirmPopupSelector, {
    handleSubmitForm: card => {
        api.handleDeleteCard(card.cardId)
            .then(() => {
                card.removeCard();
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

updateAvatarButton.addEventListener('click', () => {
    updateAvatarPopup.open();
});

addButton.addEventListener('click', () => {
    addFormValidator.toggleButtonState();
    addPopup.open();
});

editPopup.setEventListeners();
updateAvatarPopup.setEventListeners();
addPopup.setEventListeners();
confirmPopup.setEventListeners();
popupWithImage.setEventListeners();

editFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();
addFormValidator.enableValidation();

api.getInfoAndCards()
    .then(res => {
        const [userInfo, initialCards] = res;
        profile.setUserInfo(userInfo);
        profile.setUserAvatar(userInfo);
        const myId = profile.setUserId(userInfo);
        cardList.renderItems(initialCards.reverse(), myId);
    })
    .catch(err => console.log('Ошибка: ', err));