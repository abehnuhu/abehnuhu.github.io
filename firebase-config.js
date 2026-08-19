// ============================================================
// 🔥 HOUSE OF BAIDEN — FIREBASE CONFIG (single source of truth)
// Load this file AFTER firebase-app/firestore/auth compat scripts.
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDl6pEFAsr6M_T-eAuE2FuMS3kOOp1LBKs",
  authDomain: "house-of-baiden.firebaseapp.com",
  projectId: "house-of-baiden",
  storageBucket: "house-of-baiden.firebasestorage.app",
  messagingSenderId: "220065196721",
  appId: "1:220065196721:web:8fe9ab0c991b8d04dc1090",
  measurementId: "G-Z2RLV3V401"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ============================================================
// STORE SETTINGS
// ============================================================
const STORE = {
  whatsappNumber: "233554142949",        // +233 55 414 2949
  adminEmail: "admin@houseofbaiden.com"  // Firebase Auth admin login
};

// ============================================================
// PAYMENTS — Paystack (Mobile Money)
// Public key only (pk_test_... / pk_live_...) — it is safe to
// expose in the browser. Leave "" to keep checkout WhatsApp-only.
// Get one at https://dashboard.paystack.com/#/settings/developers
// ============================================================
const PAYSTACK_PUBLIC_KEY = ""; // e.g. "pk_live_xxxxxxxxxxxxxxxx"
