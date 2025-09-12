// Backend API URL (Spring Boot)
const API_URL = "http://localhost:9091/api/products";

// Map of productId => imageUrl
const productImages = {
  1: "https://m.media-amazon.com/images/I/61d88xzrklL._UF1000,1000_QL80_.jpg",
  2: "https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-s928-490846-sm-s928blbwmea-539426725?$684_547_PNG$",
  3: "https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-s928-490846-sm-s928blbwmea-539426725?$684_547_PNG$",
  4: "https://www.apple.com/v/macbook-air/u/images/overview/hero/hero_static__c9sislzzicq6_large.png",
  5: "https://m.media-amazon.com/images/I/71Nsxgmi7xL.jpg",
  6: "https://dynamicdistributors.in/wp-content/uploads/2023/12/61nF5ekaaPL._SL1500_.jpg",
  7: "https://rukminim2.flixcart.com/image/704/844/kj4m0sw0-0/refrigerator-new/7/c/h/ifpro-bm-inv-340-elt-steel-onyx-2s-n-2-whirlpool-original-imafyr9pk5fg2gyk.jpeg?q=90&crop=false",
  8: "https://d1ncau8tqf99kp.cloudfront.net/converted/102417_original_local_1200x1050_v3_converted.webp",
  9: "https://shop.gkwretail.com/cdn/shop/products/DressingTable39.5_WideVanitywithMirror-1.jpg?v=1651128950",
  10: "https://sunsgoods.com/wp-content/uploads/2024/09/Cozy-living-room-with-a-white-sofa-and-natural-decor.webp",
  11: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
  12: "https://www.bookishadda.com/cdn/shop/files/257_521c21bd-c368-48d5-844c-43a89fcd1d07.png?v=1743593371&width=1946",
  13:"https://i5.walmartimages.com/seo/American-Tourister-Cargo-Max-28-Hardside-Large-Checked-Spinner-Luggage-Single-Piece-Black_ff34ce7d-7d73-445a-85b0-ea77d6cb0b35.62ed5893350bc377eb48b757dd23365b.jpeg?odnHeight=600&odnWidth=768&odnBg=FFFFFF",
  14:"https://skybags.co.in/cdn/shop/files/1_1800x1800_9f8fb07d-a496-452e-bb00-53c2d01d0228.png?v=1740656533",
  15:"https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/10466768/2019/9/5/783e163e-ab06-4a27-84ad-79f476253a861567687946520-Aristocrat-Unisex-Teal-Blue-Brand-Logo-Laptop-Backpack-23615-1.jpg",
  16:"https://safaribags.com/cdn/shop/files/Vogue-04_BP_N_Black_04_1024x.jpg?v=1707728197",
};

// DOM references
const productGrid = document.getElementById("productGrid");
const productDetail = document.getElementById("productDetail");
const categoriesBtn = document.getElementById("categoriesBtn");
const categoriesMenu = document.getElementById("categoriesMenu");
const homeBtn = document.getElementById("homeBtn");
const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("searchSuggestions");
const themeToggle = document.getElementById("themeToggle");
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const loginClose = document.getElementById("loginClose");
const loginForm = document.getElementById("loginForm");
const loginIdentifier = document.getElementById("loginIdentifier");
const loginPassword = document.getElementById("loginPassword");
const signupBtn = document.getElementById("signupBtn");

// Cart references
const cartBtn = document.getElementById("cartBtn");
const cartCountEl = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartClose = document.getElementById("cartClose");
const cartCloseTop = document.getElementById("cartCloseTop");
const cartItemsEl = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");

let productsList = [];
let cartItems = new Map();

// ----------------- Fetch products from backend -----------------
function fetchProducts() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      productsList = data.map((p) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category,
        description: p.description || "No description available.",
        image: productImages[p.id] || "https://via.placeholder.com/200x180?text=No+Image",
      }));
      renderProducts(productsList);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      productGrid.innerHTML = `<p style="color:red;">⚠️ Failed to load products from backend</p>`;
    });
}

// ----------------- Render Products -----------------
function renderProducts(list) {
  productGrid.innerHTML = "";
  if (!list.length) {
    productGrid.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>No products found.</p>";
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = p.id;
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <div class="product-title">${p.name}</div>
        <div class="price-row">
          <div class="price">$${p.price.toFixed(2)}</div>
          <button class="add-btn" data-product-id="${p.id}">ADD TO CART</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Add to cart
  productGrid.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.getAttribute('data-product-id'));
      const product = productsList.find(p => p.id === id);
      if (!product) return;
      const existing = cartItems.get(id) || { product, qty: 0 };
      existing.qty += 1;
      cartItems.set(id, existing);
      updateCartUI();
    });
  });

  // Click card → detail view
  productGrid.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-btn')) return;
      const id = Number(card.dataset.id);
      openProductDetail(id);
    });
  });
}

// ----------------- Product Detail (same page) -----------------
function openProductDetail(productId) {
  const product = productsList.find(p => p.id === productId);
  if (!product) return;

  productDetail.innerHTML = `
    <div class="detail-media">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="detail-body">
      <button class="back-btn" id="detailBackBtn">← Back</button>
      <div class="detail-title">${product.name}</div>
      <div class="detail-price">$${product.price.toFixed(2)}</div>
      <p class="detail-desc">${product.description}</p>
      <div class="detail-actions">
        <button class="add-btn" id="detailAddBtn">Add to Cart</button>
        <button class="nav-btn" id="buyNowBtn">Buy Now</button>
      </div>
    </div>
  `;

  productDetail.classList.add('show');
  productDetail.hidden = false;
  productGrid.style.display = 'none';

  document.getElementById('detailBackBtn').addEventListener('click', showProductGrid);
  document.getElementById('detailAddBtn').addEventListener('click', () => {
    const existing = cartItems.get(product.id) || { product, qty: 0 };
    existing.qty += 1;
    cartItems.set(product.id, existing);
    updateCartUI();
  });
  document.getElementById('buyNowBtn').addEventListener('click', openCart);
}

// Back to grid
function showProductGrid() {
  productDetail.hidden = true;
  productGrid.style.display = '';
}

// ----------------- Cart -----------------
function updateCartUI() {
  const count = Array.from(cartItems.values()).reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = String(count);
  cartItemsEl.innerHTML = "";
  let subtotal = 0;

  cartItems.forEach(({ product, qty }, id) => {
    subtotal += product.price * qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-thumb">
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <div class="qty-controls">
        <button onclick="updateQty(${id}, -1)">➖</button>
        <span>${qty}</span>
        <button onclick="updateQty(${id}, 1)">➕</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
  });

  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

function updateQty(productId, delta) {
  const item = cartItems.get(productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cartItems.delete(productId);
  updateCartUI();
}

function openCart() {
  cartDrawer.classList.add("show");
}
function closeCart() {
  cartDrawer.classList.remove("show");
}

// THEME: dark/light toggle with persistence
function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
    themeToggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }
}

// Start in light by default; clicking toggles to dark immediately
const initialTheme = getPreferredTheme();
applyTheme(initialTheme || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}
// LOGIN MODAL HANDLERS
//if (loginBtn && loginModal) {
//  loginBtn.addEventListener("click", () => {
//  loginModal.classList.add("show");
//    loginModal.setAttribute("aria-hidden", "false");
 //   setTimeout(() => loginIdentifier && loginIdentifier.focus(), 0);
 // });
//}

//if (loginClose && loginModal) {
  //loginClose.addEventListener("click", () => {
    //loginModal.setAttribute("aria-hidden", "true");
    //loginModal.classList.remove("show");
  //});
//}

//if (loginForm) {
  //loginForm.addEventListener("submit", (e) => {
    //e.preventDefault();
    //const identifier = loginIdentifier.value.trim();
    //const password = loginPassword.value;
    //if (!identifier || !password) return;
    // Demo: just close modal and log values
    //console.log("Login submitted", { identifier, passwordLength: password.length });
    //loginModal.setAttribute("aria-hidden", "true");
    //loginModal.classList.remove("show");
    //loginForm.reset();
  //});
//}

//if (signupBtn) {
  //signupBtn.addEventListener("click", () => {
    // Replace with real navigation
    //console.log("Navigate to signup");
    //alert("Signup flow coming soon.");
  //});
//}

// ----------------- Init -----------------
fetchProducts();
if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartCloseTop) {
  cartCloseTop.addEventListener('click', closeCart);
}
