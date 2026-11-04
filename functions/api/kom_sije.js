// Masbet v42.16 — RÉSERVE CLOUDFLARE d'un sujet Kominote et de ses commentaires : /api/kom_sije?id=KS…
// Pour les liens partagés (/k/<ID>) : le nouveau visiteur lit le sujet tout de suite ; la page complète ensuite auprès de
// Google (« mon commentaire », « j'aime », commentaires de la dernière minute). Fraîche 30 s, rafraîchie en arrière-plan.
// Sujet supprimé ou masqué : la réponse de Google (erreur) est transmise et JAMAIS gardée.
const FRAIS = 30 * 1000, MAX = 6 * 3600 * 1000;
async function adresseContenu(ctx) {
  try { const r = await ctx.env.ASSETS.fetch(new Request(new URL('/config.js', ctx.request.url).toString()));
    const m = /MASBET_CONTENU\s*=\s*["'](https:\/\/script\.google\.com\/[^"']+)["']/.exec(await r.text()); return m ? m[1] : ''; } catch (e) { return ''; }
}
async function depuisGoogle(ctx, q) {
  const url = await adresseContenu(ctx); if (!url) return { x: null };
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 12000);
  try { const r = await fetch(url + '?' + q + '&_=' + Date.now(), { redirect: 'follow', signal: ctl.signal }); const x = await r.text(); const j = JSON.parse(x);
    return j && j.ok === true && j.data ? { x } : { x: null, refus: j && j.ok === false ? x : null }; } catch (e) { return { x: null }; } finally { clearTimeout(t); }
}
const rep = (x, maj, etat, st) => new Response(x, { status: st || 200, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-masbet-maj': String(maj || 0), 'x-masbet-reserve': etat } });
async function garder(cle, x) { const maj = Date.now(); await caches.default.put(new Request(cle), new Response(x, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=21600', 'x-masbet-maj': String(maj) } })); return maj; }
async function oublier(cle) { try { await caches.default.delete(new Request(cle)); } catch (e) {} }
export async function onRequestGet(ctx) {
  const id = String(new URL(ctx.request.url).searchParams.get('id') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
  if (!id) return rep(JSON.stringify({ ok: false, erreur: 'id' }), 0, 'vide', 400);
  const cle = 'https://masbet.me/api/kom_sije?reserve=v1&id=' + id, q = 'api=kom_sije&id=' + id;
  const d = await caches.default.match(new Request(cle)); let vieux = null, vm = 0;
  if (d) { const maj = Number(d.headers.get('x-masbet-maj')) || 0, age = Date.now() - maj, x = await d.text(); vieux = x; vm = maj;
    if (age < FRAIS) return rep(x, maj, 'fraiche');
    if (age < MAX) { ctx.waitUntil(depuisGoogle(ctx, q).then((n) => n.x ? garder(cle, n.x) : (n.refus ? oublier(cle) : null)).catch(() => null)); return rep(x, maj, 'rafraichissement'); } }
  const n = await depuisGoogle(ctx, q);
  if (n.x) return rep(n.x, await garder(cle, n.x), 'google');
  if (n.refus) { await oublier(cle); return rep(n.refus, 0, 'refus'); }   // sujet supprimé ou masqué : on transmet le refus
  if (vieux) return rep(vieux, vm, 'ancienne');
  return rep(JSON.stringify({ ok: false, erreur: 'reserve-vide' }), 0, 'vide', 503);
}
