import CodeSelect from "../js/codeSelect.js";
import Demo from "../js/demo.js";

const demoEl = document.querySelector("[data-demo-wrap]"),
  selectorFlexDirection = document.querySelector(
    '[data-select="flex-direction"]'
  );

demoEl.style.flexDirection = selectorFlexDirection.value;

new CodeSelect(selectorFlexDirection, (value) => {
  demoEl.style.flexDirection = value;
});

new Demo();
