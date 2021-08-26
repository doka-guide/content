const INITIAL_CLASSES =  ['border-blue', 'text-red', 'bg-yellow']
let availableClasses = INITIAL_CLASSES.slice()
let added = []
const target = document.getElementById('target')

const addButton = document.getElementById('add')

function handleAddClass() {
  if (availableClasses.length) {
    const nextClass = availableClasses.shift()
    target.classList.add(nextClass)
    added.push(nextClass)
  }
}

addButton.addEventListener('click', handleAddClass)

const removeButton = document.getElementById('remove')

function handleRemoveClass() {
  if (added.length) {
    const nextClass = added.pop()
    target.classList.remove(nextClass)
    availableClasses.unshift(nextClass)
  }
}

removeButton.addEventListener('click', handleRemoveClass)

const toggleButton = document.getElementById('toggle')
let visible = true;

function handleToggleClick() {
  target.classList.toggle('fade')
  
  visible = !visible
  
  toggleButton.textContent = visible ? 'Красиво исчезнуть' : 'Красиво появиться'
}

toggleButton.addEventListener('click', handleToggleClick)
                              
const resetButton = document.getElementById('reset');

function handleResetClick() {
  added = []
  availableClasses = [...INITIAL_CLASSES]
  target.classList.remove(...INITIAL_CLASSES)
  console.log('kekeke')
  
  if(!visible) {
    handleToggleClick()
  }
}

resetButton.addEventListener('click', handleResetClick)