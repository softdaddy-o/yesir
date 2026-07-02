# yesir.softdaddy-o.com

Static GitHub Pages site for `yesir.softdaddy-o.com`.

## Pages

- `/` - index page
- `/threads/doha-poor-fish/` - archived view of the Threads post by `@doha_txt`

## Thread Template

Thread archive pages are generated from `data/threads/*.json` through `src/thread-template.mjs`.

```powershell
npm run build
```

Each thread JSON needs a `slug`, `author`, `main`, `replies`, `stats`, and `capture` object. Replies keep `originalIndex`, so the page can default to like-count order while the floating toggle restores original thread order.

### Archive Rendering Rules

- Do not expose collection tooling or automation details on public archive pages. Avoid labels such as Playwright, scraper, login session, GraphQL, or daily scrape in rendered archive copy.
- Preserve every media item from a Threads post or reply. For carousel posts, store all items in `media[]`; keep legacy `image`/`video` only as fallback fields.
- Render multi-item media as a horizontal, scroll-snapping strip that can be swiped left and right.
- Render videos inline with `muted`, `playsinline`, and `loop`; start playback when the video scrolls into view and pause it when it leaves the viewport.

## Verify

```powershell
npm test
```
