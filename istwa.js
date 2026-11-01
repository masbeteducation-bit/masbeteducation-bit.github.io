/* Masbet — « Istwa jodi a » : une page pour chaque grande date (fêtes nationales, jours fériés,
   journées internationales, histoire, catastrophes). Créole + français.
   Faits vérifiés le 01/11/2026 (sources indiquées à chaque page). Quand les chiffres varient selon les
   sources, la page le dit et donne une fourchette.
   Champs : d = 'MM-JJ' · c = catégorie · a = année de l'événement principal (facultatif)
            t = titre [ht, fr] · x = texte [ht, fr] · k = question du jour [ht, fr] · s = sources */
(function (W) {
  'use strict';
  var C = {
    F: ['Fèt nasyonal', 'Fête nationale'], R: ['Jou ferye', 'Jour férié'], E: ['Jounen entènasyonal', 'Journée internationale'],
    I: ['Istwa', 'Histoire'], P: ['Politik', 'Politique'], T: ['Tranbleman tè', 'Séisme'], S: ['Siklòn', 'Cyclone'], K: ['Kilti', 'Culture']
  };
  var L = [];
  function I(d, c, a, t, x, k, s) { L.push({ d: d, c: c, a: a, t: t, x: x, k: k, s: s }); }

  // ---------------- JANVIER ----------------
  I('01-01', 'F', 1804,
    ['Jou Endepandans', 'Jour de l\'Indépendance'],
    ['1ye janvye 1804, nan Gonayiv, Jean-Jacques Dessalines ak jeneral lame endijèn yo pwoklame endepandans Ayiti. Se premye repiblik nwa nan lemonn, premye pèp ki kraze esklavaj ak pwòp fòs li epi fonde yon peyi. Non « Ayiti » se ansyen non Tayino yo te bay zile a. Jodi a, nan tout kay, se soup joumou : soup ansyen esklav yo pa t gen dwa manje a vin tounen siy libète.',
     'Le 1er janvier 1804, aux Gonaïves, Jean-Jacques Dessalines et les généraux de l\'armée indigène proclament l\'indépendance d\'Haïti. C\'est la première république noire du monde, le premier peuple à abolir l\'esclavage par ses propres forces et à fonder un État. Le nom « Haïti » reprend l\'ancien nom taïno de l\'île. Ce jour-là, dans chaque maison, on mange la soupe joumou : la soupe interdite aux esclaves devenue symbole de liberté.'],
    ['Ki moun ki fè pi bon soup joumou nan fanmi w ?', 'Qui fait la meilleure soupe joumou dans votre famille ?'],
    'Archives nationales d\'Haïti ; Acte de l\'Indépendance (1804)');
  I('01-02', 'F', 1804,
    ['Jou Zansèt yo', 'Jour des Aïeux'],
    ['2 janvye se jou nou onore zansèt yo : fondatè peyi a, sòlda lame endijèn yo, ak tout esklav ki te goumen pou libète. Se yon jou ferye depi lendepandans. Anpil fanmi pwofite pou vizite granmoun yo, rakonte istwa fanmi an, epi kontinye manje soup joumou ki rete a.',
     'Le 2 janvier, on honore les aïeux : les fondateurs de la nation, les soldats de l\'armée indigène et tous les esclaves qui ont combattu pour la liberté. C\'est un jour férié depuis l\'indépendance. Beaucoup de familles en profitent pour rendre visite aux anciens, raconter l\'histoire de la famille et finir la soupe joumou.'],
    ['Ki zansèt nan fanmi w ou ta renmen tout moun konnen istwa l ?', 'Quel ancêtre de votre famille mériterait qu\'on connaisse son histoire ?'],
    'Calendrier des fêtes légales d\'Haïti');
  I('01-12', 'T', 2010,
    ['Tranbleman tè 12 janvye 2010', 'Séisme du 12 janvier 2010'],
    ['Madi 12 janvye 2010, a 4è 53 apremidi, yon tranbleman tè 7,0 frape Ayiti. Episant lan te toupre Leyogàn, pa lwen Pòtoprens. An kèk segonn, Pòtoprens, Leyogàn, Jakmèl ak Gwomòn kraze. Kantite moun ki mouri a varye : Leta ayisyen te bay plis pase 316 000, lòt etid bay mwens. Plis pase yon milyon moun te pèdi kay yo. Se jou pou nou sonje, men tou pou nou aprann konstwi pi solid.',
     'Le mardi 12 janvier 2010, à 16 h 53, un séisme de magnitude 7,0 frappe Haïti. L\'épicentre se trouve près de Léogâne, non loin de Port-au-Prince. En quelques secondes, Port-au-Prince, Léogâne, Jacmel et Grand-Goâve sont dévastés. Le bilan varie selon les sources : l\'État haïtien a annoncé plus de 316 000 morts, d\'autres études donnent moins. Plus d\'un million de personnes ont perdu leur maison. Un jour pour se souvenir, et pour apprendre à construire plus solide.'],
    ['Ki kote w te ye 12 janvye 2010 a 4è 53 ?', 'Où étiez-vous le 12 janvier 2010 à 16 h 53 ?'],
    'USGS ; Gouvernement haïtien (2011) ; BID (2010)');

  // ---------------- FÉVRIER ----------------
  I('02-07', 'P', 1986,
    ['7 fevriye : fen diktati, jou envestiti', '7 février : fin de la dictature, jour d\'investiture'],
    ['7 fevriye 1986, apre yon gwo soulèvman popilè, Jean-Claude Duvalier kite peyi a pou ale an Frans. Se fen 29 ane diktati Duvalier (1957-1986). Dat sa a vin tounen jou envestiti pwezidan yo : Jean-Bertrand Aristide 7 fevriye 1991 (premye pwezidan eli nan eleksyon lib), René Préval 7 fevriye 1996, Aristide ankò 7 fevriye 2001, Jovenel Moïse 7 fevriye 2017.',
     'Le 7 février 1986, après un grand soulèvement populaire, Jean-Claude Duvalier quitte le pays pour la France. C\'est la fin de 29 ans de dictature des Duvalier (1957-1986). La date devient celle de l\'investiture des présidents : Jean-Bertrand Aristide le 7 février 1991 (premier président issu d\'élections libres), René Préval le 7 février 1996, de nouveau Aristide le 7 février 2001, Jovenel Moïse le 7 février 2017.'],
    ['Kisa 7 fevriye 1986 te chanje nan lavi moun lakay ou ?', 'Qu\'est-ce que le 7 février 1986 a changé pour les vôtres ?'],
    'Radio Haïti (archives Duke) ; UNC Press');
  I('02-21', 'E', 1999,
    ['Jounen entènasyonal lang manman', 'Journée internationale de la langue maternelle'],
    ['UNESCO chwazi 21 fevriye depi 1999 pou fete lang manman. An Ayiti, lang manman tout moun se kreyòl. Depi Konstitisyon 1987 la, kreyòl ak franse se de lang ofisyèl peyi a. Lè yon timoun aprann li nan lang li pale lakay, li konprann pi vit epi li renmen lekòl plis. Pale kreyòl, ekri kreyòl : se fyète.',
     'Depuis 1999, l\'UNESCO consacre le 21 février aux langues maternelles. En Haïti, la langue maternelle de tous, c\'est le créole. Depuis la Constitution de 1987, le créole et le français sont les deux langues officielles du pays. Un enfant qui apprend à lire dans la langue de la maison comprend plus vite et aime davantage l\'école.'],
    ['Ki pi bèl pwovèb kreyòl ou konnen ?', 'Quel est le plus beau proverbe créole que vous connaissez ?'],
    'UNESCO ; Constitution haïtienne de 1987, art. 5');

  // ---------------- MARS ----------------
  I('03-08', 'E', 1977,
    ['Jounen entènasyonal fanm', 'Journée internationale des droits des femmes'],
    ['Nasyonzini rekonèt 8 mas depi 1977. An Ayiti, fanm se poto mitan : machann, manman, pwofesè, agrikiltè, lidè. Nan istwa nou, gen Sanite Bèl ki te goumen nan revolisyon an, Catherine Flon ki koud premye drapo a, ak Marie-Jeanne Lamartinière nan batay Krèt-a-Pyewo. Jodi a se jou pou n di mèsi, men tou pou n defann dwa yo.',
     'L\'ONU reconnaît le 8 mars depuis 1977. En Haïti, les femmes sont le « poto mitan » : marchandes, mères, enseignantes, agricultrices, dirigeantes. Notre histoire compte Sanite Bélair, combattante de la révolution, Catherine Flon, qui cousit le premier drapeau, et Marie-Jeanne Lamartinière à la bataille de la Crête-à-Pierrot. Un jour pour dire merci et pour défendre leurs droits.'],
    ['Ki fanm Ansavo ou ta renmen salye jodi a ?', 'Quelle femme d\'Anse-à-Veau aimeriez-vous saluer aujourd\'hui ?'],
    'ONU Femmes');
  I('03-21', 'E', 1960,
    ['Jounen kont diskriminasyon rasyal', 'Journée pour l\'élimination de la discrimination raciale'],
    ['21 mas 1960, nan Sharpeville, Afrik di Sid, lapolis tire sou moun ki t ap manifeste kont apated : 69 moun mouri. Nasyonzini fè dat sa a tounen jounen kont rasis. Ayiti, premye repiblik nwa, te montre lemonn depi 1804 ke tout moun fèt egal. Batay la poko fini.',
     'Le 21 mars 1960, à Sharpeville, en Afrique du Sud, la police tire sur des manifestants contre l\'apartheid : 69 morts. L\'ONU fait de cette date la journée contre le racisme. Haïti, première république noire, a montré au monde dès 1804 que tous les êtres humains naissent égaux. Le combat n\'est pas fini.'],
    ['Èske w deja wè rasis kont Ayisyen lòt bò dlo ?', 'Avez-vous déjà vu du racisme envers les Haïtiens à l\'étranger ?'],
    'ONU');
  I('03-22', 'E', 1993,
    ['Jounen mondyal dlo', 'Journée mondiale de l\'eau'],
    ['Depi 1993, 22 mas se jou pou n panse ak dlo. Anpil fanmi an Ayiti toujou mache lwen pou jwenn dlo pwòp. Dlo sal bay maladi tankou kolera. Pwoteje sous yo, plante pyebwa, pa jete fatra nan ravin : se konsa nou kenbe dlo nou pwòp pou pitit nou.',
     'Depuis 1993, le 22 mars est consacré à l\'eau. Beaucoup de familles en Haïti marchent encore loin pour trouver de l\'eau potable. L\'eau sale transmet des maladies comme le choléra. Protéger les sources, planter des arbres, ne pas jeter les ordures dans les ravines : c\'est ainsi qu\'on garde l\'eau propre pour nos enfants.'],
    ['Ki kote moun Ansavo pran dlo pou bwè ?', 'Où les gens d\'Anse-à-Veau prennent-ils l\'eau à boire ?'],
    'ONU-Eau');
  I('03-29', 'P', 1987,
    ['Konstitisyon 1987', 'La Constitution de 1987'],
    ['29 mas 1987, pèp ayisyen vote nan yon referandòm pou aksepte yon nouvo Konstitisyon, yon ane apre diktati a tonbe. Li bay kreyòl plas lang ofisyèl bò kote franse, li separe pouvwa yo, li entèdi prezidan an pase de manda youn dèyè lòt, epi li pwoteje dwa moun. Li te amande an 2011.',
     'Le 29 mars 1987, le peuple haïtien approuve par référendum une nouvelle Constitution, un an après la chute de la dictature. Elle fait du créole une langue officielle aux côtés du français, sépare les pouvoirs, interdit deux mandats présidentiels consécutifs et protège les droits fondamentaux. Elle a été amendée en 2011.'],
    ['Ki atik nan Konstitisyon an ou ta renmen tout moun konnen ?', 'Quel article de la Constitution tout le monde devrait-il connaître ?'],
    'Constitution de 1987 ; Université de Perpignan (textes constitutionnels)');

  // ---------------- AVRIL ----------------
  I('04-07', 'I', 1803,
    ['Lanmò Toussaint Louverture', 'Mort de Toussaint Louverture'],
    ['7 avril 1803, Toussaint Louverture mouri nan prizon Fò Jou, nan mòn Jura, an Frans, nan frèt ak mizè. Franse yo te arete l ak riz an 1802. Anvan l monte bato a, li te di : « Lè yo jete m atè, se pye bwa libète a sèlman yo koupe ; l ap repouse paske rasin li fon e anpil. » Menm jou a, se Jounen mondyal sante.',
     'Le 7 avril 1803, Toussaint Louverture meurt au fort de Joux, dans le Jura, en France, de froid et de privations. Les Français l\'avaient arrêté par ruse en 1802. En embarquant, il déclara : « En me renversant, on n\'a abattu à Saint-Domingue que le tronc de l\'arbre de la liberté ; il repoussera par les racines, parce qu\'elles sont profondes et nombreuses. » C\'est aussi la Journée mondiale de la santé.'],
    ['Kisa pawòl Toussaint sou pye bwa libète a vle di pou ou ?', 'Que signifie pour vous la phrase de Toussaint sur l\'arbre de la liberté ?'],
    'Fort de Joux ; OMS (Journée mondiale de la santé)');
  I('04-17', 'I', 1825,
    ['Lòdonans Charles X : « dèt endepandans lan »', 'L\'ordonnance de Charles X : la « dette de l\'indépendance »'],
    ['17 avril 1825, wa Lafrans Charles X siyen yon lòdonans : li rekonèt endepandans Ayiti si Ayiti peye 150 milyon fran pou « dedomaje » ansyen kolon yo. Bato lagè te devan Pòtoprens. Pwezidan Boyer aksepte. Kantite lajan an te bese a 90 milyon an 1838, men Ayiti te peye l pandan plis pase yon syèk, ak enterè bank yo. Anpil istoryen wè la a youn nan rasin povrete peyi a.',
     'Le 17 avril 1825, le roi de France Charles X signe une ordonnance : il reconnaît l\'indépendance d\'Haïti contre 150 millions de francs pour « indemniser » les anciens colons. Des navires de guerre se tiennent devant Port-au-Prince ; le président Boyer accepte. La somme est réduite à 90 millions en 1838, mais Haïti paie pendant plus d\'un siècle, avec les intérêts des banques. Beaucoup d\'historiens y voient une racine de la pauvreté du pays.'],
    ['Èske w panse Lafrans ta dwe remèt lajan sa a ?', 'Pensez-vous que la France devrait restituer cet argent ?'],
    'Ordonnance du 17 avril 1825 ; traité de 1838');
  I('04-22', 'E', 1970,
    ['Jou Latè', 'Jour de la Terre'],
    ['Depi 1970, 22 avril se jou pou pwoteje planèt la. An Ayiti, gwo forè yo kouvri yon ti pati piti anpil nan peyi a. Lè mòn yo toutouni, lapli pote tè a ale nan lanmè epi inondasyon vin pi grav. Chak pyebwa nou plante jodi a se yon kado pou Ansavo demen.',
     'Depuis 1970, le 22 avril est consacré à la protection de la planète. En Haïti, la forêt dense ne couvre qu\'une très petite partie du territoire. Quand les mornes sont nus, la pluie emporte la terre vers la mer et les inondations s\'aggravent. Chaque arbre planté aujourd\'hui est un cadeau pour l\'Anse-à-Veau de demain.'],
    ['Ki pyebwa ou ta plante devan kay ou ?', 'Quel arbre planteriez-vous devant chez vous ?'],
    'Earth Day Network ; FAO');
  I('04-23', 'E', 1995,
    ['Jounen mondyal liv', 'Journée mondiale du livre'],
    ['UNESCO chwazi 23 avril depi 1995 pou fete liv ak moun ki ekri yo. Ayiti gen gwo ekriven : Jacques Roumain (Gouverneurs de la rosée), Jacques Stephen Alexis, Frankétienne, Marie Vieux-Chauvet, Dany Laferrière ki antre nan Akademi Franse. Li yon paj chak jou : se konsa lespri a grandi.',
     'Depuis 1995, l\'UNESCO consacre le 23 avril au livre et aux auteurs. Haïti a de grands écrivains : Jacques Roumain (Gouverneurs de la rosée), Jacques Stephen Alexis, Frankétienne, Marie Vieux-Chauvet, Dany Laferrière, élu à l\'Académie française. Une page par jour : c\'est ainsi que l\'esprit grandit.'],
    ['Ki liv ki te make lavi w ?', 'Quel livre a marqué votre vie ?'],
    'UNESCO');

  // ---------------- MAI ----------------
  I('05-01', 'R', null,
    ['Fèt Travay ak Agrikilti', 'Fête du Travail et de l\'Agriculture'],
    ['An Ayiti, 1ye me se fèt Travay men tou fèt Agrikilti. Se jou pou n onore travayè yo ak peyizan ki ba nou manje : diri, mayi, pwa, bannann, kafe. Nan Nip, agrikilti ak lapèch fè anpil fanmi viv. Manje lokal se fòs lokal.',
     'En Haïti, le 1er mai est la fête du Travail mais aussi de l\'Agriculture. On honore les travailleurs et les paysans qui nous nourrissent : riz, maïs, pois, banane, café. Dans les Nippes, l\'agriculture et la pêche font vivre beaucoup de familles. Manger local, c\'est renforcer le pays.'],
    ['Ki plant ou konnen ki pouse pi byen Ansavo ?', 'Quelle culture pousse le mieux à Anse-à-Veau ?'],
    'Calendrier des fêtes légales d\'Haïti');
  I('05-03', 'E', 1993,
    ['Jounen libète laprès', 'Journée de la liberté de la presse'],
    ['Depi 1993, 3 me se jounen libète laprès. An Ayiti, jounalis tankou Jean Dominique (Radyo Ayiti Inter), asasinen an 2000, te bay lavi yo pou moun ka konnen laverite. Yon pèp ki byen enfòme pi difisil pou twonpe. Verifye yon nouvèl anvan ou pataje l.',
     'Depuis 1993, le 3 mai est la journée de la liberté de la presse. En Haïti, des journalistes comme Jean Dominique (Radio Haïti Inter), assassiné en 2000, ont donné leur vie pour que chacun connaisse la vérité. Un peuple bien informé est plus difficile à tromper. Vérifiez une nouvelle avant de la partager.'],
    ['Ki radyo w koute pou konn nouvèl ?', 'Quelle radio écoutez-vous pour les nouvelles ?'],
    'UNESCO');
  I('05-07', 'T', 1842,
    ['Tranbleman tè Okap 1842', 'Le séisme du Cap de 1842'],
    ['7 me 1842, vè 5è apremidi, yon gwo tranbleman tè (estime a 8,1) kraze Okap. Yon tsounami frape kòt nò a : nan Pòdepè dlo a te monte prèske 5 mèt, Mòl Sen Nikola te prèske disparèt. Yo estime anviwon 5 000 moun mouri. Sitadèl ak Palè Sans-Souci te domaje tou. Nò Ayiti sou yon fay ki ka bouje ankò : se pou sa pou n konnen kijan pou n pwoteje nou.',
     'Le 7 mai 1842, vers 17 h, un très fort séisme (estimé à 8,1) détruit le Cap-Haïtien. Un tsunami frappe la côte nord : à Port-de-Paix, l\'eau monte à près de 5 mètres ; le Môle Saint-Nicolas est presque rasé. On estime environ 5 000 morts. La Citadelle et le palais Sans-Souci sont aussi endommagés. Le Nord d\'Haïti est sur une faille qui peut rejouer : il faut connaître les gestes qui sauvent.'],
    ['Si tè a tranble kounye a, ki kote w ap kouri ?', 'Si la terre tremblait maintenant, où iriez-vous ?'],
    'UNESCO/COI, réunion d\'experts sur le Nord d\'Haïti ; UWI');
  I('05-18', 'F', 1803,
    ['Fèt Drapo ak Inivèsite', 'Fête du Drapeau et de l\'Université'],
    ['18 me 1803, nan Kongrè Akayè, Dessalines chire blan an nan drapo franse a : se konsa ble ak wouj la vin drapo lame endijèn nan, siy ini nwa ak milat kont kolon yo. Daprè tradisyon an, se Catherine Flon ki koud li. Jodi a, lekòl yo defile, epi se fèt Inivèsite tou.',
     'Le 18 mai 1803, au Congrès de l\'Arcahaie, Dessalines arrache le blanc du drapeau français : le bleu et le rouge deviennent le drapeau de l\'armée indigène, symbole de l\'union des Noirs et des mulâtres contre les colons. Selon la tradition, c\'est Catherine Flon qui le coud. Aujourd\'hui, les écoles défilent et c\'est aussi la fête de l\'Université.'],
    ['Ki sa ble ak wouj drapo a vle di pou ou ?', 'Que représentent pour vous le bleu et le rouge du drapeau ?'],
    'Calendrier des fêtes légales d\'Haïti');

  // ---------------- JUIN ----------------
  I('06-01', 'S', null,
    ['Kòmansman sezon siklòn', 'Début de la saison cyclonique'],
    ['Sezon siklòn Atlantik la kòmanse 1ye jen pou l fini 30 novanm. Ayiti, ak Nip ladan l, nan chemen siklòn yo. Pare depi kounye a : netwaye kannal ak ravin, ranfòse do kay, sere papye enpòtan nan sache plastik, gen yon radyo ak pil, konnen ki abri ki pi pre w.',
     'La saison cyclonique de l\'Atlantique va du 1er juin au 30 novembre. Haïti, et les Nippes en particulier, sont sur la route des cyclones. Préparez-vous dès maintenant : curer canaux et ravines, renforcer la toiture, ranger les papiers importants dans des sachets plastiques, avoir une radio à piles, connaître l\'abri le plus proche.'],
    ['Kisa fanmi w deja pare pou sezon siklòn nan ?', 'Qu\'a déjà préparé votre famille pour la saison cyclonique ?'],
    'NOAA ; Protection civile d\'Haïti');
  I('06-03', 'T', 1770,
    ['Tranbleman tè Pòtoprens 1770', 'Le séisme de Port-au-Prince de 1770'],
    ['3 jen 1770, vè 7è 15 diswa, yon tranbleman tè (estime a 7,5) kraze Pòtoprens, ki te jenn kapital koloni a, ak Leyogàn. Tè a te vin mou tankou labou anba kay yo. Anviwon 200 moun mouri Pòtoprens, 50 Leyogàn. Menm zòn nan te tranble ankò 12 janvye 2010 : istwa a sonje.',
     'Le 3 juin 1770, vers 19 h 15, un séisme (estimé à 7,5) détruit Port-au-Prince, jeune capitale de la colonie, et Léogâne. Le sol se liquéfie sous les maisons. On compte environ 200 morts à Port-au-Prince et 50 à Léogâne. La même région tremblera de nouveau le 12 janvier 2010 : l\'histoire se souvient.'],
    ['Èske granmoun lakay ou te konn rakonte istwa tranbleman tè ?', 'Vos aînés racontaient-ils des histoires de tremblements de terre ?'],
    'UWI ; études historiques sur la sismicité d\'Hispaniola');
  I('06-05', 'E', 1974,
    ['Jounen mondyal anviwònman', 'Journée mondiale de l\'environnement'],
    ['Depi 1974, 5 jen se jou anviwònman. Plastik ki nan ravin yo fini nan lanmè Ansavo, kote pwason yo ap viv. Mang, pye rezen lanmè, koray : se miray ki pwoteje kòt la kont lanm ak siklòn. Ann kenbe plaj ak lanmè nou pwòp.',
     'Depuis 1974, le 5 juin est la Journée de l\'environnement. Le plastique des ravines finit dans la mer d\'Anse-à-Veau, là où vivent les poissons. Mangroves, raisiniers de mer, coraux : ce sont des remparts qui protègent la côte des vagues et des cyclones. Gardons nos plages et notre mer propres.'],
    ['Kisa nou ka fè ansanm pou plaj Ansavo rete pwòp ?', 'Que pouvons-nous faire ensemble pour garder les plages d\'Anse-à-Veau propres ?'],
    'PNUE');
  I('06-21', 'K', 1982,
    ['Fèt mizik', 'Fête de la musique'],
    ['Fèt mizik la fèt an Frans an 1982, li vin fete nan anpil peyi 21 jen. Mizik ayisyen rich : konpa Nemours Jean-Baptiste te kreye nan ane 1950 yo, rara, twoubadou, mizik rasin, rap kreyòl. Jodi a, fè mizik, koute mizik, sipòte atis lokal yo.',
     'La Fête de la musique est née en France en 1982 et se célèbre le 21 juin dans de nombreux pays. La musique haïtienne est riche : le compas créé par Nemours Jean-Baptiste dans les années 1950, le rara, le twoubadou, la musique racine, le rap créole. Aujourd\'hui, jouez, écoutez et soutenez les artistes locaux.'],
    ['Ki mizisyen Ansavo ou ta renmen tout moun tande ?', 'Quel musicien d\'Anse-à-Veau tout le monde devrait-il écouter ?'],
    'Ministère de la Culture (France) ; histoire du compas');

  // ---------------- JUILLET ----------------
  I('07-07', 'P', 2021,
    ['Asasina pwezidan Jovenel Moïse', 'Assassinat du président Jovenel Moïse'],
    ['Nan nwit 6 pou 7 jiyè 2021, yon kòmando antre lakay pwezidan Jovenel Moïse nan Pèlren, sou wotè Pòtoprens, epi touye l. Madanm li, Martine Moïse, te blese grav. Anpil ansyen sòlda etranje te arete, men ankèt la sou moun ki te bay lòd la poko fini. Se te premye fwa depi 1915 yon pwezidan an fonksyon te asasinen an Ayiti.',
     'Dans la nuit du 6 au 7 juillet 2021, un commando pénètre dans la résidence du président Jovenel Moïse à Pèlerin, sur les hauteurs de Port-au-Prince, et l\'assassine. Son épouse, Martine Moïse, est grièvement blessée. De nombreux anciens militaires étrangers sont arrêtés, mais l\'enquête sur les commanditaires n\'est toujours pas close. C\'était le premier assassinat d\'un président en exercice en Haïti depuis 1915.'],
    ['Kisa peyi a bezwen pou laverite parèt nan ka sa a ?', 'De quoi le pays a-t-il besoin pour que la vérité éclate dans cette affaire ?'],
    'RNDDH ; HRW');
  I('07-28', 'I', 1915,
    ['Kòmansman okipasyon ameriken', 'Début de l\'occupation américaine'],
    ['28 jiyè 1915, apre yo fin lenche pwezidan Vilbrun Guillaume Sam nan Pòtoprens, Marin ameriken debake. Okipasyon an dire 19 ane : fòs ameriken yo kontwole lajan leta, lame ak ladwàn. Kako yo, ak Charlemagne Péralte devan, te goumen kont yo. Dènye Marin yo kite Ayiti nan mwa out 1934.',
     'Le 28 juillet 1915, après le lynchage du président Vilbrun Guillaume Sam à Port-au-Prince, les Marines américains débarquent. L\'occupation dure 19 ans : les États-Unis contrôlent les finances, l\'armée et les douanes. Les Cacos, menés par Charlemagne Péralte, leur résistent. Les derniers Marines quittent Haïti en août 1934.'],
    ['Ki istwa okipasyon an granmoun yo te konn rakonte ?', 'Quelles histoires de l\'occupation vos aînés racontaient-ils ?'],
    'Archives américaines (FRUS 1934) ; historiographie haïtienne');

  // ---------------- AOÛT ----------------
  I('08-12', 'E', 2000,
    ['Jounen entènasyonal jèn', 'Journée internationale de la jeunesse'],
    ['Nasyonzini fete jèn yo chak 12 out depi 2000. Plis pase mwatye popilasyon ayisyen gen mwens pase 25 an. Jèn yo se fòs peyi a : yo aprann, yo kreye, yo inove. Ansavo bezwen lide ou : yon ti biznis, yon ekip foutbòl, yon klib lekti, yon aplikasyon !',
     'L\'ONU célèbre la jeunesse chaque 12 août depuis 2000. Plus de la moitié de la population haïtienne a moins de 25 ans. Les jeunes sont la force du pays : ils apprennent, créent, innovent. Anse-à-Veau a besoin de vos idées : un petit commerce, une équipe de football, un club de lecture, une application !'],
    ['Si w te gen yon lide pou Ansavo, kisa l t ap ye ?', 'Si vous aviez une idée pour Anse-à-Veau, laquelle serait-ce ?'],
    'ONU');
  I('08-14', 'T', 2021,
    ['Bwa Kayiman (1791) ak tranbleman tè Nip (2021)', 'Bois-Caïman (1791) et le séisme des Nippes (2021)'],
    ['Nan nwit 14 out 1791, nan Bwa Kayiman, Boukman ak Cécile Fatiman dirije seremoni ki fè revòlt esklav yo eklate nan Nò a. 230 an apre, 14 out 2021 a 8è 29 maten, yon tranbleman tè 7,2 frape Sid peyi a. Episant lan te toupre Ti Trou de Nip. Omwen 2 248 moun mouri, plis pase 12 200 blese, plis pase 137 000 kay ak bilding kraze oswa domaje. Nip, Sid ak Grandans soufri anpil.',
     'Dans la nuit du 14 août 1791, au Bois-Caïman, Boukman et Cécile Fatiman président la cérémonie qui lance l\'insurrection des esclaves du Nord. 230 ans plus tard, le 14 août 2021 à 8 h 29, un séisme de magnitude 7,2 frappe le Sud. L\'épicentre se situe près de Petit-Trou-de-Nippes. Au moins 2 248 morts, plus de 12 200 blessés, plus de 137 000 bâtiments détruits ou endommagés. Les Nippes, le Sud et la Grand\'Anse sont durement touchés.'],
    ['Kijan Ansavo te viv 14 out 2021 an ?', 'Comment Anse-à-Veau a-t-elle vécu le 14 août 2021 ?'],
    'USGS (M 7.2 – Nippes, Haïti) ; COUN ; histoire de la Révolution');
  I('08-15', 'R', null,
    ['Lasomsyon', 'L\'Assomption'],
    ['15 out se fèt Lasomsyon, jou ferye an Ayiti. Se fèt chanpèt anpil kominote : mès, pwosesyon, bal, retou moun lavil ak dyaspora. Se yon gwo moman pou fanmi yo rankontre.',
     'Le 15 août est la fête de l\'Assomption, jour férié en Haïti. C\'est la fête patronale de nombreuses communautés : messe, procession, bals, retour des gens de la ville et de la diaspora. Un grand moment de retrouvailles en famille.'],
    ['Ki fèt chanpèt ou pi renmen nan Nip ?', 'Quelle fête patronale préférez-vous dans les Nippes ?'],
    'Calendrier des fêtes légales d\'Haïti');
  I('08-23', 'E', 1791,
    ['Jounen pou n sonje trèt nèg ak abolisyon an', 'Journée du souvenir de la traite négrière et de son abolition'],
    ['UNESCO chwazi 23 out pou sonje trèt nèg la, paske nan nwit 22 pou 23 out 1791 esklav Sendomeng yo leve nan Nò a. Revòlt sa a mennen nan abolisyon esklavaj an 1793-1794 ak nan endepandans 1804. Plis pase 12 milyon Afriken te depòte nan Amerik. Se istwa nou : nou pa dwe bliye.',
     'L\'UNESCO a choisi le 23 août pour se souvenir de la traite négrière, car dans la nuit du 22 au 23 août 1791, les esclaves de Saint-Domingue se soulèvent dans le Nord. Cette révolte mène à l\'abolition de l\'esclavage en 1793-1794 et à l\'indépendance de 1804. Plus de 12 millions d\'Africains ont été déportés vers les Amériques. C\'est notre histoire : ne l\'oublions pas.'],
    ['Ki non zansèt revolisyonè ou ta renmen yon lekòl pote ?', 'Quel héros de la révolution mériterait de donner son nom à une école ?'],
    'UNESCO');

  // ---------------- SEPTEMBRE ----------------
  I('09-08', 'E', 1967,
    ['Jounen entènasyonal alfabetizasyon', 'Journée internationale de l\'alphabétisation'],
    ['UNESCO fete alfabetizasyon chak 8 septanm depi 1967. Konn li ak ekri chanje lavi : li kontra, li preskripsyon, ede pitit nan devwa, itilize yon telefòn. Pa janm twò ta pou aprann. Si w konn li, anseye yon moun ; si w poko konn, mande èd : se pa wont.',
     'L\'UNESCO célèbre l\'alphabétisation chaque 8 septembre depuis 1967. Savoir lire et écrire change la vie : lire un contrat, une ordonnance, aider les enfants aux devoirs, utiliser un téléphone. Il n\'est jamais trop tard pour apprendre. Si vous savez lire, enseignez à quelqu\'un ; sinon, demandez de l\'aide : ce n\'est pas une honte.'],
    ['Ki moun ki te aprann ou li ?', 'Qui vous a appris à lire ?'],
    'UNESCO');
  I('09-18', 'S', 2004,
    ['Siklòn Jeanne nan Gonayiv', 'Le cyclone Jeanne aux Gonaïves'],
    ['17 rive 19 septanm 2004, lapli siklòn Jeanne lakòz gwo inondasyon. Nan Gonayiv, dlo a monte rive prèske 5 mèt, li kouvri prèske 80 % vil la. Bilan : plis pase 3 000 moun mouri nan peyi a, ladan yo prèske 2 800 nan Gonayiv. Mòn san pyebwa yo fè dlo desann pi vit e pi fò.',
     'Du 17 au 19 septembre 2004, les pluies du cyclone Jeanne provoquent des inondations catastrophiques. Aux Gonaïves, l\'eau monte jusqu\'à près de 5 mètres et recouvre environ 80 % de la ville. Bilan : plus de 3 000 morts dans le pays, dont près de 2 800 aux Gonaïves. Les mornes déboisés accélèrent et renforcent les crues.'],
    ['Èske gen ravin Ansavo ki konn debòde lè lapli tonbe ?', 'Y a-t-il à Anse-à-Veau des ravines qui débordent quand il pleut ?'],
    'NOAA ; rapports humanitaires 2004');
  I('09-20', 'I', 1758,
    ['Nesans Jean-Jacques Dessalines', 'Naissance de Jean-Jacques Dessalines'],
    ['Daprè tradisyon an, Jean-Jacques Dessalines fèt 20 septanm 1758 nan Kòmye, toupre Grann Rivyè dinò, nan esklavaj. Li vin youn nan pi gwo jeneral revolisyon an, li dirije lame endijèn nan jouk viktwa Vètyè, epi li pwoklame endepandans 1ye janvye 1804. Se papa nasyon an. Nou chante l nan Desalinyèn nan.',
     'Selon la tradition, Jean-Jacques Dessalines naît le 20 septembre 1758 à Cormier, près de Grande-Rivière-du-Nord, dans l\'esclavage. Il devient l\'un des plus grands généraux de la révolution, mène l\'armée indigène jusqu\'à la victoire de Vertières et proclame l\'indépendance le 1er janvier 1804. C\'est le Père de la Nation, chanté dans La Dessalinienne.'],
    ['Ki pawòl nan Desalinyèn nan ki touche w plis ?', 'Quelles paroles de La Dessalinienne vous touchent le plus ?'],
    'Historiographie haïtienne (date de naissance traditionnelle)');
  I('09-21', 'E', 1981,
    ['Jounen entènasyonal lapè', 'Journée internationale de la paix'],
    ['Nasyonzini fè 21 septanm tounen jounen lapè. An Ayiti, ensekirite ak gang anpeche anpil moun viv, travay ak voyaje. Lapè kòmanse nan ti bagay : rezoud yon diskisyon san vyolans, respekte vwazen, pwoteje timoun. Ansavo ka montre egzanp.',
     'L\'ONU a fait du 21 septembre la Journée de la paix. En Haïti, l\'insécurité et les gangs empêchent beaucoup de gens de vivre, travailler et voyager. La paix commence par de petites choses : régler un désaccord sans violence, respecter ses voisins, protéger les enfants. Anse-à-Veau peut montrer l\'exemple.'],
    ['Kisa ki fè yon kominote viv anpè ?', 'Qu\'est-ce qui permet à une communauté de vivre en paix ?'],
    'ONU');
  I('09-30', 'P', 1991,
    ['Koudeta 30 septanm 1991', 'Le coup d\'État du 30 septembre 1991'],
    ['30 septanm 1991, sèt mwa sèlman apre li fin pran pouvwa, lame a, ak jeneral Raoul Cédras devan, ranvèse pwezidan Jean-Bertrand Aristide ki te eli nan eleksyon lib. Aristide ale an egzil. Twa ane represyon swiv, ak anbago ki frape peyi a. Aristide retounen 15 oktòb 1994.',
     'Le 30 septembre 1991, sept mois seulement après son investiture, l\'armée dirigée par le général Raoul Cédras renverse le président Jean-Bertrand Aristide, élu lors d\'élections libres. Aristide part en exil. Suivent trois ans de répression et un embargo qui frappe durement le pays. Aristide revient le 15 octobre 1994.'],
    ['Kisa ki pi bon pwoteksyon kont koudeta ?', 'Quelle est la meilleure protection contre les coups d\'État ?'],
    'Archives de presse ; Bibliothèque Clinton (Haïti)');

  // ---------------- OCTOBRE ----------------
  I('10-02', 'I', 1937,
    ['Masak Pèsi', 'Le massacre du Persil'],
    ['2 rive 8 oktòb 1937, sou lòd diktatè dominiken Rafael Trujillo, lame dominiken masakre Ayisyen ki t ap viv bò fwontyè a, nan nòdwès Dominikani. Yo te fè moun di « perejil » (pèsi) pou chèche konnen ki moun ki Ayisyen. Kantite moun ki mouri a pa egzak : ant 14 000 ak 40 000 daprè istoryen yo. Anpil te mouri pandan y ap travèse rivyè Masak.',
     'Du 2 au 8 octobre 1937, sur ordre du dictateur dominicain Rafael Trujillo, l\'armée dominicaine massacre les Haïtiens vivant près de la frontière, dans le nord-ouest de la République dominicaine. On faisait prononcer « perejil » (persil) pour repérer les Haïtiens. Le bilan est incertain : entre 14 000 et 40 000 morts selon les historiens. Beaucoup meurent en traversant la rivière Massacre.'],
    ['Kisa relasyon ant de pèp zile a ta dwe ye jodi a ?', 'Quelle relation les deux peuples de l\'île devraient-ils avoir aujourd\'hui ?'],
    'Travaux historiques sur le massacre de 1937');
  I('10-04', 'S', 1963,
    ['Siklòn Flora (1963) ak Matthew (2016)', 'Les cyclones Flora (1963) et Matthew (2016)'],
    ['Nan nwit 3 pou 4 oktòb 1963, siklòn Flora, kategori 4, frape Sid Ayiti toupre Kòt Defè. Lapli fè ravaj, sitou Miragwàn. Anviwon 5 000 moun mouri. 4 oktòb 2016, siklòn Matthew, kategori 4 tou, antre toupre Les Anglais. Grandans ak Sid kraze, Nip te frape tou. Leta bay 674 moun mouri, lòt sous di plis.',
     'Dans la nuit du 3 au 4 octobre 1963, le cyclone Flora, de catégorie 4, frappe le Sud près de Côtes-de-Fer. Les pluies sont dévastatrices, notamment à Miragoâne. Environ 5 000 morts. Le 4 octobre 2016, l\'ouragan Matthew, lui aussi de catégorie 4, touche terre près des Anglais. La Grand\'Anse et le Sud sont dévastés, les Nippes aussi touchées. Bilan officiel : 674 morts, davantage selon d\'autres sources.'],
    ['Kisa siklòn Matthew te fè Ansavo ?', 'Qu\'a fait l\'ouragan Matthew à Anse-à-Veau ?'],
    'NOAA ; Gouvernement haïtien (2016)');
  I('10-05', 'E', 1994,
    ['Jounen mondyal pwofesè', 'Journée mondiale des enseignants'],
    ['UNESCO fete pwofesè yo chak 5 oktòb depi 1994. An Ayiti, anpil pwofesè travay ak ti salè, nan klas ki chaje, men yo kontinye fòme lavni peyi a. Jodi a, di yon pwofesè mèsi.',
     'L\'UNESCO célèbre les enseignants chaque 5 octobre depuis 1994. En Haïti, beaucoup d\'enseignants travaillent pour un petit salaire, dans des classes surchargées, mais continuent de former l\'avenir du pays. Aujourd\'hui, dites merci à un professeur.'],
    ['Ki pwofesè ki te chanje lavi w ?', 'Quel professeur a changé votre vie ?'],
    'UNESCO');
  I('10-08', 'I', 1820,
    ['Lanmò wa Henri Christophe', 'Mort du roi Henri Christophe'],
    ['8 oktòb 1820, wa Henri Christophe touye tèt li nan palè Sans-Souci, nan Milo, apre yon atak kè ak yon revòlt. Li te gouvène Nò a, li te fè konstwi Sitadèl Laferyè, pi gwo fòterès Amerik yo, pou defann endepandans lan. Depi 1982, Sitadèl la ak Sans-Souci nan patrimwàn mondyal UNESCO.',
     'Le 8 octobre 1820, le roi Henri Christophe se donne la mort au palais Sans-Souci, à Milot, après une attaque cérébrale et une révolte. Il avait gouverné le Nord et fait bâtir la Citadelle Laferrière, plus grande forteresse des Amériques, pour défendre l\'indépendance. Depuis 1982, la Citadelle et Sans-Souci sont au patrimoine mondial de l\'UNESCO.'],
    ['Èske w deja monte Sitadèl la ?', 'Êtes-vous déjà monté à la Citadelle ?'],
    'UNESCO (Parc national historique)');
  I('10-12', 'S', 1954,
    ['Siklòn Hazel', 'Le cyclone Hazel'],
    ['12 oktòb 1954, siklòn Hazel, kategori 3, frape Sid Ayiti toupre Chadonyè, epi l travèse peyi a. Inondasyon desann sot nan mòn yo. Okay ak Jeremi soufri anpil. Bilan : ant 400 ak 1 000 moun mouri daprè estimasyon yo. Gran moun nan Sid toujou sonje « siklòn Hazel ».',
     'Le 12 octobre 1954, l\'ouragan Hazel, de catégorie 3, frappe le Sud d\'Haïti près de Chardonnières puis traverse le pays. Des crues soudaines dévalent les mornes. Les Cayes et Jérémie sont durement touchées. Bilan estimé : entre 400 et 1 000 morts. Les anciens du Sud se souviennent encore du « cyclone Hazel ».'],
    ['Ki siklòn granmoun lakay ou pi sonje ?', 'De quel cyclone vos aînés se souviennent-ils le plus ?'],
    'NOAA ; UWI');
  I('10-15', 'P', 1994,
    ['Retou Aristide', 'Retour d\'Aristide'],
    ['15 oktòb 1994, Jean-Bertrand Aristide retounen Ayiti apre twa ane egzil. Yon fòs entènasyonal ak Etazini devan te debake nan mwa septanm, epi jeneral koudeta yo te kite pouvwa a. Se te fen gouvènman militè a. Lame ayisyen te demobilize an 1995.',
     'Le 15 octobre 1994, Jean-Bertrand Aristide rentre en Haïti après trois ans d\'exil. Une force internationale menée par les États-Unis avait débarqué en septembre et les généraux putschistes avaient quitté le pouvoir. C\'est la fin du régime militaire. L\'armée haïtienne est démobilisée en 1995.'],
    ['Kisa w sonje de ane 1991-1994 yo ?', 'Que vous rappellent les années 1991-1994 ?'],
    'Bibliothèque Clinton (Haïti) ; presse de l\'époque');
  I('10-16', 'E', 1945,
    ['Jounen mondyal manje', 'Journée mondiale de l\'alimentation'],
    ['16 oktòb se jou FAO te fonde an 1945. An Ayiti, anpil fanmi pa jwenn ase manje. Pouse manje lakay (jaden lakou, lapèch, elvaj) se fòs. Achte pwodwi lokal ede peyizan yo viv epi kenbe lajan an Ansavo.',
     'Le 16 octobre marque la fondation de la FAO en 1945. En Haïti, beaucoup de familles ne mangent pas à leur faim. Produire chez soi (jardin de cour, pêche, élevage) est une force. Acheter local aide les paysans à vivre et garde l\'argent à Anse-à-Veau.'],
    ['Ki manje lokal ou pi renmen ?', 'Quel est votre plat local préféré ?'],
    'FAO');
  I('10-17', 'F', 1806,
    ['Lanmò Desalin', 'Mort de Dessalines'],
    ['17 oktòb 1806, Jean-Jacques Dessalines, anperè Ayiti, tonbe nan yon anbiskad nan Pon Wouj, nan nò Pòtoprens. Se kèk nan pwòp jeneral li yo ki te fè konplo a. Se jou ferye nasyonal : chak ane, ofisyèl yo depoze flè nan Pon Wouj pou onore Papa Nasyon an.',
     'Le 17 octobre 1806, Jean-Jacques Dessalines, empereur d\'Haïti, tombe dans une embuscade au Pont-Rouge, au nord de Port-au-Prince, victime d\'un complot ourdi par certains de ses propres généraux. C\'est un jour férié national : chaque année, les autorités déposent une gerbe au Pont-Rouge en hommage au Père de la Nation.'],
    ['Si Desalin te viv pi lontan, kisa ki t ap diferan ?', 'Si Dessalines avait vécu plus longtemps, qu\'est-ce qui aurait changé ?'],
    'Calendrier des fêtes légales d\'Haïti ; historiographie');
  I('10-24', 'E', 1945,
    ['Jou Nasyonzini', 'Journée des Nations unies'],
    ['24 oktòb 1945, Chat Nasyonzini antre an vigè. Ayiti se youn nan peyi ki te fonde ONU a. Ajans tankou UNICEF, OMS, FAO ak PAM travay an Ayiti nan sante, edikasyon ak manje.',
     'Le 24 octobre 1945, la Charte des Nations unies entre en vigueur. Haïti fait partie des pays fondateurs de l\'ONU. Des agences comme l\'UNICEF, l\'OMS, la FAO et le PAM travaillent en Haïti dans la santé, l\'éducation et l\'alimentation.'],
    ['Kisa ONU ta dwe fè diferan an Ayiti ?', 'Que devrait faire l\'ONU différemment en Haïti ?'],
    'ONU');
  I('10-28', 'K', 1983,
    ['Jounen entènasyonal kreyòl', 'Journée internationale du créole'],
    ['28 oktòb se jounen kreyòl. Lide a soti nan mouvman Bannzil Kreyòl, ki fèt Sent Lisi an 1981 ; premye jounen an te fete an 1983. Plis pase 10 milyon moun pale kreyòl ayisyen, se lang kreyòl ki pi pale nan lemonn. Depi 1987, se lang ofisyèl Ayiti, epi Akademi Kreyòl Ayisyen an fonde an 2014.',
     'Le 28 octobre est la Journée du créole. L\'idée vient du mouvement Bannzil Kréyòl, né à Sainte-Lucie en 1981 ; la première journée a été célébrée en 1983. Plus de 10 millions de personnes parlent le créole haïtien, la langue créole la plus parlée au monde. Il est langue officielle d\'Haïti depuis 1987 et l\'Académie du créole haïtien a été fondée en 2014.'],
    ['Ki mo kreyòl ki pa gen tradiksyon an franse ?', 'Quel mot créole n\'a pas d\'équivalent en français ?'],
    'Bannzil Kréyòl ; Constitution de 1987 ; Akademi Kreyòl Ayisyen');
  I('10-31', 'I', 1919,
    ['Lanmò Charlemagne Péralte', 'Mort de Charlemagne Péralte'],
    ['Nan aswè 31 oktòb 1919, Charlemagne Péralte, chèf Kako yo ki t ap goumen kont okipasyon ameriken an, tonbe nan yon pyèj : yon trèt mennen de Marin ameriken degize nan kan li, yo tire l. Okipan yo kloure kadav li sou yon pòt epi yo pibliye foto a pou fè pè. Men foto sa a fè l tounen yon mati, senbòl rezistans.',
     'Le soir du 31 octobre 1919, Charlemagne Péralte, chef des Cacos en lutte contre l\'occupation américaine, tombe dans un piège : un traître guide deux Marines déguisés jusqu\'à son camp, où il est abattu. Les occupants attachent son corps à une porte et diffusent la photo pour faire peur. Mais l\'image fait de lui un martyr et le symbole de la résistance.'],
    ['Ki moun ou konsidere kòm ewo rezistans jodi a ?', 'Qui considérez-vous comme un héros de la résistance aujourd\'hui ?'],
    'Archives militaires américaines ; Bucknell University');

  // ---------------- NOVEMBRE ----------------
  I('11-01', 'R', null,
    ['Latousen', 'La Toussaint'],
    ['1ye novanm se fèt tout sen yo, jou ferye an Ayiti. Anpil moun ale legliz, epi yo prepare simityè a pou jou demen, Jou Lemò. Se kòmansman de jou pou sonje moun ki ale yo.',
     'Le 1er novembre, fête de tous les saints, est férié en Haïti. Beaucoup vont à l\'église et préparent le cimetière pour le lendemain, Jour des Morts. C\'est le début de deux jours consacrés à ceux qui sont partis.'],
    ['Kijan fanmi w fete Latousen ?', 'Comment votre famille célèbre-t-elle la Toussaint ?'],
    'Calendrier des fêtes légales d\'Haïti');
  I('11-02', 'K', null,
    ['Jou Lemò ak fèt Gede', 'Jour des Morts et fête des Guédé'],
    ['2 novanm se Jou Lemò, jou ferye. Fanmi yo netwaye e fleri tonm yo, yo limen bouji. Nan tradisyon vodou, se fèt Gede yo, lwa lanmò ak lavi, ak Bawon Samdi kòm chèf : mizik, ri, pawòl pike. Se yon fason pou di : menm nan lanmò, lavi kontinye.',
     'Le 2 novembre est le Jour des Morts, férié. Les familles nettoient et fleurissent les tombes, allument des bougies. Dans la tradition vodou, c\'est la fête des Guédé, esprits de la mort et de la vie, menés par Baron Samedi : musique, rires, paroles piquantes. Une manière de dire que, même dans la mort, la vie continue.'],
    ['Ki moun ou ta renmen sonje jodi a ?', 'De qui aimeriez-vous vous souvenir aujourd\'hui ?'],
    'Calendrier des fêtes légales d\'Haïti ; traditions populaires');
  I('11-18', 'F', 1803,
    ['Batay Vètyè', 'La bataille de Vertières'],
    ['18 novanm 1803, toupre Okap, lame endijèn Dessalines kraze dènye fòs franse Rochambeau yo. François Capois, yo rele Capois-La-Mort, monte ofansiv la menm lè chwal li tonbe anba l. Franse yo menm te salye kouraj li. Rochambeau kapitile, epi sis semèn apre, 1ye janvye 1804, Ayiti pwoklame endepandans li. Se fèt Lame tou.',
     'Le 18 novembre 1803, près du Cap, l\'armée indigène de Dessalines écrase les dernières troupes françaises de Rochambeau. François Capois, dit Capois-La-Mort, mène l\'assaut même quand son cheval s\'effondre sous lui ; les Français eux-mêmes saluent son courage. Rochambeau capitule et, six semaines plus tard, le 1er janvier 1804, Haïti proclame son indépendance. C\'est aussi la fête de l\'Armée.'],
    ['Kisa Vètyè anseye nou sou fòs inite ?', 'Que nous apprend Vertières sur la force de l\'unité ?'],
    'Calendrier des fêtes légales d\'Haïti ; historiographie de la Révolution');
  I('11-20', 'E', 1989,
    ['Jounen mondyal timoun', 'Journée mondiale de l\'enfance'],
    ['20 novanm 1989, ONU adopte Konvansyon sou dwa timoun. Chak timoun gen dwa ale lekòl, jwe, jwenn swen, epi viv san vyolans. An Ayiti, anpil timoun travay twò bonè oswa ap viv lwen fanmi yo kòm « restavèk ». Pwoteje timoun se pwoteje lavni.',
     'Le 20 novembre 1989, l\'ONU adopte la Convention relative aux droits de l\'enfant. Chaque enfant a le droit d\'aller à l\'école, de jouer, d\'être soigné et de vivre sans violence. En Haïti, beaucoup d\'enfants travaillent trop tôt ou vivent loin de leur famille comme « restavèk ». Protéger les enfants, c\'est protéger l\'avenir.'],
    ['Ki dwa timoun ki pi enpòtan pou ou ?', 'Quel droit de l\'enfant vous semble le plus important ?'],
    'UNICEF');
  I('11-25', 'E', 1960,
    ['Jounen kont vyolans sou fanm', 'Journée contre la violence faite aux femmes'],
    ['ONU chwazi 25 novanm pou sonje sè Mirabal yo, twa militan touye 25 novanm 1960 sou diktati Trujillo, Dominikani. Vyolans sou fanm se pa yon zafè prive : kou, presyon, vyòl, anpeche yon fanm travay. Si w viktim oswa w konnen yon viktim, pale ak yon moun ou fè konfyans.',
     'L\'ONU a choisi le 25 novembre en mémoire des sœurs Mirabal, trois militantes assassinées le 25 novembre 1960 sous la dictature de Trujillo, en République dominicaine. La violence faite aux femmes n\'est pas une affaire privée : coups, pressions, viols, interdiction de travailler. Si vous êtes victime ou connaissez une victime, parlez-en à une personne de confiance.'],
    ['Kijan kominote a ka pwoteje fanm yo pi byen ?', 'Comment la communauté peut-elle mieux protéger les femmes ?'],
    'ONU Femmes');
  I('11-30', 'S', null,
    ['Fen sezon siklòn', 'Fin de la saison cyclonique'],
    ['30 novanm, sezon siklòn Atlantik la fini. Men pa bliye : Flora (1963), Hazel (1954), Jeanne (2004), Matthew (2016)… chak gwo siklòn te frape nan sezon sa a. Pwofite mwa sèk yo pou repare do kay, plante pyebwa epi netwaye ravin anvan 1ye jen.',
     'Le 30 novembre, la saison cyclonique de l\'Atlantique se termine. N\'oublions pas : Flora (1963), Hazel (1954), Jeanne (2004), Matthew (2016)… tous ont frappé pendant cette saison. Profitez des mois secs pour réparer les toitures, planter des arbres et curer les ravines avant le 1er juin.'],
    ['Kisa fanmi w ap ranje anvan pwochen sezon an ?', 'Que va réparer votre famille avant la prochaine saison ?'],
    'NOAA');

  // ---------------- DÉCEMBRE ----------------
  I('12-01', 'E', 1988,
    ['Jounen mondyal kont SIDA', 'Journée mondiale de lutte contre le sida'],
    ['Depi 1988, 1ye desanm se jounen kont SIDA. An Ayiti, tretman antiretwoviral yo gratis nan anpil sant sante, epi yon moun ki swiv tretman li ka viv lontan. Fè tès depistaj, pwoteje tèt ou, pa rejte moun ki gen viris la.',
     'Depuis 1988, le 1er décembre est la journée de lutte contre le sida. En Haïti, les traitements antirétroviraux sont gratuits dans de nombreux centres de santé, et une personne qui suit son traitement peut vivre longtemps. Faites-vous dépister, protégez-vous, ne rejetez pas les personnes séropositives.'],
    ['Ki kote moun ka fè tès depistaj Ansavo ?', 'Où peut-on se faire dépister à Anse-à-Veau ?'],
    'ONUSIDA ; OMS');
  I('12-03', 'E', 1992,
    ['Jounen moun ki andikape', 'Journée des personnes handicapées'],
    ['Depi 1992, 3 desanm se jounen pou dwa moun ki gen andikap. Apre 12 janvye 2010, anpil Ayisyen vin andikape. Ran, eskalye, lekòl ak travay dwe ouvè pou tout moun. Yon andikap pa diminye valè yon moun.',
     'Depuis 1992, le 3 décembre est consacré aux droits des personnes handicapées. Après le 12 janvier 2010, beaucoup d\'Haïtiens sont devenus handicapés. Rampes, escaliers, écoles et emplois doivent être accessibles à tous. Un handicap ne diminue pas la valeur d\'une personne.'],
    ['Ki sa Ansavo ka fè pou moun ki gen andikap ?', 'Que peut faire Anse-à-Veau pour les personnes handicapées ?'],
    'ONU');
  I('12-06', 'I', 1492,
    ['Kristòf Kolon rive Ayiti', 'Christophe Colomb arrive en Haïti'],
    ['6 desanm 1492, Kristòf Kolon rive nan Mòl Sen Nikola, nan nòdwès zile a. Tayino yo te rele l Ayiti, « tè mòn yo ». 25 desanm, bato Santa María a koule bò Okap ; ak bwa li, yo bati fò Navidad. Nan mwens pase yon syèk, prèske tout Tayino yo mouri akoz travay fòse, vyolans ak maladi.',
     'Le 6 décembre 1492, Christophe Colomb accoste au Môle Saint-Nicolas, au nord-ouest de l\'île. Les Taïnos l\'appelaient Ayiti, « terre des montagnes ». Le 25 décembre, la Santa María s\'échoue près du Cap ; avec son bois, on bâtit le fort de la Navidad. En moins d\'un siècle, presque tous les Taïnos ont disparu, victimes du travail forcé, des violences et des maladies.'],
    ['Ki mo Tayino nou toujou itilize jodi a ?', 'Quels mots taïnos utilisons-nous encore aujourd\'hui ?'],
    'Journal de bord de Colomb ; historiographie');
  I('12-10', 'E', 1948,
    ['Jounen dwa moun', 'Journée des droits de l\'homme'],
    ['10 desanm 1948, ONU adopte Deklarasyon inivèsèl dwa moun. Premye atik la di : « Tout moun fèt lib, egal ego nan diyite ak nan dwa. » Ayiti te deja ekri prensip sa a nan san an 1804. Konnen dwa ou se premye pa pou defann yo.',
     'Le 10 décembre 1948, l\'ONU adopte la Déclaration universelle des droits de l\'homme. Son premier article proclame : « Tous les êtres humains naissent libres et égaux en dignité et en droits. » Haïti l\'avait déjà écrit dans le sang en 1804. Connaître ses droits est le premier pas pour les défendre.'],
    ['Ki dwa ou santi yo pa respekte bò kote w ?', 'Quel droit vous semble le moins respecté autour de vous ?'],
    'ONU');
  I('12-16', 'P', 1990,
    ['Eleksyon 16 desanm 1990 ak soup joumou nan UNESCO', 'Élections du 16 décembre 1990 et soupe joumou à l\'UNESCO'],
    ['16 desanm 1990, Ayisyen vote nan premye eleksyon lib ak demokratik istwa peyi a : Jean-Bertrand Aristide eli ak anviwon 67 % vwa. 31 an apre, 16 desanm 2021, UNESCO enskri soup joumou sou lis eritaj kiltirèl imateryèl limanite : yon onè pou istwa libète nou.',
     'Le 16 décembre 1990, les Haïtiens votent lors des premières élections libres et démocratiques de leur histoire : Jean-Bertrand Aristide est élu avec environ 67 % des voix. 31 ans plus tard, le 16 décembre 2021, l\'UNESCO inscrit la soupe joumou sur la liste du patrimoine culturel immatériel de l\'humanité : un hommage à notre histoire de liberté.'],
    ['Ki sa yon bon eleksyon bezwen ?', 'De quoi une bonne élection a-t-elle besoin ?'],
    'UNESCO (16e session, 2021) ; presse de l\'époque');
  I('12-25', 'R', null,
    ['Nwèl', 'Noël'],
    ['25 desanm se Nwèl, jou ferye. An Ayiti, se fèt fanmi : mès minwi, kremas, fanal, ti lanp koulè nan lakou. Lontan, timoun te konn fè fanal an katon ak papye koulè, epi lekòl yo te konn fè konkou fanal. Se yon moman pou pataje ak moun ki pa genyen.',
     'Le 25 décembre, Noël, est férié. En Haïti, c\'est une fête de famille : messe de minuit, kremas, fanals, guirlandes dans les cours. Autrefois, les enfants fabriquaient des fanals en carton et papier coloré, et des concours étaient organisés. Un moment pour partager avec ceux qui n\'ont rien.'],
    ['Kijan Nwèl Ansavo te ye lontan ?', 'Comment se passait Noël à Anse-à-Veau autrefois ?'],
    'Traditions populaires');

  // ---------------- FÈT CHANPÈT (fêtes patronales) ----------------
  // Seulement des fêtes vérifiées (sources en commentaire). Les autres communes des Nippes s'ajoutent ici :
  // [date, ville, saint en créole, saint en français]
  C.P = ['Fèt chanpèt', 'Fête patronale'];
  I('07-26', 'P', null,
    ['Fèt chanpèt Ansavo : Sent Àn', 'Fête patronale d\'Anse-à-Veau : Sainte Anne'],
    ['26 jiyè, Ansavo fete Sent Àn, manman Lavyèj Mari, « grann » nou tout. Katedral Sent Àn nan se katedral dyosèz Ansavo-Miragwàn, ki fonde an 2008. Se pi gwo fèt lavil la : mès, pwosesyon, bal, konpetisyon, epi pitit Ansavo ki lavil ak nan dyaspora retounen lakay. Limonad, nan Nò, fete Sent Àn menm jou a tou.',
     'Le 26 juillet, Anse-à-Veau fête sainte Anne, mère de la Vierge Marie, la « grand-mère » de tous. La cathédrale Sainte-Anne est celle du diocèse d\'Anse-à-Veau et Miragoâne, créé en 2008. C\'est la plus grande fête de la ville : messe, procession, bals, compétitions, et les enfants d\'Anse-à-Veau partis en ville ou dans la diaspora reviennent au pays. Limonade, dans le Nord, fête aussi sainte Anne ce jour-là.'],
    ['Ki pi bèl souvni ou genyen nan fèt Sent Àn Ansavo ?', 'Quel est votre plus beau souvenir de la fête de Sainte-Anne à Anse-à-Veau ?'],
    'HaitiLibre (fête patronale d\'Anse-à-Veau, 2016) ; GCatholic (cathédrale Sainte-Anne)');
  var CH = [
    ['03-19', 'Fò Libète', 'Fort-Liberté', 'Sen Jozèf', 'Saint Joseph'],
    ['03-19', 'Lazil', 'L\'Asile', 'Sen Jozèf', 'Saint Joseph'],   // donné par Masbet (01/11/2026)
    ['04-25', 'Sen Mak', 'Saint-Marc', 'Sen Mak', 'Saint Marc'],
    ['04-29', 'Anò', 'Arnaud', 'Sent Katrin de Syèn', 'Sainte Catherine de Sienne'],   // donné par Masbet (01/11/2026)
    ['04-29', 'Plezans di Sid', 'Plaisance-du-Sud', 'Sent Katrin de Syèn', 'Sainte Catherine de Sienne'],   // donné par Masbet (01/11/2026)
    ['05-01', 'Jakmèl', 'Jacmel', 'Sen Filip ak Sen Jak', 'Saint Philippe et saint Jacques'],
    ['05-24', 'Gran Boukan', 'Grand-Boucan', 'Mari Oksilyatris', 'Marie Auxiliatrice'],   // donné par Masbet (01/11/2026)
    ['06-13', 'Ti Rivyè de Nip', 'Petite-Rivière-de-Nippes', 'Sen Antwàn', 'Saint Antoine'],   // donné par Masbet (01/11/2026)
    ['06-24', 'Miragwàn', 'Miragoâne', 'Sen Jan Batis', 'Saint Jean-Baptiste'],
    ['06-29', 'Petyonvil', 'Pétion-Ville', 'Sen Pyè', 'Saint Pierre'],
    ['07-16', 'Sodo', 'Saut-d\'Eau', 'Nòt Dam Mon Kamèl, gwo pèlerinaj', 'Notre-Dame du Mont-Carmel, grand pèlerinage'],
    ['07-16', 'Fon de Nèg', 'Fonds-des-Nègres', 'Nòt Dam Mon Kamèl', 'Notre-Dame du Mont-Carmel'],   // donné par Masbet (01/11/2026)
    ['07-25', 'Plèn dinò', 'Plaine-du-Nord', 'Sen Jak, pèlerinaj', 'Saint Jacques, pèlerinage'],
    ['07-26', 'Ansavo', 'Anse-à-Veau', 'Sent Àn', 'Sainte Anne'],
    ['07-26', 'Limonad', 'Limonade', 'Sent Àn', 'Sainte Anne'],
    ['08-15', 'Pòtoprens', 'Port-au-Prince', 'Notre-Dame de l\'Assomption', 'Notre-Dame de l\'Assomption'],
    ['08-15', 'Okap', 'Cap-Haïtien', 'Notre-Dame de l\'Assomption', 'Notre-Dame de l\'Assomption'],
    ['08-15', 'Okay', 'Les Cayes', 'Notre-Dame de l\'Assomption', 'Notre-Dame de l\'Assomption'],
    ['08-25', 'Jeremi', 'Jérémie', 'Sen Lwi', 'Saint Louis'],
    ['08-30', 'Leyogàn', 'Léogâne', 'Sent Wòz de Lima', 'Sainte Rose de Lima'],
    ['09-08', 'Ti Twou de Nip', 'Petit-Trou-de-Nippes', 'Nòt Dam Nativite', 'Notre-Dame de la Nativité'],   // donné par Masbet (01/11/2026)
    ['11-04', 'Gonayiv', 'Gonaïves', 'Sen Chal Bowome', 'Saint Charles Borromée'],
    ['12-12', 'Payan', 'Paillant', 'Nòt Dam Gwadaloup', 'Notre-Dame de Guadalupe'],   // donné par Masbet (01/11/2026)
    ['12-08', 'Pòdepè', 'Port-de-Paix', 'Imakile Konsepsyon', 'Immaculée Conception']
  ];
  function et(l, mot) { return l.length < 2 ? l.join('') : l.slice(0, -1).join(', ') + ' ' + mot + ' ' + l[l.length - 1]; }
  var parJour = {};
  CH.forEach(function (c) { (parJour[c[0]] = parJour[c[0]] || []).push({ ht: c[1] + ' — ' + c[3], fr: c[2] + ' — ' + c[4] }); });
  Object.keys(parJour).forEach(function (d) {
    var deja = L.filter(function (x) { return x.d === d; })[0], v = parJour[d];
    if (deja) { deja.ch = v; return; }
    var vh = v.map(function (x) { return x.ht.split(' — ')[0]; }).join(', '), vf = v.map(function (x) { return x.fr.split(' — ')[0]; }).join(', ');
    L.push({ d: d, c: 'P', a: null, ch: v,
      t: ['Fèt chanpèt : ' + vh, 'Fête patronale : ' + vf],
      x: ['Jodi a, ' + et(v.map(function (x) { var p = x.ht.split(' — '); return p[0] + ' (' + p[1] + ')'; }), 'ak') + ' fete fèt chanpèt ' + (v.length > 1 ? 'yo' : 'li') + '. Fèt chanpèt se gwo moman kominote a : mès ak pwosesyon, men tou bal, mizik, konpetisyon, machann, ak tout pitit lavil la ki retounen lakay.',
          'Aujourd\'hui, ' + et(v.map(function (x) { var p = x.fr.split(' — '); return p[0] + ' (' + p[1] + ')'; }), 'et') + ' ' + (v.length > 1 ? 'célèbrent leur' : 'célèbre sa') + ' fête patronale. La fête patronale est un grand moment pour la communauté : messe et procession, mais aussi bals, musique, compétitions, marchands, et retour au pays de tous les enfants de la ville.'],
      k: ['Ki fèt chanpèt ou pa janm rate ?', 'Quelle fête patronale ne manquez-vous jamais ?'],
      s: 'Calendriers paroissiaux (Potomitan ; Haiti-Référence)' });
  });
  L.sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; });
  W.ISTWA = { cat: C, liste: L };
})(window);
