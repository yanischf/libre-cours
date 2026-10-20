// Contenu des pages. Les textes sont ceux des maquettes, mot pour mot.
import { esc } from './outils.mjs';
import { tampon } from './tampon.mjs';
import { SITE } from './gabarit.mjs';
import {
  anim, photo, formulaireAlerte, carteDate, rencontre, trace, principes, eventJsonLd,
} from './blocs.mjs';

const ORGANISATION = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organisation`,
  name: 'Libre Cours',
  url: `${SITE.url}/`,
  email: SITE.mail,
  sameAs: [SITE.instagram],
  logo: `${SITE.url}/apple-touch-icon.png`,
  description: SITE.description,
  areaServed: 'Paris',
  parentOrganization: { '@type': 'Organization', name: 's9, studio de design', url: 'https://section9.studio' },
};

/* ------------------------------------------------------------------ Accueil */
const ETAPES_MOMENT = [
  ['On pousse la porte.', 'Un café, une médiathèque, un atelier. Un verre, et une question au mur.'],
  ["On s'assoit entre voisins.", "Ceux qu'on n'a jamais croisés, et ceux qui tiennent le lieu. Tout le monde participe."],
  ['On imagine ensemble.', 'Chacun pose ses idées. On garde celles qui nous font quelque chose.'],
  ['Rien ne se perd.', 'Tout est noté et remis au lieu. La prochaine rencontre en reparle.'],
];

export function accueil({ dates }) {
  const plein = dates.length > 0;
  const prochaines = dates.slice(0, 4);

  const corps = `<section class="hero">
<div class="wrap hero__in">
<p class="caps-16"${anim()}>Libre Cours, des rencontres de quartier</p>
<h1 class="h1-accueil"${anim('rise', 110)}>Faire ensemble, ça commence en bas de chez vous.</h1>
<div class="hero__bas">
<p class="texte-18"${anim('rise', 220)}>Le temps d'une rencontre, dans un lieu de votre quartier, on échange des idées, des envies, des manières de voir le monde, avec des gens qui vivent à deux rues de chez vous. Pas besoin d'être expert, membre ou invité de quelqu'un. Habiter à côté suffit.</p>
<div class="boutons"${anim('rise', 330)}><a class="btn" href="dates.html">Voir les prochaines dates</a><a class="btn btn--ghost" href="#moment">Comment ça se passe</a></div>
</div>
<div class="hero__tampon"><div class="anim-plein"${anim('stamp', 350)}>${tampon({ l1: 'libre', l2: 'cours', fill: '#f3eee4', rot: -12 })}</div></div>
</div>
</section>

<section id="moment" class="wrap moment" aria-labelledby="moment-titre">
<div class="moment__gauche">
<h2 class="h2" id="moment-titre"${anim()}>Ça se passe comme ça.</h2>
<div class="moment__photo"${anim('rise', 110)}>
${photo({
    tailles: [['images/moment-700.jpg', 700], ['images/moment-1200.jpg', 1200]],
    sizes: '(min-width: 824px) min(548px, 45vw), calc(100vw - 40px)',
    alt: "Une dizaine de voisins debout en cercle dans un bar aux murs de briques, qui discutent et s'écoutent",
    ratio: 1.1,
  })}
<div class="bulle"><p class="bulle__label">La question au mur</p><p class="bulle__q">De quoi on devrait parler plus souvent, ici ?</p></div>
</div>
</div>
<div class="moment__droite">
<ol class="frise4">
${ETAPES_MOMENT.map(([titre, texte], i) => `<li${anim('rise', i * 140)}><span class="pastille${i === 3 ? ' pastille--orange' : ''}" aria-hidden="true">${i + 1}</span><div><h3>${titre}</h3><p>${texte}</p></div></li>`).join('\n')}
</ol>
<p class="citation"${anim()}>Parler beaucoup, un peu, ou juste écouter : les trois font l'affaire.</p>
<p class="texte-16"${anim('rise', 110)}>Quelques jours plus tard, vous recroisez ces visages à la boulangerie. C'est là que le quartier commence à changer.</p>
</div>
</section>

<section class="wrap effets" aria-labelledby="effets-titre">
<h2 class="h2" id="effets-titre"${anim()}>Ce que ça fait.</h2>
<ol class="etapes">
<li class="etape"${anim()}><span class="pastille" aria-hidden="true">1</span><h3>Penser tout haut.</h3><p>Au travail on joue un rôle, en ligne on scrolle ou on s'écharpe. Ici, on peut dire « je ne sais pas », changer d'avis, essayer une idée à voix haute. C'est devenu rare, et ça fait un bien fou.</p></li>
<li class="etape"${anim('rise', 140)}><span class="pastille" aria-hidden="true">2</span><h3>Rencontrer son quartier.</h3><p>Les gens qui vivent à cent mètres de chez vous ont des vies, des idées et des talents dont vous n'avez aucune idée. Une table et une question suffisent pour que ça change.</p></li>
<li class="etape"${anim('rise', 280)}><span class="pastille pastille--orange" aria-hidden="true">3</span><h3>Se rappeler qu'on peut.</h3><p>Poser une idée devant d'autres et la voir reprise, complétée, partagée, ça réveille. On repart avec l'envie de s'y mettre, à son échelle, pour voir ce qui arrive.</p></li>
</ol>
</section>

<div class="bandeau"><div class="wrap"><p${anim()}>Rien à vendre, rien à prouver, personne à convaincre. Juste un moment où votre voix a de la place.</p></div></div>

<section id="dates" class="fond-marine" aria-labelledby="dates-titre">
<div class="wrap section-dates">
<div class="entete-section"><h2 class="h2" id="dates-titre"${anim()}>On se retrouve où ?</h2>${plein ? `<a class="lien" href="dates.html"${anim('rise', 110)}>Toutes les dates</a>` : ''}</div>
${plein
    ? `<div class="grille-dates">${prochaines.map((d, i) => carteDate(d, anim('rise', i * 140))).join('\n')}</div>`
    : `<div class="bientot"${anim()}>
<div class="bientot__texte"><p class="bientot__titre">Annonce bientôt.</p><a class="btn btn--sm" href="dates.html#alerte-titre">Me prévenir</a></div>
<div class="bientot__tampon"><div class="anim-plein"${anim('stamp', 350)}>${tampon({ ring: 'LIBRE COURS · PROCHAINE RENCONTRE · ', l1: 'bientôt', size: 30, dashed: true, rot: -8 })}</div></div>
</div>`}
</div>
</section>
<section class="wrap savoir" aria-labelledby="savoir-titre">
<h2 class="h2" id="savoir-titre"${anim()}>Trois choses à savoir.</h2>
${principes([
    ["C'est à prix libre.", "Chacun donne ce qu'il veut en partant, y compris rien. Personne ne reste dehors pour une question d'argent."],
    ["C'est accueilli par des lieux qui jouent le jeu.", "Chaque rencontre se tient dans un lieu du quartier qui ouvre ses portes : le temps d'une soirée, le café d'en bas devient la maison de quartier. On choisit le lieu ensemble, on écrit la question avec lui."],
    ['On ne fait pas semblant.', "On ne vous promet pas de grands soirs : une rencontre est une rencontre. Mais ce qui s'y dit est écouté et gardé. Le lieu reçoit le portrait de la rencontre, et quand un sujet résonne avec son équipe, il peut se mettre en marche avec elle. Pas de boîte à idées qui finit à la poubelle."],
  ], 'h3', '', true)}
</section>

<section class="wrap nom" aria-labelledby="nom-titre">
<div class="encart-nom"${anim()}>
<div class="encart-nom__tampon"><div class="anim-plein"${anim('stamp', 350)}>${tampon({ l1: 'libre', l2: 'cours', rot: -8 })}</div></div>
<div><h2 id="nom-titre">Pourquoi Libre Cours ?</h2><p>Parce qu'on vient y donner libre cours à ce qu'on pense, à ce qu'on imagine, à ce qu'on n'ose pas dire ailleurs. Et parce qu'il y a une cour cachée dedans : celle de la récré, celle de l'immeuble. Le dernier endroit où l'on savait faire ensemble sans mode d'emploi. On en rouvre une, pour les grands.</p></div>
</div>
</section>

<section class="wrap portes" aria-label="Aller plus loin">
<div class="porte"${anim()}><h2>Vous avez un lieu ?</h2><p>Un café, une salle, un atelier, et l'envie d'accueillir une rencontre chez vous.</p><a class="btn btn--sm" href="accueillir.html">Accueillir un Libre Cours</a></div>
<div class="porte"${anim('rise', 140)}><h2>Vous voulez aller plus loin ?</h2><p>Installer ce genre de démarche dans votre structure ou votre quartier, dans la durée.</p><a class="btn btn--sm btn--ghost" href="installer.html">Voir comment</a></div>
</section>`;

  return {
    fichier: 'index.html',
    titre: 'Libre Cours · Rencontres de quartier à prix libre',
    description: SITE.description,
    corps,
    anime: true,
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
    indexer: SITE.afficherTraces,
    titre: 'Ce qui est resté · Libre Cours',
    description:
      "Ce que les rencontres Libre Cours passées ont produit : les murs d'idées en photos, les sujets ressortis, et ce que certains sont devenus.",
    actif: 'traces',
    corps,
    jsonld: [ORGANISATION],
  };
}

/* --------------------------------------------------------------- Accueillir */
const MAIL_ACCUEILLIR = `mailto:${SITE.mail}?subject=Accueillir%20un%20Libre%20Cours`;
const TAMPON_ICI = { ring: 'LIBRE COURS · VOTRE LIEU · VOTRE QUARTIER · ', l1: 'ici ?', fill: '#f3eee4', dashed: true };

export function pageAccueillir() {
  const gains = [
    ['Une soirée.', "Des habitants qui vous découvrent, et qui reviennent pour le lieu. Le portrait de ce qui s'est dit chez vous."],
    ['Un rendez-vous.', 'La rencontre revient chez vous, à votre rythme. Le quartier sait où se retrouver.'],
    ['Un point de repère.', "L'endroit où les idées du quartier naissent et se mettent en marche. Ce lien ne s'achète pas, il s'accueille."],
  ];
  const rendezVous = [
    ['Un café.', 'Vous nous racontez votre lieu, on vous raconte Libre Cours.'],
    ['Une question.', "On la choisit ensemble, pour qu'elle vous ressemble."],
    ['Une date.', 'Un soir creux, dans trois semaines. Vous vous asseyez aux tables comme tout le monde.'],
  ];

  const corps = `<section class="hero hero--v2">
<div class="wrap hero__in hero__in--v2">
<p class="caps-16"${anim()}>Accueillir un Libre Cours</p>
<h1 class="h1-v2">
<span class="h1-v2__l1"${anim('rise', 120)}>On ne visite pas un lieu qu'on a contribué à imaginer.</span>
<span class="appartient"${anim('stamp', 700)}>On y appartient.</span>
</h1>
<p class="texte-18 hero-v2__texte"${anim('rise', 1000)}>Le temps d'une soirée, votre lieu devient la maison de quartier.</p>
<div class="boutons"${anim('rise', 1100)}><a class="btn" href="${MAIL_ACCUEILLIR}">Parlons-en</a><a class="btn btn--ghost" href="#comment">Comment ça marche</a></div>
</div>
<div class="hero__tampon hero__tampon--v2"><div class="anim-plein"${anim('stamp', 400)}>${tampon({ ...TAMPON_ICI, rot: -10 })}</div></div>
</section>

<section class="wrap constat" aria-labelledby="constat-titre">
<h2 class="caps-14" id="constat-titre"${anim()}>Le constat</h2>
<p class="constat__phrase"${anim()}>Chaque jour, chez vous, des voisins se croisent sans se parler.</p>
<p class="constat__phrase constat__phrase--orange"${anim('rise', 250)}>Entre eux, pourtant, il y a tout : des idées, des envies, des talents.</p>
<p class="texte-18 constat__texte"${anim('rise', 450)}>Libre Cours les réunit : une vingtaine d'habitants, vos tables, une question au mur. On se rencontre, on échange, on repart en se connaissant.</p>
</section>

<section class="wrap change" aria-labelledby="change-titre">
<div class="bloc-marine">
<div class="change__haut">
<div class="change__texte">
<p class="caps-14 orange"${anim()}>Ce que ça change</p>
<h2 class="h2-64 orange" id="change-titre"${anim()}>Devenir le troisième lieu du quartier.</h2>
<p${anim()}>Après la maison et le travail, il y a ces endroits où l'on se retrouve sans rendez-vous. Le vôtre peut devenir celui où le quartier se parle, imagine et décide.</p>
</div>
<ol class="lieux" aria-label="Les trois lieux">
<li class="lieux__item"${anim()}><span class="lieux__rond" aria-hidden="true">1</span><span class="lieux__label">Chez soi</span></li>
<li class="lieux__item"${anim('rise', 200)}><span class="lieux__rond" aria-hidden="true">2</span><span class="lieux__label">Le travail</span></li>
<li class="lieux__item"><div class="lieux__tampon"${anim('stamp', 650)}>${tampon({ ...TAMPON_ICI, ink: '#ff7a3d', accent: '#1b2a8f', rot: -8 })}</div><span class="lieux__label orange">Votre lieu</span></li>
</ol>
</div>
<div class="gains">
<h3 class="caps-14 orange"${anim()}>Ce que vous y gagnez, soirée après soirée</h3>
<div class="frise">
<span class="frise__ligne frise__ligne--orange" aria-hidden="true"${anim('draw')}></span>
<ol class="gains__liste">
${gains.map(([titre, texte], i) => `<li class="gain gain--${i + 1}"><span class="point point--${i + 1}" aria-hidden="true"${anim('stamp', [200, 550, 900][i])}></span><h4>${titre}</h4><p>${texte}</p></li>`).join('\n')}
</ol>
</div>
</div>
</div>
</section>

<section id="comment" class="wrap comment" aria-labelledby="comment-titre">
<div class="comment__tete">
<p class="caps-14"${anim()}>Comment ça marche</p>
<h2 class="h2-64" id="comment-titre"${anim()}>Trois rendez-vous, et le quartier fait le reste.</h2>
</div>
<div class="frise">
<span class="frise__ligne frise__ligne--comment" aria-hidden="true"${anim('draw')}></span>
<ol class="etapes etapes--comment">
${rendezVous.map(([titre, texte], i) => `<li class="etape"><span class="pastille${i === 2 ? ' pastille--orange' : ''}" aria-hidden="true"${anim('stamp', [200, 550, 900][i])}>${i + 1}</span><h3>${titre}</h3><p>${texte}</p></li>`).join('\n')}
</ol>
</div>
<div class="apports">
<div class="apport apport--blanc"${anim()}><p class="label">Vous apportez</p><p class="apport__texte">Un espace pour vingt personnes, deux heures, une chaise à la table.</p></div>
<div class="apport apport--peche"${anim('rise', 150)}><p class="label">Nous apportons</p><p class="apport__texte">La préparation, l'animation, le matériel, le rangement.</p></div>
</div>
<p class="caps-15"${anim()}>Sans engagement · une soirée, et vous décidez librement de la suite.</p>
</section>

<section class="wrap parlons" aria-label="Contact">
<div class="bloc-orange">
<p class="bloc-orange__phrase"${anim()}>Un café, une salle, un atelier ? Parlons-en.</p>
<a class="btn" href="${MAIL_ACCUEILLIR}"${anim('rise', 150)}>On en discute autour d'un café</a>
<a class="lien lien--14" href="installer.html"${anim('rise', 250)}>Aller plus loin : installer la démarche</a>
<div class="bloc-orange__tampon"><div class="anim-plein"${anim('stamp', 350)}>${tampon({ l1: 'libre', l2: 'cours', fill: '#f3eee4', rot: 10 })}</div></div>
</div>
</section>`;

  return {
    fichier: 'accueillir.html',
    titre: 'Accueillir un Libre Cours chez vous · Libre Cours',
    description:
      "On ne visite pas un lieu qu'on a contribué à imaginer. On y appartient. Café, médiathèque, atelier : accueillez une rencontre Libre Cours et devenez le troisième lieu du quartier.",
    actif: 'accueillir',
    corps,
    anime: true,
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
  // Servie à n'importe quelle adresse : liens absolus depuis la racine du site.
  const racine = `${new URL(SITE.url).pathname.replace(/\/$/, '')}/`;
  return {
    fichier: '404.html',
    titre: 'Page introuvable · Libre Cours',
    description: "Cette page n'existe pas ou plus.",
    indexer: false,
    racine,
    corps: `<section class="wrap page-simple">
<h1 class="h1-installer">Cette page n'existe pas.</h1>
<p class="chapeau">Elle a peut-être changé d'adresse. Les rencontres, elles, sont toujours en bas de chez vous.</p>
<div class="boutons"><a class="btn" href="${racine}dates.html">Voir les prochaines dates</a><a class="btn btn--ghost" href="${racine}">Retour à l'accueil</a></div>
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
<p>Le site librecours.xyz est édité par s9, studio de design. Adresse : ${aCompleter}. SIRET : ${aCompleter}. Directeur de la publication : ${aCompleter}. Contact : <a href="mailto:${SITE.mail}">${SITE.mail}</a>.</p>
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
