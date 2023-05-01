import { input } from './input.js';
import { caps, shiftDown, shiftUp } from './modifiters.js';

const responseEn = await fetch('./scripts/jsonData/en.json');
const keyboardEn = await responseEn.json();

const responseRu = await fetch('./scripts/jsonData/ru.json');
const keyboardRu = await responseRu.json();

const rowStyle = 'keyboard-row';
const keyStyle = 'keyboard-row__key';
const originStyle = 'origin';
const altStyle = 'alt';
const controlStyle = 'control';
const langStyleList = ['en', 'ru'];
const keyboardStyle = 'keyboard';

const keyboard = document.createElement('div');
keyboard.classList.add(keyboardStyle);

const indexes = [-1, 13, 28, 41, 54];
let idx = 0;
let keyRow;

function initLangKey(key, langStyle) {
  let langKeyOrigin = document.createElement('span');
  langKeyOrigin.classList.add(originStyle);
  langKeyOrigin.textContent = key.values.origin;

  let langKeyAlt = document.createElement('span');
  langKeyAlt.classList.add(altStyle);
  langKeyAlt.textContent = key.values.alt;

  let langKey = document.createElement('button');
  langKey.appendChild(langKeyAlt);
  langKey.appendChild(langKeyOrigin);
  langKey.classList.add(langStyle);
  langKey.classList.add(key.type);
  return langKey;
}

function initControlKey(key, langStyleList, name) {
  langStyleList.forEach((langStyle) => {
    let langKey = document.createElement('button');
    langKey.classList.add(langStyle);
    langKey.classList.add(controlStyle);
    let langKeyName = document.createElement('span');
    langKeyName.textContent = name;
    langKey.appendChild(langKeyName);
    key.appendChild(langKey);
  });
}

keyboardEn.forEach((key, i) => {
  if (i > indexes[idx]) {
    if (keyRow) keyboard.appendChild(keyRow);
    keyRow = document.createElement('div');
    keyRow.classList.add(rowStyle);
    idx++;
  }
  let newKey = document.createElement('div');
  newKey.classList.add(keyStyle);
  newKey.classList.add(key.name);

  if (key.type === 'control') {
    switch (key.name) {
      case 'ShiftLeft':
      case 'ShiftRight':
        initControlKey(newKey, langStyleList, 'Shift');
        break;
      case 'ControlLeft':
      case 'ControlRight':
        initControlKey(newKey, langStyleList, 'Ctrl');
        break;
      case 'AltLeft':
      case 'AltRight':
        initControlKey(newKey, langStyleList, 'Alt');
        break;
      case 'MetaLeft':
        initControlKey(newKey, langStyleList, 'Win');
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowRight':
        initControlKey(newKey, langStyleList, key.value);
        break;
      default:
        initControlKey(newKey, langStyleList, key.name);
        break;
    }
  } else {
    newKey.appendChild(initLangKey(key, langStyleList[0]));
    newKey.appendChild(initLangKey(keyboardRu[i], langStyleList[1]));
  }
  keyRow.appendChild(newKey);

  if (key.name.includes('Shift')) {
    newKey.addEventListener('mousedown', () => shiftDown());
    newKey.addEventListener('mouseup', () => shiftUp());
  } else if (key.name.includes('CapsLock')) {
    newKey.addEventListener('mouseup', () => caps());
  } else {
    newKey.addEventListener('mouseup', (e) => {
      let elem;
      if (e.target instanceof HTMLSpanElement) {
        elem = e.target.parentNode.parentNode.classList[1];
      } else {
        elem = e.target.parentNode.classList[1];
      }
      input(elem);
    });
  }
});

keyboard.appendChild(keyRow);
document.querySelector('body').appendChild(keyboard);
