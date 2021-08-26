const parents = document.querySelectorAll(".parent");

parents.forEach((parent) => {
  parent.addEventListener("click", () => {
    const elem = parent.querySelector(".elem");
    const ticker = parent.querySelector(".ticker");
    elem.classList.toggle("active");
    ticker.classList.toggle("active");
  });
});