function setStatus(text, cls) {
    var status = document.getElementById('status');
    status.textContent = text;
    status.className = 'status ' + cls;
  }
  
  document.getElementById('block').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: function() {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }});
    });
    setStatus('✅ Schutz aktiviert!', 'success');
  });
  