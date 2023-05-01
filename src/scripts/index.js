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
