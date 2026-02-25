(function () {
  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean);
  const appsIndex = segments.indexOf("apps");

  if (appsIndex === -1 || !segments[appsIndex + 1]) {
    return;
  }

  const baseSegments = segments.slice(0, appsIndex);
  const appSlug = segments[appsIndex + 1];

  const legalCenterHref = `/${baseSegments.join("/")}/`.replace("//", "/");
  const appHubHref = `/${[...baseSegments, "apps", appSlug, "index.html"].join("/")}`;

  const nav = document.createElement("div");
  nav.className = "utility-nav";
  nav.innerHTML = `
    <a href="${legalCenterHref}" class="utility-link">Legal Center</a>
    <a href="${appHubHref}" class="utility-link">App Hub</a>
    <button type="button" class="utility-link utility-btn" id="go-back">Back</button>
  `;

  document.body.prepend(nav);

  const backBtn = document.getElementById("go-back");
  if (!backBtn) return;

  backBtn.addEventListener("click", function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = legalCenterHref;
    }
  });
})();
