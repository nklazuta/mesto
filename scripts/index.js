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
const editCloseButton = editPopup.querySelector('.popup__close-button');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('.popup__form');
const placeInpit = addForm.querySelector('.popup__input_type_place');
const linkInpit = addForm.querySelector('.popup__input_type_link');
const addCloseButton = addPopup.querySelector('.popup__close-button');

const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');

const popupList = Array.from(document.querySelectorAll('.popup'));

function render() {
    initialCards.forEach(renderCard);
};

function renderCard(element) {
    const card = createCard(element);
    cardsList.prepend(card);
};

function createCard(element) {
    const htmlElement = cardTemplate.cloneNode(true);
    const image =  htmlElement.querySelector('.card__image');
    image.setAttribute('src', element.link);
    image.setAttribute('alt', element.name);
    htmlElement.querySelector('.card__title').innerText = element.name;

    htmlElement.querySelector('.card__like-button').addEventListener('click', (event) => {
        event.target.classList.toggle('card__like-button_active');
    });

    htmlElement.querySelector('.card__delete-button').addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    });

    image.addEventListener('click', () => {
        openPopup(imagePopup);
        imagePopup.querySelector('.popup__picture-title').innerText = element.name;
        imagePopup.querySelector('.popup__picture').setAttribute('src', element.link);
    });

    return htmlElement;
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function handleEdit (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editPopup);
};

function handleAdd (event) {
    event.preventDefault();

    const newCard = {
        name: placeInpit.value,
        link: linkInpit.value
    };

    renderCard(newCard);
    closePopup(addPopup);
};

editButton.addEventListener('click', ()=> {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(editPopup);
});

addButton.addEventListener('click', ()=> {
    placeInpit.value = '';
    linkInpit.value = '';
    openPopup(addPopup)
});

editCloseButton.addEventListener('click', ()=> closePopup(editPopup));
addCloseButton.addEventListener('click', ()=> closePopup(addPopup));
imageCloseButton.addEventListener('click', ()=> closePopup(imagePopup));

popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', ((event) => {
        if (event.target === event.currentTarget) {
            closePopup(popupElement);
        };
    }));
});

editForm.addEventListener('submit', handleEdit);
addForm.addEventListener('submit', handleAdd);

render();