function check(){
 let p = document.querySelector('#price').value;
 let d = document.querySelector('#discount').value;
  // Без валидации ввода
  document.querySelector('#simple').innerText = p - (p / 100 * d).toFixed(2);
  // с Валидацией
  let discount = p - (p / 100 * d).toFixed(2);
  if (isNaN(discount)) {
    if (isNaN(p)) {
          discount = "Введите корректные значения!";
    } else {
      discount = p;
    }
  }
  
  document.querySelector('#full').innerText = discount;
}


// первичные значения для формы
document.querySelector('#price').value = 100;
document.querySelector('#discount').value = "Скидок нет";
check();