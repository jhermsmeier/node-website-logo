# website-logo
[![npm](https://img.shields.io/npm/v/website-logo.svg?style=flat-square)](https://npmjs.com/website-logo)
[![npm license](https://img.shields.io/npm/l/website-logo.svg?style=flat-square)](https://npmjs.com/website-logo)
[![npm downloads](https://img.shields.io/npm/dm/website-logo.svg?style=flat-square)](https://npmjs.com/website-logo)

Fetch a websites icons, logos and theme color

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save website-logo
```

## Usage

```js
var websiteLogo = require( '..' )
```

```js
websiteLogo( URL, function( error, images ) {
  console.log( error || images )
})
```

## Examples

```js
// github.com
> {
  logo: null,
  icon: 'https://assets-cdn.github.com/favicon.ico',
  themeColor: '#ffffff',
  touchIcons:
   [ { href: 'https://github.com/apple-touch-icon.png', size: null },
     { href: 'https://assets-cdn.github.com/favicon.ico',
       size: null } ],
  openGraph: 'https://assets-cdn.github.com/images/modules/open_graph/github-logo.png',
  maskIcon: 'https://assets-cdn.github.com/pinned-octocat.svg',
  fluidIcon: 'https://github.com/fluidicon.png'
}
```

```js
// npmjs.com
> {
  logo: null,
  icon: '/static/images/touch-icons/favicon-32x32.png',
  themeColor: '#cb3837',
  touchIcons:
   [ { href: 'https://www.npmjs.com/static/images/touch-icons/apple-touch-icon-57x57.png',
       size: [ 57, 57 ] },
     { href: 'https://www.npmjs.com/static/images/touch-icons/favicon-32x32.png',
       size: [ 32, 32 ] } ],
  openGraph: 'https://www.npmjs.com/static/images/touch-icons/open-graph.png',
  maskIcon: null,
  fluidIcon: null
}
```

## Tests

There are none. Not any automated ones, at least.  
If you want to eyeball the results for a site:

```sh
$ node test 'www.example.com'
```
