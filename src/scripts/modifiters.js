import { changeLang, getCurLang } from './lang.js';

const caseDownShow = new CSSStyleSheet();
const caseDownHide = new CSSStyleSheet();
caseDownShow.replaceSync('.origin { display: block !important; }');
caseDownHide.replaceSync('.origin { display: none; }');

const caseUpShow = new CSSStyleSheet();
const caseUpHide = new CSSStyleSheet();
caseUpShow.replaceSync('.alt { display: block !important; }');
caseUpHide.replaceSync('.alt { display: none; }');

export let flagCaps = false;
export let flagShift = false;
let langFlag = false;

const capsShow = new CSSStyleSheet();
capsShow.insertRule('.letter .origin { display: none !important; }');
capsShow.insertRule('.letter .alt { display: block !important; }');

const capsShiftShow = new CSSStyleSheet();
capsShiftShow.insertRule('.letter .alt { display: none !important; }');
capsShiftShow.insertRule('.letter .origin { display: block !important; }');

export const shiftDown = () => {
  flagShift = true;
  document.adoptedStyleSheets = [caseUpShow, caseDownHide, getCurLang()];

  if (flagCaps) {
    document.adoptedStyleSheets = [
      capsShiftShow,
      caseUpShow,
      caseDownHide,
      getCurLang(),
    ];
  }
};

export const shiftUp = () => {
  flagShift = false;
  document.adoptedStyleSheets = [getCurLang()];
  if (flagCaps) {
    document.adoptedStyleSheets = [capsShow, getCurLang()];
  }
};

export const keyDown = (e) => {
  if (e.shiftKey) {
    shiftDown();
  }

  if (e.ctrlKey && e.altKey) {
    langFlag = true;
  }
};

export const caps = () => {
  flagCaps = !flagCaps;
  if (flagCaps) {
    document.adoptedStyleSheets = [capsShow, getCurLang()];
    if (flagShift) {
      document.adoptedStyleSheets = [
        capsShiftShow,
        caseUpShow,
        caseDownHide,
        getCurLang(),
      ];
    }
  } else {
    document.adoptedStyleSheets = [getCurLang()];
    if (flagShift) {
      document.adoptedStyleSheets = [caseUpShow, caseDownHide, getCurLang()];
    }
  }
};

export const keyUp = (e) => {
  if (e.key === 'Shift') {
    shiftUp();
  }

  if (e.code === 'CapsLock') {
    caps();
  }

  if ((e.ctrlKey || e.altKey) && langFlag) {
    langFlag = false;
    changeLang();
  }
};
