export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, id) {
        this._clear();
        items.forEach(item => {
            this._id = id;
            this._renderer(item, this._id);
        });
    }

    _clear() {
        this._container.innerHTML = '';
    }

    addItem(element) {
        this._container.prepend(element);
    }
}