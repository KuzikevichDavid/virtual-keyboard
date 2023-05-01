import { currentLang } from './lang.js';
import { flagCaps, flagShift } from './modifiters.js';

function paste(text) {
  let [start, end] = [area.selectionStart, area.selectionEnd];
  area.value =
    area.value.substring(0, start) + text + area.value.substring(end);
  area.selectionStart = start + 1;
  area.selectionEnd = area.selectionStart;
}

function del(direction) {
  let [start, end] = [area.selectionStart, area.selectionEnd];
  console.log(area.ariaRowIndex);
  if (direction === 'right') {
    area.value = area.value.substring(0, start) + area.value.substring(end + 1);
    area.selectionStart = start;
  } else {
    area.value = area.value.substring(0, start - 1) + area.value.substring(end);
    area.selectionStart = start - 1;
  }
  area.selectionEnd = area.selectionStart;
}

function arrows(keyCode) {
  let val = document.querySelector(`.${keyCode} span`).innerHTML;
  paste(val);
}

export function input(keyCode) {
  let key = document.querySelector(`.${keyCode} .${currentLang}`);
  if (key) {
    if (!key.classList.contains('control')) {
      let query = '.origin';
      if (flagShift) {
        query = '.alt';
      }
      if (key.classList.contains('letter') && flagCaps) {
        query = '.alt';
        if (flagShift) {
          query = '.origin';
        }
      }
      let val = key.querySelector(query)?.textContent;
      if (val) paste(val);
    } else {
      switch (keyCode) {
        case 'Enter':
          paste('\n\r');
          break;
        case 'Tab':
          paste('\t');
          break;
        case 'Backspace':
          del('left');
          break;
        case 'Delete':
          del('right');
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowRight':
          arrows(keyCode);
          break;
        default:
          break;
      }
    }
  }
}

export const area = document.createElement('textarea');
area.classList.add('keyboard-output');
area.setAttribute('type', 'text');
document.querySelector('body').appendChild(area);

area.onkeydown = (e) => {
  console.log('press textarea', e);
  return false;
};
