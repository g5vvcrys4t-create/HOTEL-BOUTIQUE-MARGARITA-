(function () {
  'use strict';
  var form = document.getElementById('form-cotizacion');
  if (!form) return;
  var status = document.getElementById('form-status');

  document.querySelectorAll('[data-paquete]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sel = form.querySelector('[name="paquete"]');
      if (sel) sel.value = btn.getAttribute('data-paquete');
    });
  });

  var fecha = form.querySelector('[name="fecha"]');
  if (fecha) {
    var hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    fecha.min = hoy.toISOString().slice(0, 10);
  }

  function formatoFecha(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var d = new FormData(form);
    var v = function (k) { return (d.get(k) || '').toString().trim(); };
    var lineas = [
      'Hola, quiero cotizar un evento en Margarita Hotel Boutique & Fonda.',
      '',
      '*Nombre:* ' + v('nombre'),
      '*Teléfono:* ' + v('telefono')
    ];
    if (v('correo')) lineas.push('*Correo:* ' + v('correo'));
    lineas.push('*Tipo de evento:* ' + v('tipo'));
    if (v('fecha')) lineas.push('*Fecha:* ' + formatoFecha(v('fecha')));
    if (v('invitados')) lineas.push('*Invitados:* ' + v('invitados'));
    if (v('espacio')) lineas.push('*Espacio de interés:* ' + v('espacio'));
    if (v('paquete')) lineas.push('*Paquete:* ' + v('paquete'));
    if (v('mensaje')) lineas.push('', '*Mensaje:* ' + v('mensaje'));

    var url = window.MARGARITA.waLink(lineas.join('\n'));
    var win = window.open(url, '_blank');
    if (win) { win.opener = null; } else { window.location.href = url; }
    if (status) status.textContent = 'Listo. Se abrió WhatsApp con tu solicitud; solo presiona "Enviar".';
  });
})();
