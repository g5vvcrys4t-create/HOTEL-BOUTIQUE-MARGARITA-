var MENU = [
  {
    categoria: "Desayunos",
    nota: "De 8:00 a 11:30.",
    platillos: [
      { nombre: "Chilaquiles de la casa",   descripcion: "Salsa verde o roja de molcajete, crema, queso fresco y cebolla morada.", precio: null },
      { nombre: "Enchiladas potosinas",     descripcion: "Masa con chile ancho rellena de queso, con papa y zanahoria.",            precio: null },
      { nombre: "Huevos al gusto",          descripcion: "Con frijoles de la olla y tortillas recién hechas en comal.",            precio: null },
      { nombre: "Pan dulce y café de olla", descripcion: "Selección del día con café de olla con piloncillo y canela.",            precio: null }
    ]
  },
  {
    categoria: "Entradas",
    nota: "",
    platillos: [
      { nombre: "Sopa de fideo seco",  descripcion: "Receta de la abuela con chipotle, aguacate y crema.", precio: null },
      { nombre: "Tostadas de tinga",   descripcion: "Pollo deshebrado en chipotle sobre tostada de maíz.",  precio: null },
      { nombre: "Guacamole al molcajete", descripcion: "Con totopos de la casa.",                          precio: null }
    ]
  },
  {
    categoria: "Platos fuertes",
    nota: "",
    platillos: [
      { nombre: "Mole de la casa",       descripcion: "Pieza de pollo en mole tradicional con arroz rojo.",              precio: null },
      { nombre: "Cecina potosina",       descripcion: "Con enchiladas, frijoles y rajas.",                                precio: null },
      { nombre: "Asado de boda",         descripcion: "Cerdo en salsa de chile ancho, receta típica potosina.",           precio: null },
      { nombre: "Pescado a la talla",    descripcion: "Toque contemporáneo de nuestros chefs, con verduras al comal.",    precio: null }
    ]
  },
  {
    categoria: "Postres",
    nota: "",
    platillos: [
      { nombre: "Flan de cajeta",     descripcion: "Hecho en casa.",                         precio: null },
      { nombre: "Buñuelos",           descripcion: "Con miel de piloncillo.",                precio: null },
      { nombre: "Arroz con leche",    descripcion: "Con canela y pasas.",                    precio: null }
    ]
  },
  {
    categoria: "Bar y coctelería",
    nota: "Música en vivo por las noches.",
    platillos: [
      { nombre: "Margarita de la casa", descripcion: "Nuestro coctel insignia.",                         precio: null },
      { nombre: "Mezcalita de tuna",    descripcion: "Mezcal potosino con tuna roja.",                   precio: null },
      { nombre: "Carajillo",            descripcion: "Espresso y licor.",                                precio: null },
      { nombre: "Vinos y cervezas",     descripcion: "Selección de vinos mexicanos y cerveza artesanal.", precio: null }
    ]
  }
];

(function () {
  'use strict';
  var tabs = document.getElementById('menu-tabs');
  var panels = document.getElementById('menu-panels');
  if (!tabs || !panels) return;

  var esc = window.MARGARITA.esc;

  tabs.innerHTML = MENU.map(function (cat, i) {
    return '<button class="chip" role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(cat.categoria) + '</button>';
  }).join('');

  panels.innerHTML = MENU.map(function (cat, i) {
    return '<div class="menu-panel" role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
      (cat.nota ? '<p>' + esc(cat.nota) + '</p>' : '') +
      '<ul class="menu-items">' + cat.platillos.map(function (p) {
        var precio = p.precio != null ? '$' + Number(p.precio).toLocaleString('es-MX') : '<span class="pending">PENDIENTE</span>';
        return '<li class="menu-item"><h4>' + esc(p.nombre) + '</h4><span class="menu-price">' + precio + '</span><p>' + esc(p.descripcion) + '</p></li>';
      }).join('') + '</ul></div>';
  }).join('');

  var botones = tabs.querySelectorAll('[role="tab"]');
  function activar(i) {
    botones.forEach(function (b, j) {
      b.setAttribute('aria-selected', String(i === j));
      b.tabIndex = i === j ? 0 : -1;
      document.getElementById('panel-' + j).hidden = i !== j;
    });
  }
  botones.forEach(function (b, i) {
    b.addEventListener('click', function () { activar(i); });
    b.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % botones.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + botones.length) % botones.length;
      if (n !== null) { e.preventDefault(); activar(n); botones[n].focus(); }
    });
  });
})();
