import { changeLang, getCurLang } from "./lang.js";

const caseDownShow = new CSSStyleSheet();
const caseDownHide = new CSSStyleSheet();
caseDownShow.replaceSync('.origin { display: block; }');
caseDownHide.replaceSync('.origin { display: none; }');

const caseUpShow = new CSSStyleSheet();
const caseUpHide = new CSSStyleSheet();
caseUpShow.replaceSync('.alt { display: block; }');
caseUpHide.replaceSync('.alt { display: none; }');

export let flagCaps = false;
export let flagShift = false;
let langFlag = false;

const capsShow = new CSSStyleSheet();
capsShow.insertRule('[class^="letter"] .origin { display: none !important; }');

const capsShiftShow = new CSSStyleSheet();
capsShiftShow.insertRule('[class^="letter"] .alt { display: none !important; }');
capsShiftShow.insertRule(
  '[class^="letter"] .origin { display: block !important; }',
);

export const keyDown = (e) => {
  if (e.shiftKey) {
    flagShift = true;
    document.adoptedStyleSheets = [caseUpShow, caseDownHide];

    if (flagCaps) {
      document.adoptedStyleSheets = [capsShiftShow, caseUpShow, caseDownHide];
    }
  }

  if (e.ctrlKey && e.altKey) {
    langFlag = true
  }
};

export const keyUp = (e) => {
  if (e.key === 'Shift') {
    flagShift = false;
    document.adoptedStyleSheets = [getCurLang()];
    if (flagCaps) {
      document.adoptedStyleSheets = [capsShow, getCurLang()];
    }
  }

  if (e.code === 'CapsLock') {
    flagCaps = !flagCaps;
    if (flagCaps) {
      document.adoptedStyleSheets = [capsShow, getCurLang()];
      if (flagShift) {
        document.adoptedStyleSheets = [capsShiftShow, caseUpShow, caseDownHide, getCurLang()];
      }
    } else {
      document.adoptedStyleSheets = [getCurLang()];
      if (flagShift) {
        document.adoptedStyleSheets = [caseUpShow, caseDownHide, getCurLang()];
      }
    }
  }

  if ((e.ctrlKey || e.altKey) && langFlag) {
    langFlag = false;
    changeLang();
  }
};
