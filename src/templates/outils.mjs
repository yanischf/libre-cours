// Petits outils partagés par les gabarits.

/** Échappe une valeur pour l'insérer dans du HTML (texte ou attribut). */
export function esc(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Transforme « La Butte-aux-Cailles » en « la-butte-aux-cailles ». */
export function slug(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Rotation stable dérivée d'un identifiant, entre -12 et +8 degrés. */
export function rotation(id) {
  let h = 0;
  for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) | 0;
  return (Math.abs(h) % 21) - 12;
}

/**
 * Typographie française : espace insécable avant « ? ! ; : » et à l'intérieur
 * des guillemets. Ne touche ni aux balises, ni aux <script>/<style>.
 */
export function typoFr(html) {
  return html
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/g)
    .map((part, i) => {
      if (i % 2 === 1) return part; // balise ou bloc script/style
      return part
        .replace(/ ([?!;:»])/g, ' $1')
        .replace(/« /g, '« ');
    })
    .join('');
}
