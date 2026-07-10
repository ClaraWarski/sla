// ===== SITE DE CASAMENTO — script.js =====
// Este arquivo depende de gifts-data.js (deve ser carregado antes dele no HTML).

(function () {
  "use strict";

  var chapelSvg =
    '<svg class="wc-chapel-svg" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="50" y1="4" x2="50" y2="16"/><line x1="45" y1="8" x2="55" y2="8"/>' +
    '<path d="M38 30 L50 16 L62 30 Z"/>' +
    '<rect x="40" y="30" width="20" height="14"/>' +
    '<circle cx="50" cy="37" r="4"/>' +
    '<path d="M25 88 L25 50 Q50 30 75 50 L75 88 Z"/>' +
    '<path d="M42 88 L42 68 Q50 60 58 68 L58 88 Z"/>' +
    '<line x1="15" y1="88" x2="85" y2="88"/>' +
    "</svg>";

  function formatBRL(v) {
    return v.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // ---------- Renderiza os cards de presente a partir de WC_GIFTS ----------
  function renderGifts() {
    var grid = document.getElementById("gift-grid");
    if (!grid || typeof WC_GIFTS === "undefined") return;

    var html = "";
    WC_GIFTS.forEach(function (g) {
      html +=
        '<div class="wc-reveal wc-gift-card">' +
        '<div class="wc-gift-img">' +
        '<div class="wc-monogram">J &amp; J</div>' +
        chapelSvg +
        "</div>" +
        '<div class="wc-gift-body">' +
        '<span class="wc-gift-badge">Presente</span>' +
        "<h3>" + g.titulo + "</h3>" +
        "<p>" + g.desc + "</p>" +
        '<div class="wc-price">R$ ' + formatBRL(g.preco) + "</div>" +
        '<a class="wc-btn" href="' + g.link + '" target="_blank" rel="noopener">Presentear &rarr;</a>' +
        "</div>" +
        "</div>";
    });
    grid.innerHTML = html;
  }

  // ---------- Anima a entrada dos elementos .wc-reveal ao rolar a tela ----------
  function setupScrollReveal() {
    var items = document.querySelectorAll(".wc-reveal");
    if (!("IntersectionObserver" in window)) {
      // navegador muito antigo: mostra tudo direto, sem animação
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Espalha flores decorativas pelo hero ----------
  function scatterFlowers() {
    var container = document.getElementById("hero-flowers");
    if (!container) return;
    var positions = [
      ["5%", "14%", 20, 22], ["44%", "8%", 90, 22], ["8%", "48%", 200, 22],
      ["15%", "78%", 300, 22], ["60%", "20%", 150, 14], ["30%", "60%", 80, 16],
      ["70%", "70%", 260, 18],
    ];
    var html = "";
    positions.forEach(function (p) {
      html +=
        '<span class="wc-flower" style="left:' + p[0] + "; top:" + p[1] +
        "; transform:rotate(" + p[2] + "deg); font-size:" + p[3] + 'px;">❁</span>';
    });
    container.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderGifts();
    scatterFlowers();
    setupScrollReveal();
  });
})();
