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

## Publishing

GitHub Actions builds the site and publishes the `dist` directory to GitHub
Pages whenever `main` is updated. The custom domain is defined in
`public/CNAME`.
