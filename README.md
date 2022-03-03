# Homebrew PESUECC website

This repository contains Homebrew's website. For the staff members to contribute to this repo, please follow the given instructions below to clone 
this repo and setup the preview.

## Getting Started

- Clone this repository with `git clone https://github.com/homebrew-ec-foss/homebrew-internethome.git`,

- Navigate to the newly created repository on your machine.

- Install dependencies with `yarn install`

- Serve the site locally with `yarn dev`

- Use `yarn build` to build a production version of the site.

- You can now access the website locally by going to `http://localhost:8080` on your browser.

Note: Requires nodejs to be installed.

## Manually Edit contents

### Homepage

Edit the homepage content at `src/index.md`.

Sample frontmatter for homepage.

```
---
layout: home
title: 'Eleventy Duo'
---

Contents
```

### About page

Edit the about page content at `src/about.md`.

Sample frontmatter for about page.

```
---
title: About Aidan Charles Powell
layout: about.njk
name: Aidan Charles Powell
image: '/images/me.jpeg'
---

Contents
```

### Blog posts

Blog contents is at `src/posts`. Delete placeholder blog posts. Do not delete the `posts.json` file. Create blog posts in markdown format.

Sample frontmatter for blog posts.

```
---
title: Even yet another post with rich media
date: '2020-12-24'
tags: [demo-content, media]
decription: The last person we talked to said this would be ready action item, and what do you feel you would bring to the table if you were hired for this position bells and whistles. #optional
---

Contents
```

### Generic pages

You can create generic pages in markdown format that use a base layout.

Sample frontmatter for generic pages.

```
---
layout: base
permalink: /generic-page
title: Generic page
---

Contents
```

*The template used is [Eleventy Duo by Yinka Adadire](https://github.com/yinkakun/eleventy-duo/)*