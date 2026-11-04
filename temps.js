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

  /* v42.16 — pages d'arrivée (liens partagés : Kominote, Méditation, livres, Jeux d'esprit).
     Avant, seul l'Accueil comptait « visiteur », « nouveau téléphone » et « page vue » : un visiteur venu de Facebook
     qui restait sur la Méditation n'était compté nulle part. Mêmes clés que l'Accueil → jamais compté deux fois. */
  var PAGE = (function () { var p = location.pathname || ''; return /kominote/.test(p) ? 'kom' : /meditasyon/.test(p) ? 'med' : /biblio/.test(p) ? 'liv' : /psiko/.test(p) ? 'psi' : ''; })();
  function lsL(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsE(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var NOUVEAU = !lsL('masbet_appareil') && !lsL('masbet_st_premye');   // découvre Masbet sur cette page
  if (PAGE && !lsL('masbet_appareil')) { var al = 'abcdefghijkmnpqrstuvwxyz23456789', a = 'A'; for (var i = 0; i < 19; i++) a += al.charAt(Math.floor(Math.random() * al.length)); lsE('masbet_appareil', a); }
  var AFF_FAIT = false;
  /** Appelé par la page quand son contenu est affiché : temps d'attente d'un téléphone qui découvre Masbet. */
  window.masbetAffiche = function () {
    if (AFF_FAIT || !PAGE || !NOUVEAU || !url) return; AFF_FAIT = true;
    var ms = window.performance && performance.now ? Math.round(performance.now()) : 0; if (!ms || ms > 60000 || document.hidden) return;
    setTimeout(function () { balise({ api: 'stat', appareil: lsL('masbet_appareil') || '', ev: 'aff', k: 'nou', p: PAGE, ms: ms }); }, 2500);
  };
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
  var CACHES = 0, QUITTE = false;   // nombre de fois où l'écran a été caché ; page en train d'être quittée
  document.addEventListener('visibilitychange', function () { if (document.hidden) CACHES++; });
  window.addEventListener('pagehide', function () { QUITTE = true; });
  window.addEventListener('pageshow', function () { QUITTE = false; });
  if (window.fetch) {
    var fetch0 = window.fetch;
    window.fetch = function (res, opt) {
      var u = typeof res === 'string' ? res : (res && res.url) || '', g = (u.indexOf(url) === 0 || (DIST && u.indexOf(DIST) === 0)) ? groupe(u, opt && opt.body) : '';
      var p = fetch0.apply(this, arguments); if (!g) return p;
      // v42.10 — on ne mesure que ce qui dépend vraiment de Google : pas les demandes faites pendant que l'écran
      // était caché (téléphone en veille = demande ralentie par le téléphone), pas celles coupées parce qu'on quitte
      // la page, pas celles faites sans internet (Wi-Fi sans ticket, plus de forfait).
      var t0 = Date.now(), c0 = CACHES, horsLigne = navigator.onLine === false;
      var garder = function () { return !horsLigne && navigator.onLine !== false && !document.hidden && c0 === CACHES && !QUITTE; };
      p.then(function (r) { if (garder()) mesurer(g, Date.now() - t0, !!(r && (r.ok || r.type === 'opaque'))); },
        function (e) { if (garder() && !(e && e.name === 'AbortError' && Date.now() - t0 < 29000)) mesurer(g, Date.now() - t0, false); });
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
  // v42.16 : visiteur du jour, nouveau téléphone et vue, sur les pages d'arrivée (l'Accueil le fait lui-même)
  if (PAGE) setTimeout(function () {
    var app = lireApp(); if (app.length < 8) return;
    var d = new Date(), j = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    if (lsL('masbet_st_j') !== j) { lsE('masbet_st_j', j); balise({ api: 'stat', appareil: app, ev: 'jou', tp: window.MASBET_TP || '' }); }
    if (!lsL('masbet_st_premye')) { lsE('masbet_st_premye', j); if (NOUVEAU) setTimeout(function () { balise({ api: 'stat', appareil: app, ev: 'nouvo' }); }, 400); }
    setTimeout(function () { balise({ api: 'stat', appareil: app, ev: 'vue', page: PAGE }); }, 800);
  }, 1500);
  // v42.7 : vue de la page Acheter (parcours d'achat)
  if (/achte\.html$/.test(location.pathname)) setTimeout(function () { var app = lireApp(); if (app.length >= 8) balise({ api: 'stat', appareil: app, ev: 'vue', page: 'achte' }); }, 1500);
  document.addEventListener('visibilitychange', function () { if (document.hidden) envoyer(true); else depuis = Date.now(); });
  window.addEventListener('pagehide', function () { envoyer(true); var o = perfLire(); perfEnvoyer(o); perfEcrire({ j: jour(), g: {} }); });
  setInterval(function () { if (!document.hidden && depuis && acc + (Date.now() - depuis) / 1000 >= 120) envoyer(false); }, 20000);
})();
