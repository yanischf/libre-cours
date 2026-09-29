// Lecture des contenus (content/*.json) et calcul des champs dérivés.
import { readFileSync } from 'node:fs';
import { rotation, slug } from './outils.mjs';

const TZ = 'Europe/Paris';
const JOURS_COURTS = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
const MOIS_COURTS = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** Découpe une date ISO en composantes, à l'heure de Paris. */
function parties(iso) {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23',
  });
  const p = Object.fromEntries(f.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  const jours = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { an: +p.year, mois: +p.month, jour: +p.day, h: +p.hour, min: +p.minute, js: jours[p.weekday] };
}

function lire(fichier) {
  return JSON.parse(readFileSync(new URL(`../../content/${fichier}`, import.meta.url), 'utf8'));
}

/** Rencontres à venir, triées par date, avec les champs d'affichage. */
export function rencontres(maintenant = new Date()) {
  return lire('rencontres.json')
    .filter((r) => new Date(r.date) >= maintenant)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((r) => {
      const d = parties(r.date);
      const heure = `${d.h}h${d.min ? String(d.min).padStart(2, '0') : ''}`;
      const complet = Boolean(r.complet) || !r.places;
      return {
        ...r,
        complet,
        slugQuartier: slug(r.quartier),
        num: `${String(d.jour).padStart(2, '0')}.${String(d.mois).padStart(2, '0')}`,
        jour: `${JOURS_COURTS[d.js]} ${d.jour} ${MOIS_COURTS[d.mois - 1]}`,
        jourLong: `${JOURS_COURTS[d.js].replace('.', '')} ${d.jour} ${MOIS[d.mois - 1]} ${d.an}`,
        heure,
        stamp: `${JOURS_COURTS[d.js].replace('.', '').toUpperCase()} · ${heure.toUpperCase()}`,
        ring: r.ring || `LIBRE COURS · ${r.lieu.toUpperCase()} · `,
        rot: r.rot ?? rotation(r.id),
        placesTexte: complet ? 'Complet' : `${r.places} places`,
      };
    })
    // Sans lien d'inscription dédié, on écrit à l'équipe.
    .map((r) => ({
      ...r,
      lien: r.inscriptionUrl ||
        `mailto:bonjour@librecours.fr?subject=${encodeURIComponent(
          `${r.complet ? "Liste d'attente" : 'Inscription'} · ${r.quartier} · ${r.jour}`,
        )}`,
    }));
}

/** Traces des rencontres passées, de la plus récente à la plus ancienne. */
export function traces() {
  return lire('traces.json')
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((t) => {
      const [an, m] = t.date.split('-').map(Number);
      const mois = MOIS[m - 1];
      return {
        ...t,
        mois,
        dateTexte: `${mois[0].toUpperCase()}${mois.slice(1)} ${an}`,
        ring: t.ring || `LIBRE COURS · ${t.lieu.toUpperCase()} · `,
        rot: t.rot ?? rotation(t.id),
      };
    });
}
