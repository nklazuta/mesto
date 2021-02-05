const initialCards = [
    {
        name: 'Алтай',
        link: './images/altai-sergei-wing-z1JGcZdCTWk-unsplash.jpg'
    },
    {
        name: 'Санкт-Петербург',
        link: './images/saint-petersburg-ilia-schelkanov-ctN79wemAI4-unsplash.jpg'
    },
    {
        name: 'Байкал',
        link:'./images/baikal-artemis-faul-4ikF7mfy7c0-unsplash.jpg'
    },
    {
        name: 'Сочи',
        link: './images/sochi-igor-starkov-EMeGuuE3DLg-unsplash.jpg'
    },
    {
        name: 'Териберка',
        link: './images/teriberka-alexey-elfimov-Fe360foy5kI-unsplash.jpg'
    },
    {
        name: 'Владивосток',
        link: './images/vladivostok-pavel-anoshin-Sr79GsbRHjg-unsplash.jpg'
    }
];

const cardTemplate = document.querySelector(".card__template").content;
const cardsList = document.querySelector('.cards__list');

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

const imagePopup = document.querySelector('.popup_type_image');

const closeButtonList = Array.from(document.querySelectorAll('.popup__close-button'));

const render = () => {
    initialCards.forEach(renderCard);
};

const renderCard = (element) => {
    const card = createCard(element);
    cardsList.prepend(card);
};

const createCard = (element) => {
    const htmlElement = cardTemplate.cloneNode(true);
    const image =  htmlElement.querySelector('.card__image');
    image.setAttribute('src', element.link);
    image.setAttribute('alt', element.name);
    htmlElement.querySelector('.card__title').textContent = element.name;
    return htmlElement;
};

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscPopup);
    popup.addEventListener('click', handleClose);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscPopup);
    popup.removeEventListener('click', handleClose);
};

const handleEdit = (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editPopup);
};

const handleAdd = (event) => {
    event.preventDefault();

    const newCard = {
        name: placeInpit.value,
        link: linkInpit.value
    };

    renderCard(newCard);
    closePopup(addPopup);
};

const handleEscPopup = (event) => {
    if (event.keyCode === 27) {
        closePopup(document.querySelector('.popup_opened'));
    }
};

const handleClose = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(document.querySelector('.popup_opened'));
    }
};

const handleLikeButton = (event) => {
    if (event.target.classList.contains('card__like-button')) {
        event.target.classList.toggle('card__like-button_active');
    }
};

const handleDeleteButton = (event) => {
    if (event.target.classList.contains('card__delete-button')) {
        event.target.closest('.card').remove();
    }
};

const openImagePopup = (event) => {
    if (event.target.classList.contains('card__image')) {
        openPopup(imagePopup);
        imagePopup.querySelector('.popup__picture-title').textContent = event.target.closest('.card').firstElementChild.textContent;
        const link = event.target.closest('.card__image').getAttribute('src');
        imagePopup.querySelector('.popup__picture').setAttribute('src', link);
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

closeButtonList.forEach((closeButton) => {
    closeButton.addEventListener('click', (event) => closePopup(event.target.closest('.popup')));
});

editForm.addEventListener('submit', handleEdit);
addForm.addEventListener('submit', handleAdd);

cardsList.addEventListener('click', handleLikeButton);
cardsList.addEventListener('click', handleDeleteButton);
cardsList.addEventListener('click', openImagePopup);

render();