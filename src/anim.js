// Animations au défilement. Inclus dans la page par le générateur.
// Le contenu n'est masqué que si ce script tourne (classe .anim posée dans
// <head>) : sans JavaScript, pour les robots ou avec « réduire les
// animations », tout est visible d'emblée.
(function () {
  if (!document.documentElement.classList.contains('anim')) return;
  var attente = [].slice.call(document.querySelectorAll('[data-anim]'));

  function montre(el) {
    var i = attente.indexOf(el);
    if (i < 0) return;
    attente.splice(i, 1);
    // Une fois l'animation jouée, on retire les transitions (survol instantané).
    var fin = el.dataset.anim === 'rise' ? 'translate' : 'scale';
    el.addEventListener('transitionend', function f(e) {
      if (e.target !== el || e.propertyName !== fin) return;
      el.classList.add('fini');
      el.removeEventListener('transitionend', f);
    });
    el.classList.add('vu');
  }

  var io = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (e.isIntersecting) { io.unobserve(e.target); montre(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  attente.forEach(function (el) { io.observe(el); });

  // Filet de sécurité : ne jamais laisser un élément visible à l'écran masqué.
  function verifie() {
    var h = window.innerHeight;
    attente.slice().forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.92 && r.bottom > 0) montre(el);
    });
  }
  addEventListener('scroll', verifie, { passive: true });
  addEventListener('resize', verifie);
  requestAnimationFrame(verifie);
  setTimeout(verifie, 400);
})();
