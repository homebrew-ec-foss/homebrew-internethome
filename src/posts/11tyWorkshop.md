---
title: How to get started with a pre-built 11ty theme
date: '2022-09-16'
tags: [11ty ,WebDev]  
description: Workshop on how to make a personal website and blog
permalink: posts/{{ title | slug }}/index.html
author_name: Saksham Alok
---
# eleventy-chirpy-blog-template


[11ty](https://www.11ty.dev/) version of the popular [Chirpy Jekyll](https://github.com/cotes2020/jekyll-theme-chirpy) blog theme. Also powers this blog. 

You can check out the live version on <https://eleventy-chirpy-blog-template.netlify.app>.
<!-- 
If you want to deploy, there's a button for it: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/muenzpraeger/eleventy-chirpy-blog-template) -->

## Local Development

### Before you install dependencies

This repo uses [Volta](https://volta.sh/). Get it, and it'll make your node life so much easier.
Runt his command (for linux and windows user)
```
curl https://get.volta.sh | bash

```

### Instructions

Clone this repository.
Goto to this [template](https://github.com/muenzpraeger/eleventy-chirpy-blog-template) and click on "Use this Template" button.

![copy template](/images/templatebutton.png)

Put a repository name and  Description , then click on "create repository " button.

![copy template](/images/repo.png)

Clone the recently made repository
```
git clone -https link here -
```

Change into the cloned directory.

```
cd -Directory Name-
```
Install node 

```
volta install node
```

Install yarn 

```
volta install yarn
```
Install dependencies. Note, if you prefer `npm` over `yarn` make sure to first remove the `yarn.lock` file, and then run `npm install`.

```
yarn install
```

Start the local development process.

```
yarn dev
```

Open the page, usually on <http://localhost:8080>, and dig around!

## Configuration

All blog configuration is handled via [`siteconfig.js`](./content/_data/siteconfig.js) (content/_data/siteconfig.js). Everything is inline documented.

![Config file](/images/config.png)

In the config file you can can change the name , the picture , links among other things, feel free to tinker and explore from here
 
<!-- ## Features

-   💯 on Lighthouse
-   🔆 and 🌛 mode
-   🎯 SEO and OpenGraph optimized
-   🌄 Responsive images optimization
-   👀 Accessible
-   🛠 JavaScript and CSS build optimization
-   👨‍💻 Prism-based syntax highlighting
-   📚 RSS (yup, still a thing), sitemap.xml, and JSON-LD
-   🔍 [Algolia Search](https://github.com/algolia/algoliasearch-netlify) enabled
-   and more -->

Opinionated setup with [Prettier](https://prettier.io/), [ESlint](https://eslint.org/), [markdownlint](https://github.com/DavidAnson/markdownlint) and others. UX build with [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) and [TailwindCSS](https://tailwindcss.com/docs). JavaScript bundled with [Rollup](https://rollupjs.org/).



## Deployment

All build processes rely on how `NODE_ENV` is set. For production builds, which then also means minified CSS and JS you've to set the value to `production`. I mention this explicitly as this is for some vendors not the default.

If you want to speed up your build times a bit you can add the generated images to your git repo. The `.gitignore` already contains a commented section for that.



## Credits

The UX of this template is based on the popular Chirpy template, just with a different tech stack. If you prefer to run Jekyll and Bootstrap, checkout [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) here. It's great.

Also big thanks to the the authors of the [11ty High Performance Blog](https://github.com/google/eleventy-high-performance-blog).

## Some Extra Resources

- [Readme Generator](https://rahuldkjain.github.io/gh-profile-readme-generator/)
- [Grid generator](https://cssgrid-generator.netlify.app/)