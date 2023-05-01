import { input } from './input.js';
// await import('./key-gen.js');
import { keyUp, keyDown } from './modifiters.js';

document.addEventListener('keydown', function (event) {
  keyDown(event);
  input(event.code);
});

document.addEventListener('keyup', function (event) {
  keyUp(event);
});

await import('./keyboard-gen.js');

const body = document.querySelector('body');

const keyboardCreateInfo = document.createElement('p');
keyboardCreateInfo.innerText = 'Created on OS "Windows 10"';
const keyboardCahngeLang = document.createElement('p');
keyboardCahngeLang.innerText = 'To change language press "CTRL" + "ALT"';

body.appendChild(keyboardCreateInfo);
body.appendChild(keyboardCahngeLang);
