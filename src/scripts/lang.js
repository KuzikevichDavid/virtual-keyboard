const storageKey = 'lang';
const defaultValue = 'en';

const showRu = new CSSStyleSheet();
showRu.insertRule('.ru { display: block; }')
showRu.insertRule('.en { display: none; }')
const showEn = new CSSStyleSheet()
showEn.insertRule('.ru { display: none; }');
showEn.insertRule('.en { display: block; }');

export let currentLang = defaultValue;
document.adoptedStyleSheets = [showEn];

export function getCurLang() {
  return currentLang === 'ru' ? showRu : showEn;
}

export function changeLang() {
  let idx = 0
  if (currentLang === 'ru') {
    currentLang = 'en'
    idx = document.adoptedStyleSheets.findIndex(x => x === showRu);
    document.adoptedStyleSheets[idx] = showEn;
  } else {
    currentLang = 'ru'
    idx = document.adoptedStyleSheets.findIndex(x => x === showEn);
    document.adoptedStyleSheets[idx] = showRu;
  }
}