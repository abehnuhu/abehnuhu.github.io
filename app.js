/* ============================================================
   HOUSE OF BAIDEN — shared storefront runtime
   Load AFTER firebase-config.js. Works on index/perfumes/skincare.
   ============================================================ */

/* ---------- HELPERS ---------- */
function esc(str) {
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function toast(msg, type = 'info') {
  const el = document.getElementById('toast');
  if (!el) return;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  el.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i> ' + msg;
  el.className = 'show ' + type;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = ''; }, 3000);
}

/* ---------- STOCK ---------- */
function stockLeft(p) {
  if (p && p.stock !== undefined && p.stock !== null && p.stock !== '') return Number(p.stock);
  return null; // legacy product without a stock field → treated as in stock
}
function isOutOfStock(p) {
  const s = stockLeft(p);
  return s !== null && s <= 0;
}
function stockBadge(p) {
  if (isOutOfStock(p)) return '<div class="product-stock out"><i class="fas fa-ban"></i> Out of stock</div>';
  const s = stockLeft(p);
  if (s !== null && s <= 3) return '<div class="product-stock low"><i class="fas fa-fire"></i> Only ' + s + ' left</div>';
  return '';
}

/* ---------- CART (localStorage) ---------- */
const CART_KEY = 'hob_cart';
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if (el) {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  }
}

function addToCart(product) {
  if (!product || !product.id) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  const stock = stockLeft(product);
  if (stock !== null && stock <= 0) {
    toast('Sorry, this item is out of stock', 'error');
    return;
  }
  const currentQty = existing ? existing.qty : 0;
  if (stock !== null && currentQty >= stock) {
    toast('Only ' + stock + ' available', 'error');
    return;
  }
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, stock: product.stock, qty: 1 });
  }
  saveCart(cart);
  toast('Added to cart', 'success');
  renderCart();
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  if (delta > 0) {
    const stock = stockLeft(item);
    if (stock !== null && item.qty >= stock) {
      toast('Only ' + stock + ' available', 'error');
      return;
    }
    item.qty += delta;
  } else {
    item.qty += delta;
  }
  if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  saveCart(getCart().filter(i => i.id !== id));
  renderCart();
  toast('Removed from cart', 'info');
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const itemCount = document.getElementById('cartItemCount');
  if (!itemsEl) return;
  const cart = getCart();
  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><h4>Your cart is empty</h4><p>Add products to get started.</p></div>';
    if (footer) footer.style.display = 'none';
    if (itemCount) itemCount.textContent = '0';
    return;
  }
  let total = 0, count = 0;
  itemsEl.innerHTML = cart.map(item => {
    total += Number(item.price) * item.qty;
    count += item.qty;
    return '' +
      '<div class="cart-item">' +
        '<img src="' + esc(item.image || '') + '" alt="' + esc(item.name) + '" onerror="this.style.opacity=\'0.3\'">' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + esc(item.name) + '</div>' +
          '<div class="cart-item-price">₵' + esc(item.price) + '</div>' +
          '<div class="cart-item-controls">' +
            '<button class="qty-btn" onclick="changeQty(\'' + esc(item.id) + '\', -1)"><i class="fas fa-minus"></i></button>' +
            '<span class="qty-val">' + item.qty + '</span>' +
            '<button class="qty-btn" onclick="changeQty(\'' + esc(item.id) + '\', 1)"><i class="fas fa-plus"></i></button>' +
            '<button class="cart-item-remove" onclick="removeItem(\'' + esc(item.id) + '\')" title="Remove"><i class="fas fa-trash"></i></button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }).join('');
  if (itemCount) itemCount.textContent = count;
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = '₵' + total.toFixed(2);
  if (footer) footer.style.display = 'block';
}

/* Expose cart functions for inline onclick handlers */
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;

/* ---------- PAYMENTS ---------- */
function momoAvailable() {
  return !!(window.PaystackPop && PAYSTACK_PUBLIC_KEY);
}

function buildWhatsAppMsg(items, customer, total, orderRef, paid, payRef) {
  const lines = items.map(i => '• ' + i.name + ' × ' + i.qty + ' = ₵' + (Number(i.price) * i.qty).toFixed(2));
  let msg = 'Hello House of Baiden! I\'d like to order:\n\n' + lines.join('\n') +
    '\n\n*Total: ₵' + total.toFixed(2) + '*' +
    '\n\n👤 Name: ' + customer.name +
    '\n📞 Phone: ' + customer.phone +
    '\n🏠 Hall: ' + (customer.hall || '—') +
    '\n🧾 Order ref: ' + orderRef + '\n';
  if (paid) msg += '✅ Paid via Mobile Money' + (payRef ? ' (Ref: ' + payRef + ')' : '') + '\n';
  msg += '\nPlease confirm availability and delivery. Thank you!';
  return msg;
}

function openWhatsApp(msg) {
  window.open('https://wa.me/' + STORE.whatsappNumber + '?text=' + encodeURIComponent(msg), '_blank');
}

/* ---------- CHECKOUT MODAL ---------- */
const checkoutModal = document.getElementById('checkoutModal');

function openCheckoutModal() {
  const cart = getCart();
  if (!checkoutModal || cart.length === 0) return;
  const momo = momoAvailable();
  const payBtn = document.getElementById('coPayBtn');
  const waBtn = document.getElementById('coWhatsAppBtn');
  if (payBtn) payBtn.innerHTML = momo ? '<i class="fas fa-mobile-alt"></i> Pay with Mobile Money' : '<i class="fas fa-cart-arrow-down"></i> Place Order';
  if (waBtn) waBtn.style.display = momo ? '' : 'none';
  renderCheckoutSummary();
  const nameEl = document.getElementById('coName');
  const phoneEl = document.getElementById('coPhone');
  const hallEl = document.getElementById('coHall');
  if (nameEl) nameEl.value = localStorage.getItem('hob_last_name') || '';
  if (phoneEl) phoneEl.value = localStorage.getItem('hob_last_phone') || '';
  if (hallEl) hallEl.value = localStorage.getItem('hob_last_hall') || '';
  const err = document.getElementById('coError');
  if (err) err.classList.remove('visible');
  checkoutModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { if (nameEl) nameEl.focus(); }, 100);
}

function closeCheckoutModal() {
  if (!checkoutModal) return;
  checkoutModal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkoutSummary');
  if (!el) return;
  const cart = getCart();
  const total = cart.reduce((s, i) => s + Number(i.price) * i.qty, 0);
  el.innerHTML = cart.map(i =>
    '<div class="co-row"><span class="co-name">' + esc(i.name) + ' × ' + i.qty + '</span><span class="co-price">₵' + (Number(i.price) * i.qty).toFixed(2) + '</span></div>'
  ).join('') +
  '<div class="co-total"><span class="lbl">Total</span><span class="amt">₵' + total.toFixed(2) + '</span></div>';
}

async function placeOrder(method) {
  const cart = getCart();
  if (cart.length === 0) return;
  const name = document.getElementById('coName').value.trim();
  const phone = document.getElementById('coPhone').value.trim();
  const hall = document.getElementById('coHall').value.trim();
  const email = document.getElementById('coEmail').value.trim();
  const errEl = document.getElementById('coError');
  if (!name || !phone) {
    if (errEl) {
      errEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter your name and phone number.';
      errEl.classList.add('visible');
    }
    return;
  }
  const total = Math.round(cart.reduce((s, i) => s + Number(i.price) * i.qty, 0) * 100) / 100;
  const data = {
    customer: { name: name, phone: phone, hall: hall || 'Not provided', email: email || '' },
    items: cart.map(i => ({ id: i.id, name: i.name, price: String(i.price), qty: i.qty })),
    total: total,
    status: 'new',
    payment: { method: method === 'momo' ? 'momo' : 'whatsapp', paid: false, ref: null },
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  let orderRef = 'WA' + Date.now().toString().slice(-6);
  try {
    // Await the write so the payment callback can update the REAL doc id.
    const ref = await db.collection('orders').add(data);
    orderRef = ref.id;
  } catch (err) {
    console.error('Order write failed:', err);
  }
  if (errEl) errEl.classList.remove('visible');
  localStorage.setItem('hob_last_name', name);
  localStorage.setItem('hob_last_phone', phone);
  localStorage.setItem('hob_last_hall', hall);
  closeCheckoutModal();
  if (method === 'momo' && momoAvailable()) {
    payWithMoMo({ orderRef: orderRef, customer: data.customer, total: total }, data);
  } else {
    openWhatsApp(buildWhatsAppMsg(data.items, data.customer, total, orderRef, false, null));
    toast('Order placed — we\'ll confirm on WhatsApp!', 'success');
  }
}

function payWithMoMo(order, orderData) {
  const email = order.customer.email || (order.orderRef + '@hob.gh');
  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: Math.round(order.total * 100),
    currency: 'GHS',
    ref: 'HOB-' + order.orderRef,
    channels: ['mobile_money'],
    metadata: { order_id: order.orderRef },
    onClose: function () {
      toast('Payment cancelled — you can still order via WhatsApp', 'info');
      openWhatsApp(buildWhatsAppMsg(orderData.items, order.customer, order.total, order.orderRef, false, null));
    },
    callback: function (response) {
      try {
        db.collection('orders').doc(order.orderRef).update({ 'payment.paid': true, 'payment.ref': response.reference }).catch(() => {});
      } catch (e) {}
      openWhatsApp(buildWhatsAppMsg(orderData.items, order.customer, order.total, order.orderRef, true, response.reference));
      toast('Payment received — we\'ll confirm on WhatsApp!', 'success');
    }
  });
  handler.openIframe();
}

if (checkoutModal) {
  const checkoutClose = document.getElementById('checkoutClose');
  const checkoutForm = document.getElementById('checkoutForm');
  const waBtn = document.getElementById('coWhatsAppBtn');
  if (checkoutClose) checkoutClose.addEventListener('click', closeCheckoutModal);
  checkoutModal.addEventListener('click', e => { if (e.target === checkoutModal) closeCheckoutModal(); });
  if (checkoutForm) checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    placeOrder(momoAvailable() ? 'momo' : 'whatsapp');
  });
  if (waBtn) waBtn.addEventListener('click', () => placeOrder('whatsapp'));
}

/* ---------- UI: HEADER SCROLL ---------- */
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  const backTop = document.getElementById('backToTop');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ---------- UI: MOBILE MENU ---------- */
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    mobileBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* ---------- UI: BACK TO TOP ---------- */
const backToTop = document.getElementById('backToTop');
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- UI: SCROLL ANIMATIONS ---------- */
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
function observeFadeIns() {
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => fadeObserver.observe(el));
}

/* ---------- UI: CART DRAWER ---------- */
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartClose = document.getElementById('cartClose');
const checkoutBtn = document.getElementById('checkoutBtn');
function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('visible');
  document.body.style.overflow = 'hidden';
  renderCart();
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('visible');
  document.body.style.overflow = '';
}
if (cartBtn) cartBtn.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
if (checkoutBtn) checkoutBtn.addEventListener('click', () => { closeCart(); openCheckoutModal(); });

/* ---------- UI: QUICK VIEW (perfumes/skincare) ---------- */
const qvModal = document.getElementById('quickViewModal');
if (qvModal) {
  const qvContent = document.getElementById('qvContent');
  const modalClose = document.getElementById('modalClose');

  function openQuickView(product) {
    if (!product) return;
    const out = isOutOfStock(product);
    const s = stockLeft(product);
    const stockHtml = out
      ? '<div class="qv-stock out"><i class="fas fa-ban"></i> Out of stock</div>'
      : (s !== null && s <= 3 ? '<div class="qv-stock low"><i class="fas fa-fire"></i> Only ' + s + ' left</div>' : '<div class="qv-stock in"><i class="fas fa-check-circle"></i> In stock</div>');
    const waLink = 'https://wa.me/' + STORE.whatsappNumber + '?text=' + encodeURIComponent('Hello! I want to order ' + product.name + ' for ₵' + product.price);
    qvContent.innerHTML = '' +
      '<div class="qv-img-wrap"><img src="' + esc(product.image || '') + '" alt="' + esc(product.name) + '" onerror="this.style.opacity=\'0.3\'"></div>' +
      '<div class="qv-info">' +
        '<div class="qv-cat">' + esc(product.category === 'perfume' ? 'Perfume' : 'Skincare') + '</div>' +
        '<h2 class="qv-name">' + esc(product.name) + '</h2>' +
        '<div class="qv-price">₵' + esc(product.price) + '</div>' +
        stockHtml +
        '<p class="qv-desc">' + esc(product.description || 'Premium quality product, carefully sourced and authenticated by House of Baiden. Order via WhatsApp for fast delivery to your hall on KNUST campus.') + '</p>' +
        '<div class="qv-meta">' +
          '<div class="qv-meta-item"><i class="fas fa-shield-halved"></i> 100% Authentic</div>' +
          '<div class="qv-meta-item"><i class="fas fa-truck-fast"></i> Free campus delivery</div>' +
          '<div class="qv-meta-item"><i class="fab fa-whatsapp"></i> 24/7 WhatsApp orders</div>' +
        '</div>' +
        '<div class="qv-actions">' +
          '<button class="btn btn-primary" ' + (out ? 'disabled' : '') + ' onclick=\'addToCart(' + JSON.stringify(product).replace(/'/g, '&#39;') + ')\' >' +
            '<i class="fas fa-cart-plus"></i> ' + (out ? 'Sold Out' : 'Add to Cart') +
          '</button>' +
          '<a href="' + esc(waLink) + '" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Order Now</a>' +
        '</div>' +
      '</div>';
    qvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    qvModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeQuickView);
  qvModal.addEventListener('click', e => { if (e.target === qvModal) closeQuickView(); });
  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
}

/* ---------- UI: ADMIN LOGIN (index only) ---------- */
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
if (loginModal && loginForm) {
  const adminLink = document.getElementById('adminLink');
  const closeModalBtn = document.getElementById('closeModal');
  const errorMessage = document.getElementById('errorMessage');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const forgotLink = document.getElementById('forgotPassword');
  const submitBtn = loginForm.querySelector('button[type="submit"]');

  function closeLogin() {
    loginModal.classList.remove('active');
    if (errorMessage) errorMessage.classList.remove('visible');
    loginForm.reset();
  }
  function showLoginError(msg) {
    if (!errorMessage) return;
    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + esc(msg);
    errorMessage.classList.add('visible');
  }

  if (adminLink) adminLink.addEventListener('click', e => {
    e.preventDefault();
    loginModal.classList.add('active');
    setTimeout(() => { if (emailInput) emailInput.focus(); }, 100);
  });
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeLogin);
  loginModal.addEventListener('click', e => { if (e.target === loginModal) closeLogin(); });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) {
      showLoginError('Enter your email and password.');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…';
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = 'admin.html';
      })
      .catch(err => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        const code = err && err.code;
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential' || code === 'auth/invalid-login-credentials') {
          showLoginError('Invalid email or password.');
        } else if (code === 'auth/too-many-requests') {
          showLoginError('Too many attempts. Please try again later.');
        } else if (code === 'auth/network-request-failed') {
          showLoginError('Network error. Check your connection and try again.');
        } else {
          showLoginError('Sign-in failed. Please try again.');
        }
      });
  });

  if (forgotLink) forgotLink.addEventListener('click', e => {
    e.preventDefault();
    toast('Contact +233 55 414 2949 for admin access', 'info');
  });
}

/* ---------- ESC KEY ---------- */
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  const modals = [loginModal, checkoutModal, qvModal];
  modals.forEach(m => {
    if (m && m.classList.contains('active')) {
      m.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  if (loginForm) loginForm.reset();
  if (cartDrawer && cartDrawer.classList.contains('open')) closeCart();
});

/* ---------- INIT ---------- */
updateCartCount();
renderCart();
observeFadeIns();
