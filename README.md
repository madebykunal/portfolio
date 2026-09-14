# Portfolio

Personal site for Kunal Singh, built with the App Router.

## Stack

| Piece      | Version | Notes                                       |
| ---------- | ------- | ------------------------------------------- |
| Next.js    | 16.3.5  | App Router, Turbopack (default bundler)     |
| React      | 19.3.0  |                                             |
| TypeScript | 7.0.2   | Go-native compiler                          |
| Tailwind   | 4.3.3   | CSS-first, via `@tailwindcss/postcss`       |
| Biome      | 2.5.13  | Lint + format                               |

Every dependency is pinned to an exact version — no `^` ranges — so a clean
install reproduces the build that was tested.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm start          # serve the build
npm run lint       # biome check
npm run format     # biome check --write
npm run typecheck  # tsc --noEmit
```

## PostCSS

Tailwind is wired the way the Next.js 16 docs prescribe — `@tailwindcss/postcss`
in a four-line `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

This replaced an earlier setup that registered `@tailwindcss/webpack` as a
Turbopack `rules` entry in `next.config.ts` to avoid a PostCSS config
altogether. That worked, but it traded four lines of standard config for nine
lines of non-standard config plus a loader whose interaction with Turbopack's
built-in CSS pipeline is not a documented combination. The supported path is
cheaper to keep working across upgrades.

## Configuration

There is no `tailwind.config.js` — Tailwind v4 is CSS-first. Design
tokens live in the `@theme` block in `src/app/globals.css`, which is what generates
the `bg-page`, `text-ink`, `text-muted`, `text-faint`, `text-accent`,
`text-accent-strong`, `max-w-column`, `text-display`, `text-body` and `wide:`
utilities used throughout.

Two type families, both OFL and both self-hosted via `next/font/google`: Figtree
for everything readable, JetBrains Mono for the footer clock alone.

`next/font` writes its CSS variables as `--font-figtree` and
`--font-jetbrains` — deliberately **not** `--font-sans` and `--font-mono`. Those
two are Tailwind's own theme keys, so reusing the name produces a
self-referential `--font-mono: var(--font-mono), …` inside `@layer theme`. It
appears to work, because unlayered font CSS outranks the layer, but the whole
`ui-monospace, SFMono-Regular, Menlo` fallback chain is silently discarded.

Cards carry no border. Depth is three shadow tokens — `--shadow-card` at rest,
`--shadow-lift` on hover, and a lighter `--shadow-shot` that separates the
screenshot from its tint without a hairline.

## Linting

Biome rather than ESLint: `typescript-eslint` does not yet support TypeScript 7
([issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)),
and Biome doesn't use the TypeScript compiler API, so it runs against TS 7
without a side-by-side TS 6 install. Biome is one of the linters
`create-next-app` offers in Next.js 16, now that `next lint` has been removed.

## Layout

The site is a single page. Application code sits under `src/`, leaving the
repository root to configuration alone; `src/app/` holds routes only, and
everything else is imported through the `@/` alias, which maps to `src/`.

```
src/
  app/
    layout.tsx            root layout, Figtree + JetBrains Mono, the centred column
    page.tsx              the whole site
    globals.css           @theme tokens, base layer
    icon.svg              favicon
  components/
    project-card.tsx      one work card — shot, mark, name, summary
    clock.tsx             IST clock
    copy-mail.tsx         "mail me" button + copy-to-clipboard (Phosphor icons)
  content/
    profile.ts            address and outbound links
    projects.ts           the Project type and the two cards' data
  assets/
    calxbook-logo.png     favicon from calxbook.com
    calxmap-logo.png      calxmap.com logo, cropped to the circular mark
    calxbook-shot.jpg     card thumbnail, 1160×693
    calxmap-shot.jpg      card thumbnail, 1160×693
  lib/
    security-headers.ts   the header list next.config.ts serves
public/
  kunal-singh-resume.pdf  linked from Contact — not checked in yet
```

`content/` exists so `page.tsx` reads as layout rather than as layout mixed with
data. It is split in two because `profile.ts` is the only half a Client
Component needs — `copy-mail.tsx` imports the address from it, and keeping the
image imports in `projects.ts` keeps them out of that import graph.

The four images moved out of `public/` and into `src/assets/`. `public/` serves
files verbatim at a stable URL, which is what the résumé needs; these four are
imported, so Next fingerprints them, reads their intrinsic size at build time
and re-encodes them per request. Sitting in `public/` they were also reachable
at a second, unoptimised URL.

One centred 620px column, no section labels and no left gutter — the name and
designation sit directly above the content, everything flush to the same left
edge. The column width *is* the measure, so prose needs no separate cap.

The contact line ends in a "mail me" button rather than repeating the address:
brand colour on a tinted ground, no underline, `mailto:` on click, with a
separate copy-to-clipboard button beside it — two targets for two intentions.
The sentence ends in a question mark on purpose, so when the button wraps to its
own line on narrow screens it still reads as a complete sentence.

Both card thumbnails share a 5:3 crop and sit inset on a tinted panel, flush to
its bottom edge so the page reads as continuing past the crop. Each tint is
derived from that product's own mark — Calxbook's is orange-red (`#f03000`),
Calxmap's magenta-violet (`#c030a8`) — lightened to roughly equal perceived
lightness, so the two panels separate by hue rather than by weight.

A card hover lifts it 2px on a `--shadow-lift` shadow and turns the arrow to the
accent — one movement, on the element being pointed at. Nothing dims the sibling
card and nothing desaturates.

A card is just the shot, the mark, the name and a one-line summary. `h-full` on
the anchor keeps the pair the same height when one summary wraps and the other
doesn't.

## Images

The Calxbook thumbnail is the Largest Contentful Paint element, so its card is
rendered with `eager`, which sets `loading="eager"` and `fetchPriority="high"`.
The default is `loading="lazy"`, which defers the LCP element behind the
viewport calculation and is what Next.js warns about in development. `priority`
is *not* used: it was deprecated in Next.js 16 in favour of `preload`, and the
docs point to `loading`/`fetchPriority` ahead of `preload` in exactly this case.

Both thumbnails are 1160×693 JPEGs. The Calxmap one was a 2880×1720 PNG at
861KB — a 2× screen capture, carrying an alpha channel that was fully opaque on
every pixel. Neither the resolution nor the alpha was reachable: the card paints
at 240px wide in two columns and at most ~322px on a phone, so ~1000px covers a
3× display, and a JPEG on an opaque image loses nothing. Re-encoded at quality
90 with `4:4:4` chroma it is 84KB, a 90% cut. Subsampling stays off because the
image is a UI screenshot, where `4:2:0` fringes coloured text; the 16KB that
costs is worth it in a source asset.

`sizes` is `(min-width: 640px) 240px, calc(100vw - 6.75rem)`. The breakpoint has
to be 640px because that is `--breakpoint-wide`, where the grid becomes two
columns and a card halves in width. It previously read `(max-width: 719px)`, so
between 640px and 719px the browser was told the card was full-bleed while it
was actually about 226px, and it fetched the 640w candidate for a quarter of the
pixels.

## Selection and cursor

`::selection` is the accent at 20% alpha with the text left at `--color-ink`,
rather than a solid accent fill with reversed-out text. A solid `#33507a` behind
a whole selected paragraph is a lot of dark blue on a page this light, and it
forces every selected glyph to change colour. The wash reads as brand without
restyling the type, and it matches what the OS already does — macOS selection is
a light tint, not an inversion. 20% lands the selected ground at roughly
`#d2d8e0`, clearly separated from the `#fafaf9` page while keeping ink on it at
about 13:1.

The cursor is a Valorant-style crosshair: four 2×5px ticks around a 4px centre
gap, on a 24px canvas with the hotspot at `12 12`. Links and buttons get the
same crosshair with a centre dot added — the gap closing on a target is
Valorant's own idiom for "on it", so the interactive state is a variant of the
cursor rather than an unrelated second icon.

Valorant's form, this site's colour: the crosshair is `--color-accent`, not
Valorant's green, which would be the only saturated thing on the page. Each tick
carries a 1px `--color-page` halo via `paint-order: stroke`, so the fill stays a
full 2px and the halo sits behind it. The halo is invisible against the page and
only does work over the dark regions of the card screenshots, where an unhaloed
accent-blue crosshair disappears.

Both crosshairs are inline `data:` SVGs held in custom properties at the top of
the base layer. Inline rather than files in `public/` so there is no request and
no flash of the fallback cursor before the image arrives; `img-src` in the CSP
already allows `data:`. The trade-off is that `#33507a` and `#fafaf9` are
hardcoded in the two URIs — a data URI is an opaque string, so `var()` cannot
reach inside it. **Changing `--color-accent` or `--color-page` means changing
them in the cursors too.**

Every `cursor` declaration ends in a real keyword — `crosshair` and `pointer` —
so a browser that refuses the SVG still gets sensible behaviour. Note that this
replaces the I-beam over prose: text is still selectable, but the cursor no
longer advertises it. `body { cursor: text }` on the prose column would put it
back if that trade reads wrong in use.

## Security

Response headers are set for every path from `src/lib/security-headers.ts`:
a Content Security Policy, `Strict-Transport-Security`,
`Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options:
nosniff` and a `Permissions-Policy` that denies camera, microphone, geolocation
and Topics. `poweredByHeader: false` drops `X-Powered-By`. Outbound links carry
`rel="noopener noreferrer"`, so the destination is not handed the referring URL.

The CSP is dev-aware — `'unsafe-eval'` and `ws:` are added under `next dev`,
where React evaluates code to reconstruct server stack traces and HMR needs a
socket, and `upgrade-insecure-requests` is omitted so localhost still works.

`script-src` has to include `'unsafe-inline'`. A statically prerendered page
carries React's hydration payload in inline `<script>` tags, and the nonce that
would replace it can only be generated per request, which means opting the page
into dynamic rendering. Trading static generation for a stricter CSP is a bad
deal for a page with no user input, no forms and no third-party scripts beyond
Vercel Analytics. The policy still does the useful part: it confines scripts,
styles, images, fonts and connections to this origin, blocks framing, and blocks
`<object>` and `<base>` outright.

What the CSP cannot do is hide the page. Everything this site renders — the
markup, the stylesheet, the email address, the résumé URL — is public by
construction and readable in DevTools. There is nothing else to leak: the site
has no API, no database, no authentication, and no environment variables reach
the client. Production builds ship no source maps (Next.js omits them unless
`productionBrowserSourceMaps` is set), so the bundle is minified and the
original TypeScript is not reconstructable from it.

## Notes

The source carries no comments by request. Two things that would otherwise be
worth a comment:

- `src/app/icon.svg` is parsed as XML, so its markup must be well formed. In
  particular an XML comment may never contain a double hyphen — one there
  silently breaks the whole favicon.
- Tailwind v4 scans raw source text for class candidates, so any class name
  written inside a comment still ships as real CSS. Removing this project's
  comments dropped three dead rules from the stylesheet.

`Clock` re-renders on a timer aligned to the next minute boundary rather than
every second, since it only ever displays hours and minutes. It renders a
`--:-- --` placeholder until its effect runs, so the server and client markup
agree and the timer never starts on the server.

Both Client Components own a timer and both clear it — `Clock` in its effect
cleanup, `CopyMail` from a ref — so neither survives unmount.

`CopyMail` used to fall back to `document.execCommand('copy')` behind a hidden
`<textarea>` when the async Clipboard API was unavailable. That path is gone:
`execCommand` is deprecated, the Clipboard API is available in every browser
this site targets, and `localhost` counts as a secure context, so the fallback
was only reachable on a plain-HTTP deployment. A failed copy still reports the
address through the live region rather than failing silently.

Phosphor icons are imported from `@phosphor-icons/react/ssr` in both components,
including the Client Component. The default entry point carries a context
provider for inherited icon styling that this site never uses; the `/ssr` entry
is a plain `forwardRef` around an `<svg>`, with no hooks and no context, so it
costs nothing on the client.

`AGENTS.md` and `CLAUDE.md` are generated by `next dev` and are safe to commit.
