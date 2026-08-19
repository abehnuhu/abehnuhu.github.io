# House of Baiden

Premium fragrances & skincare at KNUST, Kumasi. Dark-gold luxury storefront with Firebase-backed products, a customer order inbox, stock tracking, and Mobile Money checkout.

**Website:** https://abehnuhu.github.io · **WhatsApp:** +233 55 414 2949 · **Location:** KNUST, Kumasi

---

## Quick start

The site is fully static (HTML + CSS + JS + Firebase). No build step — just push to GitHub Pages.

1. **Products** live in Firestore (`products` collection) — manage them at `admin.html`.
2. **Orders** customers place on the storefront appear in `admin.html` → Orders (new → confirmed → delivered / cancelled), including whether payment was received via Mobile Money.
3. **Stock** — every product can carry a `stock` number. Blank = unlimited. Out-of-stock items show a badge and can't be added to the cart. Low stock (≤ 3) shows "Only X left".

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Landing + featured products |
| `perfumes.html`, `skincare.html` | Category storefronts |
| `admin.html` | Admin dashboard (products, stock, orders) |
| `firebase-config.js` | **Single** Firebase config + store settings (WhatsApp number, admin email, Paystack key) |
| `app.js` | Shared storefront runtime (cart, checkout, login, payments) |
| `styles.css` | Shared storefront styles |
| `firestore.rules` | Firestore security rules (deploy to Firebase) |
| `favicon.svg`, `sitemap.xml`, `robots.txt` | SEO / social sharing |

## 🔐 Admin setup (security — do this once)

The old password gate was **removed**. The admin panel now uses **Firebase Authentication**.

1. **Firebase Console → Authentication → Sign-in method** → enable **Email/Password**.
2. **Add user** `admin@houseofbaiden.com` with a strong password.
3. **Firestore Database → Rules** → paste the contents of `firestore.rules` and publish.
   - *Strongly recommended:* open `firestore.rules`, replace `PASTE_YOUR_ADMIN_UID_HERE` with your real admin UID (Console → Authentication → Users) and uncomment the strict line. This locks all writes to you alone.
4. Log in from the storefront footer "Admin" link → `admin.html`.

## 💳 Mobile Money payments (optional)

Checkout works WhatsApp-first out of the box. To also accept inline **MTN / Telecel / AirtelTigo MoMo** payments:

1. Create a free [Paystack](https://dashboard.paystack.com) account (supports Ghana MoMo).
2. Copy your **public key** (`pk_live_...`) from Settings → API Keys.
3. Paste it into `firebase-config.js` → `PAYSTACK_PUBLIC_KEY`.

When a key is present, the checkout shows a **Pay with Mobile Money** button alongside WhatsApp. Orders record the payment reference and appear as "Paid" in the admin Orders panel. Leave the key empty to keep WhatsApp-only checkout.

> Note: you still complete delivery over WhatsApp — MoMo collects the money inline, the order is confirmed via chat.

## 📣 SEO & sharing

Each page has Open Graph / Twitter cards, a favicon, `sitemap.xml`, `robots.txt`, and JSON-LD LocalBusiness schema so shared links (WhatsApp, Instagram bio) show a rich preview. Update `sitemap.xml` if you change the GitHub Pages URL.

## 🛠 Dev notes

- Firebase SDK 9 compat, loaded once per page from `firebase-config.js` — edit one file, not four.
- Cart lives in `localStorage` (`hob_cart`).
- To change the WhatsApp number or admin email, edit `STORE` in `firebase-config.js`.
