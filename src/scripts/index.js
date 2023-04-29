import { DataSaver } from "./dataSave.js";
// await import('./key-gen.js');
import { keyUp, keyDown } from './modifiters.js';

const storage = new DataSaver();
const storageKey = 'lang';
const defaultValue = 'en';

window.addEventListener('load', (e) => {
  const lang = storage.get(storageKey);
  if (!lang) {
    storage.set(defaultValue)
    return defaultValue;
  }
  return lang
});

document.addEventListener(
  'keydown',
  function (event) {
    keyDown(event)
    // console.log('pres', event.ctrlKey, event.altKey, event.metaKey, event.shiftKey);
    // console.log(event.key)
  },
);

document.addEventListener(
  'keyup',
  function (event) {
    keyUp(event)
    // console.log('up', event.ctrlKey, event.altKey, event.metaKey, event.shiftKey);
    // console.log(event.key);
    // console.log(event)
  },
);

const area = document.createElement('textarea');
area.classList.add('keyboard-output')
document.querySelector('body').appendChild(area);

area.onkeydown = (e) => {
  console.log('press textarea');
  return false;
}

await import('./keyboard-gen.js');
// await import('./modifiters.js');