import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
    initialCards,
    configValidation,
    ESC
} from './constants.js';

const cardsList = document.querySelector('.cards__list');
const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
const closeButtonList = Array.from(document.querySelectorAll('.popup__close-button'));

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const aboutInput = editForm.querySelector('.popup__input_type_about');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('.popup__form');
const placeInpit = addForm.querySelector('.popup__input_type_place');
const linkInpit = addForm.querySelector('.popup__input_type_link');

const renderCard = element => {
    const card = new Card(element, '.card__template');
    const cardElement = card.createCard();
    cardsList.prepend(cardElement);
};

const openPopup = popup => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', handleOverlayClose);
};

const closePopup = popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', handleOverlayClose);
};

const handleEdit = event => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editPopup);
};

const handleAdd = event => {
    event.preventDefault();

    const newCard = {
        name: placeInpit.value,
        link: linkInpit.value
    };

    renderCard(newCard);
    closePopup(addPopup);
};

const handleEscClose = event => {
    if (event.code === ESC) {
        closePopup(document.querySelector('.popup_opened'));
    }
};

const handleOverlayClose = event => {
    if (event.target === event.currentTarget) {
        closePopup(document.querySelector('.popup_opened'));
    }
};

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(editPopup);
});

addButton.addEventListener('click', () => {
    placeInpit.value = '';
    linkInpit.value = '';
    openPopup(addPopup)
});

closeButtonList.forEach(closeButton => {
    closeButton.addEventListener('click', event => closePopup(event.target.closest('.popup')));
});

editForm.addEventListener('submit', handleEdit);
addForm.addEventListener('submit', handleAdd);

initialCards.forEach(item => renderCard(item));

formList.forEach(formElement => {
    formElement.addEventListener('submit', event => event.preventDefault());
    const formValidator = new FormValidator(configValidation, formElement);
    formValidator.enableValidation();
});