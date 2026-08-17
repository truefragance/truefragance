(function () {
  "use strict";

  /* =========================================================
     CONFIG — edita solo esta línea con tu número real
     Formato: código de país + número, sin +, espacios ni guiones
  ========================================================= */
  const WHATSAPP_NUMBER = "18492874453";

  const money = (n) => "RD$" + n.toLocaleString("es-DO");

  /* =========================================================
     Estado del carrito (persiste en localStorage)
  ========================================================= */
  let cart = JSON.parse(localStorage.getItem("tf_cart") || "{}");

  function saveCart() {
    localStorage.setItem("tf_cart", JSON.stringify(cart));
    renderCart();
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
  }

  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
  }

  function removeFromCart(id) {
    delete cart[id];
    saveCart();
  }

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find((p) => p.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
  }

  /* =========================================================
     Render: catálogo
  ========================================================= */
  const grid = document.getElementById("productGrid");
  const filterEl = document.getElementById("categoryFilter");
  const genderFilterEl = document.getElementById("genderFilter");
  const searchInput = document.getElementById("searchInput");
  let activeCategory = "todos";
  let activeGender = "todos";
  let searchTerm = "";

  function renderCategoryFilter() {
    const cats = ["todos", ...Object.keys(CATEGORIES)];
    filterEl.innerHTML = cats.map((c) => `
      <button class="cat-btn ${c === activeCategory ? "active" : ""}" data-cat="${c}" type="button">
        ${c === "todos" ? "Todos" : CATEGORIES[c]}
      </button>
    `).join("");
  }

  function renderGenderFilter() {
    const genders = ["todos", ...Object.keys(GENDERS)];
    genderFilterEl.innerHTML = genders.map((g) => `
      <button class="gender-btn ${g === activeGender ? "active" : ""}" data-gender="${g}" type="button">
        ${g === "todos" ? "Todos" : GENDERS[g]}
      </button>
    `).join("");
  }

  filterEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    renderCategoryFilter();
    renderProducts();
  });

  genderFilterEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-gender]");
    if (!btn) return;
    activeGender = btn.dataset.gender;
    renderGenderFilter();
    renderProducts();
  });

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderProducts();
  });

  function renderProducts() {
    let list = activeCategory === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

    if (activeGender !== "todos") {
      list = list.filter((p) => p.gender === activeGender);
    }

    if (searchTerm) {
      list = list.filter((p) => p.name.toLowerCase().includes(searchTerm));
    }

    if (list.length === 0) {
      grid.innerHTML = `<p class="no-results">No encontramos perfumes con ese nombre o categoría.</p>`;
      return;
    }

    grid.innerHTML = list.map((p) => `
      <article class="product-card" data-id="${p.id}">
        <div class="product-photo">
          ${p.image ? `<img src="${p.image}" alt="${p.name}">` : `<span>${p.name}</span>`}
        </div>
        <div class="product-body">
          <span class="product-cat">${CATEGORIES[p.category] || ""} · ${GENDERS[p.gender] || ""}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <p class="product-price">${money(p.price)}</p>
          <button class="pyramid-toggle" type="button" aria-expanded="false">Ver pirámide olfativa</button>
          <div class="pyramid">
            <div class="pyramid-row"><b>Salida</b><span>${p.notes.salida}</span></div>
            <div class="pyramid-row"><b>Corazón</b><span>${p.notes.corazon}</span></div>
            <div class="pyramid-row"><b>Fondo</b><span>${p.notes.fondo}</span></div>
          </div>
          <div class="product-footer">
            <button class="add-btn" type="button" data-add="${p.id}">Agregar</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  grid.addEventListener("click", (e) => {
    const toggle = e.target.closest(".pyramid-toggle");
    if (toggle) {
      const pyramid = toggle.nextElementSibling;
      const open = pyramid.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Ocultar pirámide olfativa" : "Ver pirámide olfativa";
      return;
    }
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addToCart(addBtn.dataset.add);
      addBtn.textContent = "Agregado ✓";
      addBtn.classList.add("added");
      setTimeout(() => {
        addBtn.textContent = "Agregar";
        addBtn.classList.remove("added");
      }, 900);
    }
  });

  /* =========================================================
     Render: carrito
  ========================================================= */
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyEl = document.getElementById("cartEmpty");
  const cartCountEl = document.getElementById("cartCount");
  const cartTotalEl = document.getElementById("cartTotal");
  const whatsappBtn = document.getElementById("whatsappBtn");

  function renderCart() {
    const entries = Object.entries(cart);
    cartCountEl.textContent = cartCount();

    if (entries.length === 0) {
      cartItemsEl.innerHTML = "";
      cartItemsEl.appendChild(cartEmptyEl);
    } else {
      cartItemsEl.innerHTML = entries.map(([id, qty]) => {
        const p = PRODUCTS.find((p) => p.id === id);
        if (!p) return "";
        return `
          <div class="cart-item" data-id="${id}">
            <div>
              <div class="cart-item-name">${p.name}</div>
              <div class="cart-item-price">${money(p.price)} c/u</div>
            </div>
            <div class="cart-item-controls">
              <button class="qty-btn" data-dec="${id}" aria-label="Restar">–</button>
              <span class="qty-val">${qty}</span>
              <button class="qty-btn" data-inc="${id}" aria-label="Sumar">+</button>
              <button class="remove-btn" data-remove="${id}">Quitar</button>
            </div>
          </div>
        `;
      }).join("");
    }

    cartTotalEl.textContent = money(cartTotal());
    whatsappBtn.href = buildWhatsAppLink();
  }

  cartItemsEl.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const rem = e.target.closest("[data-remove]");
    if (inc) changeQty(inc.dataset.inc, 1);
    if (dec) changeQty(dec.dataset.dec, -1);
    if (rem) removeFromCart(rem.dataset.remove);
  });

  /* =========================================================
     Mensaje automático de WhatsApp
  ========================================================= */
  function buildWhatsAppLink() {
    const entries = Object.entries(cart);
    let msg = "Hola, quiero hacer un pedido en TrueFragancia:\n\n";

    if (entries.length === 0) {
      msg = "Hola, quiero hacer una consulta sobre sus perfumes.";
    } else {
      entries.forEach(([id, qty]) => {
        const p = PRODUCTS.find((p) => p.id === id);
        if (!p) return;
        msg += `• ${p.name} x${qty} — ${money(p.price * qty)}\n`;
      });
      msg += `\nTotal: ${money(cartTotal())}`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  /* =========================================================
     Abrir / cerrar carrito
  ========================================================= */
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");

  function openCart() {
    drawer.classList.add("open");
    overlay.classList.add("open");
  }
  function closeCart() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  }

  document.getElementById("cartTrigger").addEventListener("click", openCart);
  document.getElementById("openCartFromContact").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);

  /* =========================================================
     Botón flotante de WhatsApp (consulta directa, sin carrito)
  ========================================================= */
  document.getElementById("waFloat").addEventListener("click", () => {
    window.open(buildWhatsAppLink(), "_blank");
  });

  /* =========================================================
     FAQ acordeón
  ========================================================= */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    const answer = btn.nextElementSibling;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      answer.style.maxHeight = open ? null : answer.scrollHeight + "px";
    });
  });

  /* =========================================================
     Menú móvil
  ========================================================= */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* =========================================================
     Animaciones al hacer scroll
  ========================================================= */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* =========================================================
     Init
  ========================================================= */
  document.getElementById("year").textContent = new Date().getFullYear();
  renderCategoryFilter();
  renderGenderFilter();
  renderProducts();
  renderCart();
})();
