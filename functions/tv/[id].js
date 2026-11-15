// Masbet v118 — aperçu de partage d'une chaîne TV : https://masbet.me/tv/<chaîne>  (ex. /tv/masbet-tv)
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
function enCeMoment(d) {
  const ok = /^[A-Za-z0-9_-]{11}$/;
  const v = (Array.isArray(d.v) ? d.v : []).filter((x) => x && ok.test(x[0]) && x[2] > 0).map((x) => [x[0], x[1], x[2] > 120 ? x[2] - 20 : x[2]]);
  const p = (Array.isArray(d.p) ? d.p : []).filter((x) => x && x[0] > 0 && ok.test(x[1]) && x[3] > 0).map((x) => [x[0], x[1], x[2], !x[5] && x[3] > 120 ? x[3] - 20 : x[3]]);
  const now = Date.now();
  for (const x of p) if (now >= x[0] && now < x[0] + x[3] * 1000) return { id: x[1], titre: x[2] };
  if (!v.length) return null;
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
  const titre = '📺 ' + nom + ' — gratis sou Masbet';
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
