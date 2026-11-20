/* ==========================================================================
   script.js — progressive enhancement only.
   With JavaScript disabled the page is still fully readable in zh-HK:
   all default text is written inline in index.html.

   Responsibilities
   1. Apply the chosen language to [data-i18n] text nodes and
      [data-i18n-attr] attributes.
   2. Update <html lang>, <title>, meta description, Open Graph tags.
   3. Remember the choice (localStorage) and reflect it in the URL (?lang=).
   4. Announce the change to assistive technology.
   ========================================================================== */

(function () {
  'use strict';

  var DEFAULT_LANG = 'zh-HK';
  var LANGS = ['zh-HK', 'zh-CN', 'en'];
  var OG_LOCALE = { 'zh-HK': 'zh_HK', 'zh-CN': 'zh_CN', 'en': 'en_US' };
  var STORAGE_KEY = 'lang';

  var table = window.I18N || {};
  var current = DEFAULT_LANG;

  /* ---------------------------------------------------------------- i18n */

  function warnMissing(key, code) {
    if (window.console && console.warn) {
      console.warn('[i18n] missing key "' + key + '" in "' + code + '"');
    }
  }

  /* Look the key up in `code`, then fall back to zh-HK.
     Returns null when the key does not exist anywhere, so the caller can
     keep the text already written in the HTML (never an empty string). */
  function translate(key, code) {
    var pack = table[code] || {};
    if (Object.prototype.hasOwnProperty.call(pack, key)) { return pack[key]; }

    var fallback = table[DEFAULT_LANG] || {};
    if (Object.prototype.hasOwnProperty.call(fallback, key)) {
      warnMissing(key, code);
      return fallback[key];
    }
    warnMissing(key, code);
    return null;
  }

  function applyText() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      var value = translate(key, current);
      if (value !== null) { nodes[i].textContent = value; }
    }
  }

  function applyAttributes() {
    var nodes = document.querySelectorAll('[data-i18n-attr]');
    for (var i = 0; i < nodes.length; i++) {
      var pairs = nodes[i].getAttribute('data-i18n-attr').split(/\s+/);
      for (var j = 0; j < pairs.length; j++) {
        if (!pairs[j]) { continue; }
        var parts = pairs[j].split(':');
        if (parts.length !== 2) { continue; }
        var value = translate(parts[1], current);
        if (value !== null) { nodes[i].setAttribute(parts[0], value); }
      }
    }
  }

  function applyMeta() {
    document.documentElement.lang = current;

    var title = translate('meta.title', current);
    if (title !== null) { document.title = title; }

    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale && OG_LOCALE[current]) { ogLocale.setAttribute('content', OG_LOCALE[current]); }

    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) { ogUrl.setAttribute('content', location.href.split('?')[0]); }
  }

  function applySwitcher() {
    var buttons = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < buttons.length; i++) {
      var isCurrent = buttons[i].getAttribute('data-lang') === current;
      if (isCurrent) {
        buttons[i].setAttribute('aria-current', 'true');
      } else {
        buttons[i].removeAttribute('aria-current');
      }
    }
  }

  /* ------------------------------------------------------------- storage */

  function readStored() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function store(code) {
    try { window.localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* private mode */ }
  }

  function langFromUrl() {
    var match = /[?&]lang=([^&#]+)/.exec(window.location.search);
    if (!match) { return null; }
    var code = decodeURIComponent(match[1]);
    return LANGS.indexOf(code) !== -1 ? code : null;
  }

  /* Priority: ?lang= param -> localStorage -> zh-HK */
  function initialLang() {
    var fromUrl = langFromUrl();
    if (fromUrl) { return fromUrl; }
    var stored = readStored();
    if (stored && LANGS.indexOf(stored) !== -1) { return stored; }
    return DEFAULT_LANG;
  }

  function writeUrl(code) {
    if (!window.history || !history.replaceState) { return; }
    try {
      var url = window.location.pathname + window.location.search.replace(/([?&])lang=[^&#]*&?/, '$1').replace(/[?&]$/, '') ;
      var sep = url.indexOf('?') === -1 ? '?' : '&';
      history.replaceState(null, '', url + sep + 'lang=' + encodeURIComponent(code) + window.location.hash);
    } catch (e) { /* e.g. some file:// contexts */ }
  }

  function announce(code) {
    var region = document.getElementById('lang-status');
    if (!region) { return; }
    var message = translate('a11y.langAnnounce', code);
    if (message === null) { return; }
    region.textContent = '';
    /* Re-setting the text in a later tick makes some screen readers
       re-announce when the same language is chosen twice. */
    window.setTimeout(function () { region.textContent = message; }, 30);
  }

  /* ----------------------------------------------------------------- API */

  function setLang(code, options) {
    if (LANGS.indexOf(code) === -1) { code = DEFAULT_LANG; }
    var opts = options || {};
    var keepScroll = window.pageYOffset || document.documentElement.scrollTop || 0;

    current = code;

    applyText();
    applyAttributes();
    applyMeta();
    applySwitcher();

    store(code);
    writeUrl(code);

    if (!opts.silent) { announce(code); }

    if (!opts.initial) {
      /* Switching only swaps text nodes, but restore the position anyway
         so a taller/shorter translation cannot move the reader. */
      window.scrollTo(0, keepScroll);
    }
  }

  function bindSwitcher() {
    var group = document.getElementById('lang-switch');
    if (!group) { return; }

    group.addEventListener('click', function (event) {
      var button = event.target.closest ? event.target.closest('.lang-btn') : null;
      if (!button) { return; }
      setLang(button.getAttribute('data-lang'));
      button.focus();
    });

    /* Left/Right arrows move between the three options. */
    group.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' &&
          event.key !== 'Home' && event.key !== 'End') { return; }
      var buttons = group.querySelectorAll('.lang-btn');
      var list = Array.prototype.slice.call(buttons);
      var index = list.indexOf(document.activeElement);
      if (index === -1) { return; }

      event.preventDefault();
      if (event.key === 'ArrowRight') { index = (index + 1) % list.length; }
      else if (event.key === 'ArrowLeft') { index = (index - 1 + list.length) % list.length; }
      else if (event.key === 'Home') { index = 0; }
      else { index = list.length - 1; }

      list[index].focus();
    });
  }

  function init() {
    if (!table[DEFAULT_LANG]) {
      if (window.console && console.warn) {
        console.warn('[i18n] translations.js did not load; keeping inline zh-HK text.');
      }
      return;
    }
    bindSwitcher();
    setLang(initialLang(), { initial: true, silent: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
