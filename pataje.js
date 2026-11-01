/* Masbet — partager sur n'importe quelle plateforme.
   1) Téléphone (Android, iPhone) : le menu de partage du téléphone (WhatsApp, Facebook, Messenger,
      Instagram, Telegram, TikTok, SMS, e-mail… toutes les applications installées).
   2) Sinon (ordinateur, navigateur intégré à Facebook ou Instagram, refus du menu) : une fenêtre Masbet
      avec WhatsApp, Facebook, Telegram, X, SMS, e-mail et « Copier ».
   Utilisation : masbetPataje({ texte: '…', url: 'https://masbet.me/…', titre: '…' }) */
(function (W) {
  'use strict';
  function fr() { return (document.documentElement.lang || '').slice(0, 2) === 'fr'; }
  function A(ht, f) { return fr() ? f : ht; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var ICO = {
    wa: '<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#fff" d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm5.3 13.6c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.5.2.3.7 1.2 1.5 1.9 1 .9 1.8 1.2 2.1 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.6-.1 1.1z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#fff" d="M13.5 21.8v-8h2.7l.4-3.1h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6v3.1h2.7v8z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" width="26" height="26"><path fill="#fff" d="M20.7 4.3 2.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.4c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.1c.3-1.3-.5-1.8-1.5-1.4zM8.3 13.8l9.4-5.9c.5-.3.9-.1.5.2l-7.9 7.2-.3 3.3z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="22" height="22"><path fill="#fff" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>',
    sms: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 6.5a1.3 1.3 0 1 0 0 .1zm5 0a1.3 1.3 0 1 0 0 .1zm5 0a1.3 1.3 0 1 0 0 .1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7h15.2zM4 8.6V17h16V8.6l-8 5.4z"/></svg>',
    cp: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M8 3h11a2 2 0 0 1 2 2v11h-2V5H8zM5 7h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/></svg>'
  };
  var styleOk = false;
  function styles() {
    if (styleOk) return; styleOk = true;
    var s = document.createElement('style');
    s.textContent = '.mpOv{position:fixed;inset:0;background:rgba(10,18,40,.55);z-index:9999;display:flex;align-items:flex-end;justify-content:center}' +
      '.mpSh{background:#fff;color:#14213d;width:100%;max-width:520px;border-radius:20px 20px 0 0;padding:16px 16px calc(16px + env(safe-area-inset-bottom));font:15px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 -6px 30px rgba(0,0,0,.25)}' +
      '.mpSh h3{margin:0 0 4px;font-size:17px}.mpSh p{margin:0 0 12px;color:#5d6782;font-size:13px;white-space:pre-line;max-height:4.2em;overflow:hidden}' +
      '.mpG{display:grid;grid-template-columns:repeat(4,1fr);gap:12px 6px}.mpG a,.mpG button{display:flex;flex-direction:column;align-items:center;gap:5px;border:0;background:none;color:#14213d;font:inherit;font-size:12px;font-weight:700;text-decoration:none;cursor:pointer;padding:0}' +
      '.mpG i{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%}' +
      '.mpX{display:block;width:100%;margin-top:14px;border:0;border-radius:12px;background:#eef0f6;color:#14213d;font:inherit;font-weight:800;padding:11px;cursor:pointer}';
    document.head.appendChild(s);
  }
  function fermer() { var o = document.getElementById('mpOv'); if (o) o.remove(); document.removeEventListener('keydown', echap); }
  function echap(e) { if (e.key === 'Escape') fermer(); }
  function copier(txt, btn) {
    var fini = function () { var s = btn.querySelector('span'); if (s) s.textContent = A('Kopye ✓', 'Copié ✓'); setTimeout(fermer, 900); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(fini, function () { W.prompt(A('Kopye tèks sa a :', 'Copiez ce texte :'), txt); });
    else { W.prompt(A('Kopye tèks sa a :', 'Copiez ce texte :'), txt); }
  }
  function fenetre(o) {
    styles(); fermer();
    var url = o.url || location.href, txt = (o.texte || '') + (url ? '\n' + url : ''), e = encodeURIComponent;
    var L = [
      ['wa', 'WhatsApp', '#25D366', 'https://wa.me/?text=' + e(txt)],
      ['fb', 'Facebook', '#1877F2', 'https://www.facebook.com/sharer/sharer.php?u=' + e(url)],
      ['tg', 'Telegram', '#229ED9', 'https://t.me/share/url?url=' + e(url) + '&text=' + e(o.texte || '')],
      ['x', 'X', '#111', 'https://twitter.com/intent/tweet?text=' + e(o.texte || '') + '&url=' + e(url)],
      ['sms', 'SMS', '#16a34a', 'sms:?&body=' + e(txt)],
      ['mail', A('Imèl', 'E-mail'), '#ea580c', 'mailto:?subject=' + e(o.titre || 'Masbet') + '&body=' + e(txt)]
    ];
    var ov = document.createElement('div'); ov.className = 'mpOv'; ov.id = 'mpOv';
    ov.innerHTML = '<div class="mpSh" role="dialog" aria-label="' + esc(A('Pataje', 'Partager')) + '"><h3>📤 ' + esc(A('Pataje', 'Partager')) + '</h3><p>' + esc(o.texte || url) + '</p><div class="mpG">' +
      L.map(function (x) { return '<a href="' + esc(x[3]) + '" target="_blank" rel="noopener" data-mp="1"><i style="background:' + x[2] + '">' + ICO[x[0]] + '</i><span>' + esc(x[1]) + '</span></a>'; }).join('') +
      '<button type="button" id="mpCp"><i style="background:#173a8c">' + ICO.cp + '</i><span>' + esc(A('Kopye', 'Copier')) + '</span></button></div>' +
      '<button type="button" class="mpX" id="mpX">' + esc(A('Fèmen', 'Fermer')) + '</button></div>';
    ov.addEventListener('click', function (ev) { if (ev.target === ov) fermer(); if (ev.target.closest && ev.target.closest('[data-mp]')) setTimeout(fermer, 300); });
    document.body.appendChild(ov);
    document.getElementById('mpX').onclick = fermer;
    document.getElementById('mpCp').onclick = function () { copier(txt, this); };
    document.addEventListener('keydown', echap);
  }
  /** Le menu du téléphone s'il existe (toutes les applications), sinon la fenêtre Masbet. */
  W.masbetPataje = function (o) {
    o = o || {};
    var mobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent || '') || (navigator.maxTouchPoints || 0) > 1;
    if (navigator.share && mobile) {
      var d = { text: o.texte || '', url: o.url || location.href }; if (o.titre) d.title = o.titre;
      navigator.share(d).catch(function (err) { if (!err || err.name !== 'AbortError') fenetre(o); });   // annulé par la personne : rien
      return;
    }
    fenetre(o);
  };
})(window);
