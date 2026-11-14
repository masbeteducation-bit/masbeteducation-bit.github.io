// Masbet v110 — aperçu de partage d'un éditorial : https://masbet.me/e/<ID>
// WhatsApp et Facebook ne lisent que l'en-tête d'une page : ce petit programme (Cloudflare Pages Functions)
// fabrique cet en-tête avec le titre, le début du texte et l'image de l'éditorial, puis envoie la personne
// vers l'éditorial dans l'application. Il lit l'adresse du système « Contenu » dans config.js (déjà publique).
// Réponse gardée 10 minutes chez Cloudflare ; si Google ne répond pas, aperçu général de Masbet.

const SITE = 'https://masbet.me';
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

async function lireEdito(ctx, id) {
  const url = await adresseContenu(ctx);
  if (!url || !id) return null;
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 7000);
    const r = await fetch(url + '?api=edito&id=' + encodeURIComponent(id), { redirect: 'follow', signal: ctl.signal });
    clearTimeout(t);
    const j = await r.json();
    return j && j.ok && j.data && j.data.edito ? j.data.edito : null;
  } catch (e) { return null; }
}

function page(id, e) {
  const cible = '/' + (e ? '#edito&id=' + id : '#edito&d=liste');
  const url = SITE + '/e/' + id;
  const titre = e ? '📰 ' + coupe(e.titreHt || e.titreFr, 100) : 'Editoryal Masbet';
  const txt = e ? (e.texteHt || e.texteFr || '') : '';   // v112 : format affiche (sans texte) → titre français en description
  const desc = e ? (txt ? coupe(txt, 180) : coupe(e.titreFr || 'Afich Masbet Education', 180)) + ' — ' + coupe(e.signature || 'Masbet Education', 50) : 'Editoryal Masbet Education, an kreyòl ak an franse.';
  const image = e && /^https:\/\//.test(e.image || '') ? e.image : IMAGE_DEFAUT;
  return `<!doctype html>
<html lang="ht"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titre)} · Masbet</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Masbet"><meta property="og:locale" content="fr_HT">
<meta property="og:title" content="${esc(titre)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(image)}">${image === IMAGE_DEFAUT ? '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">' : ''}
<meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${esc(url)}">
<meta http-equiv="refresh" content="0;url=${esc(cible)}">
<style>body{font-family:system-ui,sans-serif;background:#14213d;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:20px}a{color:#06b6d4;font-weight:800}</style>
</head><body><div><p>${esc(titre)}</p><p><a href="${esc(cible)}">Li editoryal la sou Masbet →</a></p></div>
<script>location.replace(${JSON.stringify(cible)});</script></body></html>
`;
}

export async function onRequestGet(ctx) {
  const id = String(ctx.params.id || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
  const cle = new Request(SITE + '/e/' + id);
  const cache = caches.default;
  const deja = await cache.match(cle);
  if (deja) return deja;
  const e = await lireEdito(ctx, id);
  const rep = new Response(page(id, e), {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': e ? 'public, max-age=600' : 'no-store' }
  });
  if (e) ctx.waitUntil(cache.put(cle, rep.clone()));
  return rep;
}
