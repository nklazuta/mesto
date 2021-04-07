export default class UserInfo {
    constructor(profileNameSelector, profileAboutSelector, profileAvatarSelector) {
        this._profileName = profileNameSelector;
        this._profileAbout = profileAboutSelector;
        this._profileAvatar = profileAvatarSelector;
    }

    putUserInfo(nameFieldSelector, aboutFieldSelector) {
        this._nameField = nameFieldSelector;
        this._nameField.value = this._profileName.textContent;
        this._aboutField = aboutFieldSelector
        this._aboutField.value = this._profileAbout.textContent;
    }

    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
    }

    setUserAvatar({avatar}) {
        this._profileAvatar.src = avatar;
    }

    setUserId({_id}) {
        return this._userId = _id;
    }
}