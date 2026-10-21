// Service worker MasbetAirNet : l'application s'ouvre même sans réseau (pages en mémoire).
// Les données (offres, matchs, commandes) viennent toujours en direct du système Google.
var VERSION = 'masbet-v35';
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

// Notifications (Firebase Cloud Messaging) : le système Masbet envoie {titre, texte, lien, tag} ; on affiche l'alerte.
self.addEventListener('push', function (e) {
  var d = {};
  try { var j = e.data ? e.data.json() : {}; d = j.data || (j.notification ? { titre: j.notification.title, texte: j.notification.body } : j) || {}; }
  catch (err) { d = { texte: e.data ? e.data.text() : '' }; }
  var titre = String(d.titre || 'Masbet'), opt = { body: String(d.texte || ''), icon: 'icon-192.png', badge: 'icon-192.png', lang: 'fr',
    tag: String(d.tag || 'masbet'), renotify: true, data: { lien: String(d.lien || '') } };
  e.waitUntil(self.registration.showNotification(titre, opt));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var lien = String((e.notification.data && e.notification.data.lien) || '');
  if (!/^(#[a-z]+)?$/.test(lien)) lien = '';
  var cible = new URL('index.html' + lien, self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) {
      if (cs[i].url.indexOf(self.registration.scope) === 0 && 'focus' in cs[i]) {
        return cs[i].focus().then(function (c) { return c && c.navigate ? c.navigate(cible) : c; }).catch(function () { return self.clients.openWindow(cible); });
      }
    }
    return self.clients.openWindow(cible);
  }));
});
