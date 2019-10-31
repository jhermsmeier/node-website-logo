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
var websiteLogo = require( 'website-logo' )
```

```js
websiteLogo( uri, function( error, info ) {
  console.log( error || info )
})
```

## Examples

```js
// github.com
{
  name: 'GitHub',
  title: 'Build software better, together',
  description: 'GitHub brings together the world’s largest community of developers to discover, share, and build better software. From open source projects to private team repositories, we’re your all-in-one platform for collaborative development.',
  icon: {
    href: 'https://github.githubassets.com/favicon.ico',
    type: 'image/x-icon'
  },
  themeColor: '#1e2327',
  touchIcons: [],
  openGraph: [
    {
      href: 'https://github.githubassets.com/images/modules/open_graph/github-logo.png',
      type: 'image/png',
      width: 1200,
      height: 1200
    },
    {
      href: 'https://github.githubassets.com/images/modules/open_graph/github-mark.png',
      type: 'image/png',
      width: 1200,
      height: 620
    },
    {
      href: 'https://github.githubassets.com/images/modules/open_graph/github-octocat.png',
      type: 'image/png',
      width: 1200,
      height: 620
    }
  ],
  maskIcon: {
    href: 'https://github.githubassets.com/pinned-octocat.svg',
    color: '#000000'
  },
  fluidIcon: { href: 'https://github.com/fluidicon.png', title: 'GitHub' }
}
```

```js
// npmjs.com
{
  name: 'npm | build amazing things',
  title: 'npm | build amazing things',
  description: null,
  icon: {
    href: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png',
    type: 'image/png'
  },
  themeColor: '#cb3837',
  touchIcons: [
    {
      href: 'https://static.npmjs.com/58a19602036db1daee0d7863c94673a4.png',
      size: [ 120, 120 ],
      type: null
    },
    {
      href: 'https://static.npmjs.com/7a7ffabbd910fc60161bc04f2cee4160.png',
      size: [ 144, 144 ],
      type: null
    },
    {
      href: 'https://static.npmjs.com/34110fd7686e2c90a487ca98e7336e99.png',
      size: [ 152, 152 ],
      type: null
    },
    {
      href: 'https://static.npmjs.com/3dc95981de4241b35cd55fe126ab6b2c.png',
      size: [ 180, 180 ],
      type: null
    }
  ],
  openGraph: [
    {
      href: 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
    }
  ],
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
