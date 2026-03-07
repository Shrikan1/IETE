// ─── Session-based authentication ───────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin@123';
const TOKEN_KEY      = 'iete_admin_session';
const EXPIRY_MS      = 8 * 60 * 60 * 1000; // 8 hours

function createToken(email) {
  return btoa(JSON.stringify({ email, exp: Date.now() + EXPIRY_MS }));
}

function parseToken(token) {
  if (!token) return null;
  try {
    const data = JSON.parse(atob(token));
    if (Date.now() > data.exp) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function signIn(email, password) {
  if (email.trim() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return Promise.reject(new Error('Invalid credentials'));
  }
  localStorage.setItem(TOKEN_KEY, createToken(email.trim()));
  return Promise.resolve();
}

export function signOut() {
  localStorage.removeItem(TOKEN_KEY);
  return Promise.resolve();
}

export function onAuthStateChanged(callback) {
  const token   = localStorage.getItem(TOKEN_KEY);
  const decoded = parseToken(token);
  setTimeout(() => callback(decoded ? { email: decoded.email } : null), 0);
  return () => {};
}
