// Génère le site statique dans dist/ à partir de content/ et src/.
// Aucune dépendance : `node build.mjs`.
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { page, SITE } from './src/templates/gabarit.mjs';
import { rencontres, traces } from './src/templates/donnees.mjs';
import { typoFr } from './src/templates/outils.mjs';
import {
  accueil, pageDates, pageTraces, pageAccueillir, pageInstaller, pageMerci, page404, pageMentions,
} from './src/templates/pages.mjs';

const DIST = new URL('./dist/', import.meta.url);
const SRC = new URL('./src/', import.meta.url);
const out = (f) => new URL(f, DIST);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// Fichiers statiques
for (const f of ['style.css', 'carte.js', 'fonts', 'vendor', 'images']) {
  if (existsSync(new URL(f, SRC))) cpSync(new URL(f, SRC), out(f), { recursive: true });
}
// src/racine/ : fichiers servis à la racine du site (icônes, image de partage…)
if (existsSync(new URL('racine', SRC))) cpSync(new URL('racine', SRC), DIST, { recursive: true });

const version = createHash('sha256').update(readFileSync(new URL('style.css', SRC))).digest('hex').slice(0, 8);
const ctx = { dates: rencontres(), traces: traces() };

const pages = [
  accueil(ctx), pageDates(ctx), pageTraces(ctx), pageAccueillir(), pageInstaller(),
  pageMentions(), pageMerci(), page404(),
];

for (const p of pages) {
  writeFileSync(out(p.fichier), typoFr(page({ ...p, version })));
}

// Plan du site
const aujourdhui = new Date().toISOString().slice(0, 10);
const indexables = pages.filter((p) => p.indexer !== false);
writeFileSync(out('sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexables.map((p) => `  <url><loc>${SITE.url}${p.fichier === 'index.html' ? '/' : '/' + p.fichier}</loc><lastmod>${aujourdhui}</lastmod></url>`).join('\n')}
</urlset>
`);

// Robots : tout le monde est bienvenu, moteurs de recherche comme IA.
writeFileSync(out('robots.txt'), `# Libre Cours : le site peut être lu et indexé par tous les robots,
# y compris les moteurs de recherche et les assistants IA.
User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`);

// llms.txt : résumé en Markdown pour les modèles de langage (https://llmstxt.org)
const { dates, traces: tr } = ctx;
writeFileSync(out('llms.txt'), `# Libre Cours

> ${SITE.description}

Libre Cours organise des rencontres de quartier à prix libre, à Paris, dans des lieux qui existent déjà (cafés, médiathèques, ateliers, maisons de quartier). Une question est affichée au mur, choisie avec le lieu qui accueille. Les voisins, et l'équipe du lieu, en parlent autour des tables. Ce qui ressort est noté et remis au lieu et aux participants. Chacun donne ce qu'il veut en partant, y compris rien. Libre Cours est conçu et facilité par s9, studio de design (https://section9.studio).

Contact : ${SITE.mail}

## Pages

- [Accueil](${SITE.url}/) : le principe, comment se passe une rencontre, ce que ça fait.
- [Les dates](${SITE.url}/dates.html) : les prochaines rencontres, avec carte, lieux, questions et inscription.
- [Les traces](${SITE.url}/traces.html) : ce que les rencontres passées ont produit.
- [Accueillir](${SITE.url}/accueillir.html) : pour les cafés, médiathèques, ateliers et salles qui veulent accueillir une rencontre.
- [Installer la démarche](${SITE.url}/installer.html) : accompagnement dans la durée par le studio s9.

## Prochaines rencontres

${dates.length ? dates.map((d) => `- ${d.jourLong}, ${d.heure} · ${d.quartier} · ${d.lieu}, ${d.adresse} (${d.codePostal} ${d.ville}) · Question : « ${d.question} » · ${d.placesTexte} · prix libre · Inscription : ${d.inscriptionUrl || `${SITE.url}/dates.html#${d.id}`}`).join('\n') : "Aucune date pour l'instant : les premières rencontres se préparent."}

## Traces des rencontres passées

${tr.map((t) => `- ${t.dateTexte} · ${t.quartier} · ${t.lieu} · Question : « ${t.question} » · Ce qui est ressorti : ${t.sujets.join(' ; ')} · Et depuis : ${t.depuis}`).join('\n')}
`);

// En-têtes HTTP (Netlify, Cloudflare Pages) : cache long pour les fichiers qui ne changent pas.
writeFileSync(out('_headers'), `/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/vendor/*
  Cache-Control: public, max-age=31536000, immutable
/style.css
  Cache-Control: public, max-age=31536000, immutable
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`);

console.log(`dist/ : ${pages.length} pages, ${dates.length} rencontres à venir, ${tr.length} traces.`);
