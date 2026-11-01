/* Masbet — « Devinèt jou a / Énigmes du jour » : 3 devinettes par jour.
   Banque : énigmes écrites à la main + familles calculées par le programme (réponses vérifiées).
   Calendrier : cycles de 90 jours ; chaque devinette passe UNE fois par cycle (270 = 90 × 3),
   puis le cycle suivant les remélange (autres combinaisons), sans en reprendre une vue dans les 30 derniers jours.
   Chaque devinette : {id, ht:{q,ch[4],ind,ex}, fr:{…}, bon} (bon = indice de la bonne réponse dans ch). */
(function (G) {
  'use strict';
  function rng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function ent(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function pick(r, t) { return t[Math.floor(r() * t.length)]; }
  function shuffle(r, t) { t = t.slice(); for (var i = t.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), x = t[i]; t[i] = t[j]; t[j] = x; } return t; }
  function nbL(s) { return (String(s).match(/[a-zà-ÿœ]/gi) || []).length; }
  function fmt(n) { return String(n).replace('.', ','); }

  var B = [];
  /* Ajoute une devinette. rep / faux : texte identique dans les deux langues (string ou nombre) ou [ht, fr]. */
  function D(id, qh, qf, rep, faux, ih, iF, eh, ef) {
    var L = function (x, k) { return Array.isArray(x) ? String(x[k]) : String(x); };
    var o = { id: id };
    ['ht', 'fr'].forEach(function (lg, k) {
      o[lg] = { q: k ? qf : qh, ind: k ? iF : ih, ex: k ? ef : eh, rep: L(rep, k), faux: faux.map(function (f) { return L(f, k); }) };
    });
    B.push(o);
  }
  /* Même chose quand la réponse et les choix sont calculés séparément par langue. */
  function D2(id, ht, fr) { B.push({ id: id, ht: ht, fr: fr }); }

  // =====================================================================
  // 1. DEVINETTES ÉCRITES À LA MAIN
  // =====================================================================
  var M = function () { D.apply(null, ['m' + (B.length + 1)].concat([].slice.call(arguments))); };
  M('Ki sa ki vini apre : 1, 11, 21, 1211, 111221, … ?', 'Quel est le terme suivant : 1, 11, 21, 1211, 111221, … ?', '312211', ['1112221', '122211', '311221'],
    'Li chak nonb awotvwa : « yon 1 », « de 1 »…', 'Lisez chaque nombre à voix haute : « un 1 », « deux 1 »…',
    'Chak nonb dekri sa ki anvan l : 111221 = twa 1, de 2, yon 1 → 312211.', 'Chaque terme décrit le précédent : 111221 = trois 1, deux 2, un 1 → 312211.');
  M('Kiyès ki pi lou : yon kilo fè oswa yon kilo koton ?', 'Qu\'est-ce qui est le plus lourd : un kilo de fer ou un kilo de coton ?', ['Yo gen menm pwa', 'Ils pèsent pareil'], [['Fè a', 'Le fer'], ['Koton an', 'Le coton'], ['Sa depann de gwosè sak la', 'Ça dépend du sac']],
    'Gade chif la, pa matyè a.', 'Regardez le chiffre, pas la matière.', 'Yon kilo se yon kilo : de bò yo peze 1 kg.', 'Un kilo reste un kilo : les deux pèsent 1 kg.');
  M('Yon kòk ponn yon ze sou tèt yon kay ki gen de pant. Ki bò ze a ap tonbe ?', 'Un coq pond un œuf sur le faîte d\'un toit à deux pentes. De quel côté tombe l\'œuf ?', ['Okenn : kòk pa ponn', 'Aucun : un coq ne pond pas'], [['Bò dwat', 'À droite'], ['Bò gòch', 'À gauche'], ['Li rete anlè a', 'Il reste en haut']],
    'Se kiyès ki ponn ze ?', 'Qui pond les œufs ?', 'Se poul ki ponn, pa kòk.', 'Ce sont les poules qui pondent, pas les coqs.');
  M('Konbyen mwa nan ane a ki gen 28 jou ?', 'Combien de mois de l\'année ont 28 jours ?', 12, [1, 2, 4],
    'Pa gen « sèlman » nan kesyon an.', 'La question ne dit pas « seulement ».', 'Tout mwa yo gen omwen 28 jou.', 'Tous les mois ont au moins 28 jours.');
  M('Nan yon kous, ou depase moun ki dezyèm nan. Nan ki plas ou ye kounye a ?', 'Dans une course, vous dépassez le deuxième. À quelle place êtes-vous ?', ['Dezyèm', 'Deuxième'], [['Premye', 'Premier'], ['Twazyèm', 'Troisième'], ['Dènye', 'Dernier']],
    'Ou pran plas li, pa plas premye a.', 'Vous prenez sa place, pas celle du premier.', 'Ou pran plas moun ou depase a : dezyèm.', 'Vous prenez la place de celui que vous dépassez : deuxième.');
  M('Papa Jak gen twa pitit : Avril, Me ak… ?', 'Le père de Jacques a trois enfants : Avril, Mai et… ?', ['Jak', 'Jacques'], [['Jen', 'Juin'], ['Jiyè', 'Juillet'], ['Mas', 'Mars']],
    'Reli kòmansman fraz la.', 'Relisez le début de la phrase.', 'Se papa Jak : twazyèm pitit la se Jak li menm.', 'C\'est le père de Jacques : le troisième enfant est Jacques.');
  M('Mwatye de 2, plis 2 : konbyen sa fè ?', 'La moitié de 2, plus 2 : combien ?', 3, [2, 4, 1],
    'Fè mwatye a an premye.', 'Calculez d\'abord la moitié.', 'Mwatye 2 = 1 ; 1 + 2 = 3.', 'La moitié de 2 = 1 ; 1 + 2 = 3.');
  M('Yon bato gen yon nechèl ki pandye deyò, 2 mach anba dlo. Lanmè a monte 40 cm. Konbyen mach ki anba dlo kounye a ?', 'Un bateau a une échelle pendue dehors, 2 barreaux sous l\'eau. La mer monte de 40 cm. Combien de barreaux sous l\'eau maintenant ?', 2, [4, 6, 0],
    'Bato a fè kisa lè dlo a monte ?', 'Que fait le bateau quand l\'eau monte ?', 'Bato a flote : li monte ak dlo a, kidonk toujou 2 mach.', 'Le bateau flotte : il monte avec l\'eau, donc toujours 2 barreaux.');
  M('Yon kiltivatè gen 17 mouton. Tout mouri, sof 9. Konbyen ki rete ?', 'Un fermier a 17 moutons. Tous meurent sauf 9. Combien en reste-t-il ?', 9, [8, 0, 17],
    '« Tout, sof 9 »…', '« Tous sauf 9 »…', '« Tout mouri sof 9 » : 9 rete vivan.', '« Tous sauf 9 » : il en reste 9.');
  M('Konbyen tè ki genyen nan yon twou 2 m long, 2 m laj, 2 m fon ?', 'Combien de terre y a-t-il dans un trou de 2 m sur 2 m, profond de 2 m ?', ['Pa gen tè', 'Aucune'], [['8 m³', '8 m³'], ['6 m³', '6 m³'], ['4 m³', '4 m³']],
    'Se yon twou…', 'C\'est un trou…', 'Yon twou vid : yo te retire tè a.', 'Un trou est vide : la terre a été retirée.');
  M('Ki sa ki toujou monte, men ki pa janm desann ?', 'Qu\'est-ce qui monte toujours mais ne descend jamais ?', ['Laj ou', 'Votre âge'], [['Lapli', 'La pluie'], ['Yon avyon', 'Un avion'], ['Yon kap', 'Un cerf-volant']],
    'Chak ane li ogmante.', 'Il augmente chaque année.', 'Laj nou ogmante chak ane, li pa janm bese.', 'L\'âge augmente chaque année et ne baisse jamais.');
  M('Ki sa ki gen yon kou, men ki pa gen tèt ?', 'Qu\'est-ce qui a un cou mais pas de tête ?', ['Yon boutèy', 'Une bouteille'], [['Yon chemiz', 'Une chemise'], ['Yon jiraf', 'Une girafe'], ['Yon kreyon', 'Un crayon']],
    'Ou vide ji ladan l.', 'On y verse du jus.', 'Kou boutèy la, san tèt.', 'Le goulot est le « cou » de la bouteille.');
  M('Ki sa ki gen dan, men ki pa ka mòde ?', 'Qu\'est-ce qui a des dents mais ne mord pas ?', ['Yon peny', 'Un peigne'], [['Yon chen', 'Un chien'], ['Yon kwokodil', 'Un crocodile'], ['Yon bebe', 'Un bébé']],
    'Ou sèvi avè l sou cheve w.', 'On s\'en sert pour les cheveux.', 'Peny gen dan, men li pa mòde.', 'Le peigne a des dents mais ne mord pas.');
  M('Ki sa ki vin pi mouye pandan l ap seche ?', 'Qu\'est-ce qui est de plus en plus mouillé à mesure qu\'il sèche ?', ['Yon sèvyèt', 'Une serviette'], [['Yon rad sou kòd', 'Un linge étendu'], ['Solèy la', 'Le soleil'], ['Yon pye bwa', 'Un arbre']],
    'Apre benyen…', 'Après la douche…', 'Sèvyèt la seche w epi li menm li mouye.', 'La serviette vous sèche et devient mouillée.');
  M('Plis ou retire ladan l, plis li vin gwo. Kisa l ye ?', 'Plus on en retire, plus il devient grand. Qu\'est-ce que c\'est ?', ['Yon twou', 'Un trou'], [['Yon sak diri', 'Un sac de riz'], ['Yon bokit dlo', 'Un seau d\'eau'], ['Yon pen', 'Un pain']],
    'Ou fouye l.', 'On le creuse.', 'Plis ou fouye tè, plis twou a gwo.', 'Plus on creuse, plus le trou grandit.');
  M('Ki sa ki kouri san pye ?', 'Qu\'est-ce qui court sans jambes ?', ['Dlo larivyè', 'L\'eau de la rivière'], [['Yon chat', 'Un chat'], ['Yon machin', 'Une voiture'], ['Yon pyebwa', 'Un arbre']],
    'Li desann mòn yo.', 'Elle descend des montagnes.', 'Dlo larivyè « kouri », men li pa gen pye.', 'L\'eau de la rivière « court » sans jambes.');
  M('Ki sa ki gen yon je, men ki pa wè ?', 'Qu\'est-ce qui a un œil mais ne voit pas ?', ['Yon zegwi', 'Une aiguille'], [['Yon chat', 'Un chat'], ['Yon kamera', 'Une caméra'], ['Yon pwason', 'Un poisson']],
    'Ou pase fil ladan l.', 'On y passe un fil.', 'Twou kote fil la pase a rele « je » zegwi a.', 'Le trou où passe le fil s\'appelle « l\'œil » de l\'aiguille.');
  M('Ki sa ki gen fèy, men ki pa yon pyebwa ?', 'Qu\'est-ce qui a des feuilles mais n\'est pas un arbre ?', ['Yon liv', 'Un livre'], [['Yon flè', 'Une fleur'], ['Yon kann', 'Une canne'], ['Yon ti plant', 'Une plante']],
    'Ou li l.', 'On le lit.', 'Liv la gen fèy papye.', 'Le livre a des feuilles de papier.');
  M('Jodi a se mèkredi. Ki jou li te ye avantyè ?', 'Aujourd\'hui c\'est mercredi. Quel jour était-ce avant-hier ?', ['Lendi', 'Lundi'], [['Madi', 'Mardi'], ['Dimanch', 'Dimanche'], ['Vandredi', 'Vendredi']],
    'Avantyè = 2 jou anvan.', 'Avant-hier = il y a 2 jours.', 'Mèkredi − 2 jou = lendi.', 'Mercredi − 2 jours = lundi.');
  M('Si demen se samdi, ki jou yè te ye ?', 'Si demain c\'est samedi, quel jour était hier ?', ['Jedi', 'Jeudi'], [['Vandredi', 'Vendredi'], ['Dimanch', 'Dimanche'], ['Mèkredi', 'Mercredi']],
    'Jwenn jodi a an premye.', 'Trouvez d\'abord aujourd\'hui.', 'Jodi a se vandredi, kidonk yè se jedi.', 'Aujourd\'hui est vendredi, donc hier était jeudi.');
  M('Ki jou ki vini 3 jou apre jou ki anvan dimanch ?', 'Quel jour vient 3 jours après le jour qui précède dimanche ?', ['Madi', 'Mardi'], [['Lendi', 'Lundi'], ['Mèkredi', 'Mercredi'], ['Jedi', 'Jeudi']],
    'Jou ki anvan dimanch se…', 'Le jour avant dimanche est…', 'Samdi + 3 jou = madi.', 'Samedi + 3 jours = mardi.');
  M('Konbyen fwa ou ka retire 5 nan 25 ?', 'Combien de fois peut-on retirer 5 de 25 ?', ['Yon sèl fwa', 'Une seule fois'], [['5 fwa', '5 fois'], ['4 fwa', '4 fois'], ['6 fwa', '6 fois']],
    'Apre premye fwa a, se pa 25 ankò.', 'Après la première fois, ce n\'est plus 25.', 'Apre sa, ou ap retire 5 nan 20, pa nan 25.', 'Ensuite on retire 5 de 20, plus de 25.');
  M('Yon kay kare : tout 4 fenèt li yo bay sou sid. Yon lous pase devan kay la. Ki koulè lous la ?', 'Une maison carrée : ses 4 fenêtres donnent toutes au sud. Un ours passe devant. De quelle couleur est-il ?', ['Blan', 'Blanc'], [['Mawon', 'Brun'], ['Nwa', 'Noir'], ['Gri', 'Gris']],
    'Ki kote sou tè a tout bò se sid ?', 'Où sur Terre tout est au sud ?', 'Kay la nan Pòl Nò : se yon lous blan.', 'La maison est au pôle Nord : c\'est un ours blanc.');
  M('Ki sa ki vini apre : 2, 3, 5, 7, 11, … ?', 'Quel nombre vient ensuite : 2, 3, 5, 7, 11, … ?', 13, [12, 15, 14],
    'Nonb sa yo divize sèlman pa 1 ak pa yo menm.', 'Ces nombres ne se divisent que par 1 et par eux-mêmes.', 'Se nonb premye yo : apre 11 se 13.', 'Ce sont les nombres premiers : après 11 vient 13.');
  M('Ki sa ki vini apre : 1, 4, 9, 16, 25, … ?', 'Quel nombre vient ensuite : 1, 4, 9, 16, 25, … ?', 36, [30, 34, 49],
    '1×1, 2×2, 3×3…', '1×1, 2×2, 3×3…', 'Kare yo : 6 × 6 = 36.', 'Les carrés : 6 × 6 = 36.');
  M('Ki sa ki vini apre : 1, 1, 2, 3, 5, 8, … ?', 'Quel nombre vient ensuite : 1, 1, 2, 3, 5, 8, … ?', 13, [11, 12, 16],
    'Adisyone de dènye yo.', 'Additionnez les deux derniers.', '5 + 8 = 13.', '5 + 8 = 13.');
  M('Ki lèt ki vini apre : E, D, T, K, S, S, S, … ?', 'Quelle lettre vient ensuite : U, D, T, Q, C, S, S, … ?', ['U', 'H'], [['N', 'N'], ['D', 'D'], ['O', 'O']],
    'Konte : en, de, twa…', 'Comptez : un, deux, trois…', 'Premye lèt chif yo : en, de, twa, kat, senk, sis, sèt, uit → U.', 'Initiales des nombres : un, deux… six, sept, huit → H.');
  M('Ki lèt ki vini apre : L, M, M, J, V, S, … ?', 'Quelle lettre vient ensuite : L, M, M, J, V, S, … ?', 'D', ['L', 'S', 'J'],
    'Panse ak semèn nan.', 'Pensez à la semaine.', 'Lendi, madi, mèkredi, jedi, vandredi, samdi → dimanch.', 'Lundi… samedi → dimanche.');
  M('Ki lèt ki vini apre : J, F, M, A, M, J, … ?', 'Quelle lettre vient ensuite : J, F, M, A, M, J, … ?', 'J', ['A', 'S', 'O'],
    'Panse ak mwa yo.', 'Pensez aux mois.', 'Janvye… jen → jiyè.', 'Janvier… juin → juillet.');
  M('Ki ang de zegwi yon revèy fè a 3 è jis ?', 'Quel angle forment les aiguilles d\'une horloge à 3 h pile ?', '90°', ['45°', '120°', '180°'],
    'Yon tou konplè = 360°.', 'Un tour complet = 360°.', '3 è = yon ka tou : 360° ÷ 4 = 90°.', '3 h = un quart de tour : 360° ÷ 4 = 90°.');
  M('Nan 12 è, konbyen fwa de zegwi revèy la kouvri youn lòt ?', 'En 12 heures, combien de fois les deux aiguilles se superposent-elles ?', 11, [12, 24, 10],
    'Gade ant 11 è ak 1 è.', 'Regardez entre 11 h et 1 h.', 'Ant 11 è ak 1 è, yo kontre yon sèl fwa (a midi) : 11 fwa, pa 12.', 'Entre 11 h et 1 h, une seule rencontre (midi) : 11 fois, pas 12.');
  M('Si w ekri tout nonb soti 1 rive 100, konbyen fwa ou ekri chif 9 ?', 'En écrivant tous les nombres de 1 à 100, combien de fois écrit-on le chiffre 9 ?', 20, [10, 11, 19],
    'Pa bliye 90, 91… 99.', 'N\'oubliez pas 90, 91… 99.', '10 fwa kòm inite (9, 19…99) + 10 fwa kòm dizèn (90…99) = 20.', '10 fois aux unités (9, 19… 99) + 10 fois aux dizaines (90… 99) = 20.');
  M('Yon nenfa double gwosè l chak jou. Nan 30 jou li kouvri tout lak la. Nan konbyen jou li te kouvri mwatye lak la ?', 'Un nénuphar double de taille chaque jour. En 30 jours il couvre tout le lac. En combien de jours couvrait-il la moitié ?', 29, [15, 20, 28],
    'Gade jou anvan dènye a.', 'Regardez la veille du dernier jour.', 'Si li double chak jou, jou anvan an li te mwatye : 29.', 'S\'il double chaque jour, la veille il en couvrait la moitié : 29.');
  M('Ou antre nan yon chanm nwa ak yon sèl alimèt. Gen yon lanp gaz, yon bouji ak yon recho. Kisa w limen an premye ?', 'Vous entrez dans une pièce sombre avec une seule allumette. Il y a une lampe, une bougie et un réchaud. Qu\'allumez-vous d\'abord ?', ['Alimèt la', 'L\'allumette'], [['Lanp lan', 'La lampe'], ['Bouji a', 'La bougie'], ['Recho a', 'Le réchaud']],
    'Kijan w ap limen lòt yo ?', 'Comment allumer les autres ?', 'San limen alimèt la an premye, ou pa ka limen anyen.', 'Sans allumer d\'abord l\'allumette, rien ne s\'allume.');
  M('Konbyen bèt chak kalite Moyiz te mete nan lach la ?', 'Combien d\'animaux de chaque espèce Moïse a-t-il fait entrer dans l\'arche ?', ['Okenn', 'Aucun'], [['2', '2'], ['7', '7'], ['1', '1']],
    'Se kiyès ki te bati lach la ?', 'Qui a construit l\'arche ?', 'Se Noye ki te gen lach la, pa Moyiz.', 'C\'est Noé qui avait l\'arche, pas Moïse.');
  M('Ki mo ki toujou ekri « mal » nan tout diksyonè ?', 'Quel mot est toujours écrit « mal » dans tous les dictionnaires ?', ['Mo « mal » la', 'Le mot « mal »'], [['Mo « fot » la', 'Le mot « faute »'], ['Mo « erè » a', 'Le mot « erreur »'], ['Okenn', 'Aucun']],
    'Li kesyon an mo pa mo.', 'Lisez la question mot à mot.', 'Mo « mal » la ekri M-A-L : li toujou ekri « mal » !', 'Le mot « mal » s\'écrit toujours… « mal » !');
  M('Li pi fò pase Bondye, pi mechan pase dyab ; pòv yo genyen l, rich yo bezwen l ; si w manje l ou mouri. Kisa l ye ?', 'Plus puissant que Dieu, plus méchant que le diable ; les pauvres l\'ont, les riches en ont besoin ; si on le mange, on meurt. Qu\'est-ce ?', ['Anyen', 'Rien'], [['Lajan', 'L\'argent'], ['Lanmou', 'L\'amour'], ['Tan', 'Le temps']],
    'Eseye repons ki pi kout la.', 'Essayez la réponse la plus courte.', 'Anyen pa pi fò pase Bondye ; pòv yo pa gen anyen ; si w manje « anyen », ou mouri grangou.', 'Rien n\'est plus puissant que Dieu ; les pauvres n\'ont rien ; qui ne mange rien meurt.');
  M('Mwen gen vil men pa gen kay, mòn men pa gen pyebwa, dlo men pa gen pwason. Kisa m ye ?', 'J\'ai des villes sans maisons, des montagnes sans arbres, de l\'eau sans poissons. Que suis-je ?', ['Yon kat jewografik', 'Une carte géographique'], [['Yon rèv', 'Un rêve'], ['Yon foto', 'Une photo'], ['Yon dezè', 'Un désert']],
    'Ou wè l sou mi lekòl la.', 'On la voit au mur de l\'école.', 'Sou yon kat, gen vil, mòn ak dlo, men se desen.', 'Sur une carte, villes, montagnes et mers ne sont que dessinées.');
  M('Plis ou genyen l, mwens ou wè. Kisa l ye ?', 'Plus il y en a, moins on voit. Qu\'est-ce que c\'est ?', ['Fènwa', 'L\'obscurité'], [['Limyè', 'La lumière'], ['Lajan', 'L\'argent'], ['Dlo', 'L\'eau']],
    'Lè kouran an koupe…', 'Quand le courant est coupé…', 'Plis fènwa a gwo, mwens ou wè.', 'Plus il fait sombre, moins on voit.');
  M('Ki sa ki kraze kou w di non li ?', 'Qu\'est-ce qui se brise dès qu\'on prononce son nom ?', ['Silans', 'Le silence'], [['Yon vè', 'Un verre'], ['Yon sekrè', 'Un secret'], ['Yon rèv', 'Un rêve']],
    'Pa fè bri…', 'Pas un bruit…', 'Depi w di « silans », pa gen silans ankò.', 'Dire « silence » rompt le silence.');
  M('Ki sa ki pou ou, men lòt moun sèvi avè l plis pase ou ?', 'Qu\'est-ce qui vous appartient mais que les autres utilisent plus que vous ?', ['Non ou', 'Votre prénom'], [['Telefòn ou', 'Votre téléphone'], ['Lajan ou', 'Votre argent'], ['Kay ou', 'Votre maison']],
    'Lè yo rele w…', 'Quand on vous appelle…', 'Lòt moun di non ou pi souvan pase ou.', 'Les autres prononcent votre prénom plus souvent que vous.');
  M('Ki sa ki mache sou 4 pye lematen, 2 pye amidi, 3 pye aswè ?', 'Qu\'est-ce qui marche à 4 pattes le matin, 2 à midi et 3 le soir ?', ['Moun', 'L\'être humain'], [['Chat', 'Le chat'], ['Chwal', 'Le cheval'], ['Pye bwa', 'L\'arbre']],
    'Lematen = timoun, aswè = granmoun.', 'Matin = enfance, soir = vieillesse.', 'Bebe rale sou 4 pat, granmoun mache, epi lè l vye li pran yon baton.', 'Le bébé à 4 pattes, l\'adulte debout, le vieillard avec une canne.');
  M('Gen 3 mango sou tab la. Ou pran 2. Konbyen mango ou genyen ?', 'Il y a 3 mangues sur la table. Vous en prenez 2. Combien en avez-vous ?', 2, [1, 3, 0],
    'Konbyen ki nan men ou ?', 'Combien en avez-vous en main ?', 'Ou genyen 2 sa ou pran yo.', 'Vous avez les 2 que vous avez prises.');
  M('Yon avyon tonbe sou fwontyè 2 peyi. Ki kote yo antere sivivan yo ?', 'Un avion s\'écrase à la frontière entre deux pays. Où enterre-t-on les survivants ?', ['Yo pa antere sivivan', 'On n\'enterre pas les survivants'], [['Nan premye peyi a', 'Dans le premier pays'], ['Nan dezyèm peyi a', 'Dans le second pays'], ['Sou fwontyè a', 'Sur la frontière']],
    'Kisa « sivivan » vle di ?', 'Que veut dire « survivant » ?', 'Sivivan yo vivan : yo pa antere yo.', 'Les survivants sont vivants : on ne les enterre pas.');
  M('Yon taptap gen 20 pasaje. Premye kanpe : 5 desann, 3 monte. Dezyèm kanpe : 8 desann, 2 monte. Konbyen pasaje ki rete ?', 'Un taptap a 20 passagers. 1er arrêt : 5 descendent, 3 montent. 2e arrêt : 8 descendent, 2 montent. Combien de passagers ?', 12, [10, 14, 18],
    'Fè kalkil la etap pa etap.', 'Calculez étape par étape.', '20 − 5 + 3 = 18 ; 18 − 8 + 2 = 12.', '20 − 5 + 3 = 18 ; 18 − 8 + 2 = 12.');
  M('Ki nonb ki bay menm rezilta a, kèlkeswa nonb ou miltipliye l ladan l ?', 'Quel nombre donne toujours le même résultat, quel que soit le nombre par lequel on le multiplie ?', 0, [1, 10, 100],
    '5 × ? = 7 × ?', '5 × ? = 7 × ?', '0 × nenpòt nonb = 0.', '0 × n\'importe quel nombre = 0.');
  M('Double yon nonb, ajoute 6, ou jwenn 20. Ki nonb li ye ?', 'On double un nombre, on ajoute 6, on obtient 20. Quel est ce nombre ?', 7, [8, 13, 14],
    'Fè l pa dèyè : retire 6.', 'À l\'envers : enlevez 6.', '20 − 6 = 14 ; 14 ÷ 2 = 7.', '20 − 6 = 14 ; 14 ÷ 2 = 7.');
  M('Mwen pa gen ni frè ni sè. Men, papa mesye sa a se pitit gason papa m. Kiyès mesye a ye pou mwen ?', 'Je n\'ai ni frère ni sœur. Mais le père de cet homme est le fils de mon père. Qui est cet homme pour moi ?', ['Pitit gason m', 'Mon fils'], [['Papa m', 'Mon père'], ['Mwen menm', 'Moi-même'], ['Neve m', 'Mon neveu']],
    'Pitit gason papa m, san frè, se…', 'Le fils de mon père, sans frère, c\'est…', 'Pitit gason papa m = mwen. Papa mesye a se mwen : li se pitit gason m.', 'Le fils de mon père = moi. Je suis son père : c\'est mon fils.');
  M('Yon tifi di : « Pitit fi manman m nan, ki pa sè m nan, se kiyès ? »', 'Une fille demande : « La fille de ma mère qui n\'est pas ma sœur, qui est-ce ? »', ['Li menm', 'Elle-même'], [['Kouzin li', 'Sa cousine'], ['Matant li', 'Sa tante'], ['Nyès li', 'Sa nièce']],
    'Se yon tifi k ap pale.', 'C\'est une fille qui parle.', 'Pitit fi manman l ki pa sè l : se li menm.', 'La fille de sa mère qui n\'est pas sa sœur : c\'est elle.');
  M('Frè tonton m nan, ki pa tonton m, se kiyès ?', 'Le frère de mon oncle, qui n\'est pas mon oncle, qui est-ce ?', ['Papa m', 'Mon père'], [['Kouzen m', 'Mon cousin'], ['Granpapa m', 'Mon grand-père'], ['Frè m', 'Mon frère']],
    'Tonton m se frè papa m…', 'Mon oncle est le frère de mon père…', 'Tonton m se frè papa m : frè l ki pa tonton m se papa m.', 'Mon oncle est le frère de mon père : son frère qui n\'est pas mon oncle, c\'est mon père.');
  M('Ki kote 10 + 3 = 1 ?', 'Où 10 + 3 = 1 ?', ['Sou yon revèy', 'Sur une horloge'], [['Nan lajan', 'Avec la monnaie'], ['Nan kalandriye', 'Sur un calendrier'], ['Okenn kote', 'Nulle part']],
    'Panse ak lè.', 'Pensez aux heures.', '10 è + 3 è = 1 è.', '10 h + 3 h = 1 h.');
  M('Konbyen kare total ki genyen sou yon damye 8 × 8 (tout gwosè ansanm) ?', 'Combien de carrés en tout sur un damier 8 × 8 (toutes tailles) ?', 204, [64, 128, 72],
    'Konte kare 1×1, 2×2, 3×3…', 'Comptez les carrés 1×1, 2×2, 3×3…', '64 + 49 + 36 + 25 + 16 + 9 + 4 + 1 = 204.', '64 + 49 + 36 + 25 + 16 + 9 + 4 + 1 = 204.');
  M('Konbyen dwèt gen nan 10 men ?', 'Combien de doigts dans 10 mains ?', 50, [100, 20, 40],
    'Yon men gen konbyen dwèt ?', 'Une main a combien de doigts ?', '10 men × 5 dwèt = 50.', '10 mains × 5 doigts = 50.');
  M('Ki sa ki parèt yon fwa nan « minit », de fwa nan « moman », men pa janm nan « san ane » ?', 'Qu\'est-ce qui apparaît une fois dans « minute », deux fois dans « moment », jamais dans « cent ans » ?', ['Lèt M', 'La lettre M'], [['Lèt N', 'La lettre N'], ['Lèt O', 'La lettre O'], ['Lèt I', 'La lettre I']],
    'Gade lèt yo, pa tan an.', 'Regardez les lettres, pas le temps.', 'M parèt 1 fwa nan « minit », 2 fwa nan « moman », 0 nan « san ane ».', 'M : 1 fois dans « minute », 2 dans « moment », 0 dans « cent ans ».');
  M('3 entèriptè deyò, yon anpoul nan yon chanm fèmen. Konbyen fwa ou bezwen antre nan chanm nan pou konnen ki entèriptè ki limen l ?', '3 interrupteurs dehors, une ampoule dans une pièce fermée. Combien d\'entrées dans la pièce pour savoir lequel l\'allume ?', ['Yon sèl fwa', 'Une seule fois'], [['2 fwa', '2 fois'], ['3 fwa', '3 fois'], ['Li pa posib', 'Impossible']],
    'Yon anpoul ki limen vin cho.', 'Une ampoule allumée chauffe.', 'Limen 1 pandan 5 minit, etenn li, limen 2, antre : limen = 2 ; etenn men cho = 1 ; etenn e frèt = 3.', 'Allumez le 1 cinq minutes, éteignez-le, allumez le 2, entrez : allumée = 2 ; éteinte chaude = 1 ; éteinte froide = 3.');
  M('Yon kiltivatè dwe travèse yon rivyè ak yon chen, yon kabrit ak yon chou. Kannòt la pran li ak yon sèl bagay. Chen an manje kabrit la, kabrit la manje chou a si yo rete san li. Konbyen travèse minimòm ?', 'Un fermier doit traverser une rivière avec un chien, une chèvre et un chou. La barque n\'en prend qu\'un à la fois. Seuls, le chien mange la chèvre, la chèvre mange le chou. Combien de traversées au minimum ?', 7, [3, 5, 9],
    'Kabrit la ka fè ale-retou.', 'La chèvre peut faire l\'aller-retour.', 'Kabrit ale ; retounen ; chen ale, kabrit tounen ; chou ale ; retounen ; kabrit ale : 7.', 'Chèvre ; retour ; chien, retour avec la chèvre ; chou ; retour ; chèvre : 7.');
  M('2 kòd boule chak an 60 minit, men pa egal (yon bout ka boule pi vit). Kijan pou mezire 45 minit ?', 'Deux cordes brûlent chacune en 60 minutes, mais irrégulièrement. Comment mesurer 45 minutes ?', ['Limen kòd 1 de bout, kòd 2 yon bout ; lè 1 fini, limen lòt bout 2', 'Allumer la 1 aux deux bouts et la 2 à un bout ; quand la 1 finit, allumer l\'autre bout de la 2'],
    [['Koupe chak kòd an 4', 'Couper chaque corde en 4'], ['Limen tou de yon bout', 'Allumer les deux à un bout'], ['Li pa posib', 'Impossible']],
    'Limen de bout = mwatye tan.', 'Deux bouts allumés = moitié du temps.', 'Kòd 1 (2 bout) = 30 min ; rès kòd 2 (30 min) limen de bout = 15 min ; total 45.', 'Corde 1 (2 bouts) = 30 min ; reste de la 2 (30 min) aux 2 bouts = 15 min ; total 45.');
  M('9 boul ki sanble, youn pi lou. Ak yon balans 2 plato, konbyen peze minimòm pou jwenn li ?', '9 boules identiques, dont une plus lourde. Avec une balance à deux plateaux, combien de pesées au minimum ?', 2, [3, 4, 1],
    'Fè 3 gwoup 3.', 'Faites 3 groupes de 3.', '3 kont 3 : ou konnen ki gwoup ; apre, 1 kont 1 nan gwoup sa a.', '3 contre 3 : on trouve le groupe ; puis 1 contre 1 dans ce groupe.');
  M('Konbyen segonn nan yon èdtan ?', 'Combien de secondes dans une heure ?', 3600, [360, 600, 6000],
    '60 minit…', '60 minutes…', '60 × 60 = 3600.', '60 × 60 = 3600.');
  M('Konbyen fwa lèt « a » parèt nan « abracadabra » ?', 'Combien de fois la lettre « a » apparaît-elle dans « abracadabra » ?', 5, [4, 6, 3],
    'A-b-r-a-c-a-d-a-b-r-a', 'A-b-r-a-c-a-d-a-b-r-a', '5 fwa : a(b)r a c a d a (b)r a.', '5 fois.');
  M('Ki mo ou li menm jan devan kou dèyè ?', 'Quel mot se lit pareil dans les deux sens ?', ['kayak', 'kayak'], [['bato', 'bateau'], ['lekòl', 'école'], ['zanmi', 'ami']],
    'Li l pa dèyè.', 'Lisez-le à l\'envers.', 'K-A-Y-A-K pa dèyè ba K-A-Y-A-K.', 'K-A-Y-A-K à l\'envers donne K-A-Y-A-K.');
  M('2 papa ak 2 pitit al lapèch. Yo pran 3 pwason, chak moun gen youn. Kijan sa fè posib ?', 'Deux pères et deux fils pêchent 3 poissons, chacun en a un. Comment est-ce possible ?', ['Se 3 moun : granpapa, papa, pitit', 'Ils sont 3 : grand-père, père, fils'], [['Yon pwason te koupe an 2', 'Un poisson coupé en 2'], ['Youn pa t manje', 'L\'un n\'a pas mangé'], ['Li pa posib', 'Impossible']],
    'Yon moun ka papa ak pitit an menm tan.', 'On peut être père et fils à la fois.', 'Papa a se pitit granpapa a : 2 papa + 2 pitit = 3 moun.', 'Le père est aussi le fils du grand-père : 3 personnes.');
  M('Yon kamyon twò wo 2 cm pou l pase anba yon pon. Kisa w ka fè ?', 'Un camion est trop haut de 2 cm pour passer sous un pont. Que faire ?', ['Lage yon ti van nan kawotchou yo', 'Dégonfler un peu les pneus'], [['Kraze pon an', 'Casser le pont'], ['Kouri pi vit', 'Rouler plus vite'], ['Tann lapli', 'Attendre la pluie']],
    'Ki pati kamyon an ka bese ?', 'Quelle partie du camion peut baisser ?', 'Kawotchou ki gen mwens van fè kamyon an bese kèk santimèt.', 'Des pneus moins gonflés abaissent le camion de quelques centimètres.');
  M('Lè m jenn mwen wo ; lè m vye mwen kout. Kisa m ye ?', 'Jeune, je suis grande ; vieille, je suis petite. Que suis-je ?', ['Yon bouji', 'Une bougie'], [['Yon pyebwa', 'Un arbre'], ['Yon kreyon', 'Un crayon'], ['Yon moun', 'Une personne']],
    'Li limen.', 'On l\'allume.', 'Bouji a ap fonn pandan l ap boule.', 'La bougie raccourcit en brûlant.');
  M('Mwen gen zegwi, men m pa koud. Kisa m ye ?', 'J\'ai des aiguilles mais je ne couds pas. Que suis-je ?', ['Yon revèy', 'Une horloge'], [['Yon pye pen', 'Un pin'], ['Yon sereng', 'Une seringue'], ['Yon pòkepik', 'Un hérisson']],
    'Li ba w lè.', 'Elle donne l\'heure.', 'Zegwi revèy la montre lè a.', 'Les aiguilles de l\'horloge indiquent l\'heure.');
  M('Ki sa ou ka kenbe san w pa janm manyen l ?', 'Qu\'est-ce qu\'on peut tenir sans jamais le toucher ?', ['Yon pwomès', 'Une promesse'], [['Lavant', 'Le vent'], ['Yon lonbraj', 'Une ombre'], ['Dlo', 'L\'eau']],
    'Ou fè l ak bouch ou.', 'On la fait avec des mots.', 'Ou « kenbe » pwomès ou san manyen l.', 'On « tient » sa promesse sans la toucher.');
  M('Si w genyen l, ou vle pataje l ; si w pataje l, ou pa genyen l ankò. Kisa l ye ?', 'Si vous l\'avez, vous voulez le partager ; si vous le partagez, vous ne l\'avez plus. Qu\'est-ce ?', ['Yon sekrè', 'Un secret'], [['Yon manje', 'Un repas'], ['Lajan', 'L\'argent'], ['Yon liv', 'Un livre']],
    'Pa di pèsonn…', 'Ne le dites à personne…', 'Yon sekrè pataje pa sekrè ankò.', 'Un secret partagé n\'est plus un secret.');
  M('Devinèt Ayiti : « Dlo kanpe. » Kisa l ye ?', 'Devinette haïtienne : « De l\'eau debout. » Qu\'est-ce que c\'est ?', ['Kann', 'La canne à sucre'], [['Kokoye', 'La noix de coco'], ['Lapli', 'La pluie'], ['Sous', 'La source']],
    'Ou souse l, li dous.', 'On la suce, elle est sucrée.', 'Kann kanpe dwat, li plen dlo dous.', 'La canne pousse droite, pleine de jus sucré.');
  M('Devinèt Ayiti : « Dlo pandye. » Kisa l ye ?', 'Devinette haïtienne : « De l\'eau suspendue. » Qu\'est-ce que c\'est ?', ['Kokoye', 'La noix de coco'], [['Kann', 'La canne à sucre'], ['Nyaj', 'Le nuage'], ['Mango', 'La mangue']],
    'Li anlè yon pye bwa ki wo anpil.', 'Elle est en haut d\'un très grand arbre.', 'Kokoye pandye anlè pye a, li plen dlo.', 'La noix de coco pend en haut du cocotier, pleine d\'eau.');
  M('Devinèt Ayiti : « Kay mwen gen yon sèl poto. » Kisa l ye ?', 'Devinette haïtienne : « Ma maison n\'a qu\'un seul poteau. » Qu\'est-ce que c\'est ?', ['Parasòl', 'Le parapluie'], [['Tant', 'La tente'], ['Djondjon', 'Le champignon'], ['Ajoupa', 'L\'ajoupa']],
    'Ou louvri l lè lapli tonbe.', 'On l\'ouvre quand il pleut.', 'Parasòl la se yon ti « kay » sou yon sèl poto.', 'Le parapluie est une petite « maison » sur un seul manche.');
  M('Konbyen jou nan 3 semèn ak 4 jou ?', 'Combien de jours dans 3 semaines et 4 jours ?', 25, [21, 34, 28],
    '1 semèn = 7 jou.', '1 semaine = 7 jours.', '3 × 7 + 4 = 25.', '3 × 7 + 4 = 25.');
  M('Ki sa ki vini apre : 3, 6, 12, 24, … ?', 'Quel nombre vient ensuite : 3, 6, 12, 24, … ?', 48, [30, 36, 42],
    'Konpare chak nonb ak sa ki anvan l.', 'Comparez chaque nombre au précédent.', 'Chak fwa × 2 : 24 × 2 = 48.', '× 2 à chaque fois : 24 × 2 = 48.');
  M('Ki sa ki vini apre : 2, 6, 12, 20, 30, … ?', 'Quel nombre vient ensuite : 2, 6, 12, 20, 30, … ?', 42, [40, 36, 44],
    'Gade diferans yo : 4, 6, 8…', 'Regardez les écarts : 4, 6, 8…', 'Diferans yo ogmante 2 pa 2 : 30 + 12 = 42.', 'Les écarts augmentent de 2 : 30 + 12 = 42.');
  M('Ki sa ki vini apre : 100, 50, 25, … ?', 'Quel nombre vient ensuite : 100, 50, 25, … ?', '12,5', ['12', '20', '15'],
    'Chak fwa, mwatye.', 'Chaque fois, la moitié.', '25 ÷ 2 = 12,5.', '25 ÷ 2 = 12,5.');
  M('Ou gen yon sak diri 10 kg. Ou itilize mwatye, apre sa mwatye sa ki rete a. Konbyen kg ki rete ?', 'Un sac de riz de 10 kg. On utilise la moitié, puis la moitié du reste. Combien de kg restent ?', '2,5 kg', ['5 kg', '0 kg', '3 kg'],
    'Fè l an 2 etap.', 'Faites-le en 2 étapes.', '10 → 5 → 2,5 kg.', '10 → 5 → 2,5 kg.');
  M('Tèt yon pwason mezire 9 cm. Ke a = tèt + mwatye kò a. Kò a = tèt + ke. Ki longè pwason an ?', 'La tête d\'un poisson mesure 9 cm. La queue = la tête + la moitié du corps. Le corps = la tête + la queue. Longueur du poisson ?', '72 cm', ['36 cm', '45 cm', '54 cm'],
    'Ranplase ke a nan fòmil kò a.', 'Remplacez la queue dans la formule du corps.', 'Kò = 9 + 9 + kò/2 → kò = 36 ; ke = 27 ; 9 + 36 + 27 = 72 cm.', 'Corps = 9 + 9 + corps/2 → corps = 36 ; queue = 27 ; total 72 cm.');
  M('Ou mache 5 km nan nò, 5 km nan lès, 5 km nan sid. Ki kote ou ye parapò ak kote ou te pati a ?', 'Vous marchez 5 km au nord, 5 km à l\'est, 5 km au sud. Où êtes-vous par rapport au départ ?', ['5 km nan lès', '5 km à l\'est'], [['Menm kote a', 'Au point de départ'], ['5 km nan nò', '5 km au nord'], ['15 km nan lwès', '15 km à l\'ouest']],
    'Nò ak sid anile youn lòt.', 'Le nord et le sud s\'annulent.', '5 nò − 5 sid = 0 ; rete 5 km lès.', '5 nord − 5 sud = 0 ; il reste 5 km à l\'est.');
  M('1 grenn diri sou premye kaz la, 2 sou dezyèm lan, 4 sou twazyèm lan… Konbyen sou 10yèm kaz la ?', '1 grain de riz sur la 1re case, 2 sur la 2e, 4 sur la 3e… Combien sur la 10e case ?', 512, [1024, 20, 256],
    'Chak kaz double.', 'Chaque case double.', '2 × 2 … 9 fwa : 2⁹ = 512.', '2 multiplié 9 fois par lui-même : 2⁹ = 512.');
  M('Kiyès ki pi gwo : 2⁵ oswa 5² ?', 'Lequel est le plus grand : 2⁵ ou 5² ?', '2⁵', ['5²', ['Yo egal', 'Égaux'], ['Pa ka konnen', 'On ne peut pas savoir']],
    'Kalkile chak.', 'Calculez chacun.', '2⁵ = 32, 5² = 25.', '2⁵ = 32, 5² = 25.');
  M('Konbyen 1 + 2 + 3 + … + 10 fè ?', 'Combien font 1 + 2 + 3 + … + 10 ?', 55, [50, 45, 100],
    'Mete 1 ak 10, 2 ak 9…', 'Associez 1 et 10, 2 et 9…', '5 pè ki fè 11 : 5 × 11 = 55.', '5 paires de 11 : 5 × 11 = 55.');
  M('Yon nonb 2 chif : sòm chif yo se 9 ; si w ranvèse l, ou jwenn nonb lan + 27. Kiyès ?', 'Un nombre à 2 chiffres : la somme des chiffres vaut 9 ; inversé, il vaut le nombre + 27. Lequel ?', 36, [45, 63, 27],
    'Eseye nonb ki fè 9 : 18, 27, 36…', 'Essayez ceux dont la somme fait 9 : 18, 27, 36…', '36 → 63 ; 63 − 36 = 27 ; 3 + 6 = 9.', '36 → 63 ; 63 − 36 = 27 ; 3 + 6 = 9.');
  M('Nan yon fanmi, chak gason gen otan frè ke sè, men chak fi gen de fwa plis frè pase sè. Konbyen pitit ?', 'Dans une famille, chaque garçon a autant de frères que de sœurs, mais chaque fille a deux fois plus de frères que de sœurs. Combien d\'enfants ?', 7, [5, 6, 9],
    'Eseye 4 gason ak 3 fi.', 'Essayez 4 garçons et 3 filles.', '4 gason, 3 fi : yon gason gen 3 frè, 3 sè ; yon fi gen 4 frè, 2 sè.', '4 garçons et 3 filles : un garçon a 3 frères et 3 sœurs ; une fille 4 frères et 2 sœurs.');
  M('Si 2 moun manje 2 mango nan 2 minit, konbyen tan 1 moun pran pou manje 1 mango ?', 'Si 2 personnes mangent 2 mangues en 2 minutes, combien de temps met 1 personne pour 1 mangue ?', ['2 minit', '2 minutes'], [['1 minit', '1 minute'], ['4 minit', '4 minutes'], ['30 segonn', '30 secondes']],
    'Chak moun manje yon mango.', 'Chacun mange une mangue.', 'Chak moun pran 2 minit pou mango pa l.', 'Chacun met 2 minutes pour sa mangue.');
  M('Ki sa ki pi long : yon minit oswa 60 segonn ?', 'Qu\'est-ce qui est le plus long : une minute ou 60 secondes ?', ['Yo menm longè', 'C\'est pareil'], [['Minit la', 'La minute'], ['60 segonn yo', 'Les 60 secondes'], ['Sa depann', 'Ça dépend']],
    '1 minit = ? segonn', '1 minute = ? secondes', '1 minit = 60 segonn.', '1 minute = 60 secondes.');
  M('Ou nan yon kous, ou depase dènye moun nan. Nan ki plas ou ye ?', 'Dans une course, vous doublez le dernier. À quelle place êtes-vous ?', ['Sa pa posib', 'C\'est impossible'], [['Dènye', 'Dernier'], ['Avan dènye', 'Avant-dernier'], ['Premye', 'Premier']],
    'Ki moun ki dèyè dènye a ?', 'Qui est derrière le dernier ?', 'Pou w depase dènye a, fò w ta dèyè l : sa vle di se ou ki ta dènye.', 'Pour doubler le dernier, il faudrait être derrière lui : impossible.');
  M('Ki nonb ki vini apre : 1, 2, 4, 7, 11, 16, … ?', 'Quel nombre vient ensuite : 1, 2, 4, 7, 11, 16, … ?', 22, [21, 20, 24],
    'Diferans yo : 1, 2, 3, 4, 5…', 'Écarts : 1, 2, 3, 4, 5…', '16 + 6 = 22.', '16 + 6 = 22.');
  M('Ki nonb ki vini apre : 1, 8, 27, 64, … ?', 'Quel nombre vient ensuite : 1, 8, 27, 64, … ?', 125, [100, 81, 128],
    '1×1×1, 2×2×2…', '1×1×1, 2×2×2…', '5 × 5 × 5 = 125.', '5 × 5 × 5 = 125.');
  M('Ki nonb ki vini apre : 0, 3, 8, 15, 24, … ?', 'Quel nombre vient ensuite : 0, 3, 8, 15, 24, … ?', 35, [33, 30, 36],
    'Konpare ak 1, 4, 9, 16, 25…', 'Comparez à 1, 4, 9, 16, 25…', 'Kare − 1 : 36 − 1 = 35.', 'Carrés moins 1 : 36 − 1 = 35.');
  M('Ki nonb ki vini apre : 81, 27, 9, 3, … ?', 'Quel nombre vient ensuite : 81, 27, 9, 3, … ?', 1, [0, 2, 6],
    'Divize.', 'Divisez.', 'Chak fwa ÷ 3 : 3 ÷ 3 = 1.', '÷ 3 à chaque fois : 3 ÷ 3 = 1.');
  M('Ki lèt ki vini apre : A, C, F, J, … ?', 'Quelle lettre vient ensuite : A, C, F, J, … ?', 'O', ['N', 'M', 'P'],
    'Sote 1 lèt, apre 2, apre 3…', 'Sautez 1 lettre, puis 2, puis 3…', 'A (+2) C (+3) F (+4) J (+5) O.', 'A (+2) C (+3) F (+4) J (+5) O.');
  M('Ki lèt ki vini apre : Z, X, V, T, … ?', 'Quelle lettre vient ensuite : Z, X, V, T, … ?', 'R', ['S', 'Q', 'U'],
    'Alfabè a pa dèyè.', 'L\'alphabet à l\'envers.', 'Chak fwa recule 2 lèt : T → R.', 'On recule de 2 lettres : T → R.');
  M('Si yon zè bouyi 6 minit, konbyen tan pou bouyi 3 zè ansanm nan menm chodyè a ?', 'Si un œuf cuit en 6 minutes, combien de temps pour 3 œufs ensemble dans la même casserole ?', ['6 minit', '6 minutes'], [['18 minit', '18 minutes'], ['12 minit', '12 minutes'], ['2 minit', '2 minutes']],
    'Yo kwit an menm tan.', 'Ils cuisent en même temps.', 'Ansanm nan menm dlo a : toujou 6 minit.', 'Ensemble dans la même eau : toujours 6 minutes.');
  M('Si li pran 5 minit pou seche yon chemiz nan solèy, konbyen tan pou 5 chemiz ki pandye ansanm ?', 'S\'il faut 5 minutes pour sécher une chemise au soleil, combien pour 5 chemises étendues ensemble ?', ['5 minit', '5 minutes'], [['25 minit', '25 minutes'], ['1 minit', '1 minute'], ['10 minit', '10 minutes']],
    'Solèy la seche yo an menm tan.', 'Le soleil les sèche en même temps.', 'Tout seche ansanm : 5 minit.', 'Elles sèchent ensemble : 5 minutes.');
  M('Yon moun fèt 1ye janvye, li gen 10 an. Konbyen fèt li fete ?', 'Une personne née un 1er janvier a 10 ans. Combien d\'anniversaires a-t-elle fêtés ?', 10, [11, 9, 12],
    'Jou nesans lan se pa yon fèt.', 'Le jour de la naissance n\'est pas un anniversaire.', '1 fèt chak ane : 10 an = 10 fèt.', 'Un anniversaire par an : 10 ans = 10 anniversaires.');
  M('Ki mwa ki genyen 29 jou chak 4 an ?', 'Quel mois a 29 jours tous les 4 ans ?', ['Fevriye', 'Février'], [['Janvye', 'Janvier'], ['Desanm', 'Décembre'], ['Out', 'Août']],
    'Ane bisekstil…', 'Année bissextile…', 'Nan ane bisekstil, fevriye gen 29 jou.', 'Les années bissextiles, février a 29 jours.');
  M('Konbyen minit gen nan yon jounen ?', 'Combien de minutes dans une journée ?', 1440, [1200, 3600, 1000],
    '24 èdtan…', '24 heures…', '24 × 60 = 1440.', '24 × 60 = 1440.');
  M('Si w vire de fwa adwat, apre sa de fwa agoch, ki bò ou gade ?', 'Si vous tournez deux fois à droite, puis deux fois à gauche, de quel côté regardez-vous ?', ['Menm bò ou te kòmanse a', 'Du même côté qu\'au départ'], [['Dèyè', 'Derrière'], ['Adwat', 'À droite'], ['Agoch', 'À gauche']],
    'Chak vire = 90°.', 'Chaque virage = 90°.', '+180° − 180° = 0 : menm direksyon.', '+180° − 180° = 0 : même direction.');
  M('Yon sak gen 3 boul wouj ak 3 boul ble. San w pa gade, konbyen pou w pran pou w sèten gen 1 wouj ?', 'Un sac contient 3 boules rouges et 3 bleues. Sans regarder, combien en prendre pour être sûr d\'avoir 1 rouge ?', 4, [2, 3, 6],
    'Panse ak pi move chans lan.', 'Pensez à la pire malchance.', 'Si w pran 3 ble an premye, katriyèm lan se wouj.', 'Si les 3 premières sont bleues, la 4e est rouge.');
  M('Ki nonb ki mwatye nan mwatye 100 ?', 'Quel nombre est la moitié de la moitié de 100 ?', 25, [50, 20, 10],
    'Mwatye 100 an premye.', 'D\'abord la moitié de 100.', '100 → 50 → 25.', '100 → 50 → 25.');
  M('Yon timoun gen 6 an. Sè l gen mwatye laj li. Lè l ap gen 40 an, ki laj sè l ap genyen ?', 'Un enfant a 6 ans ; sa sœur a la moitié de son âge. Quand il aura 40 ans, quel âge aura-t-elle ?', 37, [20, 34, 43],
    'Diferans laj la pa chanje.', 'L\'écart d\'âge ne change pas.', 'Sè a gen 3 an : 3 an diferans → 40 − 3 = 37.', 'Elle a 3 ans : 3 ans d\'écart → 40 − 3 = 37.');
  M('Ki sa ki vini apre : 1, 3, 6, 10, 15, … ?', 'Quel nombre vient ensuite : 1, 3, 6, 10, 15, … ?', 21, [20, 25, 18],
    'Ajoute 2, 3, 4, 5…', 'Ajoutez 2, 3, 4, 5…', '15 + 6 = 21.', '15 + 6 = 21.');
  M('Yon tren gen 10 wagon, chak wagon 10 m, epi yon tèt 10 m. Ki longè tren an ?', 'Un train a 10 wagons de 10 m chacun et une locomotive de 10 m. Quelle longueur ?', '110 m', ['100 m', '120 m', '20 m'],
    'Pa bliye tèt la.', 'N\'oubliez pas la locomotive.', '10 × 10 + 10 = 110 m.', '10 × 10 + 10 = 110 m.');
  M('Ki sa ki gen 2 men ak yon figi, men ki pa gen bra ?', 'Qu\'est-ce qui a deux aiguilles et un cadran mais pas de bras ?', ['Yon revèy', 'Une montre'], [['Yon poupe', 'Une poupée'], ['Yon pòtre', 'Un portrait'], ['Yon wòb', 'Une robe']],
    'Li ba w lè.', 'Elle donne l\'heure.', 'Revèy la gen « men » (zegwi) ak « figi » (kadran).', 'La montre a des aiguilles et un cadran.');
  M('Mwen la lannwit san yo pa rele m, mwen pèdi lajounen san yo pa vòlè m. Kisa m ye ?', 'Je viens la nuit sans qu\'on m\'appelle, je disparais le jour sans qu\'on me vole. Que suis-je ?', ['Zetwal yo', 'Les étoiles'], [['Lalin', 'La lune'], ['Rèv', 'Le rêve'], ['Lonbraj', 'L\'ombre']],
    'Gade syèl la lannwit.', 'Regardez le ciel la nuit.', 'Zetwal yo parèt lannwit, yo kache lajounen.', 'Les étoiles brillent la nuit et disparaissent le jour.');
  M('Ki sa ki genyen 6 fas, 21 pwen, men pa gen ni bouch ni je ?', 'Qu\'est-ce qui a 6 faces, 21 points, mais ni bouche ni yeux ?', ['Yon zo (de)', 'Un dé'], [['Yon kib glas', 'Un glaçon'], ['Yon bwat', 'Une boîte'], ['Yon dòmino', 'Un domino']],
    'Ou voye l sou tab la.', 'On le lance sur la table.', 'Yon de : 1 + 2 + 3 + 4 + 5 + 6 = 21 pwen.', 'Un dé : 1 + 2 + 3 + 4 + 5 + 6 = 21 points.');
  M('Konbyen pwen total ki genyen sou yon jwèt domino 28 pyès (0 a 6) ?', 'Combien de points en tout dans un jeu de dominos de 28 pièces (0 à 6) ?', 168, [147, 196, 112],
    'Chak chif parèt 8 fwa.', 'Chaque chiffre apparaît 8 fois.', '(0+1+…+6) × 8 = 21 × 8 = 168.', '(0+1+…+6) × 8 = 21 × 8 = 168.');

  // =====================================================================
  // 2. FAMILLES CALCULÉES (chaque instance est calculée et vérifiée)
  // =====================================================================
  var NB = {
    ht: ['zewo', 'en', 'de', 'twa', 'kat', 'senk', 'sis', 'sèt', 'uit', 'nèf', 'dis', 'onz', 'douz', 'trèz', 'katòz', 'kenz', 'sèz', 'disèt', 'dizuit', 'diznèf', 'ven'],
    fr: ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt']
  };
  var JOU = { ht: ['lendi', 'madi', 'mèkredi', 'jedi', 'vandredi', 'samdi', 'dimanch'], fr: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] };
  var MWA = { ht: ['janvye', 'fevriye', 'mas', 'avril', 'me', 'jen', 'jiyè', 'out', 'septanm', 'oktòb', 'novanm', 'desanm'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'] };
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* 4 choix distincts : la bonne réponse + des pièges (complétés par des voisins si besoin). */
  function choix(rep, pieges, r) {
    var out = [rep];
    pieges.forEach(function (x) { if (x != null && out.indexOf(x) < 0 && out.length < 4 && !(typeof x === 'number' && (x < 0 || isNaN(x)))) out.push(x); });
    var d = 1; while (out.length < 4) { [rep + d, rep - d].forEach(function (x) { if (out.length < 4 && x >= 0 && out.indexOf(x) < 0) out.push(x); }); d++; }
    return out;
  }
  var seen = {};
  function F(id, h, f) { var k = f.q; if (seen[k]) return false; seen[k] = 1; D2(id, h, f); return true; }

  // 2.1 Mots-nombres : résultat = règle(lettres, valeur), calculé dans chaque langue
  var REG = [
    { c: function (L, V) { return L + V; }, h: 'kantite lèt + valè nonb lan', f: 'nombre de lettres + valeur du nombre' },
    { c: function (L, V) { return L * V; }, h: 'kantite lèt × valè nonb lan', f: 'nombre de lettres × valeur du nombre' },
    { c: function (L, V) { return V - L; }, h: 'valè nonb lan − kantite lèt', f: 'valeur du nombre − nombre de lettres' }
  ];
  (function () {
    var r = rng(101), n = 0, t = 0;
    while (n < 30 && t < 999) {
      t++;
      var g = REG[n % 3], vals = shuffle(r, g === REG[2] ? [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).slice(0, 6);
      var o = {};
      ['ht', 'fr'].forEach(function (lg) {
        var w = vals.map(function (v) { return NB[lg][v]; }), res = vals.map(function (v, i) { return g.c(nbL(w[i]), v); });
        var ex = w.slice(0, 5).map(function (x, i) { return x + ' = ' + res[i]; }).join('\n'), cible = w[5], rep = res[5], L = nbL(cible), V = vals[5];
        var autres = REG.filter(function (x) { return x !== g; }).map(function (x) { return x.c(L, V); });
        var ch = choix(rep, autres.concat([V, L, rep + 1]), r);
        o[lg] = { q: (lg === 'ht' ? 'Ki sa pou w mete nan plas « ? » la ?\n' : 'Que faut-il mettre à la place du « ? » ?\n') + ex + '\n' + cible + ' = ?',
          ind: lg === 'ht' ? 'Konte lèt mo a, epi gade valè nonb lan.' : 'Comptez les lettres du mot, puis regardez sa valeur.',
          ex: (lg === 'ht' ? 'Règ la : ' + g.h + '. « ' + cible + ' » gen ' + L + ' lèt, valè ' + V + ' → ' : 'Règle : ' + g.f + '. « ' + cible + ' » a ' + L + ' lettres, valeur ' + V + ' → ') + rep + '.',
          rep: String(rep), faux: ch.slice(1).map(String) };
      });
      if (F('mn' + n, o.ht, o.fr)) n++;
    }
  })();

  // 2.2 Jours et mois : nombre de lettres
  function famLettres(pref, LIST, nb, seed, motH, motF) {
    var r = rng(seed), n = 0, t = 0;
    while (n < nb && t < 999) {
      t++;
      var idx = shuffle(r, LIST.ht.map(function (_, i) { return i; })).slice(0, 5), o = {};
      ['ht', 'fr'].forEach(function (lg) {
        var w = idx.map(function (i) { return LIST[lg][i]; }), rep = nbL(w[4]);
        var ch = choix(rep, [rep + 1, rep - 1, rep + 2, LIST[lg].indexOf(w[4]) + 1], r);
        o[lg] = { q: (lg === 'ht' ? 'Ki sa pou w mete nan plas « ? » la ?\n' : 'Que faut-il mettre à la place du « ? » ?\n') + w.slice(0, 4).map(function (x) { return x + ' = ' + nbL(x); }).join('\n') + '\n' + w[4] + ' = ?',
          ind: lg === 'ht' ? 'Gade mo a, pa jou a nan semèn nan.' : 'Regardez le mot lui-même.',
          ex: (lg === 'ht' ? 'Se kantite lèt nan mo a : « ' + w[4] + ' » gen ' + rep + ' lèt.' : 'C\'est le nombre de lettres du mot : « ' + w[4] + ' » en a ' + rep + '.'),
          rep: String(rep), faux: ch.slice(1).map(String) };
      });
      if (F(pref + n, o.ht, o.fr)) n++;
    }
  }
  famLettres('jl', JOU, 8, 202);
  famLettres('ml', MWA, 8, 203);

  // 2.3 Calendrier : jour dans N jours
  (function () {
    var r = rng(303), n = 0, t = 0;
    while (n < 15 && t < 999) {
      t++;
      var d = ent(r, 0, 6), N = ent(r, 9, 120), a = (d + N) % 7, q7 = Math.floor(N / 7), rs = N % 7;
      var faux = shuffle(r, [0, 1, 2, 3, 4, 5, 6].filter(function (x) { return x !== a; })).slice(0, 3);
      var mk = function (lg) { var J = JOU[lg]; return {
        q: lg === 'ht' ? 'Jodi a se ' + J[d] + '. Ki jou l ap ye nan ' + N + ' jou ?' : 'Aujourd\'hui, c\'est ' + J[d] + '. Quel jour serons-nous dans ' + N + ' jours ?',
        ind: lg === 'ht' ? 'Chak 7 jou, se menm jou a ki retounen.' : 'Tous les 7 jours, on retombe sur le même jour.',
        ex: lg === 'ht' ? N + ' = 7 × ' + q7 + ' + ' + rs + ' : avanse ' + rs + ' jou apre ' + J[d] + ' → ' + J[a] + '.' : N + ' = 7 × ' + q7 + ' + ' + rs + ' : on avance de ' + rs + ' jour(s) après ' + J[d] + ' → ' + J[a] + '.',
        rep: cap(J[a]), faux: faux.map(function (x) { return cap(J[x]); }) }; };
      if (F('ka' + n, mk('ht'), mk('fr'))) n++;
    }
  })();

  // 2.4 Âges : dans combien d'années le parent aura k fois l'âge de l'enfant
  (function () {
    var r = rng(404), n = 0, t = 0;
    while (n < 15 && t < 4999) {
      t++;
      var C = ent(r, 2, 14), k = pick(r, [2, 3, 4]), x = ent(r, 1, 16), P = k * C + (k - 1) * x;
      if (P < 24 || P > 62 || P - C < 18) continue;
      if (P + x !== k * (C + x)) continue;
      var ch = choix(x, [P - k * C, x + 2, Math.round(P / k) - C, 2 * x], r);
      var pa = pick(r, [['Papa', 'Un père', 'pitit li', 'son enfant'], ['Manman', 'Une mère', 'pitit fi li', 'sa fille'], ['Tonton', 'Un oncle', 'neve li', 'son neveu']]);
      var h = { q: pa[0] + ' gen ' + P + ' an, ' + pa[2] + ' gen ' + C + ' an. Nan konbyen ane ' + pa[0].toLowerCase() + ' a ap gen ' + k + ' fwa laj ' + pa[2] + ' ?',
        ind: 'Toulède ap pran menm kantite ane yo.', ex: 'Nan ' + x + ' an : ' + (P + x) + ' = ' + k + ' × ' + (C + x) + '.', rep: String(x), faux: ch.slice(1).map(String) };
      var f = { q: pa[1] + ' a ' + P + ' ans, ' + pa[3] + ' ' + C + ' ans. Dans combien d\'années aura-t-' + (pa[1] === 'Une mère' ? 'elle' : 'il') + ' ' + k + ' fois l\'âge de ' + pa[3] + ' ?',
        ind: 'Les deux vieillissent du même nombre d\'années.', ex: 'Dans ' + x + ' ans : ' + (P + x) + ' = ' + k + ' × ' + (C + x) + '.', rep: String(x), faux: ch.slice(1).map(String) };
      if (F('aj' + n, h, f)) n++;
    }
  })();

  // 2.5 Prix (piège classique) : deux objets coûtent T ensemble, l'un coûte D de plus
  (function () {
    var r = rng(505), n = 0, t = 0, OBJ = [['yon kreyon', 'yon kaye', 'un crayon', 'un cahier', 'kreyon an', 'le crayon'], ['yon ze', 'yon pen', 'un œuf', 'un pain', 'ze a', 'l\'œuf'],
      ['yon sachè dlo', 'yon boutèy ji', 'un sachet d\'eau', 'une bouteille de jus', 'sachè dlo a', 'le sachet d\'eau'], ['yon gòm', 'yon règ', 'une gomme', 'une règle', 'gòm nan', 'la gomme']];
    while (n < 15 && t < 999) {
      t++;
      var s = 5 * ent(r, 1, 10), Dd = 5 * ent(r, 2, 20), T = 2 * s + Dd, o = pick(r, OBJ);
      var ch = choix(s, [T - Dd, T / 2, s + 5, Dd], r).map(String);
      var h = { q: cap(o[0]) + ' ak ' + o[1] + ' koute ' + T + ' goud ansanm. ' + cap(o[1].replace('yon ', '')) + ' a koute ' + Dd + ' goud plis pase ' + o[4] + '. Konbyen ' + o[4] + ' koute ?',
        ind: 'Si ' + o[4] + ' te koute ' + (T - Dd) + ' goud, lòt la t ap koute konbyen ?', ex: o[4] + ' = (' + T + ' − ' + Dd + ') ÷ 2 = ' + s + ' goud ; lòt la = ' + (s + Dd) + ' ; total ' + T + '.', rep: String(s) + ' G', faux: ch.slice(1).map(function (x) { return x + ' G'; }) };
      var f = { q: cap(o[2]) + ' et ' + o[3] + ' coûtent ' + T + ' gourdes ensemble. ' + cap(o[3].replace(/^une? /, '')) + ' coûte ' + Dd + ' gourdes de plus que ' + o[5] + '. Combien coûte ' + o[5] + ' ?',
        ind: 'Si ' + o[5] + ' coûtait ' + (T - Dd) + ' gourdes, combien coûterait l\'autre ?', ex: cap(o[5]) + ' = (' + T + ' − ' + Dd + ') ÷ 2 = ' + s + ' gourdes ; l\'autre = ' + (s + Dd) + ' ; total ' + T + '.', rep: String(s) + ' G', faux: ch.slice(1).map(function (x) { return x + ' G'; }) };
      if (F('pr' + n, h, f)) n++;
    }
  })();

  // 2.6 Escargot dans un puits (vérifié par simulation)
  (function () {
    var r = rng(606), n = 0, t = 0;
    while (n < 12 && t < 999) {
      t++;
      var H = ent(r, 6, 20), a = ent(r, 2, 5), b = ent(r, 1, a - 1); if (H <= a) continue;
      var h0 = 0, j = 0; while (true) { j++; h0 += a; if (h0 >= H) break; h0 -= b; }
      var naif = Math.ceil(H / (a - b)); if (naif === j) continue;
      var ch = choix(j, [naif, j + 1, j - 1], r).map(String);
      var h = { q: 'Yon kalmason nan fon yon pi ' + H + ' m fon. Chak jou li monte ' + a + ' m, chak nwit li glise desann ' + b + ' m. Nan konbyen jou li soti ?',
        ind: 'Dènye jou a, li soti anvan l glise.', ex: 'Li monte ' + (a - b) + ' m pa jou ; jou ' + j + ' li rive anlè (' + H + ' m) anvan nwit la.', rep: String(j), faux: ch.slice(1) };
      var f = { q: 'Un escargot est au fond d\'un puits de ' + H + ' m. Chaque jour il monte de ' + a + ' m, chaque nuit il glisse de ' + b + ' m. En combien de jours sort-il ?',
        ind: 'Le dernier jour, il sort avant de glisser.', ex: 'Il gagne ' + (a - b) + ' m par jour ; le jour ' + j + ' il atteint le haut (' + H + ' m) avant la nuit.', rep: String(j), faux: ch.slice(1) };
      if (F('kl' + n, h, f)) n++;
    }
  })();

  // 2.7 Découpes, cloches, poteaux : l'intervalle (n − 1)
  (function () {
    var r = rng(707), n = 0, t = 0;
    while (n < 10 && t < 999) {
      t++;
      var m = ent(r, 3, 12), tm = ent(r, 2, 9), rep = (m - 1) * tm, ch = choix(rep, [m * tm, (m + 1) * tm, (m - 2) * tm], r).map(String);
      var h = { q: 'Pou koupe yon planch, chak koupe pran ' + tm + ' minit. Konbyen minit pou w fè ' + m + ' moso ?', ind: 'Konbyen koupe pou 2 moso ?',
        ex: m + ' moso = ' + (m - 1) + ' koupe → ' + (m - 1) + ' × ' + tm + ' = ' + rep + ' minit.', rep: rep + ' min', faux: ch.slice(1).map(function (x) { return x + ' min'; }) };
      var f = { q: 'Pour couper une planche, chaque coupe prend ' + tm + ' minutes. Combien de minutes pour obtenir ' + m + ' morceaux ?', ind: 'Combien de coupes pour 2 morceaux ?',
        ex: m + ' morceaux = ' + (m - 1) + ' coupes → ' + (m - 1) + ' × ' + tm + ' = ' + rep + ' minutes.', rep: rep + ' min', faux: ch.slice(1).map(function (x) { return x + ' min'; }) };
      if (F('kp' + n, h, f)) n++;
    }
    n = 0; t = 0;
    while (n < 8 && t < 999) {
      t++;
      var k = ent(r, 4, 12), s = ent(r, 2, 6), rp = (k - 1) * s, c2 = choix(rp, [k * s, (k + 1) * s, (k - 2) * s], r).map(String);
      var h2 = { q: 'Klòch legliz la sonnen ' + k + ' kou, youn chak ' + s + ' segonn. Konbyen segonn ant premye ak dènye kou a ?', ind: 'Konte espas ant kou yo, pa kou yo.',
        ex: k + ' kou = ' + (k - 1) + ' espas → ' + (k - 1) + ' × ' + s + ' = ' + rp + ' s.', rep: rp + ' s', faux: c2.slice(1).map(function (x) { return x + ' s'; }) };
      var f2 = { q: 'La cloche sonne ' + k + ' coups, un toutes les ' + s + ' secondes. Combien de secondes entre le premier et le dernier coup ?', ind: 'Comptez les intervalles, pas les coups.',
        ex: k + ' coups = ' + (k - 1) + ' intervalles → ' + (k - 1) + ' × ' + s + ' = ' + rp + ' s.', rep: rp + ' s', faux: c2.slice(1).map(function (x) { return x + ' s'; }) };
      if (F('kc' + n, h2, f2)) n++;
    }
    n = 0; t = 0;
    while (n < 12 && t < 999) {
      t++;
      var dd = pick(r, [2, 3, 4, 5, 10]), boucle = n % 3 === 2, L, rq, c3, h3, f3;
      if (!boucle) {
        L = dd * ent(r, 3, 15); rq = L / dd + 1; c3 = choix(rq, [L / dd, rq + 1, L / dd - 1], r).map(String);
        h3 = { q: 'Ou ap fè yon kloti dwat ' + L + ' m long, ak yon poto chak ' + dd + ' m, ak yon poto nan chak bout. Konbyen poto ?', ind: 'Desen yon ti kloti 2 espas : konbyen poto ?',
          ex: L + ' ÷ ' + dd + ' = ' + (L / dd) + ' espas → ' + rq + ' poto.', rep: String(rq), faux: c3.slice(1) };
        f3 = { q: 'Une clôture droite de ' + L + ' m, un poteau tous les ' + dd + ' m, et un poteau à chaque bout. Combien de poteaux ?', ind: 'Dessinez 2 intervalles : combien de poteaux ?',
          ex: L + ' ÷ ' + dd + ' = ' + (L / dd) + ' intervalles → ' + rq + ' poteaux.', rep: String(rq), faux: c3.slice(1) };
      } else {
        var cote = dd * ent(r, 2, 8); L = 4 * cote; rq = L / dd; c3 = choix(rq, [rq + 1, rq + 4, rq - 1], r).map(String);
        h3 = { q: 'Ou ap fè kloti alantou yon teren kare ' + cote + ' m chak kote, ak yon poto chak ' + dd + ' m. Konbyen poto ?', ind: 'Yon kloti ki fèmen pa gen « bout ».',
          ex: 'Tou a = ' + L + ' m ; ' + L + ' ÷ ' + dd + ' = ' + rq + ' poto (premye a se dènye a).', rep: String(rq), faux: c3.slice(1) };
        f3 = { q: 'On clôture un terrain carré de ' + cote + ' m de côté, un poteau tous les ' + dd + ' m. Combien de poteaux ?', ind: 'Une clôture fermée n\'a pas de « bout ».',
          ex: 'Périmètre = ' + L + ' m ; ' + L + ' ÷ ' + dd + ' = ' + rq + ' poteaux (le premier est aussi le dernier).', rep: String(rq), faux: c3.slice(1) };
      }
      if (F('kt' + n, h3, f3)) n++;
    }
  })();

  // 2.8 Étages
  (function () {
    var r = rng(808), n = 0, t = 0;
    while (n < 10 && t < 999) {
      t++;
      var tt = 2 * ent(r, 5, 20), k = ent(r, 4, 10), rep = (k - 1) * tt / 2, ch = choix(rep, [k * tt / 3, (k - 1) * tt, rep + tt / 2, rep - tt / 2].filter(function (x) { return x === Math.round(x); }), r).map(String);
      var h = { q: 'Pou monte soti nan etaj 1 rive nan etaj 3, sa pran ' + tt + ' segonn. Konbyen segonn pou soti nan etaj 1 rive nan etaj ' + k + ' (menm vitès) ?',
        ind: 'Konbyen eskalye ant etaj 1 ak 3 ?', ex: '1 → 3 = 2 eskalye, ' + (tt / 2) + ' s chak. 1 → ' + k + ' = ' + (k - 1) + ' eskalye → ' + rep + ' s.', rep: rep + ' s', faux: ch.slice(1).map(function (x) { return x + ' s'; }) };
      var f = { q: 'Monter de l\'étage 1 à l\'étage 3 prend ' + tt + ' secondes. Combien de secondes pour aller de l\'étage 1 à l\'étage ' + k + ' (même rythme) ?',
        ind: 'Combien d\'escaliers entre l\'étage 1 et le 3 ?', ex: '1 → 3 = 2 escaliers de ' + (tt / 2) + ' s. 1 → ' + k + ' = ' + (k - 1) + ' escaliers → ' + rep + ' s.', rep: rep + ' s', faux: ch.slice(1).map(function (x) { return x + ' s'; }) };
      if (F('et' + n, h, f)) n++;
    }
  })();

  // 2.9 Machines / ouvriers
  (function () {
    var r = rng(909), n = 0, t = 0;
    while (n < 10 && t < 999) {
      t++;
      var m = ent(r, 3, 9), tm = ent(r, 3, 12), N = pick(r, [20, 30, 50, 60, 100]), ch = choix(tm, [N, tm * N / m, N * tm], r).filter(function (x) { return x === Math.round(x); });
      while (ch.length < 4) ch.push(ch[ch.length - 1] + tm);
      var h = { q: m + ' machin fè ' + m + ' sachè dlo nan ' + tm + ' minit. Konbyen minit ' + N + ' machin pran pou fè ' + N + ' sachè ?', ind: 'Konbyen tan yon machin pran pou yon sachè ?',
        ex: 'Chak machin fè 1 sachè nan ' + tm + ' minit : ' + N + ' machin fè ' + N + ' sachè nan ' + tm + ' minit tou.', rep: tm + ' min', faux: ch.slice(1).map(function (x) { return x + ' min'; }) };
      var f = { q: m + ' machines font ' + m + ' sachets d\'eau en ' + tm + ' minutes. Combien de minutes faut-il à ' + N + ' machines pour ' + N + ' sachets ?', ind: 'Combien de temps pour 1 machine et 1 sachet ?',
        ex: 'Chaque machine fait 1 sachet en ' + tm + ' minutes : ' + N + ' machines font ' + N + ' sachets en ' + tm + ' minutes aussi.', rep: tm + ' min', faux: ch.slice(1).map(function (x) { return x + ' min'; }) };
      if (F('mc' + n, h, f)) n++;
    }
  })();

  // 2.10 Frères et sœurs
  (function () {
    var r = rng(1010), n = 0, t = 0, NOM = ['Woz', 'Mari', 'Nadèj', 'Sofi', 'Lina', 'Jesi'];
    while (n < 10 && t < 999) {
      t++;
      var b = ent(r, 1, 7), s = ent(r, 1, 6), nm = pick(r, NOM), rep = b + s, ch = choix(rep, [b + b * s, rep + 1, b + s - 1, b * s + 1], r).map(String);
      var h = { q: nm + ' gen ' + b + ' frè. Chak frè li gen ' + s + ' sè. Konbyen pitit ki genyen nan fanmi an ?', ind: nm + ' se youn nan sè yo.',
        ex: 'Sè yo (' + s + ') gen ladan yo ' + nm + ' : ' + b + ' gason + ' + s + ' fi = ' + rep + '.', rep: String(rep), faux: ch.slice(1) };
      var f = { q: nm + ' a ' + b + ' frère' + (b > 1 ? 's' : '') + '. Chacun de ses frères a ' + s + ' sœur' + (s > 1 ? 's' : '') + '. Combien d\'enfants dans la famille ?', ind: nm + ' fait partie des sœurs.',
        ex: 'Les ' + s + ' sœur(s) comprennent ' + nm + ' : ' + b + ' garçon(s) + ' + s + ' fille(s) = ' + rep + '.', rep: String(rep), faux: ch.slice(1) };
      if (F('fs' + n, h, f)) n++;
    }
  })();

  // 2.11 Poignées de main
  (function () {
    var r = rng(1111), n = 0;
    shuffle(r, [4, 5, 6, 7, 8, 9, 10, 11, 12, 15]).forEach(function (p) {
      var rep = p * (p - 1) / 2, ch = choix(rep, [p * (p - 1), p * p, p * (p + 1) / 2], r).map(String);
      F('lm' + (n++), { q: p + ' moun nan yon reyinyon. Chak moun bay chak lòt moun lanmen yon sèl fwa. Konbyen fwa yo bay lanmen ?', ind: 'Lè A bay B lanmen, B bay A lanmen tou : sa konte yon fwa.',
        ex: p + ' × ' + (p - 1) + ' ÷ 2 = ' + rep + '.', rep: String(rep), faux: ch.slice(1) },
        { q: p + ' personnes à une réunion. Chacun serre la main de chaque autre une seule fois. Combien de poignées de main ?', ind: 'Quand A serre la main de B, B serre celle de A : une seule poignée.',
          ex: p + ' × ' + (p - 1) + ' ÷ 2 = ' + rep + '.', rep: String(rep), faux: ch.slice(1) });
    });
  })();

  // 2.12 Chaussettes dans le noir (principe des tiroirs)
  (function () {
    var r = rng(1212), n = 0;
    [2, 3, 4, 5].forEach(function (k) {
      [2, 3].forEach(function (z) {
        var rep = (z - 1) * k + 1, ch = choix(rep, [z, k * z, rep + 1, k], r).map(String);
        F('ch' + (n++), { q: 'Nan yon tiwa fènwa gen chosèt ' + k + ' koulè diferan (anpil nan chak koulè). Konbyen chosèt pou w pran pou w sèten gen ' + z + ' ki menm koulè ?',
          ind: 'Panse ak pi move chans lan : yon koulè diferan chak fwa.', ex: (z - 1) + ' chak koulè = ' + ((z - 1) * k) + ' san repetisyon ; pwochen an fè ' + z + ' → ' + rep + '.', rep: String(rep), faux: ch.slice(1) },
          { q: 'Dans un tiroir sombre, des chaussettes de ' + k + ' couleurs (beaucoup de chaque). Combien en prendre pour être sûr d\'en avoir ' + z + ' de la même couleur ?',
            ind: 'Pensez à la pire malchance : une couleur différente à chaque fois.', ex: (z - 1) + ' de chaque couleur = ' + ((z - 1) * k) + ' sans réussir ; la suivante en fait ' + z + ' → ' + rep + '.', rep: String(rep), faux: ch.slice(1) });
      });
    });
  })();

  // 2.13 Suites : différences croissantes / doubles + n (familles supplémentaires vérifiées)
  (function () {
    var r = rng(1313), n = 0, t = 0;
    while (n < 20 && t < 999) {
      t++;
      var a = ent(r, 1, 9), k = n % 2 ? ent(r, 2, 3) : 0, d0 = ent(r, 1, 4), s = [a];
      for (var i = 1; i < 6; i++) s.push(k ? s[i - 1] * k + d0 : s[i - 1] + d0 + (i - 1) * 2);
      var rep = s[5], vis = s.slice(0, 5).join(', '), ch = choix(rep, [rep + 2, rep - 2, s[4] * 2], r).map(String);
      var eh = k ? 'Chak nonb = sa ki anvan l × ' + k + ' + ' + d0 + ' : ' + s[4] + ' × ' + k + ' + ' + d0 + ' = ' + rep + '.' : 'Diferans yo ogmante 2 pa 2 : ' + s[4] + ' + ' + (rep - s[4]) + ' = ' + rep + '.';
      var ef = k ? 'Chaque terme = précédent × ' + k + ' + ' + d0 + ' : ' + s[4] + ' × ' + k + ' + ' + d0 + ' = ' + rep + '.' : 'Les écarts augmentent de 2 : ' + s[4] + ' + ' + (rep - s[4]) + ' = ' + rep + '.';
      if (F('sy' + n, { q: 'Ki nonb ki vini apre : ' + vis + ', … ?', ind: k ? 'Miltipliye, epi ajoute.' : 'Gade diferans ant nonb yo.', ex: eh, rep: String(rep), faux: ch.slice(1) },
        { q: 'Quel nombre vient ensuite : ' + vis + ', … ?', ind: k ? 'Multipliez, puis ajoutez.' : 'Regardez les écarts entre les nombres.', ex: ef, rep: String(rep), faux: ch.slice(1) })) n++;
    }
  })();

  // 2.14 Rendez-vous mensuels : la date suit une règle liée au mois (jours, numéro, lettres)
  (function () {
    var JM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], r = rng(1414), n = 0, t = 0;
    var RG = [
      { c: function (m, lg) { return JM[m] - (m + 1); }, h: 'kantite jou nan mwa a − nimewo mwa a', f: 'nombre de jours du mois − numéro du mois' },
      { c: function (m, lg) { return JM[m] - nbL(MWA[lg][m]); }, h: 'kantite jou nan mwa a − kantite lèt nan non mwa a', f: 'nombre de jours du mois − nombre de lettres du nom du mois' },
      { c: function (m, lg) { return nbL(MWA[lg][m]) + (m + 1) * 2; }, h: 'kantite lèt nan non mwa a + 2 × nimewo mwa a', f: 'nombre de lettres du nom du mois + 2 × numéro du mois' }
    ];
    var faits = {};
    while (n < 15 && t < 999) {
      t++;
      var g = n % 3, s = ent(r, 0, 5), k = ent(r, 6, 7), cle = g + '-' + s + '-' + k; if (faits[cle]) continue; faits[cle] = 1;
      var o = {};
      ['ht', 'fr'].forEach(function (lg) {
        var mois = [], i; for (i = 0; i < k; i++) mois.push(s + i);
        var cible = s + k, rep = RG[g].c(cible, lg), nomC = cap(MWA[lg][cible]);
        var autres = RG.map(function (x) { return x.c(cible, lg); }).filter(function (x, j) { return j !== g; });
        var ch = choix(rep, autres.concat([rep - 1, rep + 1, JM[cible]]), r);
        var lignes = mois.map(function (m) { return cap(MWA[lg][m]) + ' : ' + RG[g].c(m, lg); }).join('\n');
        var calc = g === 0 ? JM[cible] + ' − ' + (cible + 1) : g === 1 ? JM[cible] + ' − ' + nbL(MWA[lg][cible]) : nbL(MWA[lg][cible]) + ' + 2 × ' + (cible + 1);
        o[lg] = lg === 'ht'
          ? { q: 'De zanmi pran randevou yon fwa chak mwa (ane ki pa bisekstil) :\n' + lignes + '\n' + nomC + ' : ?', ind: g === 2 ? 'Konte lèt non mwa a, epi gade nimewo mwa a.' : 'Konbyen jou ki genyen nan chak mwa ?',
              ex: 'Règ la : ' + RG[g].h + '. ' + nomC + ' : ' + calc + ' = ' + rep + '.', rep: String(rep), faux: ch.slice(1).map(String) }
          : { q: 'Deux amis se donnent rendez-vous une fois par mois (année non bissextile) :\n' + lignes + '\n' + nomC + ' : ?', ind: g === 2 ? 'Comptez les lettres du mois, puis regardez son numéro.' : 'Combien de jours compte chaque mois ?',
              ex: 'Règle : ' + RG[g].f + '. ' + nomC + ' : ' + calc + ' = ' + rep + '.', rep: String(rep), faux: ch.slice(1).map(String) };
      });
      if (F('rd' + n, o.ht, o.fr)) n++;
    }
  })();

  // =====================================================================
  // 3. CALENDRIER : 3 par jour, cycle de 90 jours, remélangé à chaque cycle
  // =====================================================================
  var CYCLE = 90, PAR_JOUR = 3;
  function ordreCycle(c) {
    var N = B.length, base = shuffle(rng(7919 * (c + 11)), B.map(function (_, i) { return i; })), need = CYCLE * PAR_JOUR;
    if (c > 0) {   // pas de reprise des 30 derniers jours du cycle précédent dans les 30 premiers jours
      var prev = ordreCycle(c - 1), fin = {}; prev.slice(need - 30 * PAR_JOUR, need).forEach(function (x) { fin[x] = 1; });
      for (var i = 0; i < 30 * PAR_JOUR; i++) if (fin[base[i]]) {
        for (var j = 30 * PAR_JOUR; j < N; j++) if (!fin[base[j]]) { var x = base[i]; base[i] = base[j]; base[j] = x; break; }
      }
    }
    return base;
  }
  var memo = {};
  function ordre(c) { if (!memo[c]) { memo = {}; memo[c] = c > 0 ? ordreCycleIter(c) : ordreCycle(0); } return memo[c]; }
  function ordreCycleIter(c) {   // version itérative (pas de récursion profonde après plusieurs années)
    var N = B.length, need = CYCLE * PAR_JOUR, prev = shuffle(rng(7919 * 11), B.map(function (_, i) { return i; }));
    for (var cc = 1; cc <= c; cc++) {
      var base = shuffle(rng(7919 * (cc + 11)), B.map(function (_, i) { return i; })), fin = {};
      prev.slice(need - 30 * PAR_JOUR, need).forEach(function (x) { fin[x] = 1; });
      for (var i = 0; i < 30 * PAR_JOUR; i++) if (fin[base[i]]) {
        for (var j = 30 * PAR_JOUR; j < N; j++) if (!fin[base[j]]) { var x = base[i]; base[i] = base[j]; base[j] = x; break; }
      }
      prev = base;
    }
    return prev;
  }
  var DEPART = Date.UTC(2026, 10, 1) / 864e5;   // 1er novembre 2026 = jour 0
  function numJour(d) { d = d || new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5) - DEPART; }
  /** Les 3 devinettes du jour (objets prêts : q, ch mélangés, bon). */
  function duJour(d, lg) {
    var k = numJour(d), c = Math.floor(k / CYCLE), j = ((k % CYCLE) + CYCLE) % CYCLE; if (c < 0) c = 0;
    var o = ordre(c);
    return [0, 1, 2].map(function (p) {
      var x = B[o[j * PAR_JOUR + p]], L = x[lg === 'fr' ? 'fr' : 'ht'], r = rng(k * 31 + p + 1), ch = shuffle(r, [L.rep].concat(L.faux));
      return { id: x.id, q: L.q, ind: L.ind, ex: L.ex, ch: ch, bon: ch.indexOf(L.rep), rep: L.rep };
    });
  }
  G.DEVINET = { banque: B, duJour: duJour, numJour: numJour, ordre: ordre, CYCLE: CYCLE, PAR_JOUR: PAR_JOUR };
})(typeof window !== 'undefined' ? window : globalThis);
