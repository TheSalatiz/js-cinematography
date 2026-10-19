# js-cinematography

Portfolio of Juan Sebastian Salazar, cinematographer and photographer in Las Vegas, plus a separate page for med spa owners.
Live at <https://thesalatiz.github.io/js-cinematography/> (GitHub Pages, served straight from `main`, no build step).

## Pages

| Address | What it is |
|---|---|
| `/` (`index.html`) | The portfolio for employers: hero clips, films, photographs, kit, about and a contact form |
| `gallery-commercial.html`, `gallery-grad.html`, `gallery-recital.html` | The three photo series, each with a full-screen viewer |
| `/med-spas/` (`med-spas/index.html`) | The page for med spa owners: the free 30-day test, prices, the promo video and the application form. Not linked from the portfolio menu; share it directly |
| `404.html` | Shown for any old or mistyped address, with links home and to the spa page |
| `about.html`, `contact.html`, `videography.html`, `photography.html` | Redirects from the old pages to the matching part of the homepage |
| `robots.txt`, `sitemap.xml` | For search engines. Submit the sitemap in Google Search Console; `robots.txt` only takes effect on a custom domain |

## Files

| Folder | What's in it |
|---|---|
| `assets/` | `portfolio.css` and `portfolio.js`, shared by the portfolio and series pages. The spa page keeps its styles and script inside itself |
| `img/work/` | Photo series as WebP: a 1600px version for the viewer and an 800px version (`-sm`) for grids |
| `img/films/` | Stills from the films, 1280px and 640px |
| `media/` | Short muted videos: the homepage clips (`hero-wide` for screens, `hero-tall` for phones) and the spa promo, each with a still poster |
| `og.jpg`, `med-spas/og.jpg` | The images people see when a link is shared |

Films play from YouTube and Vimeo, so their files never sit in this repository. Keep every video here under about 2 MB:
GitHub refuses files over 100 MB and warns over 50 MB, and big files slow the site down.

## Editing

- **Words:** edit them in the HTML. Keep sentences short and plain.
- **Fonts:** Fraunces for headlines and Hanken Grotesk for everything else. The portfolio uses Fraunces with sharp corners, the spa page the soft version.
- **Colors:** portfolio colors are at the top of `assets/portfolio.css`, spa colors at the top of `med-spas/index.html`. Check 4.5:1 contrast for any new text color.
- **Motion:** the homepage clips and the spa promo play muted with a pause button, and wait for a press when a visitor has "reduce motion" on. The spa calendar fills in once.
- **Photos and video:** only your own work or your own clients', with a release from anyone on camera. Nothing shot on a job for an employer. Spa patient content needs the patient's written authorization.
- **Adding a photo:** export a 1600px WebP at quality about 80 and an 800px copy named `-sm`, then add a link in the series page.
- **After the first test spa:** add three of its vertical clips and the day-30 numbers to the spa page as a case study.

## Contact forms

Both forms send through [Web3Forms](https://web3forms.com) to the inbox tied to the `access_key`. The portfolio form's subject
starts with "Portfolio message", the spa form's with "Test spot request". Spam protection: a hidden `botcheck` box, and anything
sent within 3 seconds of the page loading is dropped. No email address is written on the site.

## If you move to a custom domain

Add the domain in Settings → Pages, then update the canonical links, `og:url`, `og:image` and JSON-LD addresses in
`index.html`, the series pages and `med-spas/index.html`, plus `robots.txt`, `sitemap.xml` and the links in `404.html`.
