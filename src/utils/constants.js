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

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');

export const editForm = editPopup.querySelector('.popup__form');
export const addForm = addPopup.querySelector('.popup__form');
/*export const addSubmitButton = addPopup.querySelector('.popup__submit-button');*/
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = editForm.querySelector('.popup__input_type_name');
export const aboutInput = editForm.querySelector('.popup__input_type_about');

export const cardTemplateSelector = '.card__template';
export const cardsListContainer = '.cards__list';
export const editPopupSelector = '.popup_type_edit';
export const addPopupSelector = '.popup_type_add';
export const imagePopupSelector = '.popup_type_image';

export const ESC = 'Escape';