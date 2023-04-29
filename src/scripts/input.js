import { area } from './index.js';

function paste(text) {
  let [start, end] = [area.selectionStart, area.selectionEnd];
  area.value =
    area.value.substring(0, start) + text + area.value.substring(end);
}

export function input(keyCode) {
  let key = document.querySelector(`.${keyCode}`);
  if (key) {
    let val = key.querySelector('.origin')?.textContent;
    if (val) paste(val);
  }
}

export const area = document.createElement('textarea');
area.classList.add('keyboard-output');
area.setAttribute('type', 'text');
area.setAttribute('readonly', '');
document.querySelector('body').appendChild(area);

area.onkeydown = () => {
  console.log('press textarea');
  return false;
};
