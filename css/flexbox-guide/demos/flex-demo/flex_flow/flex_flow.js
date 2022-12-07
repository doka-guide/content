import CodeSelect from "../js/codeSelect.js";
import Demo from "../js/demo.js";

const demoEl = document.querySelector("[data-demo-wrap]"),
  selectorFlexDirection = document.querySelector(
    '[data-select="flex-direction"]'
  ),
  selectorFlexWrap = document.querySelector('[data-select="flex-wrap"]');

demoEl.style.flexFlow =
  selectorFlexDirection.value + " " + selectorFlexWrap.value;

new CodeSelect(selectorFlexDirection, (value) => {
  demoEl.style.flexFlow = value + " " + selectorFlexWrap.value;
});

new CodeSelect(selectorFlexWrap, (value) => {
  demoEl.style.flexFlow = selectorFlexDirection.value + " " + value;
});

new Demo(10);
