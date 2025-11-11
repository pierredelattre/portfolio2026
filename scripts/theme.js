const THEME_KEY = 'theme-preference';
const switchButton = document.querySelector('.switch');
const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = (theme) => {
  if (theme) {
    root.dataset.theme = theme;
    switchButton?.setAttribute('aria-pressed', String(theme === 'dark'));
  } else {
    root.removeAttribute('data-theme');
    switchButton?.setAttribute('aria-pressed', 'false');
  }
};

const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme) {
  applyTheme(storedTheme);
}

prefersDark.addEventListener('change', (event) => {
  if (localStorage.getItem(THEME_KEY)) return;
  applyTheme(event.matches ? 'dark' : 'light');
});

switchButton?.addEventListener('click', () => {
  const current = root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
  const nextTheme = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
});
