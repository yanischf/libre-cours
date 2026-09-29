// Le Tampon : logo et mécanique de collection (SVG 200×200).
import { esc } from './outils.mjs';

let compteur = 0;

/**
 * @param {object} p
 * @param {string} [p.ink]    couleur des traits et de l'anneau
 * @param {string} [p.accent] couleur du centre
 * @param {string} [p.fill]   remplissage du disque
 * @param {string} [p.ring]   texte circulaire
 * @param {string} [p.l1]     première ligne du centre
 * @param {string} [p.l2]     seconde ligne (optionnelle)
 * @param {string} [p.small]  petite ligne sous l1 (si une seule ligne)
 * @param {number} [p.rot]    rotation en degrés
 * @param {boolean} [p.dashed] anneau extérieur en pointillés
 * @param {number} [p.size]   taille du texte central
 */
export function tampon({
  ink = '#1b2a8f',
  accent = '#ff7a3d',
  fill = 'none',
  ring = 'LIBRE COURS · RENCONTRES DE QUARTIER · ',
  l1 = 'libre',
  l2 = '',
  small = '',
  rot = 0,
  dashed = false,
  size,
} = {}) {
  const id = `tp${++compteur}`;
  const deux = Boolean(l2);
  const s = size ?? (deux ? 33 : 38);
  const bagel = `text-anchor="middle" font-family="Bagel Fat One, sans-serif" font-size="${s}" fill="${accent}"`;
  const centre = deux
    ? `<text x="100" y="98" ${bagel}>${esc(l1)}</text><text x="100" y="132" ${bagel}>${esc(l2)}</text>`
    : `<text x="100" y="112" ${bagel}>${esc(l1)}</text>` +
      (small
        ? `<text x="100" y="140" text-anchor="middle" font-family="DM Mono, monospace" font-weight="500" font-size="11" letter-spacing="2" fill="${ink}">${esc(small)}</text>`
        : '');

  return `<svg class="tampon" viewBox="0 0 200 200" aria-hidden="true" focusable="false"><g transform="rotate(${rot} 100 100)"><defs><path id="${id}" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/></defs><circle cx="100" cy="100" r="97" fill="${fill}"/><circle cx="100" cy="100" r="93" fill="none" stroke="${ink}" stroke-width="6"${dashed ? ' stroke-dasharray="10 7"' : ''}/><circle cx="100" cy="100" r="64" fill="none" stroke="${ink}" stroke-width="2.5"/><text font-family="DM Mono, monospace" font-weight="500" font-size="14.5" letter-spacing="3" fill="${ink}"><textPath href="#${id}">${esc(ring)}</textPath></text>${centre}</g></svg>`;
}
