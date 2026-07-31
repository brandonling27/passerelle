# Passerelle Consulting — website

Static single-page site for Passerelle Consulting.

## Deploying with GitHub Pages

1. Create a new **public** GitHub repo (e.g. `passerelle-site`) and push everything in this folder to it (`index.html`, `CNAME`, this `README.md`).
2. In the repo: **Settings → Pages**
   - Source: "Deploy from a branch"
   - Branch: `main`, folder `/root`
   - Save
3. Under "Custom domain," confirm it shows `passerelleconsulting.com` (this comes from the `CNAME` file already in the repo — you shouldn't need to retype it, but check it saved correctly).
4. In Squarespace (Domains → passerelleconsulting.com → DNS Settings), add:
   - Four A records for the apex domain pointing to:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   - One CNAME record for `www` pointing to `<your-github-username>.github.io`
5. Wait for DNS to propagate (minutes to ~24h), then in GitHub Pages settings check "Enforce HTTPS."

## Editing the site

Everything — copy, styling, the diagram — lives in the single `index.html` file. No build step, no dependencies. Open it directly in a browser to preview changes locally before pushing.

## Languages (FR / EN)

The site ships in **French by default**, with an EN toggle in the header. The
visitor's choice is remembered in `localStorage` under `passerelle-lang`.

- **French copy lives in the HTML itself.** Edit the markup directly; the script
  captures it on page load, so there is no second French dictionary to keep in sync.
- **English copy lives in the `en = {…}` object** in the `<script>` at the bottom
  of `index.html`, keyed by the `data-i18n` attribute on each element.

To add new translatable text: give the element a `data-i18n="some.key"` attribute
(use `data-i18n-html` if the text contains markup like `<em>`, or `data-i18n-label`
for an `aria-label`), write the French inline, and add the matching English string
to the `en` object. Anything without a key stays identical in both languages.

Note: the labels inside the SVG diagram don't wrap — keep them under ~150px wide
(roughly 20 characters at the current font size) so they stay inside their boxes.
