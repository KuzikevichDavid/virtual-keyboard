import { getCurrentLang } from './lang';
import { isCaps, isShift } from './modifiters';

export const area = document.createElement('textarea');
const areaWrapper = document.createElement('div');
areaWrapper.classList.add('output-wrapper');
areaWrapper.appendChild(area);
area.classList.add('keyboard-output');
area.setAttribute('type', 'text');
document.querySelector('body').appendChild(areaWrapper);

area.onkeydown = () => false;

function paste(text) {
  const [start, end] = [area.selectionStart, area.selectionEnd];
  area.value =
    area.value.substring(0, start) + text + area.value.substring(end);
  area.selectionStart = start + 1;
  area.selectionEnd = area.selectionStart;
}

function del(direction) {
  const [start, end] = [area.selectionStart, area.selectionEnd];
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
  const val = document.querySelector(`.${keyCode} span`).innerHTML;
  paste(val);
}

export function input(keyCode) {
  const key = document.querySelector(`.${keyCode} .${getCurrentLang()}`);
  if (key) {
    if (!key.classList.contains('control')) {
      let query = '.origin';
      if (isShift()) {
        query = '.alt';
      }
      if (key.classList.contains('letter') && isCaps()) {
        query = '.alt';
        if (isShift()) {
          query = '.origin';
        }
      }
      const val = key.querySelector(query)?.textContent;
      if (val) paste(val);
    } else {
      switch (keyCode) {
        case 'Enter':
          paste('\n');
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
