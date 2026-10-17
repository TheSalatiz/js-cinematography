# js-cinematography

One-page site for Juan Sebastian: short-form video for independent med spas in Las Vegas.
Live at <https://thesalatiz.github.io/js-cinematography/> (GitHub Pages, served straight from `main`).

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site: styles and script are inside the page, no build step |
| `img/` | The affogato pour frames and the portrait, as WebP (each under 40 KB) |
| `og.jpg` | The 1200×630 image people see when the link is shared in a text, DM or email |
| `favicon.png`, `apple-touch-icon.png` | Browser and phone icons |
| `404.html` | Shown for any old or mistyped address, with a link home |
| `about.html`, `contact.html`, `videography.html`, `photography.html` | Redirects from the old pages to the matching part of the homepage |
| `robots.txt`, `sitemap.xml` | Tell search engines about the one page. Submit the sitemap in Google Search Console; `robots.txt` only takes effect once the site is on its own domain |

## Editing

- **Words:** edit them in `index.html`. Keep lines short and plain; the page is read on phones between patients.
- **Fonts:** Fraunces for headlines, Hanken Grotesk for everything else, both from Google Fonts. Keep it to these two.
- **Colors:** set once at the top of the `<style>` block (porcelain, pine, one emerald accent). Every text color passes 4.5:1 contrast; check any new one before using it.
- **Motion:** the only animation is the 12 posts filling in on the calendar, once, and never for visitors with "reduce motion" on. Keep it that way.
- **Photos and video:** only work you shot for your own clients or your own projects, with a signed release from anyone on camera. Patient content needs the patient's written authorization. Export stills at about 1200px wide as WebP, quality 75–80.
- **After the first test spa:** replace the four pour frames with three vertical clips or stills from the spa, and add the day-30 numbers as a short case study.

## Contact form

The form sends requests through [Web3Forms](https://web3forms.com) to the inbox tied to the `access_key` in the form.
Spam protection: a hidden `botcheck` checkbox that Web3Forms rejects when ticked, and submissions made within
3 seconds of the page loading are dropped. The email address is not written anywhere on the site, so scrapers can't harvest it.

## If you move to a custom domain

Add the domain in Settings → Pages, then update the canonical link, `og:url`, `og:image` and the JSON-LD `url` and `image`
in `index.html`, plus `robots.txt` and `sitemap.xml`, and the links in `404.html`, to the new address.
