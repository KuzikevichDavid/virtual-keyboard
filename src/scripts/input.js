import { area } from './index.js';

function paste(text) {
  let [start, end] = [area.selectionStart, area.selectionEnd];
  area.value =
    area.value.substring(0, start) + text + area.value.substring(end);
}

export function input(keyCode) {
  let key = document.querySelector(`[class=${keyCode}]`);
  let val = key.querySelector('.origin')?.textContent;
  if (val) paste(val);
}
