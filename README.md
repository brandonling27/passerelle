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

## Structure

Five static pages sharing one stylesheet and one script. No build step, no
dependencies — open any page directly in a browser to preview it.

```
index.html        Landing page: the pitch, the problem in plain terms,
                  the diagram, and links into the four sub-pages
services.html     What we do — six services + what we don't do
approche.html     How it works — four stages, vs. an agency, FAQ
a-propos.html     About — background and why it matters to the client
contact.html      Contact — email, what to expect, nothing to prepare
assets/styles.css All styling for every page
assets/i18n.js    Language toggle + the French dictionary
```

The two sub-page filenames are French (`approche.html`, `a-propos.html`) because
the site was originally French-first. They're kept as-is so existing links don't
break; rename them if you'd rather the URLs match the default language.

Because there is no templating, the header and footer markup is repeated in each
page. If you change a nav link, change it in all five (and in the footer nav).
Each page marks its own nav item with `aria-current="page"`, and sets
`<body data-title-key="…">` so the script can translate the page title.

## Tone

The site is written for **non-technical decision-makers** — marketing directors,
founders, comms leads — not for ad-tech engineers. When editing:

- Lead with what the client experiences, not what the system does.
- Industry terms (DSP, SSP, CMP, header bidding) don't appear in headings or body
  copy. On `services.html` they are parked in the small "on dit aussi / also
  called" line under each service, so a reader can match our plain description to
  the words their current provider uses.
- Prefer concrete outcomes ("you pay without seeing where the money goes") over
  capability lists ("bidstream architecture review").

## Languages (EN / FR)

The site ships in **English by default**, with a FR toggle in the header. The
visitor's choice is remembered in `localStorage` under `passerelle-lang` and
persists as they move between pages.

- **English copy lives in the HTML itself.** Edit the markup directly; the script
  captures it on page load, so there is no second English dictionary to keep in sync.
- **French copy lives in the `fr = {…}` object** in `assets/i18n.js`, keyed by
  the `data-i18n` attribute on each element. One dictionary serves all five pages;
  keys that aren't on a given page are simply unused.

Because English is what the server sends, it is also what search engines and
anyone with JavaScript disabled get. Switching the default the other way means
swapping the two halves — English into `assets/i18n.js`, French into the markup,
and `DEFAULT_LANG` at the top of that file — not just flipping a flag.

Supported attributes:

| Attribute | Translates |
|---|---|
| `data-i18n` | the element's text |
| `data-i18n-html` | the element's inner HTML (copy containing `<em>`, `<br>`) |
| `data-i18n-label` | the `aria-label` attribute |
| `data-i18n-content` | the `content` attribute (meta description) |
| `data-title-key` on `<body>` | that page's `<title>` |

To add translatable text: give the element a `data-i18n="some.key"` attribute,
write the English inline, and add the matching French string to the `fr` object.
Anything without a key stays identical in both languages.

Two things worth checking after a copy edit:

1. **Every key needs a French string.** A key missing from `fr` silently leaves
   English text on the French site.
2. **SVG diagram labels don't wrap.** Keep them under ~150px (roughly 20
   characters at the current size) in *both* languages, or they spill out of their
   boxes. Everything else on the page reflows fine down to 320px.
