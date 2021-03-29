export default class UserInfo {
    constructor(profileNameSelector, profileAboutSelector) {
        this._name = profileNameSelector.textContent;
        this._about = profileAboutSelector.textContent;
    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about
        };
    }

    setUserInfo(newData, profileNameSelector, profileAboutSelector) {
        this._newUserInfo = {
            name: newData.name,
            about: newData.about
        };

        profileNameSelector.textContent = this._newUserInfo.name;
        profileAboutSelector.textContent = this._newUserInfo.about;
    }
}