import CodeSelect from "../js/codeSelect.js";
import Demo from "../js/demo.js";

const demoEl = document.querySelector("[data-demo-wrap]"),
  selectorFlexDirection = document.querySelector('[data-select="flex-direction"]'),
  selectorFlexWrap = document.querySelector('[data-select="flex-wrap"]'),
  selectorJustifyContent = document.querySelector('[data-select="justify-content"]'),
  selectorAlignItems = document.querySelector('[data-select="align-items"]');

demoEl.style.flexDirection = selectorFlexDirection.value;
demoEl.style.flexWrap = selectorFlexWrap.value;
demoEl.style.justifyContent = selectorJustifyContent.value;
demoEl.style.alignItems = selectorAlignItems.value;

new CodeSelect(selectorFlexDirection, (value) => {
  demoEl.style.flexDirection = value;
});

new CodeSelect(selectorFlexWrap, (value) => {
  demoEl.style.flexWrap = value;
});

new CodeSelect(selectorJustifyContent, (value) => {
  demoEl.style.justifyContent = value;
});

new CodeSelect(selectorAlignItems, (value) => {
  demoEl.style.alignItems = value;
  demoEl.classList.toggle("_baseline", value === "baseline");
});

new Demo();
