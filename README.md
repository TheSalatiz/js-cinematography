# js-cinematography

Portfolio site for Juan Sebastian, a Las Vegas videographer, editor and photographer.
Live at <https://thesalatiz.github.io/js-cinematography/> (GitHub Pages, served straight from `main`).

## Pages

| Page | What it is |
|---|---|
| `index.html` | Home: hero reel, services, short bio, contact form |
| `about.html` | Full bio |
| `videography.html` | Wedding, corporate and narrative films (YouTube/Vimeo embeds) |
| `photography.html` | Links to the photo galleries |
| `gallery-*.html` | Individual photo galleries; images live in the matching folder (`jt-caesars/`, `affogato/`, …) |
| `contact.html` | The one contact form; every "Check Availability" button links here |

## Contact form

`contact.html` sends enquiries through [Web3Forms](https://web3forms.com) to the inbox tied to the
`access_key` in the form. Spam protection: a hidden `botcheck` checkbox that Web3Forms rejects when
ticked, and submissions made within 3 seconds of the page loading are dropped. The email address is
deliberately not written anywhere in the site, so scrapers can't harvest it.

## Styling

Pages use [Tailwind CSS 2](https://v2.tailwindcss.com/) through a small prebuilt file,
`css/tailwind.css`, which contains only the classes the pages use. Page-specific styles
sit in each page's `<style>` block; the nav button and footer shared by every page are in `css/site.css`.

If you add or change Tailwind classes in any HTML file, rebuild the CSS so the new classes
are included:

```sh
npm install        # first time only
npm run build:css
```

Then commit the updated `css/tailwind.css`.

## Adding photos

Export JPEGs at about 2000px on the long edge and quality 80 before committing. A photo
straight off the camera can be 5–10× larger and slows the galleries down, especially on phones.
