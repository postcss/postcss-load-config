[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]

<div align="center">
  <a href="https://github.com/postcss/postcss">
    <img width="108" height="108" title="PostCSS"           src="http://postcss.github.io/postcss/logo.svg" hspace="20">
  </a>
  <h1>Load Config</h1>
  <p>Autoload Config for PostCSS<p>
</div>

## Install

```bash
npm i -D postcss-load-config
```

## Usage
Install plugin as usual and make sure saving them to your ***package.json*** dependencies and/or devDependencies.

```
npm i -S postcss-plugin
npm i -D postcss-plugin
```

After installing your plugins there a two common ways to declare your plugins and options.

- Create **postcss** section in your projects **package.json**.
- Create a **postcss.config.js**  or  **postcssrc.json** file.

## Options

Plugin **options** can either take ```null``` or an object literal ```{}```
as value.

```null``` : Plugin loads with no options (defaults).

```[Object]``` : Plugin loads with set options.

## Ordering

Plugin **order** is determined by declaration in the plugins section.

```js
postcss: {
  parser: require('sugarss'),
  from: 'app.sss'
  map: 'inline',
  to: 'app.css'
  plugins: {
    'postcss-plugin1': null,
    'postcss-plugin2': null,
    'postcss-plugin3': {option1: '', option2: ''}
  }
}

// Loaded Options Setup
{
  parser: require('sugarss'),
  from: 'app.sss'
  map: 'inline',
  to: 'app.css'
}
// Loaded Plugin Setup
[
  require('postcss-plugin1')(),
  require('postcss-plugin2')(),
  require('postcss-plugin3')(options)
]
```

## Examples
#### package.json

```json
{
 "dependencies": {
   "sugarss": "^0.1.4",
   "postcss-bem": "^0.2.2",
   "postcss-nested": "^1.0.0",
   "postcss-import": "^8.1.2"
 },
 "postcss": {
   "parser": "sugarss",
   "from": "app.sss",
   "map": "inline",
   "to": "app.css",
   "plugins": {
     "postcss-import": null,
     "postcss-nested": null,
     "postcss-bem": {
       "style": "bem",
       "separators": {
         "namespace": "-",
         "descendent":"__",
         "modifier": "--"
       },
       "shortcuts": {
         "component": "block",
         "descendent": "elem",
         "modifier": "mods"
        }
      }  
    }
  }
}
```

#### postcss.config.js

```js
module.exports = {
  parser: "sugarss",
  from: 'app.sss',
  map: 'inline',
  to: 'app.css',
  plugins: {
    'postcss-import': null,
    'postcss-nested': null,
    'postcss-bem': {
      style: 'bem',
      separators: {
        namespace: '-',
        descendent: '__',
        modifier: '--'
      },
      shortcuts: {
        component: 'block',
        descendent: 'elem',
        modifier: 'mods'
      }
    }
  }
}
```
#### postcssrc.json

```json
{
  "parser": "sugarss",
  "from": "app.sss",
  "map": "inline",
  "to": "app.css",
  "plugins": {
    "postcss-import": null,
    "postcss-nested": null,
    "postcss-bem": {
      "style": "bem",
      "separators": {
        "namespace": "-",
        "descendent":"__",
        "modifier": "--"
      },
      "shortcuts": {
        "component": "block",
        "descendent": "elem",
        "modifier": "mods"
      }
    }
  }
}
```

## Usage
#### Default

```js
'use strict'

const { readFileSync } = require('fs')

const postcss = require('postcss')
const postcssrc = require('postcss-load-config')()

const css = readFileSync('./index.css', 'utf8')

postcssrc.then(({ plugins, options }) => {
  postcss(plugins)
    .process(css, options)
    .then(result => console.log(result.css))
}))
```

#### Custom

```js
'use strict'

const { readFileSync } = require('fs')

const postcss = require('postcss')
const postcssrc = require('postcss-load-config')('./path/to/postcssrc.json')

const css = readFileSync('./index.css', 'utf8')

postcssrc.then(({ plugins, options }) => {
  postcss(plugins)
    .process(css, options)
    .then(result => console.log(result.css))
}))
```

## LICENSE

> License (MIT)

> Copyright (c) 2016 Michael Ciniawsky

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]: https://img.shields.io/npm/v/postcss-load-config.svg
[npm-url]: https://npmjs.com/package/postcss-load-config

[deps]: https://david-dm.org/michael-ciniawsky/postcss-load-config.svg
[deps-url]: https://david-dm.org/michael-ciniawsky/postcss-load-config

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/michael-ciniawsky/postcss-load-config.svg?branch=master
[travis-url]: https://travis-ci.org/michael-ciniawsky/postcss-load-config?branch=master

[cover]: https://coveralls.io/repos/github/michael-ciniawsky/postcss-load-config/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/michael-ciniawsky/postcss-load-config?branch=master
