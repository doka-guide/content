const authForm = document.getElementById('auth-form')

authForm.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault()

  const form = submitEvent.target

  const formData = new FormData(form)

  const userLoginEvent = new CustomEvent('userlogin', {
    detail: {
      username: formData.get('login'),
    }
  })

  document.dispatchEvent(userLoginEvent)

  form.reset()
})
