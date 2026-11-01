/* Masbet — temps passé dans l'application (statistique anonyme) et type d'appareil.
   Compte seulement le temps où la page est VISIBLE à l'écran ; envoie le total toutes les 2 minutes
   et quand on quitte la page. Aucune donnée personnelle : identifiant anonyme du téléphone + secondes. */
(function () {
  function typeAppareil() {
    var u = navigator.userAgent || '', tactile = (navigator.maxTouchPoints || 0) > 1;
    if (/iPad/.test(u) || (/Macintosh/.test(u) && tactile)) return 'tab';   // iPad (iPadOS se présente comme un Mac)
    if (/iPhone|iPod/.test(u)) return 'ios';
    if (/Android/.test(u)) return /Mobile/.test(u) ? 'and' : 'tab';
    if (/Tablet|Silk|Kindle|PlayBook/.test(u)) return 'tab';
    return 'ordi';
  }
  window.MASBET_TP = typeAppareil();
  var url = window.MASBET_CONTENU || '';
  if (!url) return;

  /* v42.7 — santé du système : durée et réussite de chaque échange avec Google (Contenu et distributeur).
     Mesures regroupées par jour sur le téléphone (akey / kom / quiz / achte), envoyées par paquets. */
  var DIST = window.MASBET_API || '', CLE_P = 'masbet_c_perf';
  function jour() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function perfLire() { var o = null; try { o = JSON.parse(localStorage.getItem(CLE_P) || 'null'); } catch (e) {} return o && o.g ? o : { j: jour(), g: {} }; }
  function perfEcrire(o) { try { localStorage.setItem(CLE_P, JSON.stringify(o)); } catch (e) {} }
  function groupe(u, corps) {
    if (DIST && u.indexOf(DIST) === 0) return 'achte';
    var m = /[?&]api=([a-z_]+)/.exec(u) || /"api"\s*:\s*"([a-z_]+)"/.exec(String(corps || '').slice(0, 300)), a = m ? m[1] : 'lot';
    if (a === 'stat') return '';
    if (/^kom_/.test(a)) return 'kom';
    if (/^(quiz|defi|pakou|pro|antren|konkou|cert|atest|klasman|repons|kesyon)/.test(a)) return 'quiz';
    if (/^(achte|pay|tike|kod|forfe|offre)/.test(a)) return 'achte';
    return 'akey';
  }
  function mesurer(g, ms, ok) {
    var o = perfLire(); if (o.j !== jour()) { perfEnvoyer(o); o = { j: jour(), g: {} }; }
    var x = o.g[g] || (o.g[g] = [0, 0, 0, 0]); x[0]++; x[1] += Math.min(30000, Math.round(ms)); if (ms > 3000) x[2]++; if (!ok) x[3]++;
    perfEcrire(o);
    var n = 0; for (var k in o.g) n += o.g[k][0]; if (n >= 15) { perfEnvoyer(o); perfEcrire({ j: jour(), g: {} }); }
  }
  function perfEnvoyer(o) {
    var app = lireApp(); if (!o || app.length < 8) return; var vide = true; for (var k in o.g) { if (o.g[k][0]) vide = false; } if (vide) return;
    balise({ api: 'stat', appareil: app, ev: 'perf', m: o.g });
  }
  if (window.fetch) {
    var fetch0 = window.fetch;
    window.fetch = function (res, opt) {
      var u = typeof res === 'string' ? res : (res && res.url) || '', g = (u.indexOf(url) === 0 || (DIST && u.indexOf(DIST) === 0)) ? groupe(u, opt && opt.body) : '';
      var p = fetch0.apply(this, arguments); if (!g) return p;
      var t0 = Date.now();
      p.then(function (r) { mesurer(g, Date.now() - t0, !!(r && (r.ok || r.type === 'opaque'))); }, function () { mesurer(g, Date.now() - t0, false); });
      return p;
    };
  }
  var acc = 0, depuis = document.hidden ? 0 : Date.now();
  function lireApp() { try { return localStorage.getItem('masbet_appareil') || ''; } catch (e) { return ''; } }
  function arreter() { if (depuis) { acc += (Date.now() - depuis) / 1000; depuis = 0; } }
  function envoyer(fin) {
    arreter(); if (!document.hidden && !fin) depuis = Date.now();
    var s = Math.round(acc), app = lireApp(); if (s < 5 || app.length < 8) return;
    acc = 0;
    balise({ api: 'stat', appareil: app, ev: 'temps', s: Math.min(s, 600) });
  }
  function balise(o) {
    var corps = JSON.stringify(o);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([corps], { type: 'text/plain;charset=utf-8' }))) return;
    } catch (e) {}
    try { (fetch0 || fetch)(url, { method: 'POST', body: corps, keepalive: true, credentials: 'omit', headers: { 'Content-Type': 'text/plain;charset=utf-8' } }).catch(function () {}); } catch (e) {}
  }
  // v42.7 : vue de la page Acheter (parcours d'achat)
  if (/achte\.html$/.test(location.pathname)) setTimeout(function () { var app = lireApp(); if (app.length >= 8) balise({ api: 'stat', appareil: app, ev: 'vue', page: 'achte' }); }, 1500);
  document.addEventListener('visibilitychange', function () { if (document.hidden) envoyer(true); else depuis = Date.now(); });
  window.addEventListener('pagehide', function () { envoyer(true); var o = perfLire(); perfEnvoyer(o); perfEcrire({ j: jour(), g: {} }); });
  setInterval(function () { if (!document.hidden && depuis && acc + (Date.now() - depuis) / 1000 >= 120) envoyer(false); }, 20000);
})();
