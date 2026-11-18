/* Changement d'adresse : masbeteducation-bit.github.io → masbet.me
   1) Sur l'ancienne adresse : on emporte les données du téléphone (compte, codes achetés, scores, brouillons…)
      dans la partie « # » du lien (jamais envoyée au serveur) et on ouvre la même page sur masbet.me.
   2) Sur masbet.me : on importe une seule fois, seulement si on vient de l'ancienne adresse
      et si ce téléphone n'a pas encore de données importantes sur masbet.me.
   Ce fichier doit rester chargé en premier dans chaque page (avant config.js). */
(function () {
  var NOUVEAU = 'masbet.me', ANCIEN = 'masbeteducation-bit.github.io', CLE = 'mgr=';
  var h = location.hostname;
  function ls() { try { return window.localStorage; } catch (e) { return null; } }
  // Clés qui ne voyagent pas : caches refaits automatiquement, jeton de notification lié à l'ancienne adresse, session admin.
  function aEmporter(k) {
    return k.indexOf('masbet_') === 0 && k.indexOf('masbet_c_') !== 0 &&
      ['masbet_accueil', 'masbet_lokal', 'masbet_notif', 'masbet_erreurs', 'masbet_admin', 'masbet_migre'].indexOf(k) < 0;
  }
  // Clés présentes dès la première visite : elles ne comptent pas comme « données importantes ».
  function banale(k) {
    return !aEmporter(k) || /^masbet_(lang|appareil|lokal_i|notif_non|infos|cadeau_vu|psiko_son|biblio_fs|st_.*)$/.test(k);
  }
  function b64(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function deb64(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
  function installe() {
    try { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
    catch (e) { return false; }
  }
  function avis(lien) {
    try {
      document.documentElement.style.visibility = '';
      var fr = /fr/.test(String((ls() && ls().getItem('masbet_lang')) || ''));
      var t = fr
        ? ['Masbet a changé d\'adresse', 'L\'application est maintenant sur masbet.me.', 'Ouvrir Masbet',
           'Pour retrouver l\'icône : ouvrez masbet.me dans Chrome → menu ⋮ → « Installer l\'application ». Ensuite, supprimez cette ancienne icône.']
        : ['Masbet chanje adrès', 'Aplikasyon an sou masbet.me kounye a.', 'Louvri Masbet',
           'Pou w jwenn ikòn nan ankò : louvri masbet.me nan Chrome → meni ⋮ → « Enstale aplikasyon an ». Apre sa, efase ansyen ikòn sa a.'];
      var d = document.createElement('div');
      d.setAttribute('style', 'position:fixed;inset:0;z-index:2147483647;background:#14213d;color:#fff;display:flex;flex-direction:column;' +
        'align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;font:16px/1.45 system-ui,Roboto,sans-serif');
      var h1 = document.createElement('div'); h1.textContent = t[0]; h1.setAttribute('style', 'font-size:22px;font-weight:700');
      var p1 = document.createElement('div'); p1.textContent = t[1];
      var a = document.createElement('a'); a.href = lien; a.textContent = t[2];
      a.setAttribute('style', 'background:#22c1dc;color:#0b1730;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none;font-size:18px');
      var p2 = document.createElement('div'); p2.textContent = t[3]; p2.setAttribute('style', 'opacity:.85;font-size:14px;max-width:420px');
      d.appendChild(h1); d.appendChild(p1); d.appendChild(a); d.appendChild(p2);
      (document.body || document.documentElement).appendChild(d);
    } catch (e) { try { document.documentElement.style.visibility = ''; } catch (e2) {} }
  }
  function play() {
    try { return /[?&]play=1\b/.test(location.search) || /^android-app:\/\//.test(document.referrer || '') || sessionStorage.getItem('masbet_play') === '1'; }
    catch (e) { return /[?&]play=1\b/.test(location.search); }
  }

  // ---------- 1) Ancienne adresse : partir vers masbet.me ----------
  if (h === ANCIEN || h === 'masbet.pages.dev') {
    if (play() || navigator.onLine === false) return;   // application Google Play, ou hors ligne : on reste ici
    var cible = 'https://' + NOUVEAU + location.pathname + location.search, hash = location.hash.replace(/^#/, ''), s = ls(), d = {};
    if (h === ANCIEN && s) {
      try {
        for (var i = 0; i < s.length; i++) { var k = s.key(i); if (aEmporter(k)) d[k] = s.getItem(k); }
        // Lien trop long : on laisse tomber les plus grosses valeurs (brouillons très longs).
        // Application installée depuis l'ancienne adresse (icône sur l'écran d'accueil) : Android ouvre masbet.me
        // à travers un « intent » limité en taille → avec un lien énorme, rien ne s'ouvre (écran bleu vide). Lien court.
        var max = installe() ? 60000 : 1200000;
        var ks = Object.keys(d).sort(function (a, b) { return d[b].length - d[a].length; });
        while (ks.length && JSON.stringify(d).length > max) delete d[ks.shift()];
      } catch (e) { d = {}; }
    }
    var paquet = Object.keys(d).length ? CLE + b64(JSON.stringify({ v: 1, t: Date.now(), d: d })) + (hash ? '&h=' + encodeURIComponent(hash) : '') : hash;
    var lien = cible + (paquet ? '#' + paquet : '');
    try { document.documentElement.style.visibility = 'hidden'; } catch (e) {}
    // Filet de sécurité : si on est toujours ici après 6 s, on ne laisse pas un écran vide.
    setTimeout(function () { avis(lien); }, 6000);
    location.replace(lien);
    return;
  }

  // ---------- 2) masbet.me : importer ----------
  if (location.hash.indexOf('#' + CLE) !== 0) return;
  var m = /^#mgr=([A-Za-z0-9_-]+)(?:&h=([^&]*))?$/.exec(location.hash), suite = '';
  if (m && m[2]) { try { suite = decodeURIComponent(m[2]); } catch (e) { suite = ''; } }
  // On enlève tout de suite les données du lien (historique, partage d'écran…), en gardant #sertifika=…, #videyo&tv…
  try { history.replaceState(null, '', location.pathname + location.search + (suite ? '#' + suite : '')); } catch (e) {}
  var s2 = ls(), ref = '';
  try { ref = new URL(document.referrer).hostname; } catch (e) {}
  if (!m || !s2 || ref !== ANCIEN || s2.getItem('masbet_migre')) return;
  try {
    for (var j = 0; j < s2.length; j++) { if (!banale(s2.key(j))) { s2.setItem('masbet_migre', 'deja:' + new Date().toISOString()); return; } }
    var p = JSON.parse(deb64(m[1]));
    if (!p || p.v !== 1 || !p.d || typeof p.d !== 'object') return;
    var n = 0;
    for (var k2 in p.d) {
      if (Object.prototype.hasOwnProperty.call(p.d, k2) && aEmporter(k2) && typeof p.d[k2] === 'string') {
        try { s2.setItem(k2, p.d[k2]); n++; } catch (e) {}
      }
    }
    s2.setItem('masbet_migre', new Date().toISOString() + ':' + n);
  } catch (e) {}
})();
