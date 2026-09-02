const FAVORITES_KEY = "yael-shop-favorites";
const CART_KEY = "yael-shop-cart";
const DENSITY_KEY = "yael-shop-grid-density";
const WHATSAPP_NUMBER = "972525557663";
let currentCategory = "home";

const CATEGORY_SUBTITLES = {
  cups: "ספלי אמייל מעוצבים - לשטיפה ידנית בלבד (לא במדיח). מומלצים לשתייה קרה, לנטילת ידיים, או כעציץ קטן וחמוד."
};
const DEFAULT_SUBTITLE = "כל איור מודפס באיכות גבוהה ונשלח ארוז בקפידה";

function applySubtitle(category) {
  document.getElementById("section-subtitle").textContent = CATEGORY_SUBTITLES[category] || DEFAULT_SUBTITLE;
}

function applyGridDensity(density) {
  const grid = document.getElementById("gallery-grid");
  grid.classList.remove("density-1", "density-2");
  grid.classList.add(`density-${density}`);
  document.querySelectorAll(".density-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.density === density);
  });
  localStorage.setItem(DENSITY_KEY, density);
}

function openLightbox(src) {
  document.getElementById("lightbox-image").src = src;
  openPanel("lightbox-overlay");
}

function buildWhatsAppUrl(title, sizeLabel, price) {
  const message = `היי! אני מעוניינת לרכוש את האיור "${title}" בגודל ${sizeLabel} (${price} ₪)`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function priceRangeLabel(product) {
  const prices = product.sizes.map(s => s.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `${min} ₪` : `${min}–${max} ₪`;
}

function resolveImage(entry) {
  return typeof entry === "string"
    ? { src: entry, position: "", type: "image" }
    : { src: entry.src, position: entry.position || "", type: entry.type || "image" };
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("active");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("active"), 2200);
}

function renderProducts() {
  const grid = document.getElementById("gallery-grid");
  const template = document.getElementById("product-card-template");
  const products = PRODUCTS.filter(p => p.categories.includes(currentCategory));

  if (!products.length) {
    grid.innerHTML = '<p class="empty-state">איורים חדשים בקרוב...</p>';
    return;
  }

  grid.innerHTML = "";
  const favorites = getFavorites();
  const cardElements = [];

  products.forEach(product => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".product-card");
    card.dataset.id = product.id;

    const img = node.querySelector(".js-image");
    const video = node.querySelector(".js-video");
    const imageBox = node.querySelector(".product-image");
    const setImage = (index) => {
      const { src, position, type } = resolveImage(product.images[index]);
      if (type === "video") {
        video.src = src;
        video.style.display = "block";
        img.style.display = "none";
        video.play().catch(() => {});
      } else {
        img.src = src;
        img.style.objectPosition = position;
        img.style.display = "block";
        video.style.display = "none";
        video.pause();
      }
    };
    setImage(0);
    img.alt = product.title;
    if (product.categories.includes("sukkah")) {
      imageBox.classList.add("poster-ratio");
    } else if (product.categories.includes("cards") || product.categories.includes("cups")) {
      imageBox.classList.add("card-photo-ratio");
    }

    let justSwiped = false;
    imageBox.addEventListener("click", () => {
      if (justSwiped) {
        justSwiped = false;
        return;
      }
      if (grid.classList.contains("density-2") && img.style.display !== "none") {
        openLightbox(img.src);
      }
    });

    if (product.images.length > 1) {
      let selectedIndex = 0;
      const dotsWrap = node.querySelector(".js-dots");
      const dotTemplate = document.getElementById("image-dot-template");
      const total = product.images.length;
      const lastIndex = total - 1;
      const dots = [];

      const showImage = (index) => {
        selectedIndex = index;
        setImage(index);
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
      };

      product.images.forEach((src, index) => {
        const dotNode = dotTemplate.content.cloneNode(true);
        const dot = dotNode.querySelector(".image-dot");
        dot.classList.toggle("active", index === 0);
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          showImage(index);
        });
        dots.push(dot);
        dotsWrap.appendChild(dotNode);
      });

      imageBox.addEventListener("mouseenter", () => {
        setImage(lastIndex);
      });
      imageBox.addEventListener("mouseleave", () => {
        setImage(selectedIndex);
      });

      let touchStartX = null;
      imageBox.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });
      imageBox.addEventListener("touchend", (e) => {
        if (touchStartX === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        const SWIPE_THRESHOLD = 40;
        if (deltaX <= -SWIPE_THRESHOLD) {
          justSwiped = true;
          showImage((selectedIndex + 1) % total);
        } else if (deltaX >= SWIPE_THRESHOLD) {
          justSwiped = true;
          showImage((selectedIndex - 1 + total) % total);
        }
      });
    }

    node.querySelector(".js-title").textContent = product.title;
    node.querySelector(".js-price").textContent = priceRangeLabel(product);

    const heartBtn = node.querySelector(".js-heart");
    const isFav = favorites.includes(product.id);
    heartBtn.classList.toggle("active", isFav);
    heartBtn.setAttribute("aria-pressed", String(isFav));
    heartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(product.id, heartBtn);
    });

    const accordion = node.querySelector(".js-accordion");
    const cartToggle = node.querySelector(".js-cart-toggle");
    const buyToggle = node.querySelector(".js-buy-toggle");
    const hasSingleSize = product.sizes.length === 1;

    if (hasSingleSize) {
      // גודל יחיד (A3) - בלי אקורדיון, הכפתורים פועלים ישירות
      accordion.remove();
      const onlySize = product.sizes[0];
      cartToggle.addEventListener("click", () => addToCart(product, onlySize));
      buyToggle.addEventListener("click", () => window.open(buildWhatsAppUrl(product.title, onlySize.label, onlySize.price), "_blank", "noopener"));
    } else {
      const sizeRowsWrap = node.querySelector(".js-size-rows");
      const sizeTemplate = document.getElementById("size-row-template");

      product.sizes.forEach(size => {
        const rowNode = sizeTemplate.content.cloneNode(true);
        const rowBtn = rowNode.querySelector(".size-row");
        rowBtn.querySelector(".size-row-label").textContent = size.label;
        rowBtn.querySelector(".size-row-price").textContent = `${size.price} ₪`;
        rowBtn.addEventListener("click", () => {
          const mode = accordion.dataset.mode;
          if (mode === "cart") {
            addToCart(product, size);
          } else if (mode === "buy") {
            window.open(buildWhatsAppUrl(product.title, size.label, size.price), "_blank", "noopener");
          }
          accordion.hidden = true;
        });
        sizeRowsWrap.appendChild(rowNode);
      });

      [cartToggle, buyToggle].forEach(btn => {
        btn.addEventListener("click", () => {
          const mode = btn.dataset.mode;
          const alreadyOpenSameMode = !accordion.hidden && accordion.dataset.mode === mode;
          closeAllAccordions();
          if (!alreadyOpenSameMode) {
            accordion.dataset.mode = mode;
            accordion.hidden = false;
          }
        });
      });
    }

    cardElements.push(card);
  });

  if (currentCategory === "cards") {
    cardElements.splice(2, 0, createVideoCard());
  }

  cardElements.forEach(el => grid.appendChild(el));
}

function createVideoCard() {
  const wrap = document.createElement("article");
  wrap.className = "product-card video-card";
  wrap.innerHTML = `
    <div class="product-image card-photo-ratio">
      <video src="videos/cards-promo.mp4" autoplay muted loop playsinline></video>
    </div>
    <div class="product-info">
      <h3 class="product-title">כרטיסי ברכה משמחים</h3>
      <p class="product-price">כרטיס קטן שמחמם לב גדול - לסבתא, לאחות, לחברה הכי טובה, למורה שאהבתם, לחתונה, ללידה, או סתם למישהי או משהו ;)</p>
    </div>
  `;
  return wrap;
}

function closeAllAccordions() {
  document.querySelectorAll(".js-accordion").forEach(acc => {
    acc.hidden = true;
  });
}

function toggleFavorite(productId, heartBtn) {
  let favorites = getFavorites();
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
    heartBtn.classList.remove("active");
    heartBtn.setAttribute("aria-pressed", "false");
  } else {
    favorites.push(productId);
    heartBtn.classList.add("active");
    heartBtn.setAttribute("aria-pressed", "true");
  }
  saveFavorites(favorites);
  updateFavoritesCount();
  renderFavoritesPanel();
}

function addToCart(product, size) {
  const cart = getCart();
  cart.push({
    id: product.id,
    title: product.title,
    image: product.images[0],
    size: size.label,
    price: size.price
  });
  saveCart(cart);
  updateCartCount();
  renderCartPanel();
  showToast(`${product.title} (${size.label}) נוסף לעגלה`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartCount();
  renderCartPanel();
}

function updateFavoritesCount() {
  document.getElementById("favorites-count").textContent = getFavorites().length;
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = getCart().length;
}

function renderFavoritesPanel() {
  const list = document.getElementById("favorites-list");
  const favorites = getFavorites();
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  if (!favProducts.length) {
    list.innerHTML = '<p class="empty-state">עדיין לא סימנת איורים שאהבת</p>';
    return;
  }

  list.innerHTML = favProducts.map(product => `
    <div class="panel-item">
      <img src="${product.images[0]}" alt="${product.title}">
      <div class="panel-item-info">
        <p class="panel-item-title">${product.title}</p>
        <p class="panel-item-price">${priceRangeLabel(product)}</p>
      </div>
      <button class="panel-item-remove" data-remove-fav="${product.id}" aria-label="הסרה">✕</button>
    </div>
  `).join("");

  list.querySelectorAll("[data-remove-fav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.removeFav;
      let favorites = getFavorites().filter(fid => fid !== id);
      saveFavorites(favorites);
      updateFavoritesCount();
      renderFavoritesPanel();
      const heartBtn = document.querySelector(`.product-card[data-id="${id}"] .js-heart`);
      if (heartBtn) {
        heartBtn.classList.remove("active");
        heartBtn.setAttribute("aria-pressed", "false");
      }
    });
  });
}

function renderCartPanel() {
  const list = document.getElementById("cart-list");
  const cart = getCart();

  if (!cart.length) {
    list.innerHTML = '<p class="empty-state">העגלה שלך ריקה</p>';
    document.getElementById("cart-total-price").textContent = "0 ₪";
    return;
  }

  list.innerHTML = cart.map((item, index) => `
    <div class="panel-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="panel-item-info">
        <p class="panel-item-title">${item.title}</p>
        <p class="panel-item-price">${item.size} · ${item.price} ₪</p>
        <a href="${buildWhatsAppUrl(item.title, item.size, item.price)}" target="_blank" rel="noopener" class="panel-item-buy">לרכישה בוואטסאפ</a>
      </div>
      <button class="panel-item-remove" data-remove-cart="${index}" aria-label="הסרה">✕</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total-price").textContent = `${total} ₪`;

  list.querySelectorAll("[data-remove-cart]").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.removeCart)));
  });
}

function openPanel(overlayId) {
  document.getElementById(overlayId).classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePanel(overlayId) {
  document.getElementById(overlayId).classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  applyGridDensity(localStorage.getItem(DENSITY_KEY) || "2");
  applySubtitle(currentCategory);

  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("active")) return;
      document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      renderProducts();
      applyGridDensity(localStorage.getItem(DENSITY_KEY) || "2");
      applySubtitle(currentCategory);
    });
  });

  document.querySelectorAll(".density-btn").forEach(btn => {
    btn.addEventListener("click", () => applyGridDensity(btn.dataset.density));
  });

  updateFavoritesCount();
  updateCartCount();
  renderFavoritesPanel();
  renderCartPanel();

  document.getElementById("favorites-btn").addEventListener("click", () => openPanel("favorites-overlay"));
  document.getElementById("cart-btn").addEventListener("click", () => openPanel("cart-overlay"));
  document.querySelector(".js-close-favorites").addEventListener("click", () => closePanel("favorites-overlay"));
  document.querySelector(".js-close-cart").addEventListener("click", () => closePanel("cart-overlay"));
  document.getElementById("lightbox-close").addEventListener("click", () => closePanel("lightbox-overlay"));

  document.querySelectorAll(".panel-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePanel(overlay.id);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePanel("favorites-overlay");
      closePanel("cart-overlay");
      closePanel("lightbox-overlay");
      closeAllAccordions();
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".product-card")) closeAllAccordions();
  });
});
