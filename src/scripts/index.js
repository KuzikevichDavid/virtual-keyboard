import { DataSaver } from "./dataSave.js";
// await import('./key-gen.js');

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
    console.log('pres', event.ctrlKey, event.altKey, event.metaKey, event.shiftKey);
    console.log(event.key)
  },
);

document.addEventListener(
  'keyup',
  function (event) {
    console.log('up', event.ctrlKey, event.altKey, event.metaKey, event.shiftKey);
    console.log(event.key);
    console.log(event)
  },
);

const area = document.createElement('textarea');

area.onkeydown = (e) => {
  console.log('press textarea');
  return false;
}