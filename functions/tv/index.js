// Masbet v133 — lien court de Masbet TV : https://masbet.me/tv
// Renvoie vers l'aperçu de partage existant /tv/masbet-tv (functions/tv/[id].js : image Masbet TV et titre « Masbet TV », sans description),
// qui ouvre ensuite Masbet TV dans l'application. WhatsApp et Facebook suivent ce renvoi pour fabriquer l'aperçu.
export function onRequestGet(ctx) {
  const u = new URL(ctx.request.url);
  return Response.redirect(u.origin + '/tv/masbet-tv' + u.search, 302);
}
