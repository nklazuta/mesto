const altaiImage = new URL('../images/altai.jpg', import.meta.url);
const saintPetersburgImage = new URL('../images/saint-petersburg.jpg', import.meta.url);
const baikalImage = new URL('../images/baikal.jpg', import.meta.url);
const sochiImage = new URL('../images/sochi.jpg', import.meta.url);
const teriberkaImage = new URL('../images/teriberka.jpg', import.meta.url);
const vladivostokImage = new URL('../images/vladivostok.jpg', import.meta.url);

export const initialCards = [
    { name: 'Алтай', link: altaiImage },
    { name: 'Санкт-Петербург', link: saintPetersburgImage },
    { name: 'Байкал', link: baikalImage },
    { name: 'Сочи', link: sochiImage },
    { name: 'Териберка', link: teriberkaImage },
    { name: 'Владивосток', link: vladivostokImage }
];

export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const configApi = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: 'd085da0d-b1b0-4d58-957f-4994aa967a4e',
        'Content-Type': 'application/json'
    }
}

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const updateAvatarPopup = document.querySelector('.popup_type_avatar-update');

export const editForm = editPopup.querySelector('.popup__form');
export const addForm = addPopup.querySelector('.popup__form');
export const updateAvatarForm = updateAvatarPopup.querySelector('.popup__form');
/*export const addSubmitButton = addPopup.querySelector('.popup__submit-button');*/
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileAvatar = document.querySelector('.profile__avatar');
export const nameField = editForm.querySelector('.popup__input_type_name');
export const aboutField = editForm.querySelector('.popup__input_type_about');

export const cardTemplateSelector = '.card__template';
export const cardsListContainer = '.cards__list';
export const editPopupSelector = '.popup_type_edit';
export const updateAvatarPopupSelector = '.popup_type_avatar-update';
export const addPopupSelector = '.popup_type_add';
export const confirmPopupSelector = '.popup_type_confirm';
export const imagePopupSelector = '.popup_type_image';
export const likeButtonSelector = '.card__like-button';

export const ESC = 'Escape';