export default class Section {
    constructor ({ items, renderer}, containerSelector) {
        this._sectionElement = document.querySelector(containerSelector);
        this._items = items;
        this._render = renderer;

    }
    renderItems () {
        // iterate through this._items
        this._items.forEach((item) => {
            renderer(item)
            // call renderer, pass the item
        })
    }

    addItem (item) {
        this._sectionElement.prepend(item)
    }


}
