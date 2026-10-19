# js-cinematography

Portfolio of Juan Sebastian Salazar, cinematographer and photographer in Las Vegas, plus a separate page for med spa owners.
Live at <https://thesalatiz.github.io/js-cinematography/> (GitHub Pages, served straight from `main`, no build step to publish).

## Pages

| Page | What it is |
|---|---|
| `index.html` | Home ("Loud room. Quiet eye."): self-contained page with its own styles and script |
| `about.html` | Bio, kit and languages |
| `videography.html` | Short films, the Health Services spot and a wedding film (YouTube and Vimeo embeds) |
| `photography.html` | Links to the three photo series |
| `gallery-commercial.html`, `gallery-grad.html`, `gallery-recital.html` | The series. Each photo opens in a full-screen viewer (`js/viewer.js`) |
| `contact.html` | The contact form |
| `med-spas/index.html` | The page for med spa owners: the free 30-day test, prices, the promo video and the application form. Not linked from the portfolio menu; share `/med-spas/` directly |
| `404.html` | Shown for any missing address. Any address with "spa" in it goes to the med spa page |
| `robots.txt`, `sitemap.xml` | For search engines. Submit the sitemap in Google Search Console; `robots.txt` only takes effect on a custom domain |

## What can go on the site

Only your own work, or your own clients' work, with a release from anyone on camera. **Nothing shot on a job for an employer**,
and no venue names. Spa patient content needs the patient's written authorization.

## Homepage

`index.html` doesn't use Tailwind or `css/site.css`; its styles and script live inside the page.

- **Photos only, no stills from films:** web-sized WebP copies in `images/home/`: hero frames (`hero-1`, `hero-violin`,
  `hero-portrait`, `hero-walk`), story cards (`s-*`), light-table frames (`t01` to `t12`) and service previews (`v-*`).
  To swap one, export it about 1800px wide for hero frames or 640px for light-table frames and keep the name.
- **Films in the work strip** are drawn as slates (`.story.film`), not stills. Each links to its film on `videography.html`.
- **Smooth scrolling** uses [Lenis](https://github.com/darkroomengineering/lenis) (MIT), stored in `js/lenis.min.js`.
- **Fonts** come from Google Fonts: Bodoni Moda and Jost everywhere, plus IBM Plex Mono and Nanum Pen Script on the homepage.
- Motion turns off for visitors who have "reduce motion" on, and the slideshow can be paused.

## Med spa page

- Styles and script live inside `med-spas/index.html`. Its own palette (pine and emerald) and type (Fraunces for
  headlines, Hanken Grotesk for text), set at 18px with short sentences so owners can scan it on a phone.
- The promo in the phone is `media/spa-promo.mp4` (a `.webm` copy is the fallback) with `spa-promo.webp` as its still.
  Keep each video here under about 2 MB: GitHub refuses files over 100 MB, warns over 50 MB, and big files slow the page.
- After the first test spa, add three of its vertical clips and the day-30 numbers as a case study.

## Contact forms

Both forms send through [Web3Forms](https://web3forms.com) to the inbox tied to the `access_key` in the form. Spam protection:
a hidden `botcheck` box, and anything sent within 3 seconds of the page loading is dropped. The email address is deliberately
not written anywhere on the site, so scrapers can't harvest it.

## Styling

The inner pages use [Tailwind CSS 2](https://v2.tailwindcss.com/) through a small prebuilt file, `css/tailwind.css`, which
contains only the classes the pages use. Page styles sit in each page's `<style>` block; the nav button, footer, phone menu
and photo viewer shared by the inner pages are in `css/site.css`.

If you add or change Tailwind classes in any HTML file, rebuild the CSS so the new classes are included:

```sh
npm install        # first time only
npm run build:css
```

Then commit the updated `css/tailwind.css`.

## Adding photos

Export WebP at about 2000px on the long edge and quality 80 before committing. A photo straight off the camera can be
5 to 10 times larger and slows the galleries down, especially on phones. Then add it to the gallery page inside
`<a class="gallery-link" href="photo.webp">` so the viewer picks it up.

## If you move to a custom domain

Add the domain in Settings, Pages, then update the canonical links, `og:url` and `og:image` addresses in every page,
plus `robots.txt`, `sitemap.xml` and the full paths in `404.html`.
