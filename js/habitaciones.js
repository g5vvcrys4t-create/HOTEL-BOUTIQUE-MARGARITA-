var HABITACIONES = [
  { numero: 1,  flor: "", tipo: "Deluxe",       precio: null, foto: "img/habitacion-01.jpg" },
  { numero: 2,  flor: "", tipo: "Deluxe",       precio: null, foto: "img/habitacion-02.jpg" },
  { numero: 3,  flor: "", tipo: "Deluxe",       precio: null, foto: "img/habitacion-03.jpg" },
  { numero: 4,  flor: "", tipo: "Deluxe",       precio: null, foto: "img/habitacion-04.jpg" },
  { numero: 5,  flor: "", tipo: "Deluxe",       precio: null, foto: "img/habitacion-05.jpg" },
  { numero: 6,  flor: "", tipo: "Deluxe",       precio: null, foto: "img/habitacion-06.jpg" },
  { numero: 7,  flor: "", tipo: "Deluxe Doble", precio: null, foto: "img/habitacion-07.jpg" },
  { numero: 8,  flor: "", tipo: "Deluxe Doble", precio: null, foto: "img/habitacion-08.jpg" },
  { numero: 9,  flor: "", tipo: "Deluxe Doble", precio: null, foto: "img/habitacion-09.jpg" },
  { numero: 10, flor: "", tipo: "Deluxe Doble", precio: null, foto: "img/habitacion-10.jpg" },
  { numero: 11, flor: "", tipo: "Deluxe Doble", precio: null, foto: "img/habitacion-11.jpg" },
  { numero: 12, flor: "", tipo: "Deluxe Doble", precio: null, foto: "img/habitacion-12.jpg" }
];

var TIPOS = {
  "Deluxe":       { cama: "1 cama king size",   capacidad: 2, vista: "Vista a la ciudad" },
  "Deluxe Doble": { cama: "2 camas queen size", capacidad: 2, vista: "Vista a la ciudad" }
};

(function () {
  'use strict';
  var lista = document.getElementById('lista-habitaciones');
  if (!lista) return;

  var esc = window.MARGARITA.esc;
  function formatoPrecio(n) { return '$' + Number(n).toLocaleString('es-MX'); }

  lista.innerHTML = HABITACIONES.map(function (h) {
    var t = TIPOS[h.tipo] || {};
    var nombre = h.flor ? h.flor : String(h.numero);
    var titulo = 'Habitación ' + nombre;
    var msg = 'Hola, quiero reservar la habitación ' + nombre + ' para las fechas: ';
    var precio = h.precio
      ? 'desde <strong>' + formatoPrecio(h.precio) + '</strong> <small>MXN por noche</small>'
      : 'desde <strong>$</strong><span class="pending">PENDIENTE</span>';
    return '' +
      '<article class="card room-card reveal" data-tipo="' + esc(h.tipo) + '">' +
        '<figure class="media" data-file="' + esc(h.foto) + '">' +
          '<img src="' + esc(h.foto) + '" alt="' + esc(titulo + ', habitación ' + h.tipo + ' con ' + (t.cama || '')) + '" loading="lazy">' +
        '</figure>' +
        '<div class="card-body">' +
          '<p class="eyebrow eyebrow--flush">' + esc(h.tipo) + ' · No. ' + h.numero + '</p>' +
          '<h3>' + esc(titulo) + '</h3>' +
          '<ul class="room-meta">' +
            '<li>' + esc(t.cama || '') + '</li>' +
            '<li>' + (t.capacidad || '') + ' personas</li>' +
            '<li>' + esc(t.vista || '') + '</li>' +
          '</ul>' +
          '<p class="price">' + precio + '</p>' +
          '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + window.MARGARITA.waLink(msg) + '" aria-label="Reservar la ' + esc(titulo) + ' por WhatsApp">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/></svg>' +
            'Reservar por WhatsApp</a>' +
        '</div>' +
      '</article>';
  }).join('');

  window.MARGARITA.observeReveal(lista);

  var botones = document.querySelectorAll('[data-filtro]');
  botones.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filtro');
      botones.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      lista.querySelectorAll('.room-card').forEach(function (card) {
        card.hidden = !(f === 'todas' || card.getAttribute('data-tipo') === f);
      });
    });
  });
})();
