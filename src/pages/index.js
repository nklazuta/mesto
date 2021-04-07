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
    card.likes.forEach(like => {
        if (like._id !== card.myId) {
            api.handlePutLike(card.cardId)
                .then((res) => {
                    card.toggleCounter(res);
                    card.addLike();
                })
                .catch(err => console.log('Ошибка: ', err));
        } else {
            api.handleDeleteLike(card.cardId)
                .then((res) => {
                    card.toggleCounter(res);
                    card.deleteLike();
                })
                .catch(err => console.log('Ошибка: ', err));
        }
    })
};

const handleDelete = card => {
    confirmPopup.setSubmitAction(card);
    confirmPopup.open();
};

const api = new Api(configApi);
const profile = new UserInfo(profileName, profileAbout, profileAvatar);

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

editPopup.setEventListeners();
updateAvatarPopup.setEventListeners();
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

        const createNewCard = item => {
            const card = new Card({
                data: {
                    name: item.name,
                    link: item.link,
                    owner: item.owner,
                    likes: item.likes,
                    _id: item._id
                },
                handleCardClick: () => popupWithImage.open(item),
                handleLikeCard: () => handleLike(card),
                handleDeleteIconClick: () => handleDelete(card)
            }, cardTemplateSelector, myId);

            return card;
        };
        
        const cardList = new Section({
            renderer: item => {
                const newCard = createNewCard(item);
                cardList.addItem(newCard.createCard());
            }
        }, cardsListContainer);

        const addPopup = new PopupWithForm(addPopupSelector, {
            handleSubmitForm: item => {
                addPopup.renderLoading(true);
                api.handleAddCard(item)
                    .then(res => {
                        const newCard = createNewCard(res);
                        cardList.addItem(newCard.createCard());
                        addPopup.close();
                    })
                    .catch(err => console.log('Ошибка: ', err))
                    .finally(() => addPopup.renderLoading(false));
            }
        });

        addButton.addEventListener('click', () => {
            addFormValidator.toggleButtonState();
            addPopup.open();
        });

        addPopup.setEventListeners();
        
        cardList.renderItems(initialCards.reverse());
    })
    .catch(err => console.log('Ошибка: ', err));