let editButton = document.querySelector('.profile__edit-button')
let profileName = document.querySelector('.profile__name')
let profileAbout = document.querySelector('.profile__about')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-button')
let form = popup.querySelector('.popup__form')
let nameInput = form.querySelector('.popup__input_type_name')
let aboutInput = form.querySelector('.popup__input_type_about')

function openPopup() {
    popup.classList.add('popup_opened')
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

function formSubmitHandler (event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileAbout.textContent = aboutInput.value
    closePopup()
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
form.addEventListener('submit', formSubmitHandler)