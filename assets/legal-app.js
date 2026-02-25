(function () {
  const storeLinksByApp = {
    "csecret-nades": {
      ios: "https://apps.apple.com/tr/app/csecret-nades/id6743453770",
      android: "https://play.google.com/store/apps/details?id=com.enesdirik.csecretnades",
    },
    "orbital-sort": {
      ios: "https://apps.apple.com/tr/app/orbital-sort/id6757707777",
    },
    "linkstate": {
      ios: "https://apps.apple.com/tr/app/linkstate-sort-game/id6757500175",
    },
    "orbital-momentum": {
      ios: "https://apps.apple.com/tr/app/orbital-momentum-sort-game/id6757447235",
    },
  };

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
  const pageName = segments[segments.length - 1] || "";
  const isAppHubPage = pageName === "index.html" || pageName === appSlug;

  const nav = document.createElement("div");
  nav.className = "utility-nav";
  nav.innerHTML = `<a href="${legalCenterHref}" class="utility-link">Legal Center</a>`;
  if (!isAppHubPage) {
    nav.innerHTML += `<a href="${appHubHref}" class="utility-link">App Hub</a>`;
  }
  nav.innerHTML += `<button type="button" class="utility-link utility-btn" id="go-back">Back</button>`;

  document.body.prepend(nav);

  // Simplify repeated navigation/actions across app pages.
  const topNav = document.querySelector(".top-nav");
  if (topNav) {
    topNav.remove();
  }

  const backRows = document.querySelectorAll(".btn-row");
  backRows.forEach((row) => {
    if (row.textContent && row.textContent.includes("Back to App Legal Hub")) {
      row.remove();
    }
  });

  const card = document.querySelector(".card");
  if (card && !isAppHubPage) {
    const switcher = document.createElement("div");
    switcher.className = "page-switch";
    switcher.innerHTML = `
      <a href="privacy.html" class="${pageName === "privacy.html" ? "active" : ""}">Privacy</a>
      <a href="terms.html" class="${pageName === "terms.html" ? "active" : ""}">Terms</a>
    `;
    card.prepend(switcher);
  }

  if (isAppHubPage) {
    const hubRow = document.querySelector(".btn-row");
    if (hubRow) {
      const links = Array.from(hubRow.querySelectorAll("a")).filter((a) =>
        /privacy\.html|terms\.html/.test(a.getAttribute("href") || "")
      );
      hubRow.innerHTML = "";
      hubRow.classList.add("compact-links");
      links.forEach((link) => {
        link.className = "compact-link";
        hubRow.appendChild(link);
      });
    }
  }

  const backBtn = document.getElementById("go-back");
  if (!backBtn) return;

  backBtn.addEventListener("click", function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = legalCenterHref;
    }
  });

  const store = storeLinksByApp[appSlug];
  if (!store || (!store.ios && !store.android)) {
    return;
  }

  const strip = document.createElement("div");
  strip.className = "store-strip";

  const label = document.createElement("span");
  label.className = "store-strip-label";
  label.textContent = "Download";
  strip.appendChild(label);

  if (store.ios) {
    const ios = document.createElement("a");
    ios.href = store.ios;
    ios.target = "_blank";
    ios.rel = "noopener noreferrer";
    ios.className = "store-pill";
    ios.textContent = "App Store";
    strip.appendChild(ios);
  }

  if (store.android) {
    const android = document.createElement("a");
    android.href = store.android;
    android.target = "_blank";
    android.rel = "noopener noreferrer";
    android.className = "store-pill";
    android.textContent = "Google Play";
    strip.appendChild(android);
  }

  const header = document.querySelector("header");
  if (header) {
    header.insertAdjacentElement("afterend", strip);
  }
})();
