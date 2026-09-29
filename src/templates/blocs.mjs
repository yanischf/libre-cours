// Blocs réutilisés d'une page à l'autre.
import { existsSync } from 'node:fs';
import { esc } from './outils.mjs';
import { tampon } from './tampon.mjs';
import { SITE } from './gabarit.mjs';

/**
 * Où envoyer le formulaire « Me prévenir ».
 * À remplacer par l'URL fournie par l'outil d'emailing (Brevo, Buttondown…).
 * Sur Netlify, l'attribut data-netlify suffit : les inscriptions arrivent
 * dans le tableau de bord « Forms » et la page merci.html s'affiche ensuite.
 */
export const ALERTE_ACTION = process.env.ALERTE_ACTION || 'merci.html';

/** Photo bichromie orange/noir. Sans fichier, un aplat de la même teinte. */
export function photo({ src = '', alt = '', ratio, classe = '', surcouche = '', eager = false }) {
  const existe = src && existsSync(new URL(`../${src}`, import.meta.url));
  const img = existe
    ? `<img src="${esc(src)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
    : '';
  return `<div class="photo${existe ? '' : ' photo--vide'}${classe ? ' ' + classe : ''}" style="aspect-ratio:${ratio}">${img}${surcouche}</div>`;
}

/** Formulaire d'alerte. `fond` = "creme" (champs blancs) ou "marine". */
export function formulaireAlerte(fond = 'marine') {
  return `<form class="alerte alerte--${fond}" name="alerte" method="post" action="${ALERTE_ACTION}" data-netlify="true" netlify-honeypot="site-web">
<p class="cache" aria-hidden="true"><label>Ne pas remplir <input name="site-web" tabindex="-1" autocomplete="off"></label></p>
<label class="champ">Adresse mail<input type="email" name="email" required autocomplete="email" placeholder="vous@exemple.fr"></label>
<label class="champ">Quartier souhaité<input type="text" name="quartier" autocomplete="address-level3" placeholder="Belleville, le 11e…"></label>
<button class="btn${fond === 'marine' ? ' btn--orange' : ''}" type="submit">Me prévenir</button>
</form>`;
}

/** Carte d'une date sur l'accueil. */
export function carteDate(d) {
  return `<article class="carte-date">
<div class="carte-date__tete">
<div><h3>${esc(d.quartier)}</h3><p class="caps-14">${esc(d.lieu)}</p></div>
<div class="carte-date__tampon">${tampon({ ring: d.ring, l1: d.num, small: d.stamp, size: 36, rot: d.rot })}</div>
</div>
<p class="caps-15"><time datetime="${esc(d.date)}">${esc(d.jour)} · ${esc(d.heure)}</time></p>
<p class="question-22">${esc(d.question)}</p>
<div class="carte-date__pied">
<p class="texte-14">Inscription en ligne ou directement au comptoir du lieu.</p>
${d.complet
    ? `<a class="btn btn--sm btn--ghost" href="${esc(d.lien)}">Complet · liste d'attente</a>`
    : `<a class="btn btn--sm" href="${esc(d.lien)}">Je m'inscris</a>`}
</div>
</article>`;
}

/** Carte d'une date sur la page Dates (filtrable, lue par la carte). */
export function rencontre(d) {
  const data = {
    quartier: d.quartier, slug: d.slugQuartier, lieu: d.lieu, jour: `${d.jour} · ${d.heure}`,
    num: d.num, question: d.question, lat: d.lat, lng: d.lng, lien: d.lien,
    complet: d.complet ? '1' : '',
  };
  const attrs = Object.entries(data).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ');
  return `<article class="rencontre" id="${esc(d.id)}" ${attrs}>
<div class="rencontre__lieu">
<div class="rencontre__tampon">${tampon({ ring: d.ring, l1: d.num, small: d.stamp, size: 36, rot: d.rot })}</div>
<div><h2>${esc(d.quartier)}</h2><p class="caps-14">${esc(d.lieu)}<br>${esc(d.adresse)}</p></div>
</div>
<div class="rencontre__question"><p class="label">La question</p><p class="question-26">${esc(d.question)}</p></div>
<div class="rencontre__infos">
<p class="caps-17"><time datetime="${esc(d.date)}">${esc(d.jour)} · ${esc(d.heure)}</time></p>
<p class="texte-15">${esc(d.placesTexte)} · prix libre</p>
${d.complet
    ? `<a class="btn btn--sm btn--ghost" href="${esc(d.lien)}">Complet · liste d'attente</a>`
    : `<a class="btn btn--sm" href="${esc(d.lien)}">Je m'inscris en ligne</a>`}
<p class="texte-14">Ou directement au comptoir du lieu.</p>
</div>
</article>`;
}

/** Vignette de trace sur l'accueil. */
export function traceMini(t) {
  const surcouche = `<div class="photo__tampon photo__tampon--100">${tampon({ ring: t.ring, l1: t.mois, size: 32, fill: '#f3eee4', rot: t.rot })}</div>`;
  return `<a class="trace-mini" href="traces.html#${esc(t.id)}">
${photo({ src: t.photo, alt: t.photoAlt, ratio: 1.2, surcouche })}
<span class="caps-14">${esc(t.quartier)} · ${esc(t.lieu)}</span>
<span class="trace-mini__titre">${esc(t.titre)}</span>
</a>`;
}

/** Trace complète sur la page Traces. */
export function trace(t) {
  const surcouche = `<div class="photo__tampon photo__tampon--150">${tampon({ ring: t.ring, l1: t.mois, size: 34, fill: '#f3eee4', rot: t.rot })}</div>`;
  return `<article class="trace" id="${esc(t.id)}">
${photo({ src: t.photo, alt: t.photoAlt, ratio: 1.3, surcouche })}
<div class="trace__texte">
<p class="caps-14">${esc(t.quartier)} · ${esc(t.lieu)} · ${esc(t.dateTexte)}</p>
<h2>${esc(t.question)}</h2>
<div class="trace__sujets"><p class="label">Ce qui est ressorti</p>
<ul class="sujets">${t.sujets.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
<div class="trace__depuis"><p class="label">Et depuis</p><p class="depuis">${esc(t.depuis)}</p></div>
</div>
</article>`;
}

/** Liste pointillée titre / texte. `niveau` = h2 ou h3. */
export function principes(items, niveau = 'h3', classe = '') {
  return `<div class="principes${classe ? ' ' + classe : ''}">${items
    .map(([titre, texte]) => `<div class="principe"><${niveau}>${titre}</${niveau}><p>${texte}</p></div>`)
    .join('\n')}</div>`;
}

/** Données structurées schema.org pour une rencontre. */
export function eventJsonLd(d) {
  return {
    '@type': 'Event',
    '@id': `${SITE.url}/dates.html#${d.id}`,
    name: `Libre Cours · ${d.quartier} · ${d.question}`,
    description: `Rencontre de quartier à prix libre au ${d.lieu}. La question au mur : ${d.question}`,
    startDate: d.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    location: {
      '@type': 'Place',
      name: d.lieu,
      address: {
        '@type': 'PostalAddress',
        streetAddress: d.adresse,
        postalCode: d.codePostal,
        addressLocality: d.ville,
        addressCountry: 'FR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: d.lat, longitude: d.lng },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: "Prix libre : chacun donne ce qu'il veut en partant, y compris rien.",
      availability: d.complet ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      url: d.inscriptionUrl || `${SITE.url}/dates.html#${d.id}`,
    },
    organizer: { '@id': `${SITE.url}/#organisation` },
  };
}
