// Генерация номеров билетов
let container = document.querySelector('#result');
for(let i = 250;i<350;i++) {
  let element = document.createElement('span');
  element.innerText = 'Ticket #'+i
  container.appendChild(element);
}
// Получить все созданные билеты в переменную
let tickets = document.querySelectorAll('span');
// Выбор каждого третьего
for(let i = 0;i<tickets.length;i = i + 3){
  tickets[i].classList.add('winner');
}
