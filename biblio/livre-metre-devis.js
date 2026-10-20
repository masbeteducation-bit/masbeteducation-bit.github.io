(window.MASBET_LIVRES = window.MASBET_LIVRES || []).push({
id: 'metre-devis', domaine: 'ingenierie',
titre: 'Du métré au devis',
soustitre: 'Calculer les quantités de matériaux et le prix d\'un ouvrage en Haïti',
sources: [
 'Documents de cours « Calcul de métré et devis » et « Métré et devis » (pratique haïtienne : blocs, fers, coffrage, finitions, sous-détail des prix), transmis à Masbet Education.',
 'Fiches « Dosage du béton » et « Mortiers et bétons » transmises à Masbet Education.',
 'Collection technique CIMBÉTON, document CT-G11, transmis à Masbet Education.',
 'Correction apportée par Masbet Education : un béton dosé à 350 kg/m³ demande environ 8,25 sacs de 42,5 kg par m³ (350 ÷ 42,5), et non 3,5 sacs ; 3,5 sacs correspond à un béton de propreté dosé à 150 kg/m³.',
 'Offre technique et financière d\'un marché de travaux en Haïti (bordereau, devis estimatif, sous-détails, méthodologie, risques), transmise par son auteur à Masbet Education ; seuls la méthode et un exemple de prix sont repris.',
 'Synthèse et exemples rédigés par Masbet Education ; sauf mention contraire, les prix des exemples sont fictifs. Les ratios sont des valeurs courantes : ils ne remplacent ni les plans, ni la note de calcul, ni l\'avis de l\'ingénieur responsable du chantier.'
],
chapitres: [
{ titre: 'Du plan au devis : la méthode', texte:
`Un devis sérieux se construit toujours dans le même ordre :
1. **Le métré** (ou avant-métré) : on mesure sur les plans chaque ouvrage, dans son unité (m³ de béton, m² de mur, ml de fer, unité de porte…).
2. **Les quantités de matériaux** : on transforme chaque ouvrage en sacs de ciment, m³ de sable et de gravier, barres de fer, blocs, plywood…
3. **Le sous-détail des prix** : on calcule ce que coûte vraiment une unité d'ouvrage (matériaux, transport, main-d'œuvre, imprévus, frais).
4. **Le devis estimatif** : quantité × prix unitaire pour chaque ligne, regroupée par lots (terrassement, fondation, élévation, dalle, finitions), puis les totaux.

## Les bonnes habitudes du métré
- Mesurer dans un ordre fixe : **longueur × largeur × hauteur**, et noter le nombre d'éléments identiques.
- Travailler **lot par lot**, de la fondation vers la toiture, pour ne rien oublier.
- **Déduire les ouvertures** (portes, fenêtres) des surfaces de murs, d'enduit et de peinture.
- Ne pas compter deux fois le même volume : à la rencontre d'une colonne et d'une poutre, le béton n'appartient qu'à un seul des deux.
- Garder ses calculs : le client ou le contrôleur doit pouvoir les vérifier.

## Les unités du chantier haïtien
|Unité|Valeur|
|Sac de ciment|42,5 kg (usage général ou structurel), le format courant en Haïti ; 50 kg dans certains cas : vérifiez le sac acheté et le cahier des charges|
|Gallon|3,785 litres|
|Drum|54 gallons (environ 204 litres)|
|Barre de fer|20 pieds (≈ 6 m) pour le 1/4", 30 pieds (≈ 9 m) pour les autres diamètres|
|Feuille de plywood|4' × 8' (1,20 × 2,40 m), soit 2,88 m²|
|Brouette|65 à 70 litres|
|Canter (petit camion à benne)|2,25 m³, environ 25 brouettes|
|Camion à benne 6 roues / 10 roues|5 à 6 m³ / 11 à 12 m³|
|Rouleau de fil à ligaturer|50 livres|
|Clous 2 ½" AT|environ 90 clous par livre|

> Dans Masbet Suite
> Le bouton 🧮 Métré fait ces calculs pour vous et ajoute l'ouvrage ou ses matériaux au devis. Le bouton Σ de chaque ligne ouvre le sous-détail du prix.` },
{ titre: 'Terrassement : fouilles et remblai', texte:
`## Les fouilles
Volume en place = longueur × largeur × profondeur × nombre.

Une terre creusée **gonfle** : elle prend plus de place qu'avant. C'est le **foisonnement**. Pour savoir combien de voyages de camion il faut pour évacuer les déblais, on multiplie le volume en place par un coefficient, souvent autour de **1,25** (il varie selon le sol : sable, argile, roche).

> Exemple
> 8 semelles de 1,20 m × 1,20 m sur 1,00 m de profondeur : 1,2 × 1,2 × 1,0 × 8 = 11,52 m³ en place. Déblais à évacuer : 11,52 × 1,25 ≈ 14,4 m³, soit 3 voyages d'un camion de 5 m³.

## Le remblai
À l'inverse, un remblai se **tasse** au compactage. On commande donc plus de matériau que le volume à remplir : coefficient **1,3** dans les documents de cours.

> Exemple
> Remblayer 50 m² sur 0,50 m : 25 m³ à remplir, soit 25 × 1,3 = 32,5 m³ de tout-venant à commander.` },
{ titre: 'Les bétons', texte:
`Le **dosage** d'un béton est la masse de ciment par m³ de béton. Plus il est élevé, plus le béton est résistant, à condition de ne pas noyer le mélange d'eau.

## Le ciment : sacs de 42,5 kg
Nombre de sacs par m³ = **dosage ÷ 42,5**.
|Dosage|Usage courant|Sacs de 42,5 kg par m³|Eau par m³|
|150 kg/m³|Béton de propreté|3,5|30 gallons|
|250 kg/m³|Parquet (macadam), béton non armé|5,9|60 gallons|
|300 kg/m³|Béton armé peu sollicité|7,1|60 gallons|
|350 kg/m³|Semelles, socles, chaînages, colonnes, poutres, linteaux, dalle, escalier|8,25|60 gallons|
|400 kg/m³|Ouvrages très sollicités|9,4|60 gallons|

Dans certains cas (fournisseur, cahier des charges), le sac pèse 50 kg : on divise alors par 50 (150 kg/m³ = 3 sacs). Masbet Suite laisse choisir le poids du sac dans « Mon en-tête » ; 42,5 kg est réglé par défaut.

## Le sable et le gravier
Pour 1 m³ de béton, la pratique haïtienne retient :
|Type de sable|Sable|Gravier|
|Sable blanc|0,9 m³|0,5 m³|
|Sable de rivière ou sable moulin|0,5 m³|0,9 m³|

> Attention à deux erreurs fréquentes
> 1. « Semelles à 350 kg/m³ : 3,5 sacs par m³ » est faux : 3,5 sacs donnent environ 150 kg, le dosage d'un béton de propreté. Il faut environ 8,25 sacs.
> 2. « Parquet à 250 kg/m³ : 8 sacs par m³ » est faux aussi : 8 sacs correspondent à environ 340 kg. Pour 250 kg/m³, il faut environ 5,9 sacs.
> On lit souvent « 8 sacs » pour 350 kg/m³ : c'est un arrondi de 8,24. Pour un devis, on calcule le total puis on arrondit au sac supérieur.

## Les pertes
On ajoute **5 %** environ au volume pour les pertes (gâchage, coffrages qui ne sont pas parfaits).

> Exemple
> 8 semelles de 1,20 × 1,20 × 0,30 m à 350 kg/m³, sable blanc : 3,456 m³, soit 3,63 m³ avec 5 % de pertes.
> Ciment : 3,63 × 350 ÷ 42,5 ≈ 29,9, donc 30 sacs. Sable : 3,63 × 0,9 ≈ 3,3 m³. Gravier : 3,63 × 0,5 ≈ 1,8 m³. Eau : 3,63 × 60 ≈ 218 gallons, un peu plus de 4 drums de 54 gallons (prévoir 5).

## Les règles de bonne mise en œuvre
- Granulats **propres** : pas de terre ni de matière organique dans le sable et le gravier.
- **Pas d'eau en trop** : chaque seau d'eau ajouté pour « faciliter » le coulage fait perdre de la résistance.
- **Vibrer ou piquer** le béton pour chasser l'air, surtout dans les colonnes.
- **Arroser** (cure) le béton pendant au moins 7 jours pour qu'il ne sèche pas trop vite au soleil.
- Respecter l'**enrobage** : le fer ne doit jamais toucher le coffrage ni le sol.` },
{ titre: 'La maçonnerie : blocs et roches', texte:
`## Le mur en blocs
Surface du mur = longueur × hauteur − ouvertures. On compte environ **13 blocs par m²**, plus **5 %** de pertes (casse, coupes).

|Bloc|Blocs posés par sac de ciment|Sable par bloc|
|10 cm|70|0,003 m³|
|15 cm|50|0,004 m³|
|20 cm|30|0,005 m³|

L'eau du mortier : environ **0,16 gallon par bloc**.

> Exemple
> Un mur de 4 m × 2,80 m avec une porte de 0,90 × 2,10 m : 11,20 − 1,89 = 9,31 m².
> Blocs de 15 : 9,31 × 13 × 1,05 ≈ 128 blocs. Ciment : 128 ÷ 50 ≈ 3 sacs. Sable : 128 × 0,004 ≈ 0,5 m³. Eau : 128 × 0,16 ≈ 21 gallons.

## La maçonnerie de roches
Utilisée en fondation et en murs de soutènement. Pour **1 m³** de maçonnerie :
|Matériau|Quantité|
|Roches|volume × 1,2|
|Sable|0,6 m³|
|Ciment|1,75 sac|
|Eau|30 gallons|

Les roches doivent être dures, propres et bien imbriquées ; les vides se remplissent de mortier, jamais de terre.` },
{ titre: 'Les aciers', texte:
`## Poids des barres
|Diamètre|Barre de 20' (lb)|Barre de 30' (lb)|
|1/4"|3,34|5,01|
|3/8"|7,52|11,28|
|1/2"|13,36|20,04|
|5/8"|20,86|31,29|
|3/4"|30,04|45,06|
|7/8"|40,88|61,32|
|1"|53,40|80,10|

## Les fers longitudinaux
On compte le nombre de morceaux et leur longueur, puis on voit combien de morceaux sortent d'une barre, pour **limiter les chutes**.

> Exemple
> Une poutre de 4,50 m avec 4 fers de 1/2" : une barre de 30' (≈ 9 m) donne 2 morceaux de 4,50 m. Il faut 4 ÷ 2 = 2 barres, soit 2 × 20,04 = 40,08 lb.

Quand un fer doit être plus long qu'une barre, on prévoit un **recouvrement** (chevauchement) des barres, souvent exprimé en nombre de fois le diamètre ; sa valeur est fixée par la note de calcul.

## Les cadres et étriers
Nombre de cadres = (longueur ÷ espacement) + 1, pour chaque élément. On multiplie par la longueur développée d'un cadre (les quatre côtés plus les crochets).

> Exemple
> Poutre de 4,50 m, cadres en 1/4" tous les 15 cm, 0,50 m par cadre : 4,50 ÷ 0,15 + 1 = 31 cadres ; 31 × 0,50 = 15,5 ml ; 3 barres de 20' (6 m), soit 3 × 3,34 ≈ 10 lb.

## Le fil à ligaturer
Environ **2 %** du poids total des fers.` },
{ titre: 'Implantation et coffrages', texte:
`## L'implantation
Par colonne ou par tranchée : **2 cross-bars**, 1 latte par cross-bar, 1,5 bois dur par cross-bar, 10 clous 2 ½" par cross-bar, et de la ficelle #48 ou #36.

## Les coffrages courants
|Coffrage|Planches|Bois durs|Clous 2 ½"|Autres|
|Socle à l'angle (2 parties), par socle|4|4|40|4 tasseaux|
|Socle plat (1 partie), par socle|2|2|20|2 tasseaux|
|Chaînage inférieur|(ml ÷ longueur d'une planche) × 2|1,5 par ml|10 par ml| |
|Poutres|(ml ÷ longueur d'une planche) × 3|3 par ml|20 par ml| |
|Linteaux rectangulaires|(ml ÷ longueur d'une planche) × 2|0,5 par ml|20 par ml| |
|Colonnes, par colonne|1 planche par face et par longueur de planche|2 par planche|60|4 tasseaux par face|

Les clous se comptent en livres : nombre de clous ÷ 90.

## Le coffrage de la dalle
|Élément|Ratio courant|
|Plywood 4' × 8'|surface ÷ 2,88 m²|
|Étaiement en bois durs|5 par m² (maille de 0,60 m)|
|ou étais métalliques|2 par m² (maille de 1,20 m)|
|Clous|50 par plywood : 70 % de 2 ½" et 30 % de 4"|
|Bois 2" × 4" × 14'|0,60 par m² (traverses et filières)|
|Bois 2" × 4" × 12'|0,80 par m²|

On choisit **l'un ou l'autre** étaiement : bois durs ou étais métalliques. Le coffrage se réutilise plusieurs fois : bien le nettoyer et le stocker baisse le prix des chantiers suivants.

## Les hourdis
En gros : **surface de la dalle × 6**. Pour un compte exact, on prend la mesure entre axes, on retire la largeur des poutres, on divise par 0,20 m et on multiplie par le nombre de rangées. Ajoutez quelques pièces pour la casse.

> Sécurité
> Ne jamais décoffrer une dalle trop tôt : on respecte le délai donné par l'ingénieur et on garde des étais de sécurité.` },
{ titre: 'Les finitions', texte:
`## Le crépissage et l'enduit
Volume de mortier = surface × épaisseur, plus environ 10 % de pertes. Avec un mortier dosé à 400 kg/m³, le ciment vaut volume × 400 ÷ 42,5 sacs. Prévoir aussi l'échafaudage (plywood, bois 2" × 4", bois durs, clous).

> Exemple
> 20 m² d'enduit de 2 cm : 20 × 0,02 × 1,10 = 0,44 m³ de mortier, soit 0,44 × 400 ÷ 42,5 ≈ 4,1, donc 5 sacs de ciment (on arrondit toujours au sac supérieur).

## La céramique
Par m² posé :
|Matériau|Quantité|
|Ciment gris|0,20 sac|
|Ciment blanc (joints)|0,015 sac|
|Sable|0,05 m³|
|Céramique|surface + 5 % pour les coupes et la casse ; bordures : 0,11 m² par mètre linéaire|

## La peinture
Une peinture courante couvre environ **13 m² par gallon et par couche**. Gallons = surface × nombre de couches ÷ 13. Papier sablé : 3 par gallon. Le mastic s'évalue au forfait.

> Exemple
> 100 m² de murs, 2 couches : 100 × 2 ÷ 13 ≈ 15,4, donc 16 gallons et 48 papiers sablés.` },
{ titre: 'Le sous-détail des prix', texte:
`Le **prix unitaire** d'un ouvrage ne se devine pas : il se calcule. Les dossiers d'appel d'offres (ministères, projets financés, ONG) demandent un sous-détail pour **chaque prix** du bordereau, presque toujours dans la même forme.

## Les quatre groupes du coût sec
1. **Matériaux et fournitures** : chaque matériau, sa quantité, son unité et son prix.
2. **Main-d'œuvre** : maçons, ferrailleurs, coffreurs, manœuvres, en jours, en heures ou à la tâche.
3. **Matériel** : bétonnière, vibreur, petit outillage, location d'engins, en heures de service.
4. **Transport, assurance et dépenses connexes** : livraison, évacuation, assurances liées à l'ouvrage.

**Coût sec** (ou déboursé sec) = (1) + (2) + (3) + (4).

## Du coût sec au prix de vente
On ajoute, en **pourcentage du coût sec** :
|Poste|Valeur courante|
|Imprévus|10 %|
|Taxes|2 %|
|Frais généraux et autres coûts|8 %|
|Profit|5 %|

Le **prix de vente** = coût sec × **K**, avec K = 1 + la somme des pourcentages. Avec les valeurs ci-dessus, **K = 1,25**.

On établit en général le sous-détail **pour une unité** (1 m³, 1 m², 1 kg). Si on le fait pour toute la quantité d'une ligne, on divise ensuite le prix de vente par cette quantité.

> Exemple : 1 m³ de béton de propreté dosé à 150 kg/m³ (prix d'exemple en dollars)
> Matériaux : 3,5 sacs de 42,5 kg × 15,50 + 0,45 m³ de sable × 42 + 0,85 m³ de gravier × 52 + eau 6 = 123,35 USD.
> Main-d'œuvre (équipe de bétonnage) : 48 USD. Matériel (bétonnière et petit outillage) : 10,62 USD.
> Coût sec : 181,97 USD. Imprévus 18,20 ; taxes 3,64 ; frais généraux 14,56 ; profit 9,10.
> Prix de vente : **227,47 USD le m³** (soit coût sec × 1,25, aux arrondis près).

## Les prix changent : inflation et monnaies
Les prix des matériaux bougent vite. Avant chaque devis :
- **mettez vos prix à jour** et notez la date ; un devis porte toujours sa date et sa durée de validité (30 jours, par exemple) ;
- pour reprendre un ancien devis, **révisez** les prix d'un pourcentage (par exemple + 8 %) ou remplacez-les par vos prix du jour ;
- indiquez la **monnaie** (HTG ou USD) et, si le client le demande, l'équivalent dans l'autre monnaie avec le **taux utilisé** (1 USD = … HTG) et sa date.

## Garder la même règle partout
Un évaluateur compare les sous-détails entre eux. Si la plupart des prix sont calculés avec K = 1,25 et quelques-uns avec d'autres pourcentages sans explication, cela attire des questions. Choisissez vos coefficients une fois, et justifiez toute exception.

## Les erreurs qui ruinent un devis
- Oublier un lot (fouilles, coffrage, transport des matériaux).
- Confondre les unités : m² et m³, gallon et litre, livre et kilogramme.
- Utiliser des prix anciens : datez votre devis et indiquez sa durée de validité.
- Arrondir vers le bas : on arrondit toujours au sac, à la barre et au bloc **supérieurs**.
- Compter deux fois les imprévus : s'ils sont déjà dans chaque sous-détail, ne les ajoutez pas une seconde fois au total.` },
{ titre: 'Répondre à un appel d\'offres', texte:
`Une offre de travaux complète comprend en général :
1. **Le bordereau des prix unitaires (BPU)** : chaque prix numéroté, avec sa désignation, ce qu'il comprend, son unité, et son montant **en chiffres et en lettres** (« Le mètre cube : treize dollars américains et 47/100 »). En cas de désaccord, c'est souvent le montant **en lettres** qui fait foi.
2. **Le devis estimatif (ou détail quantitatif et estimatif)** : les quantités × les prix du bordereau, par poste, avec les sous-totaux et le **total en lettres**.
3. **Les sous-détails des prix unitaires** : un tableau par prix, dans la forme des quatre groupes.
4. **La méthodologie** : organisation du chantier, installation, implantation, gros œuvre, second œuvre, aménagement extérieur, repli.
5. **Le calendrier d'exécution** : les tâches dans l'ordre, mois par mois (diagramme de Gantt), avec le délai total.
6. **Le plan de gestion des risques** : pour chaque activité, les impacts possibles (bruit, poussière, accidents, déchets, tensions sociales), les mesures d'atténuation, le responsable et la période.
7. **Le personnel et le matériel** : CV de l'ingénieur et de l'équipe, liste du matériel minimum.

## Ce que l'évaluateur vérifie
- **La cohérence** : le même ouvrage a le même prix dans le bordereau, le devis et le sous-détail ; les quantités du devis correspondent à la description des travaux.
- **Les unités** : un remblai se paie au m³, pas au m² ; l'unité du bordereau doit être celle du texte (« le mètre cube »).
- **Le bon texte au bon prix** : chaque prix décrit son propre ouvrage ; un texte copié d'un autre prix est une faute visible.
- **Les dosages** : un béton dosé à 250 kg/m³ ne peut pas coûter le même prix qu'un béton dosé à 350 kg/m³.
- **L'orthographe des montants en lettres** : « cinq cents » prend un s quand il termine le nombre (« dix mille cinq cents »), « quatre-vingts » aussi ; on écrit « 47/100 », pas « 47 100 ».
- **Les additions** : chaque sous-total, chaque total, et le total général en lettres.

## Quelques spécifications techniques courantes
|Élément|Exigence fréquente|
|Ciment|Portland type I (norme ASTM C150), en sacs d'origine, stocké au sec ; tout sac humide ou durci est refusé|
|Acier|Barres à haute adhérence, limite d'élasticité 60 000 psi (environ 420 MPa, grade 60)|
|Eau de gâchage|Propre, sans produits chimiques, peu de matières en suspension|
|Sable et gravier|Roches dures et propres, sans terre ni matière organique ; sable lavé pour le béton armé|
|Mortiers|Environ 300 kg de ciment par m³ de sable pour la maçonnerie de fondation, 400 kg pour les chapes, 600 kg pour les enduits étanches|
|Bétons|150 kg/m³ pour la propreté, 250 kg/m³ pour le béton non armé, 350 à 400 kg/m³ pour le béton armé|

> Dans Masbet Suite
> L'aperçu propose trois documents : **Devis estimatif**, **Bordereau des prix** (prix unitaires en lettres et texte « Ce prix comprend… ») et **Sous-détails** (un tableau par prix, en quatre groupes, avec K). Vos coefficients par défaut et le poids du sac se règlent dans « Mon en-tête ».` }
]
});
