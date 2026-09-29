// Génère les visuels de partage et les icônes en SVG (polices embarquées),
// puis les convertit en PNG avec QuickLook (macOS) : `node outils/visuels.mjs`.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tampon } from '../src/templates/tampon.mjs';

const police = (f) => readFileSync(new URL(`../src/fonts/${f}`, import.meta.url)).toString('base64');
const styles = `<style>
@font-face{font-family:'Bagel Fat One';src:url(data:font/woff2;base64,${police('bagel-fat-one-400.woff2')}) format('woff2')}
@font-face{font-family:'DM Mono';font-weight:500;src:url(data:font/woff2;base64,${police('dm-mono-500.woff2')}) format('woff2')}
</style>`;

/** Place un tampon (SVG 200×200) à x,y avec une taille donnée. */
const pose = (x, y, taille, props) =>
  tampon(props).replace('<svg class="tampon" viewBox="0 0 200 200"', `<svg x="${x}" y="${y}" width="${taille}" height="${taille}" viewBox="0 0 200 200" overflow="visible"`);

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 -285 1200 1200">${styles}
<rect width="1200" height="630" fill="#ff7a3d"/>
${pose(72, 60, 72, { l1: 'libre', l2: 'cours', size: 36, fill: '#f3eee4' })}
<text x="160" y="108" font-family="Bagel Fat One" font-size="40" fill="#1b2a8f">Libre Cours</text>
<g font-family="Bagel Fat One" font-size="96" fill="#1b2a8f">
<text x="68" y="270">Faire ensemble, ça</text>
<text x="68" y="360">commence en bas</text>
<text x="68" y="450">de chez vous.</text>
</g>
<text x="72" y="560" font-family="DM Mono" font-weight="500" font-size="22" letter-spacing="1" fill="#1b2a8f">RENCONTRES DE QUARTIER À PRIX LIBRE</text>
${pose(830, 330, 460, { l1: 'libre', l2: 'cours', fill: '#f3eee4', rot: -12 })}
</svg>`;

const icone = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">${styles}
<rect width="512" height="512" fill="#ff7a3d"/>
${pose(16, 16, 480, { l1: 'libre', l2: 'cours', size: 40, fill: '#f3eee4' })}
</svg>`;

const tmp = join(tmpdir(), 'lc-visuels');
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp);
const racine = fileURLToPath(new URL('../src/racine/', import.meta.url));
mkdirSync(racine, { recursive: true });

function rendre(nom, svg, taille, sorties) {
  const f = join(tmp, `${nom}.svg`);
  writeFileSync(f, svg);
  execFileSync('qlmanage', ['-t', '-s', String(taille), '-o', tmp, f], { stdio: 'ignore' });
  const png = join(tmp, `${nom}.svg.png`);
  for (const [sortie, l, h] of sorties) {
    const cible = join(racine, sortie);
    // QuickLook rend une vignette carrée : on garde la bande centrale, ou on redimensionne.
    const args = l === h ? ['-z', String(h), String(l)] : ['-c', String(h), String(l)];
    execFileSync('sips', [...args, png, '--out', cible], { stdio: 'ignore' });
  }
}

rendre('og', og, 1200, [['og.png', 1200, 630]]);
rendre('icone', icone, 512, [['apple-touch-icon.png', 180, 180], ['favicon-32.png', 32, 32]]);
writeFileSync(join(tmp, 'og.svg'), og);
console.log('Visuels générés dans src/racine/');
