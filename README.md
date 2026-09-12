# Kevin Kiprotich — Personal Website

The source for [kevinkipro.com](https://kevinkipro.com), Kevin Kiprotich's
personal website. It is intentionally minimal and built with Astro.

## Run locally

Install dependencies, then start Astro's development server:

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with
`npm run preview`.

## Writing

Essays live in `src/content/writing` as Markdown files. Each essay uses this
frontmatter:

```yaml
---
title: Essay title
description: A short summary.
published: 2026-08-29
draft: false
---
```

Published essays appear automatically at `/writing/` and in `/rss.xml`.

## Now bookshelf

The homepage is the Now page, revealed by the name intro on a first visit.
The old `/now/` address redirects to `/`, and both the site name and Now
navigation link lead home. Background and contact details live on About.

Books live in `src/data/now.ts`. The centered shelf has “Reading now” and
“Finished” tabs based on each book’s status, opening on Finished when available.
Switching tabs preserves each shelf’s selected book. Add a local cover image
and a book entry to extend the collection.

Each book uses a CSS 3D model with a front cover, printed spine, back board,
and inset paper edges. Optional `binding` colors and thickness in `now.ts`
control its appearance; thickness is relative to the displayed cover height.
The reflection mirrors the complete model and follows the same movement,
with its fade applied outside the 3D scene to preserve the book's depth.

The shelf sits directly on the page with soft reflections. It supports cover
selection, drag/swipe, horizontal trackpad scrolling, tappable position dots,
and Left/Right or Home/End keys. Each dot has a 44px target and a book-title
label, so every book is reachable without dragging. Tabs also support arrow
keys and Home/End. A one-book shelf has no paging controls or drag interaction.
It respects reduced motion and shows both labeled book groups without JavaScript.

## Publishing

GitHub Actions builds the site and publishes the `dist` directory to GitHub
Pages whenever `main` is updated. The custom domain is defined in
`public/CNAME`.

## Copyright

Copyright © 2026 Kevin Kiprotich. All rights reserved. This project is not
open-source and no permission is granted to copy, reproduce, adapt,
redistribute, or use it as a website template. See [COPYRIGHT.md](COPYRIGHT.md)
for details.
