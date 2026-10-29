'use strict';

const LB_TO_KG = 0.45359237;
const STORAGE_KEYS = {
  cart: 'lacarniceria_cart_v1',
  orders: 'lacarniceria_orders_v1',
  profile: 'lacarniceria_profile_v1',
  favorites: 'lacarniceria_favorites_v1',
  accounts: 'lacarniceria_accounts_v1',
  session: 'lacarniceria_session_v1'
};

const FALLBACK_PRODUCTS = [
  { id: 'bistec-res', name: 'Bistec de Res', category: 'Res', pricePerKg: 18000, image: 'assets/img/bistec.jpg', description: 'Corte tradicional, ideal para asar o preparar a la plancha.', detail: 'Un corte versátil para las comidas de todos los días. Se entrega fresco y listo para preparar.', badge: 'Más vendido', featured: true },
  { id: 'costilla-res', name: 'Costilla de Res', category: 'Res', pricePerKg: 15000, image: 'assets/img/costilla.jpg', description: 'Perfecta para sopas, sudados y parrilladas.', detail: 'Un corte con sabor intenso, ideal para cocinar lentamente o compartir en una parrillada.', badge: 'Favorito', featured: true },
  { id: 'filete-res', name: 'Filete de Res', category: 'Res', pricePerKg: 28000, image: 'assets/img/filete.jpg', description: 'Corte premium, suave y lleno de sabor.', detail: 'Ideal para una ocasión especial. Recomendado para asar o sellar en sartén.', badge: 'Premium', featured: true },
  { id: 'molida-res', name: 'Carne Molida de Res', category: 'Res', pricePerKg: 14000, image: 'assets/img/molida.jpg', description: 'Práctica para hamburguesas, albóndigas y recetas caseras.', detail: 'Una opción rendidora y versátil para preparar recetas familiares.', badge: 'Rendidora', featured: true },
  { id: 'carne-sudar', name: 'Carne para Sudar', category: 'Res', pricePerKg: 17000, image: 'assets/img/bistec.jpg', description: 'Cortes seleccionados para guisos y sudados.', detail: 'Cortes preparados para cocinar a fuego medio y lograr una textura tierna.', badge: 'Para el hogar', featured: false },
  { id: 'chuleta-cerdo', name: 'Chuleta de Cerdo', category: 'Cerdo', pricePerKg: 16000, image: 'assets/img/cerdo.svg', description: 'Jugosa y perfecta para la plancha o la parrilla.', detail: 'Chuletas de cerdo para preparar a la plancha, al horno o a la parrilla.', badge: 'Recomendada', featured: true },
  { id: 'lomo-cerdo', name: 'Lomo de Cerdo', category: 'Cerdo', pricePerKg: 21000, image: 'assets/img/cerdo.svg', description: 'Corte magro, ideal para hornear o saltear.', detail: 'Una alternativa magra y suave para preparar en medallones o en porciones.', badge: 'Corte magro', featured: false },
  { id: 'pechuga-pollo', name: 'Pechuga de Pollo', category: 'Pollo', pricePerKg: 14000, image: 'assets/img/pollo.svg', description: 'Fresca, versátil y fácil de preparar.', detail: 'Ideal para plancha, horno, ensaladas o recetas de todos los días.', badge: 'Versátil', featured: true },
  { id: 'muslo-pollo', name: 'Muslo de Pollo', category: 'Pollo', pricePerKg: 11000, image: 'assets/img/pollo.svg', description: 'Una opción jugosa para horno o sudado.', detail: 'Perfecto para preparar al horno, guisado o en un sudado casero.', badge: 'Buen precio', featured: false },
  { id: 'chorizo-artesanal', name: 'Chorizo Artesanal', category: 'Embutidos', pricePerKg: 19000, image: 'assets/img/embutidos.svg', description: 'Ideal para asados, desayunos y reuniones.', detail: 'Chorizos con sabor tradicional para acompañar tus comidas o compartir en familia.', badge: 'Para compartir', featured: true },
  { id: 'salchicha-parrillera', name: 'Salchicha Parrillera', category: 'Embutidos', pricePerKg: 17000, image: 'assets/img/embutidos.svg', description: 'Perfecta para parrilladas y comidas rápidas.', detail: 'Una opción práctica para asar y acompañar con tus salsas favoritas.', badge: 'Parrilla', featured: false }
];

const ICON_PATHS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/><path d="M8 21v-7h8v7"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2l2.6 12.2a2 2 0 0 0 2 1.6h9.6a2 2 0 0 0 2-1.6L22 7H5"/>',
  orders: '<path d="M7 3h8l4 4v14H5V3Z"/><path d="M15 3v5h4M8 12h8M8 16h8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  'arrow-left': '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  'arrow-right': '<path d="M5 12h14M13 5l7 7-7 7"/>',
  leaf: '<path d="M20 4C11 4 5 7 5 14a5 5 0 0 0 5 5c7 0 10-6 10-15Z"/><path d="M3 21c4-7 8-10 14-14"/>',
  badge: '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9M9.5 8l1.6 1.6L14.5 6"/>',
  truck: '<path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="2"/><circle cx="17.5" cy="19" r="2"/>',
  beef: '<path d="M4 13c-1.8-2.8-.5-6.2 2.7-7.1 2.2-.6 3.5.6 5.3.6s3.1-1.2 5.3-.6C20.5 6.8 21.8 10.2 20 13c-1.4 2.2-3.4 2.8-4.8 4.7-1.1 1.5-1.6 2.3-3.2 2.3s-2.1-.8-3.2-2.3C7.4 15.8 5.4 15.2 4 13Z"/><path d="M8 10h.01M16 10h.01M9 14c2 1.5 4 1.5 6 0"/>',
  pork: '<path d="M5 8c-2 0-3-2-2-4 3 0 5 1 6 3M19 8c2 0 3-2 2-4-3 0-5 1-6 3"/><path d="M5 9c2-3 12-3 14 0 2 3 1 9-2 11-2 1-8 1-10 0-3-2-4-8-2-11Z"/><path d="M9 13h.01M15 13h.01M10 17c1.3 1 2.7 1 4 0"/>',
  chicken: '<path d="M8 6c-3 0-5 2-5 5 0 4 4 8 9 8 4 0 8-3 8-7 0-3-2-5-5-5-2 0-3 1-4 1S10 6 8 6Z"/><path d="M17 7 20 4M19 10l3-1M6 18l-2 2"/>',
  sausage: '<path d="M7 5c2-2 4-1 5 1l6 6c2 2 3 4 1 6s-4 1-6-1l-6-6C5 9 5 7 7 5Z"/><path d="m8 7 2-2M17 17l2-2"/>',
  heart: '<path d="M20.8 8.8c0 5.1-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M6 3h3l2 5-2 2c1.2 2.5 2.5 3.8 5 5l2-2 5 2v3c0 1-1 2-2 2C10 19 5 14 4 5c0-1 1-2 2-2Z"/>',
  package: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 17 6l3 6M4 12l3 6a7 7 0 0 0 11.5-3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
  tag: '<path d="M20 13 13 20 3 10V4h6Z"/><circle cx="7.5" cy="7.5" r="1"/>',
  bag: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
};

function icon(name, extraClass = '') {
  return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.info}</svg>`;
}
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) { return fallback; }
}
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* localStorage may be disabled */ }
}
function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function normalizePhone(value = '') {
  return String(value).replace(/\D/g, '');
}
function emptyProfile() {
  return { name: '', phone: '', address: '', neighborhood: '' };
}
function profileFromAccount(account) {
  if (!account) return emptyProfile();
  return { name: account.name || '', phone: account.phone || '', address: account.address || '', neighborhood: account.neighborhood || '' };
}
function getActiveAccount() {
  if (!activePhone || !Array.isArray(accounts)) return null;
  return accounts.find(account => normalizePhone(account.phone) === activePhone) || null;
}
function createSalt() {
  if (window.crypto && window.crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
async function hashPassword(password, salt) {
  const value = `${salt}:${password}`;
  if (window.crypto && window.crypto.subtle && window.TextEncoder) {
    const digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // Respaldo para navegadores locales antiguos; esta cuenta es solo de demostración.
  return btoa(unescape(encodeURIComponent(value)));
}

function money(value) {
  return `$${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(Math.round(value))}`;
}
function unitPrice(product, unit = 'kg') {
  const raw = product.pricePerKg * (unit === 'lb' ? LB_TO_KG : 1);
  return unit === 'lb' ? Math.round(raw / 100) * 100 : product.pricePerKg;
}
function qtyStep(unit) { return unit === 'lb' ? 0.5 : 0.25; }
function roundQty(value) { return Math.round(value * 100) / 100; }
function formatQty(value) {
  return new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 }).format(value);
}
function itemWeightKg(item) { return item.qty * (item.unit === 'lb' ? LB_TO_KG : 1); }
function itemTotal(item) {
  const product = getProduct(item.productId);
  return product ? product.pricePerKg * itemWeightKg(item) : 0;
}
function getProduct(id) { return products.find(product => product.id === id); }
function cartSubtotal() { return cart.reduce((sum, item) => sum + itemTotal(item), 0); }
function deliveryFee(subtotal = cartSubtotal()) { return subtotal === 0 || subtotal >= 100000 ? 0 : 3000; }
function cartTotal() { const subtotal = cartSubtotal(); return subtotal + deliveryFee(subtotal); }
function getCartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }
function formatDate(value) {
  try { return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }
  catch (_) { return ''; }
}

let products = [...FALLBACK_PRODUCTS];
let cart = readStorage(STORAGE_KEYS.cart, []);
let orders = readStorage(STORAGE_KEYS.orders, []);
let accounts = readStorage(STORAGE_KEYS.accounts, []);
let activePhone = String(readStorage(STORAGE_KEYS.session, '') || '');
let profile = getActiveAccount() ? profileFromAccount(getActiveAccount()) : emptyProfile();
let authMode = 'register';
let favorites = readStorage(STORAGE_KEYS.favorites, []);
let currentView = 'home';
let previousView = 'menu';
let currentCategory = 'Todos';
let priceUnit = 'kg';
let detailUnit = 'kg';
let detailQty = 1;
let selectedProductId = null;
let searchOpen = false;
let searchTerm = '';
let lastOrderId = null;
let toastTimer = null;

const screen = document.getElementById('screen');
const bottomNav = document.getElementById('bottomNav');
const toastElement = document.getElementById('toast');

async function loadProducts() {
  try {
    const response = await fetch('./data/products.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('No fue posible cargar el catálogo JSON');
    const data = await response.json();
    if (Array.isArray(data) && data.length) products = data;
  } catch (_) {
    // Respaldo para abrir index.html directamente con file:// en pruebas locales.
    products = [...FALLBACK_PRODUCTS];
  }
  cart = cart.filter(item => getProduct(item.productId) && item.qty > 0 && ['kg', 'lb'].includes(item.unit));
  writeStorage(STORAGE_KEYS.cart, cart);
  render();
}

function render() {
  const renderers = {
    home: renderHome,
    menu: renderMenu,
    detail: renderDetail,
    cart: renderCart,
    checkout: renderCheckout,
    confirmation: renderConfirmation,
    orders: renderOrders,
    profile: renderProfile
  };
  screen.innerHTML = (renderers[currentView] || renderHome)();
  renderBottomNav();
  if (currentView === 'menu' && searchOpen) {
    const input = document.getElementById('menuSearch');
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }
}

function renderBottomNav() {
  const hidden = ['detail', 'checkout', 'confirmation'].includes(currentView);
  bottomNav.classList.toggle('hidden', hidden);
  if (hidden) { bottomNav.innerHTML = ''; return; }
  const nav = [
    ['home', 'Inicio', 'home'],
    ['menu', 'Menú', 'grid'],
    ['cart', 'Carrito', 'cart'],
    ['orders', 'Pedidos', 'orders'],
    ['profile', 'Perfil', 'user']
  ];
  bottomNav.innerHTML = nav.map(([view, label, iconName]) => {
    const active = currentView === view || (currentView === 'detail' && view === previousView);
    if (view === 'cart') {
      const count = cart.length;
      return `<button class="nav-item cart-nav ${currentView === 'cart' ? 'active' : ''}" data-action="navigate" data-view="cart" aria-label="Abrir carrito"><span class="cart-orb">${icon('cart') }</span>${count > 0 ? `<span class="cart-badge">${count > 99 ? '99+' : formatQty(count)}</span>` : ''}<span>Carrito</span></button>`;
    }
    return `<button class="nav-item ${active ? 'active' : ''}" data-action="navigate" data-view="${view}">${icon(iconName)}<span>${label}</span></button>`;
  }).join('');
}

function renderBrand() {
  return `<div class="brand-lockup"><img class="brand-logo" src="assets/img/logo.svg" alt="Logo de La Carnicería"><div><div class="brand-name">La Carnicería</div><div class="brand-tagline">Calidad en cada corte</div></div></div>`;
}

function renderHome() {
  const featured = products.filter(product => product.featured).slice(0, 6);
  return `<div class="home-view">
    <section class="home-hero">
      <div class="hero-photo" aria-hidden="true"></div><div class="hero-shade" aria-hidden="true"></div>
      <header class="home-topbar">${renderBrand()}<button class="menu-trigger" data-action="navigate" data-view="menu" aria-label="Abrir menú">${icon('menu')}</button></header>
      <div class="hero-copy">
        <div class="hero-eyebrow">Frescura que se nota</div>
        <h1>Carne<br><span>de verdad</span></h1>
        <p>Cortes frescos, mejor calidad para tu mesa.</p>
        <div class="trust-row">
          <div class="trust-item">${icon('leaf')}<span>Carne<br>fresca</span></div>
          <div class="trust-item">${icon('badge')}<span>Calidad<br>garantizada</span></div>
          <div class="trust-item">${icon('truck')}<span>Entrega<br>a domicilio</span></div>
        </div>
        <button class="btn-primary hero-cta" data-action="navigate" data-view="menu"><span>Ver nuestro menú</span>${icon('arrow-right')}</button>
      </div>
    </section>
    <div class="home-content">
      <section class="promo-banner">
        <div class="promo-copy"><h3>Los mejores cortes para cada ocasión</h3><p>Elige tus favoritos y pide en minutos.</p></div>
        <img class="promo-img" src="assets/img/filete.jpg" alt="Corte fresco de res">
      </section>
      <section class="home-section">
        <div class="section-head"><h2>Compra por categoría</h2><button data-action="navigate" data-view="menu">Ver todo ${icon('arrow-right')}</button></div>
        <div class="category-shortcuts">
          ${[['Res','beef'],['Cerdo','pork'],['Pollo','chicken'],['Embutidos','sausage']].map(([name, ico]) => `<button class="category-shortcut" data-action="shortcut-category" data-category="${name}"><span class="category-icon">${icon(ico)}</span><span>${name}</span></button>`).join('')}
        </div>
      </section>
      <section class="home-section">
        <div class="section-head"><h2>Los más pedidos</h2><button data-action="navigate" data-view="menu">Explorar ${icon('arrow-right')}</button></div>
        <div class="horizontal-products">${featured.map(product => renderMiniProduct(product)).join('')}</div>
      </section>
      <section class="home-section" style="margin-bottom:5px">
        <div class="section-head"><h2>Compra con tranquilidad</h2></div>
        <div class="detail-meta"><span class="pill">${icon('shield')} Compra de prueba segura</span><span class="pill">${icon('truck')} Domicilio disponible</span><span class="pill">${icon('check')} Precio por peso</span></div>
      </section>
    </div>
  </div>`;
}

function renderMiniProduct(product) {
  return `<article class="mini-product">
    <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy">
    <div class="mini-product-body">
      <button class="mini-add" data-action="quick-add" data-id="${escapeHTML(product.id)}" aria-label="Agregar ${escapeHTML(product.name)}">${icon('plus')}</button>
      <h3 data-action="open-product" data-id="${escapeHTML(product.id)}">${escapeHTML(product.name)}</h3>
      <div class="price">${money(unitPrice(product, priceUnit))}<small>por ${priceUnit === 'kg' ? 'kg' : 'lb'}</small></div>
    </div>
  </article>`;
}

function renderCategoryChip(category) {
  const map = { Todos: 'grid', Res: 'beef', Cerdo: 'pork', Pollo: 'chicken', Embutidos: 'sausage' };
  return `<button class="category-chip ${currentCategory === category ? 'active' : ''}" data-action="select-category" data-category="${category}">${icon(map[category] || 'grid')}<span>${category}</span></button>`;
}

function visibleProducts() {
  const term = searchTerm.trim().toLocaleLowerCase('es-CO');
  return products.filter(product => {
    const matchesCategory = currentCategory === 'Todos' || product.category === currentCategory;
    const matchesTerm = !term || `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase('es-CO').includes(term);
    return matchesCategory && matchesTerm;
  });
}

function renderMenu() {
  const list = visibleProducts();
  return `<div class="menu-view">
    <header class="menu-top">
      <div class="page-topbar">
        <div class="topbar-side"><button class="icon-btn" data-action="navigate" data-view="home" aria-label="Volver al inicio">${icon('arrow-left')}</button></div>
        <div style="text-align:center; flex:1"><div class="mini-label" style="color:#f4bfc0">Cortes frescos todos los días</div></div>
        <div class="topbar-side right"><button class="icon-btn" data-action="toggle-search" aria-label="Buscar productos">${icon(searchOpen ? 'close' : 'search')}</button></div>
      </div>
      <h1 class="menu-title">Nuestro Menú</h1>
      <p class="menu-subtitle">Cortes frescos y de la mejor calidad</p>
      ${searchOpen ? `<label class="menu-search">${icon('search')}<input id="menuSearch" type="search" placeholder="Busca tu corte favorito..." value="${escapeHTML(searchTerm)}" autocomplete="off"></label>` : ''}
    </header>
    <div class="menu-body">
      <section class="filter-panel">
        <div class="category-chips">${['Todos','Res','Cerdo','Pollo','Embutidos'].map(renderCategoryChip).join('')}</div>
        <div class="unit-control-row"><span class="unit-control-label">Mostrar precio por:</span><div class="unit-switch"><button class="${priceUnit === 'kg' ? 'active' : ''}" data-action="set-price-unit" data-unit="kg">Kg</button><button class="${priceUnit === 'lb' ? 'active' : ''}" data-action="set-price-unit" data-unit="lb">Lb</button></div></div>
      </section>
      <section class="product-list" id="productList">${renderProductCards(list)}</section>
      <p class="cart-footnote">Precios de demostración. El valor final se calcula según el peso seleccionado.</p>
    </div>
  </div>`;
}

function renderProductCards(list) {
  if (!list.length) return `<div class="empty-state"><div class="empty-icon">${icon('search')}</div><h3>No encontramos ese corte</h3><p>Prueba con otro nombre o cambia la categoría.</p></div>`;
  return list.map(product => `<article class="product-card" data-action="open-product" data-id="${escapeHTML(product.id)}" tabindex="0" role="button" aria-label="Ver ${escapeHTML(product.name)}">
    <div class="product-photo-wrap"><img class="product-photo" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy">${product.badge ? `<span class="product-badge">${escapeHTML(product.badge)}</span>` : ''}</div>
    <div class="product-info"><h2 class="product-title">${escapeHTML(product.name)}</h2><p class="product-desc">${escapeHTML(product.description)}</p><div class="product-price-row"><span class="price">${money(unitPrice(product, priceUnit))}</span><span class="price-unit">/ ${priceUnit}</span></div><button class="product-plus" data-action="quick-add" data-id="${escapeHTML(product.id)}" aria-label="Agregar ${escapeHTML(product.name)} al carrito">${icon('plus')}</button></div>
  </article>`).join('');
}

function renderDetail() {
  const product = getProduct(selectedProductId) || products[0];
  if (!product) return renderMenu();
  const isFavorite = favorites.includes(product.id);
  const unitTotal = unitPrice(product, detailUnit) * detailQty;
  const estimatedTotal = product.pricePerKg * detailQty * (detailUnit === 'lb' ? LB_TO_KG : 1);
  return `<div class="detail-view">
    <div class="detail-top"><button class="icon-btn" data-action="go-back" aria-label="Volver">${icon('arrow-left')}</button><button class="icon-btn" data-action="toggle-favorite" data-id="${escapeHTML(product.id)}" aria-label="${isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}" style="color:${isFavorite ? '#d71925' : '#850b12'}">${icon('heart')}</button></div>
    <img class="detail-hero-image" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
    <div class="detail-content">
      <div class="detail-heading-row"><div><span class="mini-label">${escapeHTML(product.category)} · Corte fresco</span><h1 style="margin-top:7px">${escapeHTML(product.name)}</h1><span class="price">${money(unitPrice(product, detailUnit))}</span><span class="price-unit">por ${detailUnit}</span></div><span class="pill">${icon('check')} Disponible</span></div>
      <p class="detail-description">${escapeHTML(product.detail || product.description)}</p>
      <div class="detail-meta"><span class="pill">${icon('leaf')} Fresco</span><span class="pill">${icon('shield')} Calidad seleccionada</span>${product.badge ? `<span class="pill">${icon('star')} ${escapeHTML(product.badge)}</span>` : ''}</div>
      <section class="detail-control-box">
        <div class="control-heading"><span>¿Cómo quieres comprarlo?</span><span style="color:#a20d16">Elige tu medida</span></div>
        <div class="detail-unit-switch"><button class="${detailUnit === 'kg' ? 'active' : ''}" data-action="set-detail-unit" data-unit="kg">Kilogramos (kg)</button><button class="${detailUnit === 'lb' ? 'active' : ''}" data-action="set-detail-unit" data-unit="lb">Libras (lb)</button></div>
        <div class="control-heading" style="margin:17px 0 9px"><span>Cantidad</span><span style="color:#8b7f81;font-size:10px">Paso: ${detailUnit === 'kg' ? '0,25 kg' : '0,5 lb'}</span></div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div class="qty-stepper"><button data-action="detail-minus" aria-label="Restar cantidad">${icon('minus')}</button><span>${formatQty(detailQty)} ${detailUnit}</span><button data-action="detail-plus" aria-label="Sumar cantidad">${icon('plus')}</button></div><div style="text-align:right"><span style="display:block;color:#8c8082;font-size:10px">Peso aprox.</span><strong style="font-size:12px">${formatQty(detailQty * (detailUnit === 'lb' ? LB_TO_KG : 1))} kg</strong></div></div>
      </section>
      <div class="detail-total-row"><span>Subtotal estimado</span><strong>${money(estimatedTotal)}</strong></div>
      <div class="detail-sticky-cta"><button class="btn-primary full-width" data-action="add-detail">${icon('cart')} Agregar al carrito · ${money(estimatedTotal)}</button><p class="cart-footnote">La cantidad se puede ajustar antes de confirmar el pedido.</p></div>
    </div>
  </div>`;
}

function renderCart() {
  const hasItems = cart.length > 0;
  const subtotal = cartSubtotal();
  const fee = deliveryFee(subtotal);
  return `<div class="cart-view">
    <header class="simple-page-header"><div class="simple-header-row"><button class="icon-btn" data-action="navigate" data-view="menu" aria-label="Seguir comprando">${icon('arrow-left')}</button><div><h1 class="page-heading">Carrito de compras</h1><p class="page-subheading">Revisa tus cortes antes de pedir.</p></div></div></header>
    <div class="page-content">
      ${hasItems ? `<div class="cart-items">${cart.map(renderCartItem).join('')}</div>
        <section class="cart-summary"><div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Domicilio</span><strong>${fee === 0 ? 'Gratis' : money(fee)}</strong></div><div class="summary-row total"><span>Total estimado</span><strong>${money(subtotal + fee)}</strong></div><p class="delivery-note">${icon('truck')} ${subtotal >= 100000 ? '¡Tu pedido tiene domicilio gratis!' : `El domicilio cuesta ${money(3000)}. Es gratis desde ${money(100000)}.`}</p><button class="btn-primary full-width" data-action="start-checkout">Continuar al pedido ${icon('arrow-right')}</button></section>
        <p class="cart-footnote">Puedes cambiar entre kg y lb en cada producto. El total se ajusta automáticamente.</p>`
      : `<div class="empty-state" style="margin-top:10px"><div class="empty-icon">${icon('cart')}</div><h3>Tu carrito está vacío</h3><p>Agrega tus cortes favoritos y aparecerán aquí para preparar tu pedido.</p><button class="btn-primary full-width" style="margin-top:18px" data-action="navigate" data-view="menu">Explorar el menú ${icon('arrow-right')}</button></div>`}
    </div>
  </div>`;
}

function renderCartItem(item) {
  const product = getProduct(item.productId);
  if (!product) return '';
  const itemAmount = itemTotal(item);
  return `<article class="cart-item">
    <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
    <div class="cart-item-main">
      <div class="cart-item-title-row"><div><h2 class="cart-item-title">${escapeHTML(product.name)}</h2><div class="cart-item-unit-price">${money(unitPrice(product, item.unit))} / ${item.unit}</div></div><button class="remove-item" data-action="cart-remove" data-id="${escapeHTML(product.id)}" data-unit="${item.unit}" aria-label="Quitar ${escapeHTML(product.name)}">${icon('trash')}</button></div>
      <div class="cart-item-controls"><div class="cart-unit-mini"><button class="${item.unit === 'kg' ? 'active' : ''}" data-action="cart-set-unit" data-id="${escapeHTML(product.id)}" data-old-unit="${item.unit}" data-unit="kg">kg</button><button class="${item.unit === 'lb' ? 'active' : ''}" data-action="cart-set-unit" data-id="${escapeHTML(product.id)}" data-old-unit="${item.unit}" data-unit="lb">lb</button></div><div class="qty-stepper"><button data-action="cart-minus" data-id="${escapeHTML(product.id)}" data-unit="${item.unit}" aria-label="Restar">${icon('minus')}</button><span>${formatQty(item.qty)}</span><button data-action="cart-plus" data-id="${escapeHTML(product.id)}" data-unit="${item.unit}" aria-label="Sumar">${icon('plus')}</button></div></div>
      <div class="cart-item-total">${money(itemAmount)}</div>
    </div>
  </article>`;
}

function renderCheckout() {
  const subtotal = cartSubtotal();
  const fee = deliveryFee(subtotal);
  return `<div class="checkout-view">
    <header class="checkout-header"><button class="icon-btn" data-action="back-to-cart" aria-label="Volver al carrito">${icon('arrow-left')}</button><div><h1>Dirección de entrega</h1><p>Completa tus datos para finalizar el pedido.</p></div></header>
    <form class="checkout-form" id="checkoutForm">
      <h2 class="form-section-title">Datos de contacto</h2>
      <div class="form-grid">
        <div class="field"><label for="checkoutName">Nombre completo *</label><input id="checkoutName" name="name" type="text" placeholder="Ej. Juan Pérez" value="${escapeHTML(profile.name || '')}" required minlength="3" autocomplete="name"></div>
        <div class="field"><label for="checkoutPhone">Teléfono / WhatsApp *</label><input id="checkoutPhone" name="phone" type="tel" placeholder="Ej. 300 123 4567" value="${escapeHTML(profile.phone || '')}" required minlength="7" autocomplete="tel"></div>
        <div class="field"><label for="checkoutAddress">Dirección de entrega *</label><input id="checkoutAddress" name="address" type="text" placeholder="Calle, carrera, número o conjunto" value="${escapeHTML(profile.address || '')}" required minlength="5" autocomplete="street-address"></div>
        <div class="field"><label for="checkoutNeighborhood">Barrio / sector *</label><input id="checkoutNeighborhood" name="neighborhood" type="text" placeholder="¿En qué barrio estás?" value="${escapeHTML(profile.neighborhood || '')}" required minlength="2"></div>
        <div class="field"><label for="checkoutNotes">Indicaciones adicionales (opcional)</label><textarea id="checkoutNotes" name="notes" placeholder="Apartamento, portería, referencia para llegar..."></textarea></div>
      </div>
      <section class="checkout-summary"><h3>Resumen del pedido</h3><div class="summary-row"><span>Productos (${cart.length})</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Domicilio</span><strong>${fee === 0 ? 'Gratis' : money(fee)}</strong></div><div class="summary-row total"><span>Total estimado</span><strong>${money(subtotal + fee)}</strong></div></section>
      <button class="btn-primary full-width" type="submit">Confirmar pedido ${icon('arrow-right')}</button>
      <p class="privacy-note">Demo local: el pedido se guarda en este navegador mediante localStorage. No se envían datos a un servidor ni se procesa ningún pago.</p>
    </form>
  </div>`;
}

function renderConfirmation() {
  const order = orders.find(item => item.id === lastOrderId) || orders[0];
  if (!order) return renderHome();
  return `<div class="confirmation-view">
    <div class="confirmation-top"><button class="icon-btn" data-action="navigate" data-view="home" aria-label="Volver al inicio">${icon('arrow-left')}</button><h2>Pedido confirmado</h2><span style="width:38px"></span></div>
    <section class="confirmation-card"><div class="success-mark">${icon('check')}</div><h1>¡Tu pedido<br>ha sido confirmado!</h1><p>Gracias por elegir La Carnicería. Tu pedido de prueba quedó guardado en el historial de esta aplicación.</p>
      <div class="order-info-box"><div class="order-info-row">${icon('package')}<div><span>Número de pedido</span><strong>#${escapeHTML(order.id)}</strong></div></div><div class="order-info-row">${icon('clock')}<div><span>Estado</span><strong>${escapeHTML(order.status || 'En preparación')}</strong></div></div><div class="order-info-row">${icon('truck')}<div><span>Entrega estimada</span><strong>30–45 minutos (referencia de prueba)</strong></div></div><div class="order-info-row">${icon('bag')}<div><span>Total del pedido</span><strong>${money(order.total)}</strong></div></div></div>
      <div class="confirmation-actions"><button class="btn-primary full-width" data-action="navigate" data-view="orders">Ver mis pedidos ${icon('arrow-right')}</button><button class="btn-secondary full-width" data-action="navigate" data-view="home">Volver al inicio</button></div>
    </section>
  </div>`;
}

function renderOrders() {
  const visibleOrders = activePhone ? orders.filter(order => normalizePhone(order.customer && order.customer.phone) === activePhone) : orders;
  const sortedOrders = [...visibleOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return `<div class="orders-view"><header class="simple-page-header"><div class="simple-header-row"><div><h1 class="page-heading">Mis pedidos</h1><p class="page-subheading">Consulta el historial guardado en este dispositivo.</p></div><span style="margin-left:auto">${icon('orders')}</span></div></header><div class="page-content">${sortedOrders.length ? sortedOrders.map(order => `<article class="order-card"><div class="order-card-head"><div><h2 class="order-id">#${escapeHTML(order.id)}</h2><span class="order-date">${formatDate(order.createdAt)}</span></div><span class="order-status">${icon('clock')}${escapeHTML(order.status || 'En preparación')}</span></div><p class="order-items-text">${(order.items || []).map(item => `${escapeHTML(item.name)} · ${formatQty(item.qty)} ${escapeHTML(item.unit)}`).join('<br>')}</p><div class="order-card-foot"><div><span>Total del pedido</span><br><strong>${money(order.total)}</strong></div><button data-action="reorder" data-id="${escapeHTML(order.id)}">Pedir de nuevo ↗</button></div></article>`).join('') : `<div class="empty-state"><div class="empty-icon">${icon('orders')}</div><h3>Aún no tienes pedidos</h3><p>Cuando confirmes una compra de prueba, aparecerá aquí con su fecha y total.</p><button class="btn-primary full-width" style="margin-top:18px" data-action="navigate" data-view="menu">Ver el menú ${icon('arrow-right')}</button></div>`}<p class="cart-footnote">El historial se conserva en localStorage de este navegador. No se sincroniza con otros dispositivos.</p></div></div>`;
}

function renderAuth() {
  const isRegister = authMode === 'register';
  return `<div class="auth-page">
    <section class="auth-hero">
      ${renderBrand()}
      <div class="auth-hero-copy"><span class="mini-label">TU CARNICERÍA DE CONFIANZA</span><h1>${isRegister ? 'Crea tu cuenta' : 'Qué bueno verte'}</h1><p>${isRegister ? 'Regístrate una sola vez y guarda tus datos para hacer tus pedidos más rápido.' : 'Ingresa con tu teléfono y contraseña para continuar comprando.'}</p></div>
    </section>
    <section class="auth-card">
      <div class="auth-tabs"><button type="button" data-action="auth-mode" data-mode="login" class="${!isRegister ? 'active' : ''}">Iniciar sesión</button><button type="button" data-action="auth-mode" data-mode="register" class="${isRegister ? 'active' : ''}">Crear cuenta</button></div>
      ${isRegister ? `
        <form class="auth-form" id="authForm" data-mode="register">
          <div class="form-grid">
            <div class="field"><label for="authName">Nombre completo *</label><input id="authName" name="name" type="text" placeholder="Ej. Juan Pérez" autocomplete="name" required minlength="3"></div>
            <div class="field"><label for="authPhone">Teléfono / WhatsApp *</label><input id="authPhone" name="phone" type="tel" placeholder="300 123 4567" autocomplete="tel" required minlength="7"></div>
            <div class="field"><label for="authAddress">Dirección de entrega *</label><input id="authAddress" name="address" type="text" placeholder="Calle, carrera, número o conjunto" autocomplete="street-address" required minlength="5"></div>
            <div class="field"><label for="authNeighborhood">Barrio / sector *</label><input id="authNeighborhood" name="neighborhood" type="text" placeholder="Tu barrio" required minlength="2"></div>
            <div class="field"><label for="authPassword">Crea una contraseña *</label><input id="authPassword" name="password" type="password" placeholder="Mínimo 6 caracteres" autocomplete="new-password" required minlength="6"></div>
            <div class="field"><label for="authConfirmPassword">Confirma la contraseña *</label><input id="authConfirmPassword" name="confirmPassword" type="password" placeholder="Repite la contraseña" autocomplete="new-password" required minlength="6"></div>
          </div>
          <button class="btn-primary full-width" type="submit">Crear mi cuenta ${icon('arrow-right')}</button>
        </form>
        <p class="auth-helper">Tus datos quedarán guardados en este navegador para esta demostración.</p>
      ` : `
        <form class="auth-form" id="authForm" data-mode="login">
          <div class="form-grid">
            <div class="field"><label for="authLoginPhone">Teléfono / WhatsApp *</label><input id="authLoginPhone" name="phone" type="tel" placeholder="El teléfono con el que te registraste" autocomplete="username" required minlength="7"></div>
            <div class="field"><label for="authLoginPassword">Contraseña *</label><input id="authLoginPassword" name="password" type="password" placeholder="Tu contraseña" autocomplete="current-password" required minlength="6"></div>
          </div>
          <button class="btn-primary full-width" type="submit">Iniciar sesión ${icon('arrow-right')}</button>
        </form>
        <p class="auth-helper">¿Primera vez aquí? Selecciona “Crear cuenta” para registrarte.</p>
      `}
    </section>
    <p class="auth-note">Versión de prueba: el registro funciona en este navegador. No uses una contraseña que tengas en otras cuentas.</p>
  </div>`;
}

function renderProfile() {
  const account = getActiveAccount();
  if (!account) return renderAuth();
  const customerOrders = orders.filter(order => normalizePhone(order.customer && order.customer.phone) === activePhone);
  const totalSpent = customerOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const firstName = (profile.name || 'cliente').trim().split(/\s+/)[0];
  return `<div class="profile-view">
    <header class="profile-hero">
      <div class="profile-topline"><div class="profile-avatar">${icon('user')}</div><button class="profile-logout" data-action="logout">Cerrar sesión</button></div>
      <h1>Hola, ${escapeHTML(firstName)}</h1><p>Tu cuenta de La Carnicería está activa.</p>
      <div class="profile-stats"><div class="profile-stat"><strong>${customerOrders.length}</strong><span>Pedidos registrados</span></div><div class="profile-stat"><strong>${money(totalSpent)}</strong><span>Total en compras de prueba</span></div></div>
    </header>
    <section class="profile-success-card"><div class="profile-success-icon">${icon('check')}</div><div><h2>Registro completado</h2><p>Tus datos ya están guardados. Los usaremos para facilitar el proceso de tus próximos pedidos; no necesitas volver a llenar el formulario de registro.</p></div></section>
    <div class="profile-actions"><button class="btn-secondary full-width" data-action="navigate" data-view="orders">${icon('orders')} Consultar historial de pedidos</button><button class="btn-secondary full-width" data-action="clear-demo">${icon('refresh')} Reiniciar datos de prueba</button></div>
    <p class="profile-disclaimer">Cuenta de demostración almacenada en este navegador. No hay un servidor ni una autenticación real.</p>
  </div>`;
}

function navigate(view) {
  if (view === 'menu') { searchTerm = ''; searchOpen = false; }
  currentView = view;
  render();
  // Cada pantalla empieza arriba: evita que el logo o el menú queden recortados
  // al volver desde formularios largos en móviles y en modo PWA.
  screen.scrollTop = 0;
}
function openProduct(id) {
  if (!getProduct(id)) return;
  previousView = currentView === 'detail' ? previousView : currentView;
  selectedProductId = id;
  detailUnit = priceUnit;
  detailQty = 1;
  currentView = 'detail';
  render();
  screen.scrollTop = 0;
}
function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastElement.classList.remove('visible'), 2300);
}
function persistCart() { writeStorage(STORAGE_KEYS.cart, cart); }
function addToCart(productId, unit = priceUnit, qty = 1) {
  const product = getProduct(productId);
  if (!product) return;
  const existing = cart.find(item => item.productId === productId && item.unit === unit);
  if (existing) existing.qty = roundQty(existing.qty + qty);
  else cart.push({ productId, unit, qty: roundQty(qty) });
  persistCart();
  render();
  showToast(`${product.name} agregado al carrito`);
}
function updateCartQty(productId, unit, direction) {
  const index = cart.findIndex(item => item.productId === productId && item.unit === unit);
  if (index < 0) return;
  const step = qtyStep(unit);
  const next = roundQty(cart[index].qty + direction * step);
  if (next < step - 0.001) cart.splice(index, 1);
  else cart[index].qty = next;
  persistCart(); render();
}
function removeCartItem(productId, unit) {
  cart = cart.filter(item => !(item.productId === productId && item.unit === unit));
  persistCart(); render(); showToast('Producto retirado del carrito');
}
function changeCartUnit(productId, oldUnit, newUnit) {
  if (oldUnit === newUnit) return;
  const index = cart.findIndex(item => item.productId === productId && item.unit === oldUnit);
  if (index < 0) return;
  const old = cart[index];
  const weightKg = itemWeightKg(old);
  const step = qtyStep(newUnit);
  const rawQty = weightKg / (newUnit === 'lb' ? LB_TO_KG : 1);
  const newQty = Math.max(step, roundQty(Math.round(rawQty / step) * step));
  cart.splice(index, 1);
  const duplicate = cart.find(item => item.productId === productId && item.unit === newUnit);
  if (duplicate) duplicate.qty = roundQty(duplicate.qty + newQty);
  else cart.push({ productId, unit: newUnit, qty: newQty });
  persistCart(); render();
  showToast(`Medida cambiada a ${newUnit.toUpperCase()}`);
}
function startCheckout() {
  if (!cart.length) { showToast('Agrega al menos un producto antes de continuar'); return; }
  currentView = 'checkout'; render(); screen.scrollTop = 0;
}
function submitOrder(form) {
  if (!cart.length) { showToast('Tu carrito está vacío'); navigate('menu'); return; }
  const formData = new FormData(form);
  const customer = {
    name: String(formData.get('name') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    address: String(formData.get('address') || '').trim(),
    neighborhood: String(formData.get('neighborhood') || '').trim()
  };
  const subtotal = cartSubtotal();
  const fee = deliveryFee(subtotal);
  const order = {
    id: `CRN-${String(Date.now()).slice(-6)}`,
    createdAt: new Date().toISOString(),
    status: 'En preparación',
    customer,
    notes: String(formData.get('notes') || '').trim(),
    items: cart.map(item => {
      const product = getProduct(item.productId);
      return { productId: item.productId, name: product ? product.name : item.productId, qty: item.qty, unit: item.unit, unitPrice: unitPrice(product || { pricePerKg: 0 }, item.unit), total: itemTotal(item) };
    }),
    subtotal,
    delivery: fee,
    total: subtotal + fee
  };
  profile = { ...profile, ...customer };
  orders.unshift(order);
  lastOrderId = order.id;
  cart = [];
  writeStorage(STORAGE_KEYS.orders, orders);
  writeStorage(STORAGE_KEYS.profile, profile);
  persistCart();
  currentView = 'confirmation';
  render(); screen.scrollTop = 0;
}

function handleClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  const id = target.dataset.id;
  const unit = target.dataset.unit;
  const view = target.dataset.view;
  if (action === 'auth-mode') { authMode = target.dataset.mode === 'login' ? 'login' : 'register'; render(); screen.scrollTop = 0; return; }
  if (action === 'logout') { activePhone = ''; writeStorage(STORAGE_KEYS.session, ''); profile = emptyProfile(); authMode = 'login'; currentView = 'profile'; render(); screen.scrollTop = 0; showToast('Sesión cerrada'); return; }
  if (action === 'navigate') { navigate(view); return; }
  if (action === 'shortcut-category') { currentCategory = target.dataset.category || 'Todos'; navigate('menu'); render(); return; }
  if (action === 'go-menu') { navigate('menu'); return; }
  if (action === 'toggle-search') { searchOpen = !searchOpen; if (!searchOpen) searchTerm = ''; render(); return; }
  if (action === 'select-category') { currentCategory = target.dataset.category || 'Todos'; render(); return; }
  if (action === 'set-price-unit') { priceUnit = unit === 'lb' ? 'lb' : 'kg'; render(); return; }
  if (action === 'open-product') { openProduct(id); return; }
  if (action === 'quick-add') { addToCart(id, priceUnit, 1); return; }
  if (action === 'go-back') { currentView = previousView || 'menu'; render(); return; }
  if (action === 'set-detail-unit') { detailUnit = unit === 'lb' ? 'lb' : 'kg'; detailQty = 1; render(); return; }
  if (action === 'detail-minus') { detailQty = Math.max(qtyStep(detailUnit), roundQty(detailQty - qtyStep(detailUnit))); render(); return; }
  if (action === 'detail-plus') { detailQty = roundQty(detailQty + qtyStep(detailUnit)); render(); return; }
  if (action === 'add-detail') { addToCart(selectedProductId, detailUnit, detailQty); currentView = 'cart'; render(); screen.scrollTop = 0; return; }
  if (action === 'toggle-favorite') {
    if (favorites.includes(id)) favorites = favorites.filter(favorite => favorite !== id); else favorites.push(id);
    writeStorage(STORAGE_KEYS.favorites, favorites); render(); showToast(favorites.includes(id) ? 'Guardado en favoritos' : 'Quitado de favoritos'); return;
  }
  if (action === 'cart-minus') { updateCartQty(id, unit, -1); return; }
  if (action === 'cart-plus') { updateCartQty(id, unit, 1); return; }
  if (action === 'cart-remove') { removeCartItem(id, unit); return; }
  if (action === 'cart-set-unit') { changeCartUnit(id, target.dataset.oldUnit || 'kg', unit); return; }
  if (action === 'start-checkout') { startCheckout(); return; }
  if (action === 'back-to-cart') { navigate('cart'); return; }
  if (action === 'reorder') {
    const order = orders.find(item => item.id === id);
    if (!order) return;
    (order.items || []).forEach(item => { if (getProduct(item.productId)) addToCart(item.productId, item.unit, item.qty); });
    navigate('cart'); showToast('Productos del pedido agregados'); return;
  }
  if (action === 'clear-demo') {
    const confirmed = window.confirm('¿Quieres borrar el carrito, pedidos, favoritos y datos guardados de esta demostración?');
    if (!confirmed) return;
    cart = []; orders = []; favorites = []; accounts = []; activePhone = ''; profile = emptyProfile(); authMode = 'register'; lastOrderId = null;
    Object.values(STORAGE_KEYS).forEach(key => { try { localStorage.removeItem(key); } catch (_) {} });
    render(); screen.scrollTop = 0; showToast('Datos de prueba reiniciados'); return;
  }
}

function handleInput(event) {
  if (event.target && event.target.id === 'menuSearch') {
    searchTerm = event.target.value;
    const productList = document.getElementById('productList');
    if (productList) productList.innerHTML = renderProductCards(visibleProducts());
  }
}
async function handleSubmit(event) {
  if (event.target.id === 'checkoutForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    submitOrder(event.target);
    return;
  }
  if (event.target.id === 'authForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    await submitAuth(event.target);
  }
}

async function submitAuth(form) {
  const data = new FormData(form);
  const mode = form.dataset.mode || authMode;
  const phone = String(data.get('phone') || '').trim();
  const phoneKey = normalizePhone(phone);
  const password = String(data.get('password') || '');

  if (phoneKey.length < 7) {
    showToast('Escribe un teléfono válido');
    return;
  }

  if (mode === 'register') {
    const name = String(data.get('name') || '').trim();
    const address = String(data.get('address') || '').trim();
    const neighborhood = String(data.get('neighborhood') || '').trim();
    const confirmPassword = String(data.get('confirmPassword') || '');
    if (password !== confirmPassword) {
      showToast('Las contraseñas no coinciden');
      return;
    }
    if (accounts.some(account => normalizePhone(account.phone) === phoneKey)) {
      showToast('Ya existe una cuenta con ese teléfono. Inicia sesión.');
      authMode = 'login';
      render();
      return;
    }
    const salt = createSalt();
    const passwordHash = await hashPassword(password, salt);
    const account = { name, phone, address, neighborhood, salt, passwordHash, createdAt: new Date().toISOString() };
    accounts.push(account);
    writeStorage(STORAGE_KEYS.accounts, accounts);
    activePhone = phoneKey;
    writeStorage(STORAGE_KEYS.session, activePhone);
    profile = profileFromAccount(account);
    writeStorage(STORAGE_KEYS.profile, profile);
    currentView = 'profile';
    render();
    screen.scrollTop = 0;
    showToast('Cuenta creada correctamente');
    return;
  }

  const account = accounts.find(item => normalizePhone(item.phone) === phoneKey);
  if (!account) {
    showToast('No encontramos una cuenta con ese teléfono');
    return;
  }
  const passwordHash = await hashPassword(password, account.salt);
  if (passwordHash !== account.passwordHash) {
    showToast('La contraseña no es correcta');
    return;
  }
  activePhone = phoneKey;
  writeStorage(STORAGE_KEYS.session, activePhone);
  profile = profileFromAccount(account);
  writeStorage(STORAGE_KEYS.profile, profile);
  currentView = 'profile';
  render();
  screen.scrollTop = 0;
  showToast('Sesión iniciada correctamente');
}

screen.addEventListener('click', handleClick);
bottomNav.addEventListener('click', handleClick);
screen.addEventListener('input', handleInput);
screen.addEventListener('submit', handleSubmit);
screen.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.matches('.product-card')) openProduct(event.target.dataset.id);
});

loadProducts();
