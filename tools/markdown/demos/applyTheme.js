// Получаем текущую тему из localStorage и добавляем класс документу
(function () {
  const applyTheme = () => {
    let storedTheme = window.localStorage["color-theme"];
    storedTheme = storedTheme || "auto";

    document.documentElement.className = storedTheme;
  };

  window.addEventListener("storage", applyTheme);
  window.addEventListener("load", applyTheme);
})();
