# Webpack Static Site Generator

[![Build Status](https://travis-ci.org/esalter-va/webpack-static-site-generator.svg?branch=master)](https://travis-ci.org/esalter-va/webpack-static-site-generator)
[![npm version](https://badge.fury.io/js/webpack-static-site-generator.svg)](https://badge.fury.io/js/webpack-static-site-generator)

A Webpack plugin to generate a static site based on a set of routes.
This was written to work with a project generated by the Vue.js CLI,
since I wasn't having any luck with other static site generators.

## Installation

`npm i --save-dev webpack-static-site-generator`

OR

`yarn add webpack-static-site-generator -D`

## Usage

In `webpack.conf.js`:

```js
var StaticSiteGenerator = require('webpack-static-site-generator')

// Add the plugin to the plugin array
plugins: [
    new StaticSiteGenerator(
        // path to the output dir
        path.join(__dirname, './dist'), 
        // array of routes to generate
        [ '/'. '/about', '/blog', '/blog/blog-post-1' ],
        // [OPTIONAL] element (in querySelector style) to wait for before rendering.
        // defaults to 'body'
        '.main-container'
    )
]
```

The output will look something like this:

```
.
├── index.html
├── about
│   └── index.html
└── blog
    ├── blog-post-1
    │   └── index.html
    └── index.html
```

## How it works

After Webpack generates the assets for your site, this plugin does the following:

1. Serves the specified output directory using [express](https://github.com/expressjs/express)
1. Loads each provided route using [Nightmare](https://github.com/segmentio/nightmare)
1. Saves the HTML of each route to the filesystem

## Issues?

This plugin has not been extensively tested.  I use it in one Vue.js CLI project,
and it works quite well.  If you have any trouble with it, create an issue and
I'll see what I can do.