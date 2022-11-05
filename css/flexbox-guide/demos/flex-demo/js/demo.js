export default class Demo {
	constructor() {
		this.SIZE_CLASS = "_size";

		this.demoWrapEl = document.querySelector("[data-demo-wrap]");
		this.itemEl = this.demoWrapEl.querySelector("[data-demo-item]");
		this.endEl = this.demoWrapEl.querySelector("[data-demo-end]");

		this.itemListEl = [];

		this._created();
	}

	_created() {
		this.itemEl.remove();

		for (let index = 0; index < 3; index++) {
			this._itemConstructor(index);
		}
	}

	_itemConstructor(index) {
		let example = this.itemEl.cloneNode(true),
			order = 1;
		const name = example.querySelector("[data-demo-item-name]"),
			orderTextList = example.querySelectorAll("[data-demo-item-order]"),
			btnOrderMinus = example.querySelector('[data-demo-item-btn="minus"]'),
			btnOrderPlus = example.querySelector('[data-demo-item-btn="plus"]'),
			btnRemove = example.querySelector('[data-demo-item-btn="remove"]'),
			btnSize = example.querySelector('[data-demo-item-btn="size"]'),
			btnAdd = example.querySelector('[data-demo-item-btn="add"]'),
			changeOrder = (number) => {
				for (const orderText of orderTextList) {
					orderText.innerText = number;
				}
				example.style.order = number;
			};

		name.innerText = name.innerText + " " + (index + 1);

		btnRemove.addEventListener("click", () => {
			if (this.itemListEl.length > 1) {
				this._removeItem();
			}
		});

		btnSize.addEventListener("click", () => {
			if (example.classList.contains(this.SIZE_CLASS)) {
				example.style.height = "";
				example.classList.remove(this.SIZE_CLASS);
			} else {
				const size = 50 * (Math.random() + 2.5);
				example.style.height = size + "px";
				example.classList.add(this.SIZE_CLASS);
			}
		});

		btnAdd.addEventListener("click", () => {
			this._addItem();
		});

		if (orderTextList && btnOrderMinus && btnOrderPlus) {
			example.classList.add("item_" + (index + 1));
			changeOrder(order);

			btnOrderMinus.addEventListener("click", () => {
				changeOrder(--order);
			});

			btnOrderPlus.addEventListener("click", () => {
				changeOrder(++order);
			});
		}

		this.endEl.insertAdjacentElement("beforebegin", example);
		this.itemListEl.push(example);
	}

	_removeItem() {
		const lastKey = this.itemListEl.length - 1;

		this.itemListEl[lastKey].remove();
		this.itemListEl.splice(lastKey, 1);
	}

	_addItem() {
		this._itemConstructor(this.itemListEl.length);
	}
}
