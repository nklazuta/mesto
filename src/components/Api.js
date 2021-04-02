export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getServerUserInfo(profileNameSelector, profileAboutSelector, profileAvatarSelector) {
        return fetch(`this._baseUrl/users/me`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(info => {
            this._userInfo = {
                name: info.name,
                about: info.about,
                avatar: info.avatar
            };
    
            profileNameSelector.textContent = this._userInfo.name;
            profileAboutSelector.textContent = this._userInfo.about;
            profileAvatarSelector.src =this._userInfo.avatar;
        })
        .catch(err => console.log(err));
    }

    getInitialCards() {
        return fetch(`this._baseUrl/cards`, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}