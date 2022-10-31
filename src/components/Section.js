export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    const card = this._renderer(element)
    this._container.prepend(card);
  }

  renderCard(element) {
    this._renderer(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    this.clear();
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
