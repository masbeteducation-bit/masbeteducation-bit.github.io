// Service worker MasbetAirNet : l'application s'ouvre même sans réseau (pages en mémoire).
// Les données (offres, matchs, commandes) viennent toujours en direct du système Google.
var VERSION = 'masbet-v27';
var FICHIERS = ['./', './index.html', './achte.html', './config.js', './logo.png', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './apropo.html', './suite.html', './kominote.html', './meditasyon.html', './biblio.html',
  './biblio/livre-sante.js', './biblio/livre-agronomie.js', './biblio/livre-gestion-projet.js', './biblio/livre-ethique.js', './biblio/livre-finance.js', './biblio/livre-fiscalite.js', './biblio/livre-metre-devis.js', './photos/parapli-teren.jpg', './photos/parapli-teren-p.jpg'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FICHIERS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;   // API Google, YouTube… : réseau direct
  // Réseau d'abord (pour avoir la dernière version), mémoire si pas de réseau
  e.respondWith(fetch(e.request).then(function (r) {
    if (r && r.ok) { var copie = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copie); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match('./index.html'); });
  }));
});
