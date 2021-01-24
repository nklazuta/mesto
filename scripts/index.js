let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-button')

let togglePopup = () => {
    popup.classList.toggle('popup_opened')
}

editButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)

popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        togglePopup()
    }
})

let form = popup.querySelector('.popup__container')

form.addEventListener('submit', event => {
    event.preventDefault()
    let newName = form.querySelector('.popup__new-name').value
    let newAbout = form.querySelector('.popup__new-about').value
    let profileName = document.querySelector('.profile__name')
    let profileAbout = document.querySelector('.profile__about')
    profileName.textContent = newName
    profileAbout.textContent = newAbout
    togglePopup()
})