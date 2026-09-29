// Carte des rencontres (page Dates). Amélioration progressive : sans ce
// script, la liste et les filtres fonctionnent quand même (HTML + CSS).
(function () {
  var el = document.getElementById('carte');
  if (!el || !window.L) return;

  var cartes = [].slice.call(document.querySelectorAll('.rencontre'));
  var points = cartes.map(function (a) {
    var d = a.dataset;
    return { el: a, d: d, ll: [parseFloat(d.lat), parseFloat(d.lng)] };
  }).filter(function (p) { return !isNaN(p.ll[0]) && !isNaN(p.ll[1]); });
  if (!points.length) return;

  var mobile = L.Browser.mobile;
  var map = L.map(el, {
    scrollWheelZoom: false,
    dragging: !mobile, // sur téléphone, un doigt fait défiler la page
    zoomControl: true,
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);
  map.attributionControl.setPrefix(false);

  function span(cls, txt) {
    var s = document.createElement('span');
    s.className = cls;
    s.textContent = txt;
    return s;
  }

  var bornes = [];
  var parQuartier = {};
  points.forEach(function (p) {
    var d = p.d;
    var complet = d.complet === '1';

    var pin = document.createElement('div');
    pin.className = 'lc-pin' + (complet ? ' lc-full' : '');
    pin.appendChild(span('lc-dot', d.num));
    pin.appendChild(span('lc-tag', d.quartier));

    var icon = L.divIcon({ className: '', iconSize: [64, 64], iconAnchor: [32, 32], popupAnchor: [0, -30], html: pin });
    var m = L.marker(p.ll, { icon: icon, title: d.quartier + ', ' + d.lieu, alt: d.quartier }).addTo(map);

    var pop = document.createElement('div');
    pop.style.display = 'contents';
    pop.appendChild(span('pq', d.quartier));
    pop.appendChild(span('pl', d.lieu + ' · ' + d.jour));
    pop.appendChild(span('pqq', d.question));
    var a = document.createElement('a');
    a.className = 'pb';
    a.href = d.lien;
    a.textContent = complet ? "Complet · liste d'attente" : "Je m'inscris";
    pop.appendChild(a);
    m.bindPopup(pop);

    // Clic sur un marqueur : le filtre du quartier devient actif.
    m.on('click', function () {
      var r = document.getElementById('f-' + d.slug);
      if (r) r.checked = true;
    });

    bornes.push(p.ll);
    if (!parQuartier[d.slug]) parQuartier[d.slug] = p.ll;
  });

  function tout() { map.fitBounds(bornes, { padding: [70, 70], maxZoom: 15 }); }
  tout();

  // Clic sur un filtre : la carte se centre sur le quartier.
  document.querySelectorAll('input[name="quartier"]').forEach(function (r) {
    r.addEventListener('change', function () {
      if (r.value === 'tous') return tout();
      var ll = parQuartier[r.value];
      if (ll) map.setView(ll, 15);
    });
  });
})();
