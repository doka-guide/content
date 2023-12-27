export default class CodeSelect {
  constructor(select, callbackChange = () => false) {
    this.selectEl = select;
    this.optionsWidth = {};
    this.callbackChange = callbackChange;

    this._created();
  }

  _created() {
    this._createdOptionsWidth();

    this.selectEl.addEventListener("change", (event) => {
      this._setWidth();
      this.callbackChange(event.currentTarget.value);
    });
  }

  _createdOptionsWidth() {
    window.addEventListener("load", () => {
      const removeElList = [];

      for (const options of this.selectEl.options) {
        let optionsEl = document.createElement("span");
        optionsEl.innerHTML = options.text;
        removeElList.push(optionsEl);
        this.selectEl.insertAdjacentElement("afterend", optionsEl);
      }

      for (const el of removeElList) {
        this.optionsWidth[el.innerText] = el.offsetWidth + 28;
        el.remove();
      }

      this._setWidth();
    });
  }

  _setWidth() {
    this.selectEl.style.width =
      this.optionsWidth[this.selectEl.selectedOptions[0].value] + "px";
  }
}
