(function() {
    var BANNER_SELECTORS = {
      onetrust: ['#onetrust-banner-sdk', '#onetrust-pc-dialog', '.onetrust-consent-sdk'],
      cookiebot: ['#CybotCookiebotDialog', '.cookiebot-banner'],
      sourcepoint: ['#sp-cc', '.sp-cc-banner', '.message-overlay'],
      patterns: [
        '[class*="cookie-banner"]', '[class*="consent-banner"]',
        '[id*="cookie-notice"]', '[class*="gdpr-banner"]'
      ],
      keywords: ['cookie', 'datenschutz', 'privacy', 'consent', 'gdpr']
    };
  
    var BUTTON_PRIORITY = {
      reject: ['alle ablehnen', 'reject all', 'decline all', 'nur notwendige'],
      accept: ['akzeptieren', 'accept', 'verstanden'],
      settings: ['einstellungen', 'settings']
    };
  
    function textIncludes(element, words) {
      if (!element) return false;
      var text = element.textContent.toLowerCase();
      return words.some(function(w) { return text.indexOf(w) !== -1; });
    }
  
    function removeElement(el) {
      if (!el) return;
      try {
        el.remove();
      } catch (e) {
        if (el.parentNode) {
          try {
            el.parentNode.removeChild(el);
          } catch (e2) {}
        }
      }
    }
  
    function hideElement(el) {
      if (!el) return;
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('z-index', '-9999', 'important');
    }
  
    function destroyBanner(el) {
      removeElement(el);
    }
  
    function tryButtons(el) {
      var buttons = el.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
      var foundReject = null;
      buttons.forEach(function(btn) {
        if (textIncludes(btn, BUTTON_PRIORITY.reject)) {
          foundReject = btn;
        }
      });
      if (foundReject) {
        foundReject.click();
      }
    }
  
    function detectAndDestroy(root) {
      var selectors = [].concat(
        BANNER_SELECTORS.onetrust,
        BANNER_SELECTORS.cookiebot,
        BANNER_SELECTORS.sourcepoint,
        BANNER_SELECTORS.patterns
      );
      selectors.forEach(function(sel) {
        var nodes = root.querySelectorAll(sel);
        nodes.forEach(function(el) {
          tryButtons(el);
          destroyBanner(el);
        });
      });
      // keyword scan fallback
      var all = root.querySelectorAll('body *');
      all.forEach(function(el) {
        if (textIncludes(el, BANNER_SELECTORS.keywords)) {
          tryButtons(el);
          destroyBanner(el);
        }
      });
    }
  
    function observe() {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          if (m.addedNodes) {
            m.addedNodes.forEach(function(n) {
              if (n.nodeType === 1) {
                detectAndDestroy(n);
              }
            });
          }
        });
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  
    document.addEventListener('DOMContentLoaded', function() {
      detectAndDestroy(document);
      observe();
    });
  })();
