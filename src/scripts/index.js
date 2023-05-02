import { input } from './input';
// await import('./key-gen.js');
import genKeyboard from './keyboard-gen';
import { keyUp, keyDown } from './modifiters';

export const doAnimation = (keyCode) => {
  const key = document.querySelector(`.${keyCode}`);
  key?.classList.add('highlights');
};

export const disAnimation = (keyCode) => {
  const key = document.querySelector(`.${keyCode}`);
  key?.classList.remove('highlights');
};

document.addEventListener('keydown', (event) => {
  keyDown(event);
  input(event.code);
  doAnimation(event.code);
});

document.addEventListener('keyup', (event) => {
  keyUp(event);
  disAnimation(event.code);
});

await genKeyboard(disAnimation, doAnimation);

const body = document.querySelector('body');

const keyboardCreateInfo = document.createElement('p');
keyboardCreateInfo.innerText = 'Created on OS "Windows 10"';
const keyboardCahngeLang = document.createElement('p');
keyboardCahngeLang.innerText = 'To change language press "CTRL" + "ALT"';

body.appendChild(keyboardCreateInfo);
body.appendChild(keyboardCahngeLang);
