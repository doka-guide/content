const links = document.querySelectorAll("li a");
let baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const list = document.getElementById("list");

const name = document.getElementById("name");
const img = document.getElementById("img");

links.forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();

    list.innerHTML = "";
    name.innerText = "";
    img.src = "";

    baseUrl += event.target.dataset.name;

    let count = 0;
    let timer = setInterval(() => {
      count++;
      switch (count) {
        case 1:
          list.innerHTML += `<li>Отправляем запрос на сервер - <a href="${baseUrl}">${baseUrl}</a></li>`;
          break;
        case 2:
          list.innerHTML += `<li>Ждем ответ</li>`;
          break;
        case 3:
          list.innerHTML += `<li>Получаем ответ от сервера в виде JSON-строки и обрабатываем данные:
                              <div id="json" style="height: 200px; overflow: scroll"></div>
                            </li>`;
          break;
      }

      if (count > 3) {
        clearInterval(timer);
      }
    }, 1000);

    setTimeout(() => {
      fetch(baseUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const json = document.getElementById("json");
          json.innerText = JSON.stringify(data);

          name.innerText = data.name.toUpperCase();
          img.src = data.sprites.other["official-artwork"].front_default;

          baseUrl = "https://pokeapi.co/api/v2/pokemon/";
        })
        .catch((error) => console.error(error));
    }, 3000);
  })
);
