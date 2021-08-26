const inputs = document.getElementsByTagName('input')
const form = document.getElementsByTagName('form')[0]
const sessionStorageLength = window.sessionStorage.length

for (let i = 0; i < sessionStorageLength; i++) {
	const key = window.sessionStorage.key(i)
	const input = document.querySelector(`[name=${key}]`)
	
	if (!input) {
		continue
	}
	
	input.value = window.sessionStorage.getItem(key)
}

function handleChange(evt) {
	window.sessionStorage.setItem(evt.target.name, evt.target.value)
}

Array.from(inputs).forEach(function (i) {
	i.addEventListener('change', handleChange)
})

form.addEventListener('reset', function (evt) {
	window.sessionStorage.clear()
})

form.addEventListener('submit', function (evt) {
	evt.preventDefault()
	window.sessionStorage.clear()
	form.reset()
})