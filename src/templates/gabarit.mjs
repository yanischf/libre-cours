// Squelette commun : <head>, en-tête, pied de page.
import { esc } from './outils.mjs';
import { tampon } from './tampon.mjs';

export const SITE = {
  url: (process.env.SITE_URL || 'https://librecours.fr').replace(/\/$/, ''),
  nom: 'Libre Cours',
  mail: 'bonjour@librecours.fr',
  description:
    "Libre Cours organise des rencontres de quartier à prix libre dans des lieux existants : cafés, médiathèques, ateliers. Une question au mur, des voisins autour des tables, et ce qui s'y dit est gardé.",
};

const NAV = [
  ['dates', 'Les dates', 'dates.html'],
  ['traces', 'Les traces', 'traces.html'],
  ['accueillir', 'Accueillir', 'accueillir.html'],
];

function entete(actif, racine) {
  const liens = NAV.map(
    ([cle, label, href]) =>
      `<a href="${racine}${href}"${cle === actif ? ' aria-current="page"' : ''}>${label}</a>`,
  ).join('');
  return `<header class="entete">
<div class="wrap entete__in">
<a class="marque" href="${racine || './'}"><span class="marque__tampon">${tampon({ l1: 'libre', l2: 'cours', size: 36, fill: '#f3eee4' })}</span><span class="marque__nom">Libre Cours</span></a>
<nav class="nav" aria-label="Navigation principale">${liens}</nav>
</div>
</header>`;
}

function pied(racine) {
  return `<footer class="pied">
<div class="wrap pied__in">
<div class="pied__haut">
<a class="marque marque--pied" href="${racine || './'}"><span class="marque__tampon">${tampon({ l1: 'libre', l2: 'cours', size: 36, ink: '#ff7a3d', accent: '#f3eee4' })}</span><span class="marque__nom">Libre Cours</span></a>
<nav class="pied__nav" aria-label="Plan du site">
<a href="${racine}dates.html">Les dates</a>
<a href="${racine}accueillir.html">Accueillir</a>
<a href="${racine}traces.html">Les traces</a>
<a href="${racine}installer.html">Installer la démarche</a>
</nav>
</div>
<div class="pied__bas">
<p>Libre Cours est conçu et facilité par <a href="https://section9.studio">s9, studio de design</a>.</p>
<p class="pied__contact"><a href="mailto:${SITE.mail}">${SITE.mail}</a><a href="${racine}mentions-legales.html">Mentions légales</a></p>
</div>
</div>
</footer>`;
}

/**
 * Page complète.
 * @param {object} p
 * @param {string} p.fichier   nom du fichier généré (ex. "dates.html")
 * @param {string} p.titre     balise <title>
 * @param {string} p.description meta description
 * @param {string} p.corps     contenu de <main>
 * @param {string} [p.actif]   lien de nav actif
 * @param {string} [p.tete]    balises supplémentaires dans <head>
 * @param {string} [p.fin]     balises avant </body>
 * @param {object[]} [p.jsonld] données structurées schema.org
 * @param {boolean} [p.indexer] false => noindex
 * @param {string} [p.racine]  préfixe des liens internes ("" ou "/")
 * @param {string} p.version   empreinte du CSS pour le cache
 */
export function page({
  fichier, titre, description, corps, actif = '', tete = '', fin = '',
  jsonld = [], indexer = true, racine = '', version,
}) {
  const chemin = fichier === 'index.html' ? '/' : `/${fichier}`;
  const url = SITE.url + chemin;
  const r = racine;
  const ld = jsonld.length
    ? `<script type="application/ld+json">${JSON.stringify(jsonld.length === 1 ? jsonld[0] : { '@context': 'https://schema.org', '@graph': jsonld })}</script>`
    : '';
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
${indexer ? `<link rel="canonical" href="${url}">` : '<meta name="robots" content="noindex">'}
<meta name="theme-color" content="#ff7a3d">
<link rel="preload" href="${r}fonts/bagel-fat-one-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${r}fonts/dm-mono-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${r}fonts/dm-mono-500.woff2" as="font" type="font/woff2" crossorigin>
${tete}<link rel="stylesheet" href="${r}style.css?v=${version}">
<link rel="icon" href="${r}favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${r}apple-touch-icon.png">
<link rel="alternate" type="text/plain" href="${r}llms.txt" title="Résumé du site pour les IA">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Libre Cours">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Libre Cours, des rencontres de quartier">
<meta name="twitter:card" content="summary_large_image">
${ld}
</head>
<body>
<a class="evitement" href="#contenu">Aller au contenu</a>
${entete(actif, r)}
<main id="contenu">
${corps}
</main>
${pied(r)}
${fin}
</body>
</html>
`;
}
