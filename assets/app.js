const appsGrid = document.getElementById("apps-grid");
const loadError = document.getElementById("load-error");

const legalLinks = [
  { key: "privacy", label: "Privacy Policy", primary: true },
  { key: "terms", label: "Terms" },
];

const renderCard = (app, index) => {
  const appHome = app.paths?.home || app.paths?.privacy || "#";
  const linksHtml = legalLinks
    .map((link) => {
      const href = app.paths?.[link.key];
      if (!href) return "";
      const primaryClass = link.primary ? " primary" : "";
      return `<a class="link-btn${primaryClass}" href="${href}">${link.label}</a>`;
    })
    .join("");

  const article = document.createElement("article");
  article.className = "app-card";
  article.style.animationDelay = `${Math.min(index * 70, 450)}ms`;

  article.innerHTML = `
    <div class="app-head">
      <a class="app-title-link" href="${appHome}">
        <div class="app-icon-wrap">
          <img class="app-icon" src="${app.icon}" alt="${app.name} icon" loading="lazy">
        </div>
        <h2 class="app-name">${app.name}</h2>
      </a>
    </div>
    <p class="app-desc">${app.description || "Legal pages for this app."}</p>
    <div class="links">${linksHtml}</div>
  `;

  return article;
};

const init = async () => {
  try {
    const response = await fetch("apps/apps.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch app list: ${response.status}`);
    }

    const data = await response.json();
    const apps = Array.isArray(data.apps) ? data.apps : [];

    if (!apps.length) {
      loadError.hidden = false;
      loadError.textContent = "No apps found in apps/apps.json.";
      return;
    }

    const fragment = document.createDocumentFragment();
    apps.forEach((app, index) => fragment.appendChild(renderCard(app, index)));
    appsGrid.appendChild(fragment);
  } catch (error) {
    loadError.hidden = false;
    loadError.textContent = `Could not load app list. ${error.message}`;
  }
};

init();
