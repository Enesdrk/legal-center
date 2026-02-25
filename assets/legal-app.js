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

  const nav = document.createElement("div");
  nav.className = "utility-nav";
  nav.innerHTML = `
    <a href="${legalCenterHref}" class="utility-link">Legal Center</a>
    <a href="${appHubHref}" class="utility-link">App Hub</a>
    <button type="button" class="utility-link utility-btn" id="go-back">Back</button>
  `;

  document.body.prepend(nav);

  // Simplify repeated navigation/actions across app pages.
  const topNav = document.querySelector(".top-nav");
  if (topNav) {
    const redundantLinks = topNav.querySelectorAll(
      'a[href="index.html"], a[href="../../index.html"]'
    );
    redundantLinks.forEach((link) => link.remove());
  }

  const backRows = document.querySelectorAll(".btn-row");
  backRows.forEach((row) => {
    if (row.textContent && row.textContent.includes("Back to App Legal Hub")) {
      row.remove();
    }
  });

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

  if (!topNav) {
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

  topNav.insertAdjacentElement("afterend", strip);
})();
