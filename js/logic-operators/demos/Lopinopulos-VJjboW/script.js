let possibleGuests = ['🐷', '🦁', '🐶', '🦊', '🐮', '👻', '💀', '🤡', '🤖'];
let invited = ['🐷', '🦁', '🐶', '🦊'];
let generateButton = document.getElementById('generate');
let guestDescription = document.getElementById('guest');
let conditionTicketSpan = document.getElementById('condition-ticket');
let conditionInvitedSpan = document.getElementById('condition-invited');
let resultSpan = document.getElementById('result');

function generateAndCheck() {
  let guestIndex = Math.floor(Math.random() * possibleGuests.length);
  let guest = possibleGuests[guestIndex];
  let isInvited = invited.includes(guest);
  let hasTicket = Math.round(Math.random());

  guestDescription.textContent = guest + (hasTicket ? ' + 🎫' : '')

  updateClasses(conditionInvitedSpan, isInvited);
  updateClasses(conditionTicketSpan, hasTicket);

  if (isInvited || hasTicket) {
    resultSpan.textContent = 'Впустить';
    updateClasses(resultSpan, true);
  } else {
    resultSpan.textContent = 'Выгнать'
    updateClasses(resultSpan, false);
  }

}

function updateClasses(el, isValid) {
  el.className = isValid ? 'valid' : 'invalid';
}

generateAndCheck();

generateButton.addEventListener('click', generateAndCheck);
