const username = document.getElementById('username')

document.addEventListener('userlogin', (event) => {
  username.textContent = event.detail.username
})
