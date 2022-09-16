---
title: Basic 11ty Tutorial
date: '2022-09-16'
tags: [11ty ,WebDev]  
description: Workshop on 11ty
permalink: posts/{{ title | slug }}/index.html
author_name: Saksham Alok
---


# Begin the project
 1. install NPM
 2. initialising 
 ```
 npm init -y
 ```
 ```
 npm install @11ty/eleventy
 ```

3. open package.json and update scripts section to 

``` 
"scripts": {
    "start": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy"
  },
```
This enables a start command to run 11ty with hot-reload, which is provided by Browsersync that comes bundled as part of 11ty's --serve directive.
 
 
# Add Eleventy Config
 1. Create .eleventy.js at the root
 2. add 
```javascript
    module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "public",
         },
         };
    };
```
The first change here is setting the input directory to src - as in, the directory 11ty will watch for changes and use to build for production. Then, we change the output directory to public which means that's where our production-ready files for use by localhost and a hosting server will be published.

# Run the develop Server
 1. npm start
 2. error message as no index file
 3. Create index file

    a. create src/

    b. create src/index.md

# Create the base layout
 1. create _includes/base.njk inside src.
 3. use the double-curly format to access the title Frontmatter variable, like so: {-{ title }} and in order to allow rendering of any HTML tags from the page content, we also use the built-in filter called safe which is added after placing a pipe - | - character.
 2. 

```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {-{ title }} </title>
    </head>
    <body>
    <header>
        {-{ title }}
    </header>
    <main>
        {-{ content | safe }}
    </main>
    </body>
    </html>
```
* Ignore Hyphens(-).
3. Manually refresh and let Browsersync do the rest.




