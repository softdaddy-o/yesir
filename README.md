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

## Verify

```powershell
npm test
```
