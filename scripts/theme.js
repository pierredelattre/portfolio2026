document.addEventListener("DOMContentLoaded", (event) => {
  const THEME_KEY = 'theme-preference';
  const switchButton = document.querySelector('.switch');
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    switchButton?.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  const syncWithSystemPreference = () => {
    if (localStorage.getItem(THEME_KEY)) return;
    applyTheme(prefersDark.matches ? 'dark' : 'light');
  };

  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    syncWithSystemPreference();
  }

  prefersDark.addEventListener('change', syncWithSystemPreference);

  switchButton?.addEventListener('click', () => {
    const current = root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
});