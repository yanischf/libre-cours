# Libre Cours · site

Site statique en **HTML et CSS pur**. Le JavaScript se limite à deux améliorations, sans lesquelles tout fonctionne et tout reste lisible :

- la carte de la page Dates (Leaflet, chargé uniquement sur cette page) ; sans elle, la liste et les filtres marchent quand même ;
- les animations au défilement de l'accueil et de la page Accueillir (`src/anim.js`, ~1 Ko inclus dans la page). Le contenu n'est masqué que si le script tourne : sans JavaScript, pour les robots et les IA, ou avec le réglage « réduire les animations », tout s'affiche d'emblée.

Le dossier **`dist/`** est le site prêt à mettre en ligne. Il se dépose tel quel sur n'importe quel hébergeur statique (Netlify, Cloudflare Pages, GitHub Pages, OVH…).

## Modifier les dates et les traces

Les contenus sont dans `content/` :

- `content/rencontres.json` : les prochaines rencontres (quartier, lieu, adresse, date ISO avec fuseau, question, places, complet, coordonnées GPS, lien d'inscription). Vide pour l'instant ; `content/rencontres.exemple.json` montre le format, avec quatre rencontres fictives à recopier.
- `content/traces.json` : les rencontres passées (question, sujets ressortis, « Et depuis », photo).

Puis on régénère le site :

```bash
node build.mjs
```

Le générateur n'a aucune dépendance (Node 18 ou plus). Il calcule tout seul les tampons, les jours et heures (« Jeu. 8 oct · 19h »), le filtre par quartier, les données structurées et les fichiers pour les moteurs et les IA.

Règles automatiques :

- Les dates passées disparaissent au prochain `node build.mjs`. Pensez à relancer la génération après chaque rencontre.
- S'il n'y a aucune date à venir, la section « On se retrouve où ? » de l'accueil affiche « Annonce bientôt. » avec un bouton « Me prévenir », et la page Dates n'affiche que « Les premières rencontres se préparent. » avec le formulaire d'alerte (ni filtres ni carte).
- Sans `inscriptionUrl`, les boutons « Je m'inscris » ouvrent un mail vers bonjour@librecours.fr.
- `places: 0` ou `complet: true` affiche « Complet · liste d'attente ».
- `rot` (rotation du tampon) et `ring` (texte de l'anneau) sont facultatifs.

### Photos

Déposez les photos dans `src/images/` et renseignez le champ `photo` (ex. `"images/belleville-mars.jpg"`) dans `traces.json`. La photo de l'accueil s'appelle `src/images/moment.jpg`. Le traitement bichromie orange/noir est appliqué par le CSS ; sans photo, un aplat orange prend sa place. Pensez à compresser les images (JPEG ou WebP, 1600 px de large maximum).

## Voir le site en local

```bash
python3 -m http.server 4817 --directory dist
```

Puis ouvrir http://localhost:4817.

## Structure

```
content/               dates et traces (JSON)
src/style.css          la feuille de style unique
src/carte.js           la carte Leaflet (page Dates)
src/anim.js            les animations au défilement (rise, stamp, draw)
src/templates/         gabarits des pages (HTML dans des fonctions JS)
src/fonts/             Bagel Fat One et DM Mono, auto-hébergées (34 Ko)
src/vendor/leaflet/    Leaflet 1.9.4, auto-hébergé
src/racine/            image de partage et icônes, copiées à la racine
outils/visuels.mjs     régénère og.png et les icônes (macOS)
build.mjs              le générateur
dist/                  le site généré, à mettre en ligne
```

### Animations

Sur un élément, l'attribut `data-anim` choisit l'effet : `rise` (monte en apparaissant), `stamp` (coup de tampon avec rebond) ou `draw` (trait pointillé qui se dessine). Le décalage se règle avec `style="--d:300ms"`. Dans les gabarits, la fonction `anim('stamp', 300)` écrit les deux.

## Performances, accessibilité, référencement

- Pages de 5 à 27 Ko, un seul CSS de 25 Ko, polices préchargées et auto-hébergées, aucun appel à un service tiers (hors tuiles de la carte).
- Responsive sans breakpoint superflu : les grilles passent seules en une colonne ; un réglage sous 640 px resserre les marges. Le menu reste visible sur mobile (pas de burger).
- Lien d'évitement, focus visible partout, contrastes conformes, `prefers-reduced-motion` respecté, formulaire utilisable au clavier.
- HTML sémantique, balises `title`/`description`/`canonical`, Open Graph avec image 1200×630, données structurées schema.org (Organisation, Site, un `Event` par rencontre), `sitemap.xml`, `robots.txt` ouvert à tous les robots, et `llms.txt` qui résume le site et les dates pour les IA.

## À brancher avant la mise en ligne

1. **Adresse du site** : `https://librecours.xyz` (domaine OVH, déclaré dans les réglages Pages du dépôt ; la variable de dépôt `SITE_URL` fixe l'adresse utilisée par le déploiement). Pour générer avec une autre adresse : `SITE_URL=https://exemple.fr node build.mjs`.
2. **Formulaire « Me prévenir »** : il envoie à `merci.html`. Sur Netlify, rien à faire, les inscriptions arrivent dans l'onglet Forms. Ailleurs, générez avec l'URL de votre outil d'emailing : `ALERTE_ACTION=https://… node build.mjs` (Brevo, Buttondown…).
3. **Inscriptions** : renseigner `inscriptionUrl` pour chaque rencontre (HelloAsso, Billetweb…), sinon c'est le mail.
4. **Mentions légales** : compléter les passages `[à compléter]` dans `src/templates/pages.mjs` (éditeur, SIRET, hébergeur).
5. **Tuiles de carte** : les tuiles OpenStreetMap conviennent pour un petit trafic. Au-delà, passer à un fournisseur (Stadia, MapTiler…) dans `src/carte.js`.
