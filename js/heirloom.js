/* Draws the leaf marks into empty SVGs, plus the shop filter and contact form. */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  // Fine-line frond: a curved stem with leaflets on both sides, like the logo.
  function frond(parent, cx, cy, scale, rot) {
    var g = el("g", {
      transform: "translate(" + cx + " " + cy + ") rotate(" + rot + ") scale(" + scale + ")",
      fill: "none", stroke: "currentColor", "stroke-width": 1.4 / scale,
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }, parent);
    var p0 = [-70, 12], c = [0, 10], p1 = [72, -14];
    function pt(t) {
      var u = 1 - t;
      return [u*u*p0[0] + 2*u*t*c[0] + t*t*p1[0], u*u*p0[1] + 2*u*t*c[1] + t*t*p1[1]];
    }
    function tan(t) {
      var dx = 2*(1-t)*(c[0]-p0[0]) + 2*t*(p1[0]-c[0]);
      var dy = 2*(1-t)*(c[1]-p0[1]) + 2*t*(p1[1]-c[1]);
      return Math.atan2(dy, dx);
    }
    el("path", { d: "M" + (p0[0]-14) + " " + (p0[1]+3) + " L" + p0 + " Q" + c + " " + p1 }, g);
    function leaflet(t, side, len, spread) {
      var p = pt(t), a = tan(t) + side * spread;
      var tip = [p[0] + Math.cos(a)*len, p[1] + Math.sin(a)*len];
      var w = len * 0.2, na = a + Math.PI/2;
      var m = [(p[0]+tip[0])/2, (p[1]+tip[1])/2];
      var c1 = [m[0] + Math.cos(na)*w, m[1] + Math.sin(na)*w];
      var c2 = [m[0] - Math.cos(na)*w, m[1] - Math.sin(na)*w];
      el("path", { d: "M" + p + " Q" + c1 + " " + tip + " Q" + c2 + " " + p }, g);
    }
    for (var i = 0; i < 9; i++) {
      var t = 0.12 + i * 0.1, f = 1 - i * 0.07;
      leaflet(t, 1, 44 * f, 0.8);
      leaflet(t, -1, 44 * f, 0.8);
    }
  }

  function init() {
    document.querySelectorAll("svg[data-leaf]:not([data-drawn])").forEach(function (s) {
      s.setAttribute("data-drawn", "");
      frond(s, 60, 38, 0.62, -14);
    });
  }
  init();

  // Shop page: show only the items in the chosen category.
  var filters = document.querySelectorAll("[data-filter]");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var kind = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      document.querySelectorAll(".item[data-kind]").forEach(function (t) {
        t.hidden = kind !== "all" && t.getAttribute("data-kind") !== kind;
      });
    });
  });

  // Contact page: the form isn't hooked up to send yet, so say so instead of failing silently.
  var form = document.querySelector("form[data-contact]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      status.textContent = "Thanks! This form isn't connected yet, so your message wasn't sent.";
      status.hidden = false;
    });
  }
})();
