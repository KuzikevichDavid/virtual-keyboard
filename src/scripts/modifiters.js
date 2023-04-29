const caseDownShow = new CSSStyleSheet();
const caseDownHide = new CSSStyleSheet();
caseDownShow.replaceSync('.origin { display: block; }');
caseDownHide.replaceSync('.origin { display: none; }');

const caseUpShow = new CSSStyleSheet();
const caseUpHide = new CSSStyleSheet();
caseUpShow.replaceSync('.alt { display: block; }');
caseUpHide.replaceSync('.alt { display: none; }');

let isCanModifyCaps = true;
let flagCaps = false;
let flagShift = false;

const capsShow = new CSSStyleSheet()
capsShow.insertRule('[class^="Key"] .origin { display: none !important; }');

const capsShiftShow = new CSSStyleSheet()
capsShiftShow.insertRule('[class^="Key"] .alt { display: none !important; }');
capsShiftShow.insertRule('[class^="Key"] .origin { display: block !important; }');

export const keyDown = (e) => {
  if (e.shiftKey) {
    flagShift = true;
    document.adoptedStyleSheets = [caseUpShow, caseDownHide];

    if (flagCaps) {
      document.adoptedStyleSheets = [capsShiftShow, caseUpShow, caseDownHide];
    }
  }
};

export const keyUp = (e) => {
  if (e.key === 'Shift') {
    flagShift = false;
    document.adoptedStyleSheets = [];
    if (flagCaps) {
      document.adoptedStyleSheets = [capsShow];
    }
  }

  if (e.code === 'CapsLock') {
    flagCaps = !flagCaps;
    if (flagCaps) {
      document.adoptedStyleSheets = [capsShow];
      if (flagShift) {
        document.adoptedStyleSheets = [capsShiftShow, caseUpShow, caseDownHide];
      }
    } else {
      document.adoptedStyleSheets = [];
      if (flagShift) {
        document.adoptedStyleSheets = [caseUpShow, caseDownHide];
      }
    }
  }
};
