export function initTheme() {
  let preference;
  try { preference = localStorage.getItem('store22.theme'); } catch { /* Use system preference when storage is unavailable. */ }
  const dark = preference ? preference === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}

export function toggleTheme() {
  const dark = document.documentElement.classList.toggle('dark');
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  try { localStorage.setItem('store22.theme', dark ? 'dark' : 'light'); } catch { /* Keep the current tab usable. */ }
  document.dispatchEvent(new CustomEvent('theme:changed'));
  return dark;
}
