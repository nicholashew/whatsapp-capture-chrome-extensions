/*! inject scripts */
function injectScripts(scripts, callback) {
  if (scripts.length) {
    var script = scripts.shift();
    chrome.tabs.executeScript({ file: script }, function () {
      if (chrome.runtime.lastError && typeof callback === "function") {
        callback(false); // Injection failed
      }
      injectScripts(scripts, callback);
    });
  } else {
    if (typeof callback === "function") {
      callback(true);
    }
  }
}

function start() {
  chrome.tabs.executeScript({
    file: 'js/start.js'
  });
}

function stop() {
  chrome.tabs.executeScript({
    file: 'js/stop.js'
  });
}

function list() {
  injectScripts([
    'js/vendor/jquery.slim.min.js',
    'js/list.js'
  ], null);
}

function listHide() {
  injectScripts([
    'js/vendor/jquery.slim.min.js',
    'js/list-hide.js'
  ], null);
}

function clear() {
  chrome.tabs.executeScript({
    file: 'js/clear.js'
  });
}

document.getElementById('btnStart').addEventListener('click', start);
document.getElementById('btnStop').addEventListener('click', stop);
document.getElementById('btnList').addEventListener('click', list);
document.getElementById('btnListHide').addEventListener('click', listHide);
document.getElementById('btnClear').addEventListener('click', clear);