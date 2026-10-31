/** All persisted values are JSON. Theme is also readable before module startup. */
export const KEYS = Object.freeze({
  shoes: 'store22.shoes', users: 'store22.users', cart: 'store22.cart',
  theme: 'store22.theme', language: 'store22.language',
  customerSession: 'store22.customerSession', adminSession: 'store22.adminSession',
  pendingCart: 'store22.pendingCart', flash: 'store22.flash',
  newsletter: 'store22.newsletter', messages: 'store22.messages',
});
export function read(key, fallback = null) {
  try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
  catch { return fallback; }
}
export function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return value; }
  catch { throw new Error('storage.unavailable'); }
}
export function remove(key) {
  try { localStorage.removeItem(key); } catch { throw new Error('storage.unavailable'); }
}
export function emit(name, detail = {}) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(name, { detail }));
}
export function createId(prefix = '') {
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  return prefix ? `${prefix}-${id}` : id;
}
