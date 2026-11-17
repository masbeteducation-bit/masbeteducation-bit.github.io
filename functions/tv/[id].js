// Masbet v128 (titre simple) · v122 (plages horaires) · v118 — aperçu de partage d'une chaîne TV : https://masbet.me/tv/<chaîne>  (ex. /tv/masbet-tv)
// WhatsApp et Facebook ne lisent pas ce qui suit « # » dans un lien : ils montraient l'aperçu général de Masbet.
// Cette petite page donne l'image et le titre de la chaîne, puis envoie la personne vers la chaîne dans l'application.
// Pour Masbet TV, la description dit ce qui passe en ce moment (même calcul que l'application). Gardée 5 min chez Cloudflare.

const SITE = 'https://masbet.me';
const IMAGE_TV = SITE + '/photos/og/tv.jpg?v=1';
const IMAGE_DEFAUT = SITE + '/photos/og/akey.jpg?v=5';

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function coupe(s, n) {
  s = String(s || '').replace(/\s+/g, ' ').trim();
  return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}
async function adresseContenu(ctx) {
  try {
    const r = await ctx.env.ASSETS.fetch(new Request(new URL('/config.js', ctx.request.url).toString()));
    const m = /MASBET_CONTENU\s*=\s*["'](https:\/\/script\.google\.com\/[^"']+)["']/.exec(await r.text());
    return m ? m[1] : '';
  } catch (e) { return ''; }
}
// Même tirage que l'application (index.html : mtvHasard, mtvOrdre, mtvPosition, mtvCreneau).
function hasard(s) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
// v122 — Plages horaires de Masbet TV (onglet « Plages TV » du classeur Contenu).
// Même calcul dans l'application et dans l'aperçu de partage (functions/tv/[id].js) : tout le monde voit la même chose au même moment.
// d.v = rotation [[id, titre, durée s (déjà sans les 20 s de fin), live 0/1], …]
// d.g = plages [[jours (bits lundi=1 … dimanche=64), début (min), fin (min), type V/L/T, mode H/C/E, partie D/M/F/H, durée extrait (s)], …],
//       déjà rangées par priorité (jour précis, puis lundi-vendredi / samedi-dimanche, puis chaque jour ; ensuite l'ordre du tableau).
var MTVG_FMT = null;
function mtvgHaiti(ms) {   // date, jour de la semaine (0 = lundi) et minuit à Anse-à-Veau
  if (!MTVG_FMT) { try { MTVG_FMT = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Port-au-Prince', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }); } catch (e) { MTVG_FMT = false; } }
  var y, mo, j, h, mi, s;
  if (MTVG_FMT) { var p = {}; MTVG_FMT.formatToParts(new Date(ms)).forEach(function (x) { p[x.type] = x.value; }); y = +p.year; mo = +p.month; j = +p.day; h = +p.hour % 24; mi = +p.minute; s = +p.second; }
  else { var d = new Date(ms - 5 * 3600e3); y = d.getUTCFullYear(); mo = d.getUTCMonth() + 1; j = d.getUTCDate(); h = d.getUTCHours(); mi = d.getUTCMinutes(); s = d.getUTCSeconds(); }
  var ecart = Date.UTC(y, mo - 1, j, h, mi, s) - Math.floor(ms / 1000) * 1000;
  var minuit = Date.UTC(y, mo - 1, j) - ecart;
  return { minuit: minuit, js: (new Date(Date.UTC(y, mo - 1, j)).getUTCDay() + 6) % 7, cle: y + '-' + mo + '-' + j };
}
// Passages des plages autour de « now » (veille, jour, lendemain), dans l'ordre de priorité.
function mtvgPassages(g, now) {
  var h = mtvgHaiti(now), res = [];
  for (var dj = -1; dj <= 1; dj++) {
    var minuit = h.minuit + dj * 864e5, hj = mtvgHaiti(minuit + 12 * 3600e3);   // midi du jour visé : pas d'erreur de date
    minuit = hj.minuit;
    g.forEach(function (x, i) {
      if (!(x[0] & (1 << hj.js))) return;
      var fin = x[2] > x[1] ? x[2] : x[2] + 1440;
      res.push({ i: i, x: x, S: minuit + x[1] * 60e3, E: minuit + fin * 60e3, cle: hj.cle + '|' + i + '|' + x.join(',') });
    });
  }
  return res;
}
function mtvgSuite(d, pa, hasard) {   // programme complet d'un passage de plage : [[id, titre, longueur s, départ s, extrait 0/1], …]
  var x = pa.x, type = x[3], mode = x[4], part = x[5], dx = x[6] || 2700, v = d.v;
  var pool = v.filter(function (y) { return type === 'T' || (type === 'L' ? y[3] : !y[3]); });
  if (!pool.length) pool = v.slice();
  if (!pool.length) return [];
  pool.sort(function (a, b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0; });
  var r = hasard('masbet-tv-' + pa.cle), parts = ['D', 'M', 'F'];
  var items = pool.map(function (y) {
    if (mode === 'E' && y[2] >= dx + 600) {
      var p = part === 'H' ? parts[Math.floor(hasard(pa.cle + '|' + y[0])() * 3)] : part;
      var off = p === 'D' ? 0 : p === 'F' ? y[2] - dx : Math.floor((y[2] - dx) / 2);
      return [y[0], y[1], dx, off, 1];
    }
    return [y[0], y[1], y[2], 0, 0];
  });
  function melange(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var k = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[k]; a[k] = t; } return a; }
  var tot = (pa.E - pa.S) / 1000, t = 0, out = [], tour, n;
  for (tour = 0; tour < 60 && t < tot; tour++) {   // la liste se répète si la plage est plus longue que toutes les vidéos
    n = 0; melange(items).forEach(function (y) { if (t + y[2] <= tot) { out.push(y); t += y[2]; n++; } });
    if (!n) break;
  }
  if (t < tot) {   // reste de temps : on le remplit avec de courtes vidéos, comme les intermèdes à la télévision
    var courtes = melange(v.filter(function (y) { return !y[3]; }).map(function (y) { return [y[0], y[1], y[2], 0, 0]; }));
    courtes.forEach(function (y) { if (t + y[2] <= tot) { out.push(y); t += y[2]; } });
  }
  if (t < tot - 1) { var z = melange(items)[0]; out.push([z[0], z[1], tot - t, z[3], z[4]]); }   // dernier morceau coupé à la fin de la plage
  return out;
}
// Ce qui passe à « now » selon les plages. Renvoie null s'il n'y a pas de plage (rotation normale).
// prochain = heure (ms) de la prochaine limite de plage, pour couper la rotation au bon moment.
function mtvgMaintenant(d, now, hasard, memo, saute) {
  var g = d.g || [], res = { prochain: 0, c: null };
  if (!g.length || !d.v.length) return res;
  var ps = mtvgPassages(g, now), act = null;
  ps.forEach(function (pa) { if (pa.S <= now && now < pa.E && (!act || pa.i < act.i)) act = pa; });
  ps.forEach(function (pa) {   // prochaine limite : début d'une plage prioritaire, ou fin de la plage en cours
    if (pa.S > now && (!act || pa.i < act.i) && (!res.prochain || pa.S < res.prochain)) res.prochain = pa.S;
  });
  if (act && (!res.prochain || act.E < res.prochain)) res.prochain = act.E;
  if (!act) return res;
  memo = memo || {};
  var s = memo[act.cle] || (memo[act.cle] = mtvgSuite(d, act, hasard));
  var t = act.S;
  for (var i = 0; i < s.length; i++) {
    var y = s[i], f = t + y[2] * 1000;
    if (now < f) {
      var k = 0;   // vidéo refusée sur ce téléphone, ou déjà finie : on passe à la suivante
      while (saute && saute(y, t) && k < s.length) { i++; k++; if (i >= s.length) return res; t = f; y = s[i]; f = t + y[2] * 1000; }
      var debut = Math.max(t, now);
      res.c = { id: y[0], titre: y[1], off: y[3] + Math.floor((debut - t) / 1000), fin: f, debut: t, extrait: !!y[4], suite: s[i + 1] ? s[i + 1][1] : '', cle: act.cle + '#' + i };
      return res;
    }
    t = f;
  }
  return res;
}
function enCeMoment(d) {
  const ok = /^[A-Za-z0-9_-]{11}$/;
  const v = (Array.isArray(d.v) ? d.v : []).filter((x) => x && ok.test(x[0]) && x[2] > 0).map((x) => [x[0], x[1], x[2] > 120 ? x[2] - 20 : x[2], x[3] ? 1 : 0]);
  const g = (Array.isArray(d.g) ? d.g : []).filter((x) => x && x[0] > 0 && /^[VLT]$/.test(x[3]));
  const p = (Array.isArray(d.p) ? d.p : []).filter((x) => x && x[0] > 0 && ok.test(x[1]) && x[3] > 0).map((x) => [x[0], x[1], x[2], !x[5] && x[3] > 120 ? x[3] - 20 : x[3]]);
  const now = Date.now();
  for (const x of p) if (now >= x[0] && now < x[0] + x[3] * 1000) return { id: x[1], titre: x[2] };
  if (!v.length) return null;
  const pl = mtvgMaintenant({ v: v, g: g }, now, hasard, {}, null);   // v122 : plage horaire en cours
  if (pl.c) return { id: pl.c.id, titre: (pl.c.extrait ? 'Ekstrè · ' : '') + pl.c.titre };
  const j = new Date().toISOString().slice(0, 10), r = hasard('masbet-tv-' + j);
  const a = v.slice().sort((x, y) => x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0);
  for (let i = a.length - 1; i > 0; i--) { const k = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[k]; a[k] = t; }
  let tot = 0; a.forEach((x) => { tot += x[2]; });
  const s = now / 1000; let t = (s - Math.floor(s / 86400) * 86400) % tot;
  for (const x of a) { if (t < x[2]) return { id: x[0], titre: x[1] }; t -= x[2]; }
  return { id: a[0][0], titre: a[0][1] };
}
async function lireMtv(ctx) {
  const url = await adresseContenu(ctx);
  if (!url) return null;
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 7000);
    const r = await fetch(url + '?api=mtv', { redirect: 'follow', signal: ctl.signal });
    clearTimeout(t);
    const j = await r.json();
    return j && j.ok && j.data ? enCeMoment(j.data) : null;
  } catch (e) { return null; }
}

function page(slug, nom, desc, image) {
  const cible = '/#videyo&kanal=' + slug;
  const url = SITE + '/tv/' + slug;
  const titre = slug === 'masbet-tv' ? '📺 Gade Masbet TV 24/24' : '📺 Gade ' + nom + ' sou Masbet';   // v128 : titre simple
  return `<!doctype html>
<html lang="ht"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="video.other"><meta property="og:site_name" content="Masbet"><meta property="og:locale" content="fr_HT">
<meta property="og:title" content="${esc(titre)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(nom)}">
<meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${esc(url)}">
<meta http-equiv="refresh" content="0;url=${esc(cible)}">
<style>body{font-family:system-ui,sans-serif;background:#14213d;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:20px}a{color:#06b6d4;font-weight:800}</style>
</head><body><div><p>${esc(titre)}</p><p><a href="${esc(cible)}">Gade ${esc(nom)} sou Masbet →</a></p></div>
<script>location.replace(${JSON.stringify(cible)});</script></body></html>
`;
}

export async function onRequestGet(ctx) {
  const slug = String(ctx.params.id || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40) || 'masbet-tv';
  const cle = new Request(SITE + '/tv/' + slug);
  const cache = caches.default;
  const deja = await cache.match(cle);
  if (deja) return deja;
  let rep;
  if (slug === 'masbet-tv') {
    const c = await lireMtv(ctx);
    const desc = c ? 'Kounye a : « ' + coupe(c.titre, 110) + ' ». Videyo ak lives Masbet yo, youn apre lòt, gratis.'
                   : 'Videyo ak lives Masbet yo, youn apre lòt, tankou yon vrè chèn televizyon. Gratis.';
    rep = new Response(page(slug, 'Masbet TV', desc, IMAGE_TV), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' } });
  } else {
    const nom = slug.split('-').map((m) => m ? m[0].toUpperCase() + m.slice(1) : m).join(' ');
    rep = new Response(page(slug, nom, 'Gade chèn TV yo gratis sou Masbet, aplikasyon Ansavo a.', IMAGE_DEFAUT), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' } });
  }
  ctx.waitUntil(cache.put(cle, rep.clone()));
  return rep;
}
