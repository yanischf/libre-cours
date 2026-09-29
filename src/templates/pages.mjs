// Contenu des pages. Les textes sont ceux des maquettes, mot pour mot.
import { esc } from './outils.mjs';
import { tampon } from './tampon.mjs';
import { SITE } from './gabarit.mjs';
import {
  photo, formulaireAlerte, carteDate, rencontre, traceMini, trace, principes, eventJsonLd,
} from './blocs.mjs';

const ORGANISATION = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organisation`,
  name: 'Libre Cours',
  url: `${SITE.url}/`,
  email: SITE.mail,
  logo: `${SITE.url}/apple-touch-icon.png`,
  description: SITE.description,
  areaServed: 'Paris',
  parentOrganization: { '@type': 'Organization', name: 's9, studio de design', url: 'https://section9.studio' },
};

/* ------------------------------------------------------------------ Accueil */
export function accueil({ dates, traces }) {
  const plein = dates.length > 0;
  const prochaines = dates.slice(0, 4);
  const dernieres = traces.slice(0, 3);

  const corps = `<section class="hero">
<div class="wrap hero__in">
<p class="caps-16">Libre Cours, des rencontres de quartier</p>
<h1 class="h1-accueil">Faire ensemble, ça commence en bas de chez vous.</h1>
<div class="hero__bas">
<p class="texte-18">Le temps d'une rencontre, dans un lieu de votre quartier, on échange des idées, des envies, des manières de voir le monde, avec des gens qui vivent à deux rues de chez vous. Pas besoin d'être expert, membre ou invité de quelqu'un. Habiter à côté suffit.</p>
<div class="boutons"><a class="btn" href="dates.html">Voir les prochaines dates</a><a class="btn btn--ghost" href="#moment">Comment ça se passe</a></div>
</div>
<div class="hero__tampon">${tampon({ l1: 'libre', l2: 'cours', fill: '#f3eee4', rot: -12 })}</div>
</div>
</section>

<section id="moment" class="wrap moment" aria-labelledby="moment-titre">
<div class="moment__gauche">
<h2 class="h2" id="moment-titre">Ça se passe comme ça.</h2>
<div class="moment__photo">
${photo({ src: 'images/moment.jpg', alt: 'Une rencontre Libre Cours, autour des tables', ratio: 1.1 })}
<div class="bulle"><p class="bulle__label">La question au mur</p><p class="bulle__q">Qu'est-ce qui nous manque ici pour être bien ?</p></div>
</div>
</div>
<div class="prose">
<p>Vous poussez la porte d'un lieu du quartier : un café, une médiathèque, un atelier. On vous accueille, vous prenez un verre, une question est affichée au mur. Une vraie question, choisie avec le lieu qui nous reçoit. Du genre : qu'est-ce qui nous manque ici pour être bien ? Qu'est-ce qu'on sait faire qu'on ne partage jamais ?</p>
<p>Autour des tables, des voisins que vous n'avez jamais croisés. Et souvent, parmi eux, ceux qui tiennent le lieu : le patron, la bibliothécaire, l'équipe. Ils ont choisi la question, et ils participent comme tout le monde, parce qu'ils sont du quartier eux aussi. On parle de ce qui est. On imagine ce qui pourrait être. Chacun pose ses idées, on les regarde ensemble, on garde celles qui nous font quelque chose.</p>
<p>Et avant de partir, on regarde ensemble ce qui est ressorti : les idées qui reviennent, les envies partagées. Rien ne part à la poubelle : tout est gardé, noté, remis au lieu et à ceux qui étaient là. Certaines de ces idées feront leur chemin, et la prochaine rencontre en reparlera.</p>
<p class="citation">Vous pouvez parler beaucoup, un peu, ou juste écouter. Les trois font l'affaire.</p>
<p>Et puis quelques jours plus tard, vous recroisez ces visages à la boulangerie, au marché, à l'école. C'est là que le quartier commence à changer.</p>
</div>
</section>

<section class="wrap effets" aria-labelledby="effets-titre">
<h2 class="h2" id="effets-titre">Ce que ça fait.</h2>
<ol class="etapes">
<li class="etape"><span class="pastille" aria-hidden="true">1</span><h3>Penser tout haut.</h3><p>Au travail on joue un rôle, en ligne on scrolle ou on s'écharpe. Ici, on peut dire « je ne sais pas », changer d'avis, essayer une idée à voix haute. C'est devenu rare, et ça fait un bien fou.</p></li>
<li class="etape"><span class="pastille" aria-hidden="true">2</span><h3>Rencontrer son quartier.</h3><p>Les gens qui vivent à cent mètres de chez vous ont des vies, des idées et des talents dont vous n'avez aucune idée. Une table et une question suffisent pour que ça change.</p></li>
<li class="etape"><span class="pastille pastille--orange" aria-hidden="true">3</span><h3>Se rappeler qu'on peut.</h3><p>Poser une idée devant d'autres et la voir reprise, complétée, partagée, ça réveille. On repart avec l'envie de s'y mettre, à son échelle, pour voir ce qui arrive.</p></li>
</ol>
</section>

<div class="bandeau"><div class="wrap"><p>Rien à vendre, rien à prouver, personne à convaincre. Juste un moment où votre voix compte.</p></div></div>

<section id="dates" class="fond-marine" aria-labelledby="dates-titre">
<div class="wrap section-dates">
<div class="entete-section"><h2 class="h2" id="dates-titre">On se retrouve où ?</h2>${plein ? '<a class="lien" href="dates.html">Toutes les dates</a>' : ''}</div>
${plein
    ? `<div class="grille-dates">${prochaines.map(carteDate).join('\n')}</div>`
    : `<div class="encart-vide">
<div class="encart-vide__texte"><p class="titre-32">Les premières rencontres se préparent.</p><p class="texte-17">Laissez votre adresse mail, on vous prévient quand une date s'ouvre près de chez vous.</p></div>
${formulaireAlerte('creme')}
</div>`}
</div>
</section>

<section class="wrap savoir" aria-labelledby="savoir-titre">
<h2 class="h2" id="savoir-titre">Trois choses à savoir.</h2>
${principes([
    ["C'est à prix libre.", "Chacun donne ce qu'il veut en partant, y compris rien. Personne ne reste dehors pour une question d'argent."],
    ["C'est accueilli par des lieux qui jouent le jeu.", "Chaque rencontre se tient dans un lieu du quartier qui ouvre ses portes : le temps d'une soirée, le café d'en bas devient la maison de quartier. On choisit le lieu ensemble, on écrit la question avec lui."],
    ['On ne fait pas semblant.', "On ne vous promet pas de grands soirs : une rencontre est une rencontre. Mais ce qui s'y dit est écouté et gardé. Le lieu reçoit le portrait de la rencontre, et quand un sujet résonne avec son équipe, il peut se mettre en marche avec elle. Pas de boîte à idées qui finit à la poubelle."],
  ])}
</section>
${plein && dernieres.length
    ? `
<section class="wrap traces-accueil" aria-labelledby="traces-titre">
<div class="entete-section"><h2 class="h2" id="traces-titre">Ce qui est resté.</h2><a class="lien" href="traces.html">Toutes les traces</a></div>
<div class="grille-traces">${dernieres.map(traceMini).join('\n')}</div>
</section>`
    : ''}

<section class="wrap nom" aria-labelledby="nom-titre">
<div class="encart-nom">
<div class="encart-nom__tampon">${tampon({ l1: 'libre', l2: 'cours', rot: -8 })}</div>
<div><h2 id="nom-titre">Pourquoi Libre Cours ?</h2><p>Parce qu'on vient y donner libre cours à ce qu'on pense, à ce qu'on imagine, à ce qu'on n'ose pas dire ailleurs. Et parce qu'il y a une cour cachée dedans : celle de la récré, celle de l'immeuble. Le dernier endroit où l'on savait faire ensemble sans mode d'emploi. On en rouvre une, pour les grands.</p></div>
</div>
</section>

<section class="wrap portes" aria-label="Aller plus loin">
<div class="porte"><h2>Vous avez un lieu ?</h2><p>Un café, une salle, un atelier, et l'envie d'accueillir une rencontre chez vous.</p><a class="btn btn--sm" href="accueillir.html">Accueillir un Libre Cours</a></div>
<div class="porte"><h2>Vous voulez aller plus loin ?</h2><p>Installer ce genre de démarche dans votre structure ou votre quartier, dans la durée.</p><a class="btn btn--sm btn--ghost" href="installer.html">Voir comment</a></div>
</section>`;

  return {
    fichier: 'index.html',
    titre: 'Libre Cours · Rencontres de quartier à prix libre',
    description: SITE.description,
    corps,
    jsonld: [
      ORGANISATION,
      { '@type': 'WebSite', '@id': `${SITE.url}/#site`, name: 'Libre Cours', url: `${SITE.url}/`, inLanguage: 'fr-FR', publisher: { '@id': `${SITE.url}/#organisation` } },
      ...prochaines.map(eventJsonLd),
    ],
  };
}

/* -------------------------------------------------------------------- Dates */
export function pageDates({ dates }) {
  const plein = dates.length > 0;
  const quartiers = [...new Map(dates.map((d) => [d.slugQuartier, d.quartier])).entries()];

  // Filtre sans JavaScript : un bouton radio par quartier + :has().
  const filtreCss = quartiers
    .map(([s]) => `main:has(#f-${s}:checked) .rencontre:not([data-slug="${s}"])`)
    .join(',\n');

  const chips = plein
    ? `<fieldset class="chips">
<legend class="cache">Filtrer par quartier</legend>
<input type="radio" name="quartier" id="f-tous" value="tous" checked><label for="f-tous">Tous</label>
${quartiers.map(([s, q]) => `<input type="radio" name="quartier" id="f-${s}" value="${s}"><label for="f-${s}">${esc(q)}</label>`).join('\n')}
</fieldset>`
    : '';

  const corps = `<section class="titre-page">
<div class="wrap titre-page__in">
<h1 class="h1-page">Les prochaines rencontres.</h1>
<p class="texte-18">Inscription en ligne ou directement au comptoir du lieu. C'est à prix libre.</p>
${chips}
</div>
</section>
${plein
    ? `
<section class="wrap section-carte">
<div class="carte" id="carte" role="region" aria-label="Carte des prochaines rencontres">
<noscript><p class="carte__secours">La carte a besoin de JavaScript. Toutes les rencontres sont listées ci-dessous.</p></noscript>
</div>
</section>

<section class="wrap liste-rencontres" aria-label="Liste des prochaines rencontres">
${dates.map(rencontre).join('\n')}
</section>`
    : ''}

<section class="wrap section-alerte" aria-labelledby="alerte-titre">
<div class="encart-alerte">
<div class="encart-alerte__texte">
<h2 class="titre-34" id="alerte-titre">${plein ? 'Pas encore de date près de chez vous ?' : 'Les premières rencontres se préparent.'}</h2>
<p class="texte-17">Laissez votre adresse mail, on vous prévient quand une date s'ouvre près de chez vous.</p>
</div>
${formulaireAlerte('marine')}
</div>
</section>`;

  return {
    fichier: 'dates.html',
    titre: 'Les prochaines rencontres · Libre Cours',
    description:
      "Les prochaines rencontres Libre Cours près de chez vous : dates, lieux, questions et inscription. Inscription en ligne ou directement au comptoir du lieu. C'est à prix libre.",
    actif: 'dates',
    corps,
    tete: plein
      ? `<link rel="stylesheet" href="vendor/leaflet/leaflet.css">
<style>
${filtreCss} { display: none; }
</style>
<link rel="preconnect" href="https://tile.openstreetmap.org" crossorigin>`
      : '',
    fin: plein
      ? `<script src="vendor/leaflet/leaflet.js" defer></script>
<script src="carte.js" defer></script>`
      : '',
    jsonld: [ORGANISATION, ...dates.map(eventJsonLd)],
  };
}

/* ------------------------------------------------------------------- Traces */
export function pageTraces({ traces }) {
  const corps = `<section class="titre-page">
<div class="wrap titre-page__in titre-page__in--traces">
<h1 class="h1-page">Ce qui est resté.</h1>
<p class="texte-18 max-640">Ce que les rencontres passées ont produit : les murs d'idées en photos, les sujets ressortis, et ce que certains sont devenus.</p>
</div>
</section>

<section class="wrap liste-traces" aria-label="Les traces des rencontres">
${traces.map(trace).join('\n')}
</section>`;

  return {
    fichier: 'traces.html',
    titre: 'Ce qui est resté · Libre Cours',
    description:
      "Ce que les rencontres Libre Cours passées ont produit : les murs d'idées en photos, les sujets ressortis, et ce que certains sont devenus.",
    actif: 'traces',
    corps,
    jsonld: [ORGANISATION],
  };
}

/* --------------------------------------------------------------- Accueillir */
export function pageAccueillir() {
  const corps = `<section class="hero hero--accueillir">
<div class="wrap hero__in hero__in--accueillir">
<h1 class="h1-accueillir">Accueillir un Libre Cours chez vous.</h1>
<p class="texte-18 max-680">Vous tenez un lieu dans le quartier : un café, une médiathèque, un atelier, une salle associative. Accueillir une rencontre, c'est prêter vos murs le temps d'une soirée ou d'un après-midi, et devenir la maison de quartier d'un soir : l'endroit où les habitants se découvrent, se parlent plus longuement qu'au comptoir, et reviennent.</p>
<div class="hero__tampon hero__tampon--ici">${tampon({ ring: 'LIBRE COURS · VOTRE LIEU · VOTRE QUARTIER · ', l1: 'ici ?', fill: '#f3eee4', dashed: true, rot: -8 })}</div>
</div>
</section>

<section class="wrap demande" aria-label="Ce que ça demande">
${principes([
    ['Ce que ça vous demande.', "Un espace pour une vingtaine de personnes, un créneau, et un échange avec nous en amont pour choisir ensemble la question de la rencontre. C'est tout. Nous apportons le reste : la préparation, l'animation, le matériel."],
    ['Vous êtes invités à la table.', "Accueillir ne veut pas dire regarder. La question vient de vous, parce qu'elle doit être cohérente avec ce que votre lieu est et ce qu'il désire pour son quartier. Mais le soir venu, vous et votre équipe participez comme tout le monde : vous faites la vie du quartier autant que ceux qui poussent votre porte. Autour des tables, tout le monde est au même niveau."],
    ['Ce que ça ne vous demande pas.', "Aucun engagement après la rencontre. Elle ne produit ni obligation ni liste de chantiers pour votre équipe : vous recevez ce qui s'est dit, et vous seuls décidez si quelque chose mérite une suite. Vous ne repartez avec aucune charge, aucune promesse à tenir à notre place."],
    ['Ce que ça vous apporte.', "Une soirée vivante, des habitants qui découvrent votre lieu ou le redécouvrent autrement, et le portrait de la rencontre : ce que les gens ont dit, les idées posées, la décision prise. C'est souvent une découverte. Et si la rencontre revient chez vous régulièrement, votre lieu devient ce point de repère du quartier que rien d'autre ne peut fabriquer."],
  ], 'h2', 'principes--grands')}
</section>

<section class="wrap plus-loin" aria-label="Aller plus loin">
<div class="encart-peche">
<p><strong>Et si l'envie vient d'aller plus loin</strong>, faire de ces rencontres un rendez-vous, mettre en marche les sujets qui résonnent avec votre équipe, construire quelque chose de durable avec votre public, ça existe aussi. C'est la seconde étape, elle n'arrive que si vous la désirez. On en parle quand vous voulez.</p>
<a class="btn btn--sm btn--ghost" href="installer.html">Installer la démarche</a>
</div>
<div class="encart-parlons">
<p>Un café, une salle, un atelier ? Parlons-en.</p>
<a class="btn btn--orange" href="mailto:${SITE.mail}?subject=Accueillir%20un%20Libre%20Cours">On en discute autour d'un café</a>
</div>
</section>`;

  return {
    fichier: 'accueillir.html',
    titre: 'Accueillir un Libre Cours chez vous · Libre Cours',
    description:
      "Vous tenez un café, une médiathèque, un atelier ou une salle associative ? Accueillez une rencontre Libre Cours et devenez la maison de quartier d'un soir.",
    actif: 'accueillir',
    corps,
    jsonld: [ORGANISATION],
  };
}

/* ---------------------------------------------------------------- Installer */
export function pageInstaller() {
  const corps = `<section class="wrap installer-titre">
<p class="caps-15">Pour les lieux, structures et collectifs</p>
<h1 class="h1-installer">Installer la démarche dans la durée.</h1>
</section>
<section class="wrap installer-texte" aria-label="La démarche">
<p class="chapeau">Libre Cours est la partie visible d'une pratique plus large : concevoir les conditions qui permettent à un collectif d'imaginer, d'échanger et de décider ensemble, durablement.</p>
<p class="texte-17">Pour les lieux, structures et collectifs qui veulent aller au-delà d'une rencontre, le studio s9 accompagne la construction de communautés vivantes : les formats, les rituels, les espaces et les outils qui font qu'un public devient un collectif. Toujours co-construit, toujours transmis : ce qui est bâti vous appartient, et notre travail est réussi quand il devient invisible.</p>
</section>
<section class="wrap installer-contact" aria-label="Contact">
<div class="installer-contact__in">
<a class="btn" href="mailto:bonjour@section9.studio">Écrire à s9</a>
<a class="btn btn--ghost" href="https://section9.studio">section9.studio</a>
</div>
</section>`;

  return {
    fichier: 'installer.html',
    titre: 'Installer la démarche dans la durée · Libre Cours',
    description:
      'Pour les lieux, structures et collectifs qui veulent aller au-delà d\'une rencontre : le studio s9 accompagne la construction de communautés vivantes, dans la durée.',
    corps,
    jsonld: [ORGANISATION],
  };
}

/* ------------------------------------------------------- Pages secondaires */
export function pageMerci() {
  return {
    fichier: 'merci.html',
    titre: "C'est noté · Libre Cours",
    description: "Votre adresse est enregistrée. On vous écrit dès qu'une date s'ouvre.",
    indexer: false,
    corps: `<section class="wrap page-simple">
<h1 class="h1-installer">C'est noté.</h1>
<p class="chapeau">On vous écrit dès qu'une date s'ouvre.</p>
<div class="boutons"><a class="btn" href="dates.html">Voir les prochaines dates</a><a class="btn btn--ghost" href="./">Retour à l'accueil</a></div>
</section>`,
  };
}

export function page404() {
  return {
    fichier: '404.html',
    titre: 'Page introuvable · Libre Cours',
    description: "Cette page n'existe pas ou plus.",
    indexer: false,
    racine: '/',
    corps: `<section class="wrap page-simple">
<h1 class="h1-installer">Cette page n'existe pas.</h1>
<p class="chapeau">Elle a peut-être changé d'adresse. Les rencontres, elles, sont toujours en bas de chez vous.</p>
<div class="boutons"><a class="btn" href="/dates.html">Voir les prochaines dates</a><a class="btn btn--ghost" href="/">Retour à l'accueil</a></div>
</section>`,
  };
}

export function pageMentions() {
  const aCompleter = '<mark>[à compléter]</mark>';
  return {
    fichier: 'mentions-legales.html',
    titre: 'Mentions légales · Libre Cours',
    description: 'Mentions légales et données personnelles du site Libre Cours.',
    corps: `<section class="wrap page-simple mentions">
<h1 class="h1-installer">Mentions légales.</h1>
<h2>Éditeur</h2>
<p>Le site librecours.fr est édité par s9, studio de design. Adresse : ${aCompleter}. SIRET : ${aCompleter}. Directeur de la publication : ${aCompleter}. Contact : <a href="mailto:${SITE.mail}">${SITE.mail}</a>.</p>
<h2>Hébergement</h2>
<p>Hébergeur : ${aCompleter} (raison sociale, adresse, téléphone).</p>
<h2>Données personnelles</h2>
<p>Le formulaire « Me prévenir » recueille votre adresse mail et, si vous le souhaitez, votre quartier. Elles servent uniquement à vous annoncer les prochaines rencontres près de chez vous. Elles ne sont ni vendues ni cédées. Vous pouvez demander à tout moment leur consultation, leur modification ou leur suppression en écrivant à <a href="mailto:${SITE.mail}">${SITE.mail}</a>.</p>
<h2>Cookies et mesure d'audience</h2>
<p>Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience.</p>
<h2>Carte</h2>
<p>La carte de la page « Les dates » affiche des tuiles OpenStreetMap, chargées depuis les serveurs de la fondation OpenStreetMap. Données cartographiques © les contributeurs d'OpenStreetMap, sous licence ODbL.</p>
<h2>Crédits</h2>
<p>Conception : s9, studio de design. Polices : Bagel Fat One et DM Mono, sous licence SIL Open Font License, hébergées sur ce site. Carte : Leaflet.</p>
</section>`,
  };
}
