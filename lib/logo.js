var url = require( 'url' )
var request = require( 'simple-get' )
var html = require( 'htmlparser2' )
var pkg = require( '../package.json' )
var DOMHandler = require( './dom-handler' )

var USER_AGENT = `${pkg.name}/${pkg.version}` +
  `${process.release.name}/${process.versions[ process.release.name ]}` +
  `(${pkg.homepage})`

function firstChild( root, nodeName ) {
  return root && root.children && root.children.length &&
    root.children.find(( node ) => node.name === nodeName ) || null
}

function findChildren( root, fn ) {
  return root && root.children && root.children.filter( fn ) || []
}

function findChild( root, fn ) {
  return root && root.children && root.children.find( fn ) || null
}

function getName( root ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var metaDesc = findChild( head, ( node ) => {
    return node.name == 'title' && node.textContent
  })
  var ogDesc = findChild( head, ( node ) => {
    return node.name == 'meta' && node.attr.property == 'og:site_name'
  })
  return ( ogDesc && ogDesc.attr.content ) ||
    ( metaDesc && metaDesc.textContent ) || null
}

function getTitle( root ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var metaDesc = findChild( head, ( node ) => {
    return node.name == 'title' && node.textContent
  })
  var ogDesc = findChild( head, ( node ) => {
    return node.name == 'meta' && node.attr.property == 'og:title'
  })
  return ( ogDesc && ogDesc.attr.content ) ||
    ( metaDesc && metaDesc.textContent ) || null
}

function getDescription( root ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var metaDesc = findChild( head, ( node ) => {
    return node.name == 'meta' && node.attr.name == 'description'
  })
  var ogDesc = findChild( head, ( node ) => {
    return node.name == 'meta' && node.attr.property == 'og:description'
  })
  return ( metaDesc && metaDesc.attr.content ) ||
    ( ogDesc && ogDesc.attr.content ) || null
}

function getFavicon( root, uri ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var favicon = findChild( head, ( node ) => {
    return node.name == 'link' && node.attr.href && (
      node.attr.rel == 'shortcut icon' ||
      node.attr.rel == 'icon'
    )
  })
  return favicon && {
    href: url.resolve( uri, favicon.attr.href ),
    type: favicon.attr.type || null,
  }
}

// <meta name="msapplication-TileColor" content="#cb3837">
// <meta name="theme-color" content="#cb3837">
function getColor( root ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var themeColor = findChild( head, ( node ) => {
    return node.name == 'meta' && (
      node.attr.name == 'theme-color' ||
      node.attr.name == 'msapplication-TileColor'
    )
  })
  return themeColor && themeColor.attr.content || null
}

function getTouchIcons( root, uri ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var icons = findChildren( head, ( node ) => {
    return node.name == 'link' && node.attr.href &&
      node.attr.rel == 'apple-touch-icon'
  })
  return icons.map(( node ) => {
    return {
      href: url.resolve( uri, node.attr.href ),
      size: node.attr.sizes && node.attr.sizes.split( 'x' ).map( n => +n ) || null,
      type: node.attr.type || null,
    }
  })
}

// <meta property="og:image" content="https://www.npmjs.com/static/images/touch-icons/open-graph.png">
function getOpenGraphImages( root, uri ) {

  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var graphTags = findChildren( head, ( node ) => {
    return node.name == 'meta' && /^og:image/.test( node.attr.property )
  })

  var images = []
  var image = null
  var node = null

  for( var i = 0; i < graphTags.length; i++ ) {
    node = graphTags[i]
    switch( node.attr.property ) {
      case 'og:image': {
        if( image && image.href ) images.push( image )
        image = { href: node.attr.content && url.resolve( uri, node.attr.content ) }
      } break
      case 'og:image:type': image.type = node.attr.content; break
      case 'og:image:width': image.width = +node.attr.content; break
      case 'og:image:height': image.height = +node.attr.content; break
    }
  }

  if( image && image.href ) images.push( image )

  return images

}

// <link rel="mask-icon" href="https://assets-cdn.github.com/pinned-octocat.svg" color="#4078c0">
function getMaskIcon( root, uri ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var icon = findChild( head, ( node ) => {
    return node.name == 'link' && node.attr.href &&
      node.attr.rel == 'mask-icon'
  })
  return icon && {
    href: url.resolve( uri, icon.attr.href ),
    color: icon.attr.color || null,
  }
}

// <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
function getFluidIcon( root, uri ) {
  var html = firstChild( root, 'html' )
  var head = firstChild( html, 'head' )
  var icon = findChild( head, ( node ) => {
    return node.name == 'link' && node.attr.href &&
      node.attr.rel == 'fluid-icon'
  })
  return icon && {
    href: url.resolve( uri, icon.attr.href ),
    title: icon.attr.title || null,
  }
}

function inspect( uri, callback ) {

  request({
    url: uri,
    headers: { 'User-Agent': USER_AGENT },
  }, ( error, res ) => {

    if( error || res.statusCode !== 200 ) {
      res && res.resume()
      error = error || new Error( `HTTP ${res.statusCode} ${res.statusMessage}` )
      return void callback( error )
    }

    res.setEncoding( 'utf8' )

    var handler = new DOMHandler()
    var parser = new html.Parser( handler, {
      xmlMode: false,
      decodeEntities: true,
      lowerCaseTags: true,
      lowerCaseAttributeNames: true,
      recognizeCDATA: true,
      recognizeSelfClosing: true,
    })

    res.on( 'readable', function() {
      var chunk = null
      while( chunk = this.read() ) {
        parser.write( chunk )
      }
    })

    res.on( 'end', function() {
      parser.end()
      var document = handler.document
      var info = {
        name: getName( document ),
        title: getTitle( document ),
        description: getDescription( document ),
        icon: getFavicon( document, uri ),
        themeColor: getColor( document ),
        touchIcons: getTouchIcons( document, uri ),
        openGraph: getOpenGraphImages( document, uri ),
        maskIcon: getMaskIcon( document, uri ),
        fluidIcon: getFluidIcon( document, uri ),
      }
      parser.parseComplete()
      callback( null, info )
    })

  })

}

module.exports = inspect
