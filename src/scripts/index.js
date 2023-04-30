import { DataSaver } from './dataSave.js';
import { input } from './input.js';
// await import('./key-gen.js');
import { keyUp, keyDown } from './modifiters.js';

const storage = new DataSaver();
const storageKey = 'lang';
const defaultValue = 'en';

window.addEventListener('load', () => {
  const lang = storage.get(storageKey);
  if (!lang) {
    storage.set(defaultValue);
    return defaultValue;
  }
  return lang;
});

document.addEventListener('keydown', function (event) {
  keyDown(event);
  input(event.code);
});

document.addEventListener('keyup', function (event) {
  keyUp(event);
});

await import('./keyboard-gen.js');
