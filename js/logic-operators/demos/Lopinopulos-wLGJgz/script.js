let isRegisteredSelect = document.getElementById('isRegistered');
let ordersInput = document.getElementById('orders');
let conditionRegSpan = document.getElementById('condition-reg');
let conditionOrdersSpan = document.getElementById('condition-orders');
let resultSpan = document.getElementById('result');

function checkCondition() {
  let isRegistered = isRegisteredSelect.value === '1';
  let orders = Number(ordersInput.value);
  
  updateClasses(conditionRegSpan, isRegistered);
  updateClasses(conditionOrdersSpan, orders > 1);  
  
  if (isRegistered && orders > 1) {
    resultSpan.textContent = 'Показать цены!';
    updateClasses(resultSpan, true);
  } else {
    resultSpan.textContent = 'Скрыть цены!'
    updateClasses(resultSpan, false);
  }
 
}

function updateClasses(el, isValid) {
  el.className = isValid ? 'valid' : 'invalid';
}

checkCondition();

isRegisteredSelect.addEventListener('change', checkCondition);
ordersInput.addEventListener('keyup', checkCondition);
ordersInput.addEventListener('change', checkCondition);