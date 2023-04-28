const res = [];

window.addEventListener("keyup", (e) => {
  let name = e.code;
  let type = '';
  let alt = '';
  if (e.key.length > 1) {
    type = 'control';
  } else {
    if (e.key.match(/[a-zа-яё]/i)) {
      type = 'letter'
      alt = e.key.toUpperCase()
    } else if (e.key.match(/[^a-z]/i)) {
      type = 'symbol'
    }
  }
  if (e.key.length === 1) {
    res.push({ name, type, values: { origin: e.key.toLowerCase(), alt } });
  } else {
    res.push({ name, type });
  }

})

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

document.createElement('button').className = 'download';

document.querySelector('.download').addEventListener('click', (e) => {
  download(JSON.stringify(res), '.json', 'text/plain');
})