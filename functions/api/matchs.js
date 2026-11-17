// Masbet v124 — RÉSERVE CLOUDFLARE des matchs et scores : /api/matchs
// Copie commune à tous. Fraîche 60 s ; ensuite servie tout de suite et rafraîchie en arrière-plan (au plus 6 * 3600 s) ;
// Google en panne → dernière bonne copie. Google n'est donc appelé qu'une fois par période, quel que soit le nombre de téléphones.
const FRAIS = 60 * 1000, MAX = 6 * 3600 * 1000;
async function adresseContenu(ctx) {
  try { const r = await ctx.env.ASSETS.fetch(new Request(new URL('/config.js', ctx.request.url).toString()));
    const m = /MASBET_CONTENU\s*=\s*["'](https:\/\/script\.google\.com\/[^"']+)["']/.exec(await r.text()); return m ? m[1] : ''; } catch (e) { return ''; }
}
async function depuisGoogle(ctx, q) {
  const url = await adresseContenu(ctx); if (!url) return null;
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 12000);
  try { const r = await fetch(url + '?' + q + '&_=' + Date.now(), { redirect: 'follow', signal: ctl.signal }); const x = await r.text(); const j = JSON.parse(x);
    return j && j.ok === true && j.data ? x : null; } catch (e) { return null; } finally { clearTimeout(t); }
}
const rep = (x, maj, etat, st) => new Response(x, { status: st || 200, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-masbet-maj': String(maj || 0), 'x-masbet-reserve': etat } });
async function garder(cle, x) { const maj = Date.now(); await caches.default.put(new Request(cle), new Response(x, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=21600', 'x-masbet-maj': String(maj) } })); return maj; }
export async function onRequestGet(ctx) {
  const cle = 'https://masbet.me/api/matchs?reserve=v1', q = 'api=matchs';
  const d = await caches.default.match(new Request(cle)); let vieux = null, vm = 0;
  if (d) { const maj = Number(d.headers.get('x-masbet-maj')) || 0, age = Date.now() - maj, x = await d.text(); vieux = x; vm = maj;
    if (age < FRAIS) return rep(x, maj, 'fraiche');
    if (age < MAX) { ctx.waitUntil(depuisGoogle(ctx, q).then((n) => n ? garder(cle, n) : null).catch(() => null)); return rep(x, maj, 'rafraichissement'); } }
  const n = await depuisGoogle(ctx, q); if (n) return rep(n, await garder(cle, n), 'google');
  if (vieux) return rep(vieux, vm, 'ancienne');
  return rep(JSON.stringify({ ok: false, erreur: 'reserve-vide' }), 0, 'vide', 503);
}
