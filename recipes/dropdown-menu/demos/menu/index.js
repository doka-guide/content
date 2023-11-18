// Следуем принципам прогрессивного улучшения
// Показываем пользователю простую навигацию в случае если не удасться загрузить js
// Если js файл загружен заменяем span на кнопки и вешаем дополнительные aria атрибуты

const nav = document.querySelector('.site-nav');
nav.classList.add("enhanced");

const submenus = document.querySelectorAll(".menu__item[data-has-children]");
const dropdowns = document.querySelectorAll(".menu__item[data-has-children] > .menu");

const icon = `
    <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        aria-hidden="true"
        class="menu__btn-icon"
    >
        <path fill="currentColor" d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
    </svg>
`;

// Находи подменю, заменяем в нем span на кнопку
submenus.forEach((item) => {
	const dropdown = item.querySelector(":scope > .menu");
	dropdown.setAttribute("hidden", "");

	const span = item.querySelector(":scope > span");
	const text = span.innerText;
    const ariaControlsId = span.dataset.controls;

	const button = document.createElement("button");

  // Добавляем класс и необходимые aria-атрибуты
  button.classList.add("menu__btn")
	button.setAttribute("aria-expanded", "false");
	button.setAttribute("aria-controls", ariaControlsId);

	button.innerText = text;

  // Добавляем иконку к кнопке, чтобы визуально было понятно открыто меню или нет
	button.innerHTML += icon;

	span.replaceWith(button);

	button.addEventListener("click", function (e) {
		toggleDropdown(button, dropdown);
	});

  // Обрабатываем нажатие на esc
  dropdown.addEventListener("keydown", (e) => {
    e.stopImmediatePropagation();

    if (e.keyCode === 27 && focusIsInside(dropdown)) {
      toggleDropdown(button, dropdown);
      button.focus();
    }
  }, false);
});

function toggleDropdown(button, dropdown) {
	if (button.getAttribute("aria-expanded") === "true") {
		button.setAttribute("aria-expanded", "false");
		dropdown.setAttribute("hidden", "");
	} else {
		button.setAttribute("aria-expanded", "true");
		dropdown.removeAttribute("hidden");
	}
}

function focusIsInside(element) {
    return element.contains(document.activeElement);
}

function collapseDropdownsWhenTabbingOutsideNav(e) {
	if (e.keyCode === 9 && !focusIsInside(nav)) {
		dropdowns.forEach(function (dropdown) {
			dropdown.setAttribute("hidden", "");
			const btn = dropdown.parentNode.querySelector("button");
			btn.setAttribute("aria-expanded", "false");
		});
	}
}

function collapseDropdownsWhenClickingOutsideNav(e) {
	const target = e.target;

	dropdowns.forEach(function (dropdown) {
		if (!dropdown.parentNode.contains(target)) {
			dropdown.setAttribute("hidden", "");
			const btn = dropdown.parentNode.querySelector("button");
			btn.setAttribute("aria-expanded", "false");
		}
	});
}

// Закрыть навигацию если протапались за ее пределы
document.addEventListener("keyup", collapseDropdownsWhenTabbingOutsideNav);

// Закрыть навигацию если кликнули вне навигации
window.addEventListener("click", collapseDropdownsWhenClickingOutsideNav);
