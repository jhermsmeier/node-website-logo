var websiteLogo = require( '..' )
var URL = process.argv[2] || 'https://npmjs.com'

function inspect( value ) {
  return require( 'util' ).inspect( value, {
    depth: null,
    colors: true
  })
}

websiteLogo( URL, function( error, images ) {
  console.log( inspect( error || images ) )
})
