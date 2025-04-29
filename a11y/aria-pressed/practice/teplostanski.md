### Интеграция с фреймворками

В современных JavaScript-фреймворках `aria-pressed` легко интегрируется в компонентный подход.

Пример React-компонента:

```jsx
function ToggleButton({ label, initialState = false }) {
  const [isPressed, setIsPressed] = React.useState(initialState)
  
  return (
    <button 
      aria-pressed={isPressed} 
      onClick={() => setIsPressed(!isPressed)}
    >
      {label}
    </button>
  )
}
```

Пример Vue-компонента:
```js
<template>
  <button 
    :aria-pressed="isPressed" 
    @click="togglePressed"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  initialState: {
    type: Boolean,
    default: false
  }
})

const isPressed = ref(props.initialState)

function togglePressed() {
  isPressed.value = !isPressed.value
}
</script>
```