# Legal Center

Centralized legal pages for all apps.

## Live Interface

- Legal Center UI: https://enesdrk.github.io/legal-center/

## Structure

- `index.html`: app directory landing page
- `apps/apps.json`: app list used by the home page
- `apps/<app>/index.html`: app legal home (copied from legacy repo)
- `apps/<app>/privacy.html`: privacy policy
- `apps/<app>/terms.html`: terms of service

## Add a New App

1. Create `apps/<new-app>/`.
2. Add `index.html`, `privacy.html`, `terms.html` (and optional local `style.css`, icon).
3. Add the app object to `apps/apps.json` with `icon` and `paths`.

## Migration Note

Content for the following apps was copied from legacy standalone legal repositories:

- Orbital Sort
- LinkState
- Orbital Momentum
- Chibi Survivors

Legacy repos are intentionally untouched.
