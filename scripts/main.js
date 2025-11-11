const app = document.getElementById('app');

async function loadPage(path) {
  let page = path === '/' || path === '/index.html' ? 'home' : path.slice(1);
  try {
    const response = await fetch(`pages/${page}.html`);
    if (!response.ok) throw new Error('Page non trouvée');
    const html = await response.text();
    app.innerHTML = html;
  } catch (error) {
    app.innerHTML = `<p>Erreur : la page "${page}" n'existe pas.</p>`;
  }
}

function onLinkClick(event) {
  if (event.target.tagName === 'A' && event.target.href.startsWith(window.location.origin)) {
    event.preventDefault();
    const path = new URL(event.target.href).pathname;
    history.pushState(null, '', path);
    loadPage(path);
  }
}

window.addEventListener('popstate', () => {
  loadPage(window.location.pathname);
});

document.body.addEventListener('click', onLinkClick);

loadPage(window.location.pathname);