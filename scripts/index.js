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

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const form = popup.querySelector('.popup__form');
const nameInput = form.querySelector('.popup__input_type_name');
const aboutInput = form.querySelector('.popup__input_type_about');
const cardTemplate = document.querySelector(".card__template").content;
const cardsList = document.querySelector('.cards__list');



function openPopup() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popup.classList.add('popup_opened');
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function handleEdit (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup();
};

function render() {
    initialCards.forEach(renderCard);
};

function renderCard(element) {
    const htmlElement = cardTemplate.cloneNode(true);
    htmlElement.querySelector('.card__image').setAttribute('src', element.link);
    htmlElement.querySelector('.card__image').setAttribute('alt', element.name);
    htmlElement.querySelector('.card__title').innerText = element.name;

    cardsList.prepend(htmlElement);
};

editButton.addEventListener('click', openPopup);
//addButton.addEventListener('click', handleAdd);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleEdit);

render();