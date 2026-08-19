/* ============================================================
   HOUSE OF BAIDEN — shared storefront runtime
   Load AFTER firebase-config.js. Works on index/perfumes/skincare.
   ============================================================ */

/* ============================================================
   PERFUME DESCRIPTION DATABASE
   Accurate scent profiles for each fragrance. Used by the
   storefront (perfumes.html, index.html) and the scent finder.
   Matches product names using fuzzy lookup.
   ============================================================ */
const PERFUME_DB = {
  // ==================== LATTAFA ====================
  'lattafa bade\'e al oud': { desc: 'Rich oud, saffron, and rose with a warm musk dry-down. A luxurious Arabian masterpiece — deep, complex, and unforgettable.', notes: 'Oud, Saffron, Rose, Musk' },
  'oud for glory': { desc: 'Rich oud, saffron, and rose with a warm musk dry-down. A luxurious Arabian masterpiece — deep, complex, and unforgettable.', notes: 'Oud, Saffron, Rose, Musk' },
  'bade\'e al oud': { desc: 'Rich oud, saffron, and rose with a warm musk dry-down. A luxurious Arabian masterpiece — deep, complex, and unforgettable.', notes: 'Oud, Saffron, Rose, Musk' },
  'lattafa yara': { desc: 'Sweet vanilla, caramel, and heliotrope wrapped in soft musk. A warm Arabian gourmand — like dessert in a bottle.', notes: 'Vanilla, Caramel, Heliotrope, Musk' },
  'lattafa asad': { desc: 'Bold tobacco, oud, and patchouli with amber warmth. Smoky, powerful, and intensely masculine — a statement fragrance.', notes: 'Tobacco, Oud, Patchouli, Amber' },
  'lattafa raghba': { desc: 'Creamy vanilla, oud, and caramel with a musky base. Sweet Arabian luxury — mesmerizing and long-lasting.', notes: 'Vanilla, Oud, Caramel, Musk' },
  'lattafa ana abiyedh': { desc: 'Delicate orange blossom, vanilla, and white musk. Clean, elegant, and effortlessly feminine.', notes: 'Orange Blossom, Vanilla, Musk' },
  'lattafa fakhar': { desc: 'Fresh lavender, citrus, and woody undertones. A versatile masculine scent — clean yet confident.', notes: 'Lavender, Citrus, Woods' },
  'lattafa ramz silver': { desc: 'Sweet vanilla, amber, and woody notes. A warm, inviting Arabian fragrance with lasting power.', notes: 'Vanilla, Amber, Woods' },
  'lattafa qaa\'ed': { desc: 'Rich oud, amber, and spice. Deep, smoky, and luxurious — for those who command attention.', notes: 'Oud, Amber, Spices' },
  'lattafa khamrah': { desc: 'Warm cinnamon, vanilla, and tonka bean over amber. Sweet, spicy, and irresistibly cozy.', notes: 'Cinnamon, Vanilla, Tonka, Amber' },
  'lattafa amwaaj': { desc: 'Fresh aquatic notes with citrus and musk. A light, breezy Arabian fragrance for everyday wear.', notes: 'Aquatic, Citrus, Musk' },
  'lattafa mayar': { desc: 'Delicate florals, pear, and vanilla. Sweet, romantic, and gracefully feminine.', notes: 'Florals, Pear, Vanilla' },

  // ==================== RIIFFS ====================
  'imperial noir': { desc: 'Dark bergamot, black pepper, oud, and leather. A sophisticated noir fragrance — mysterious, bold, and commanding.', notes: 'Bergamot, Black Pepper, Oud, Leather' },
  'riiffs imperial noir': { desc: 'Dark bergamot, black pepper, oud, and leather. A sophisticated noir fragrance — mysterious, bold, and commanding.', notes: 'Bergamot, Black Pepper, Oud, Leather' },

  // ==================== FRAGRANCE WORLD ====================
  'hardcore wood': { desc: 'Intense cedar, sandalwood, and musk. A rugged woody fragrance — bold, earthy, and unapologetically masculine.', notes: 'Cedar, Sandalwood, Musk' },
  'fragrance world hardcore': { desc: 'Intense cedar, sandalwood, and musk. A rugged woody fragrance — bold, earthy, and unapologetically masculine.', notes: 'Cedar, Sandalwood, Musk' },

  // ==================== TOFY ====================
  'tofy milky vanilla': { desc: 'Creamy vanilla, milk, and soft caramel. A sweet, comforting gourmand — like a warm hug in a bottle.', notes: 'Vanilla, Milk, Caramel' },
  'tofy': { desc: 'Creamy vanilla, milk, and soft caramel. A sweet, comforting gourmand — like a warm hug in a bottle.', notes: 'Vanilla, Milk, Caramel' },

  // ==================== DIOR ====================
  'dior sauvage': { desc: 'Fresh bergamot, peppery Sichuan, and ambroxan. Clean yet magnetic — the modern everyday king.', notes: 'Bergamot, Pepper, Ambroxan' },
  'sauvage': { desc: 'Fresh bergamot, peppery Sichuan, and ambroxan. Clean yet magnetic — the modern everyday king.', notes: 'Bergamot, Pepper, Ambroxan' },
  'dior sauvage elixir': { desc: 'Intense cinnamon, nutmeg, and cardamom over amber. The darkest, most powerful Sauvage — pure luxury.', notes: 'Cinnamon, Nutmeg, Cardamom, Amber' },

  // ==================== CHANEL ====================
  'bleu de chanel': { desc: 'Citrus, mint, pink pepper over sandalwood and incense. Sophisticated freshness with depth.', notes: 'Citrus, Mint, Sandalwood, Incense' },
  'chanel bleu': { desc: 'Citrus, mint, pink pepper over sandalwood and incense. Sophisticated freshness with depth.', notes: 'Citrus, Mint, Sandalwood, Incense' },
  'chanel chance': { desc: 'Citrus, jasmine, patchouli, and amber. Fresh sparkle that evolves into warm elegance.', notes: 'Citrus, Jasmine, Patchouli, Amber' },
  'chanel chance eau tendre': { desc: 'Grapefruit, jasmine, and musk. Softer, fruitier, and more delicate than the original.', notes: 'Grapefruit, Jasmine, Musk' },

  // ==================== VERSACE ====================
  'versace eros': { desc: 'Mint, green apple, tonka bean, and vanilla. Sweet, powerful, and impossible to ignore.', notes: 'Mint, Green Apple, Tonka, Vanilla' },
  'versace eros flame': { desc: 'Black pepper, rose, vanilla, and tonka. Smokier and more seductive than the original.', notes: 'Black Pepper, Rose, Vanilla, Tonka' },
  'versace bright crystal': { desc: 'Pomegranate, peony, magnolia, and amber. Light, sparkling, and feminine — a campus favourite.', notes: 'Pomegranate, Peony, Magnolia, Amber' },
  'versace pour homme': { desc: 'Citrus, neroli, amber, and musk. Light and Mediterranean — effortless daily wear.', notes: 'Citrus, Neroli, Amber, Musk' },
  'versace man eau fraiche': { desc: 'Lemon, tarragon, cedar, and amber. Fresh, aquatic, and breezy — summer in a bottle.', notes: 'Lemon, Tarragon, Cedar, Amber' },
  'versace oud noir': { desc: 'Oud, leather, cardamom, and patchouli. Dark and intense Versace luxury.', notes: 'Oud, Leather, Cardamom, Patchouli' },

  // ==================== YSL ====================
  'YSL Y': { desc: 'Apple, ginger, sage, and ambergris. Modern, versatile, and effortlessly cool.', notes: 'Apple, Ginger, Sage, Ambergris' },
  'yves saint laurent Y': { desc: 'Apple, ginger, sage, and ambergris. Modern, versatile, and effortlessly cool.', notes: 'Apple, Ginger, Sage, Ambergris' },
  'YSL black opium': { desc: 'Coffee, vanilla, white flowers, and cedar. Addictive, dark, and electrically seductive.', notes: 'Coffee, Vanilla, White Flowers, Cedar' },
  'yves saint laurent black opium': { desc: 'Coffee, vanilla, white flowers, and cedar. Addictive, dark, and electrically seductive.', notes: 'Coffee, Vanilla, White Flowers, Cedar' },

  // ==================== PACO RABANNE ====================
  'paco rabanne 1 million': { desc: 'Cinnamon, blood mandarin, leather, and amber. Sweet spice bomb — the ultimate party scent.', notes: 'Cinnamon, Mandarin, Leather, Amber' },
  '1 million': { desc: 'Cinnamon, blood mandarin, leather, and amber. Sweet spice bomb — the ultimate party scent.', notes: 'Cinnamon, Mandarin, Leather, Amber' },
  'paco rabanne invictus': { desc: 'Marine accord, grapefruit, guaiac wood. Fresh, sporty, and competitive — like winning.', notes: 'Marine, Grapefruit, Guaiac Wood' },
  'invictus': { desc: 'Marine accord, grapefruit, guaiac wood. Fresh, sporty, and competitive — like winning.', notes: 'Marine, Grapefruit, Guaiac Wood' },
  'paco rabanne phantom': { desc: 'Lemon, lavender, vanilla, and woody accord. Futuristic freshness with a creamy finish.', notes: 'Lemon, Lavender, Vanilla, Woods' },

  // ==================== JEAN PAUL GAULTIER ====================
  'jean paul gaultier le male': { desc: 'Lavender, vanilla, tonka, and mint. The iconic sweet-aromatic — bold and unforgettable.', notes: 'Lavender, Vanilla, Tonka, Mint' },
  'le male': { desc: 'Lavender, vanilla, tonka, and mint. The iconic sweet-aromatic — bold and unforgettable.', notes: 'Lavender, Vanilla, Tonka, Mint' },
  'jean paul gaultier ultra male': { desc: 'Pear, lavender, vanilla, and cinnamon. Sweeter and more intense than Le Male.', notes: 'Pear, Lavender, Vanilla, Cinnamon' },
  'ultra male': { desc: 'Pear, lavender, vanilla, and cinnamon. Sweeter and more intense than Le Male.', notes: 'Pear, Lavender, Vanilla, Cinnamon' },

  // ==================== HUGO BOSS ====================
  'hugo boss bottled': { desc: 'Apple, cinnamon, geranium, and sandalwood. The gentleman\'s daily — polished and approachable.', notes: 'Apple, Cinnamon, Geranium, Sandalwood' },
  'boss bottled': { desc: 'Apple, cinnamon, geranium, and sandalwood. The gentleman\'s daily — polished and approachable.', notes: 'Apple, Cinnamon, Geranium, Sandalwood' },

  // ==================== DOLCE & GABBANA ====================
  'd&g the one': { desc: 'Grapefruit, coriander, basil, amber, and tobacco. Warm, intimate, and irresistibly charming.', notes: 'Grapefruit, Coriander, Basil, Amber' },
  'dolce gabbana the one': { desc: 'Grapefruit, coriander, basil, amber, and tobacco. Warm, intimate, and irresistibly charming.', notes: 'Grapefruit, Coriander, Basil, Amber' },
  'd&g light blue': { desc: 'Sicilian lemon, apple, cedar, and amber. Sun-kissed Mediterranean in a bottle.', notes: 'Lemon, Apple, Cedar, Amber' },
  'dolce gabbana light blue': { desc: 'Sicilian lemon, apple, cedar, and amber. Sun-kissed Mediterranean in a bottle.', notes: 'Lemon, Apple, Cedar, Amber' },
  'dolce gabbana the only one': { desc: 'Violet, coffee, vanilla, and caramel. Sweet, warm, and commanding attention.', notes: 'Violet, Coffee, Vanilla, Caramel' },

  // ==================== GUCCI ====================
  'gucci bloom': { desc: 'Tuberose, jasmine, and Rangoon creeper. Lush white florals — like walking through a garden.', notes: 'Tuberose, Jasmine, Creeper' },

  // ==================== PRADA ====================
  'prada candy': { desc: 'Caramel, musk, vanilla, and benzoin. Sweet, warm, and dangerously addictive.', notes: 'Caramel, Musk, Vanilla, Benzoin' },
  'prada l\'homme': { desc: 'Neroli, iris, amber, and cedar. Clean, powdery, and impeccably refined.', notes: 'Neroli, Iris, Amber, Cedar' },

  // ==================== VIKTOR & ROLF ====================
  'flowerbomb': { desc: 'Rose, jasmine, orchid, and patchouli. An explosion of sweet florals — bold and romantic.', notes: 'Rose, Jasmine, Orchid, Patchouli' },
  'viktor rolf flowerbomb': { desc: 'Rose, jasmine, orchid, and patchouli. An explosion of sweet florals — bold and romantic.', notes: 'Rose, Jasmine, Orchid, Patchouli' },

  // ==================== MARC JACOBS ====================
  'marc jacobs daisy': { desc: 'Strawberry, violet leaves, jasmine, and musk. Youthful, cheerful, and effortlessly cute.', notes: 'Strawberry, Violet, Jasmine, Musk' },
  'daisy': { desc: 'Strawberry, violet leaves, jasmine, and musk. Youthful, cheerful, and effortlessly cute.', notes: 'Strawberry, Violet, Jasmine, Musk' },

  // ==================== CALVIN KLEIN ====================
  'calvin klein euphoria': { desc: 'Pomegranate, orchid, amber, and mahogany. Mysterious and sensual — evening elegance.', notes: 'Pomegranate, Orchid, Amber, Mahogany' },
  'euphoria': { desc: 'Pomegranate, orchid, amber, and mahogany. Mysterious and sensual — evening elegance.', notes: 'Pomegranate, Orchid, Amber, Mahogany' },

  // ==================== LANCÔME ====================
  'lancome la vie est belle': { desc: 'Iris, praline, vanilla, and patchouli. Sweet, powdery, and confidently joyful.', notes: 'Iris, Praline, Vanilla, Patchouli' },
  'la vie est belle': { desc: 'Iris, praline, vanilla, and patchouli. Sweet, powdery, and confidently joyful.', notes: 'Iris, Praline, Vanilla, Patchouli' },

  // ==================== TOM FORD ====================
  'tom ford oud wood': { desc: 'Oud, sandalwood, vetiver, and tonka. The benchmark oud — rich, smoky, and luxurious.', notes: 'Oud, Sandalwood, Vetiver, Tonka' },
  'tom ford tobacco vanille': { desc: 'Tobacco, vanilla, cocoa, and dried fruits. Rich, warm, and hypnotically indulgent.', notes: 'Tobacco, Vanilla, Cocoa, Dried Fruits' },

  // ==================== AZZARO ====================
  'azzaro wanted': { desc: 'Lemon, tonka bean, violet, and amber. Sweet, magnetic, and slightly dangerous.', notes: 'Lemon, Tonka, Violet, Amber' },
  'azzaro wanted by night': { desc: 'Cinnamon, tobacco, honey, and cedar. Rich, warm, and intoxicating after dark.', notes: 'Cinnamon, Tobacco, Honey, Cedar' },

  // ==================== CAROLINA HERRERA ====================
  'carolina herrera bad boy': { desc: 'Citrus, white flowers, tonka bean, and cocoa. Electric and unexpected — fresh meets dark.', notes: 'Citrus, White Flowers, Tonka, Cocoa' },
  'bad boy': { desc: 'Citrus, white flowers, tonka bean, and cocoa. Electric and unexpected — fresh meets dark.', notes: 'Citrus, White Flowers, Tonka, Cocoa' },

  // ==================== BURBERRY ====================
  'burberry her': { desc: 'Blackcurrant, peony, musk, and amber. Fruity-sweet with a sophisticated edge.', notes: 'Blackcurrant, Peony, Musk, Amber' },

  // ==================== COACH ====================
  'coach eau de parfum': { desc: 'Raspberry, rose, musk, and suede. Modern, polished, and quietly confident.', notes: 'Raspberry, Rose, Musk, Suede' },

  // ==================== CHLOE ====================
  'chloe eau de parfum': { desc: 'Rose, lychee, cedar, and honey. Light, romantic, and effortlessly chic.', notes: 'Rose, Lychee, Cedar, Honey' },

  // ==================== GIVENCHY ====================
  'givenchy l\'interdit': { desc: 'Tuberose, jasmine, patchouli, and amber. Dark floral — forbidden elegance.', notes: 'Tuberose, Jasmine, Patchouli, Amber' },

  // ==================== NARCISO RODRIGUEZ ====================
  'narciso rodriguez for her': { desc: 'Osmanthus, rose, musk, and amberwood. Deep, floral-musky, and hauntingly beautiful.', notes: 'Osmanthus, Rose, Musk, Amberwood' },
  'narciso rodriguez for him': { desc: 'Vetiver, musk, amber, and cedar. Deep, smoky, and hypnotically sensual.', notes: 'Vetiver, Musk, Amber, Cedar' },

  // ==================== MISS DIOR ====================
  'miss dior': { desc: 'Lily of the valley, rose, musk, and peony. Romantic, elegant, and timelessly feminine.', notes: 'Lily of the Valley, Rose, Musk, Peony' },

  // ==================== ARIANA GRANDE ====================
  'ariana grande cloud': { desc: 'Lavender, coconut, praline, and musk. Sweet cloud of comfort — cosy and inviting.', notes: 'Lavender, Coconut, Praline, Musk' },

  // ==================== ACQUA DI GIO ====================
  'acqua di gio': { desc: 'Marine notes, bergamot, and rosemary. The original aquatic — light, breezy, perfect for hot days.', notes: 'Marine, Bergamot, Rosemary' },
  'acqua di gio profondo': { desc: 'Deep aquatic with amber, musk, and oakmoss. Richer than the original — ocean meets forest.', notes: 'Aquatic, Amber, Musk, Oakmoss' },

  // ==================== MONTBLANC ====================
  'montblanc explorer': { desc: 'Bergamot, vetiver, and patchouli. Aventuresque and woody — like Aventus at a better price.', notes: 'Bergamot, Vetiver, Patchouli' },

  // ==================== JIMMY CHOO ====================
  'jimmy choo man': { desc: 'Melon, lavender, pink pepper, and patchouli. Fruity-fresh with a warm masculine edge.', notes: 'Melon, Lavender, Pink Pepper, Patchouli' },

  // ==================== ARMAF ====================
  'armaf club de nuit intense': { desc: 'Lemon, pineapple, birch, and musk. A Creed Aventus-inspired powerhouse.', notes: 'Lemon, Pineapple, Birch, Musk' },

  // ==================== MUGLER ====================
  'mugler alien': { desc: 'Jasmine, woody accord, and amber. Powerful, radiant, and otherworldly.', notes: 'Jasmine, Woody Accord, Amber' },

  // ==================== VALENTINO ====================
  'valentino uomo': { desc: 'Coffee, leather, cedar, and vanilla. Italian sophistication — warm and refined.', notes: 'Coffee, Leather, Cedar, Vanilla' },

  // ==================== RABANNE ====================
  'rabanne phantom': { desc: 'Lemon, lavender, vanilla, and woody accord. Futuristic freshness with a creamy finish.', notes: 'Lemon, Lavender, Vanilla, Woods' },
  'rabanne 1 million elixir': { desc: 'Leather, rose, dark chocolate, and amber. Maximalist sweetness — the king of nightlife.', notes: 'Leather, Rose, Dark Chocolate, Amber' },
};

/** Look up a product in the perfume database by fuzzy name matching. */
function lookupPerfume(product) {
  const name = (product.name || '').toLowerCase().trim();
  // Direct match
  if (PERFUME_DB[name]) return PERFUME_DB[name];
  // Partial match — check if any key is contained in the product name
  for (const [key, val] of Object.entries(PERFUME_DB)) {
    if (name.includes(key) || key.includes(name)) return val;
  }
  // Fuzzy — check each word
  const words = name.split(/\s+/);
  for (const [key, val] of Object.entries(PERFUME_DB)) {
    const keyWords = key.split(/\s+/);
    const overlap = words.filter(w => keyWords.some(kw => w.includes(kw) || kw.includes(w)));
    if (overlap.length >= 2) return val;
  }
  return null;
}

/** Get the best description for a perfume product. */
function getPerfumeDesc(product) {
  const dbEntry = lookupPerfume(product);
  if (dbEntry) return dbEntry.desc;
  // Fall back to Firestore description if it\'s not the generic placeholder
  if (product.description && product.description !== 'Premium quality perfume, authentic and long-lasting.') {
    return product.description;
  }
  return 'Premium quality perfume, carefully sourced and authenticated by House of Baiden. Order via WhatsApp for fast campus delivery.';
}

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
        '<p class="qv-desc">' + esc(getPerfumeDesc(product)) + '</p>' +
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
