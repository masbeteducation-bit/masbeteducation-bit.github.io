// Masbet v42.16 — RÉSERVE CLOUDFLARE de l'Accueil : https://masbet.me/api/accueil
// Les visiteurs reçoivent une copie gardée chez Cloudflare (près d'Haïti) en 0,1–0,3 s, au lieu d'attendre Google (2–4 s).
// La copie est rafraîchie auprès de Google EN ARRIÈRE-PLAN dès qu'elle a plus d'une minute (le visiteur n'attend pas).
// Google en panne → on sert la dernière bonne copie (6 h au plus). Une réponse en erreur n'est jamais gardée.
// L'adresse du système « Contenu » est lue dans config.js (déjà publique). Aucun secret ici.

const CLE = 'https://masbet.me/api/accueil?reserve=v1';
const FRAIS = 60 * 1000;            // plus jeune qu'1 min : servie telle quelle
const MAX = 6 * 3600 * 1000;        // jusqu'à 6 h : servie, puis rafraîchie en arrière-plan

async function adresseContenu(ctx) {
  try {
    const r = await ctx.env.ASSETS.fetch(new Request(new URL('/config.js', ctx.request.url).toString()));
    const m = /MASBET_CONTENU\s*=\s*["'](https:\/\/script\.google\.com\/[^"']+)["']/.exec(await r.text());
    return m ? m[1] : '';
  } catch (e) { return ''; }
}

async function depuisGoogle(ctx) {
  const url = await adresseContenu(ctx);
  if (!url) return null;
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 12000);
  try {
    const r = await fetch(url + '?api=accueil&_=' + Date.now(), { redirect: 'follow', signal: ctl.signal });
    const texte = await r.text();
    const j = JSON.parse(texte);
    if (!j || j.ok !== true || !j.data) return null;   // erreur : on ne garde pas
    return texte;
  } catch (e) { return null; } finally { clearTimeout(t); }
}

function reponse(texte, maj, etat) {
  return new Response(texte, { headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',                     // le téléphone garde déjà sa propre copie
    'x-masbet-maj': String(maj), 'x-masbet-reserve': etat } });
}

async function garder(texte) {
  const maj = Date.now();
  await caches.default.put(new Request(CLE), new Response(texte, { headers: {
    'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=21600', 'x-masbet-maj': String(maj) } }));
  return maj;
}

export async function onRequestGet(ctx) {
  const deja = await caches.default.match(new Request(CLE));
  let vieux = null, vieuxMaj = 0;
  if (deja) {
    const maj = Number(deja.headers.get('x-masbet-maj')) || 0, age = Date.now() - maj, texte = await deja.text();
    vieux = texte; vieuxMaj = maj;
    if (age < FRAIS) return reponse(texte, maj, 'fraiche');
    if (age < MAX) {
      ctx.waitUntil(depuisGoogle(ctx).then((n) => n ? garder(n) : null).catch(() => null));   // rafraîchir sans faire attendre
      return reponse(texte, maj, 'rafraichissement');
    }
  }
  const neuf = await depuisGoogle(ctx);
  if (neuf) { const maj = await garder(neuf); return reponse(neuf, maj, 'google'); }
  if (vieux) return reponse(vieux, vieuxMaj, 'ancienne');   // Google ne répond pas : mieux vaut une vieille copie que rien
  // Google ne répond pas et pas de copie : le téléphone demandera lui-même à Google
  return new Response(JSON.stringify({ ok: false, erreur: 'reserve-vide' }), { status: 503, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}
