var test = require( 'tape-catch' )
var scuid = require( '..' )

function collide( fn, iterations ) {

  var ids = {}
  var pass = true
  var id = ''

  for( var i = 0; i < iterations; i++ ) {
    id = fn()
    if( ids[ id ] == null ) {
      ids[ id ] = id
    } else {
      pass = false
      break
    }
  }

  return pass

}

test( 'scuid', function( assert ) {

  assert.equal( typeof scuid, 'function', 'is a function' )
  assert.equal( typeof scuid(), 'string', 'returns a string' )
  assert.equal( scuid().length, 3 * 8 + 1, 'ID should be 25 chars long' )

  assert.test( 'slug', function( assert ) {
    assert.equal( typeof scuid.slug, 'function', 'is a function' )
    assert.equal( typeof scuid.slug(), 'string', 'returns a string' )
    assert.ok( scuid.slug().length <= 10 && scuid.slug().length >= 7, 'slug should be between 7 & 10 chars long' )
    assert.end()
  })

  assert.end()

})

test( 'collision resistance', function( assert ) {

  assert.ok( collide( scuid, 2000000 ), 'IDs should not collide' )
  assert.ok( collide( scuid.slug, 1000000 ), 'slugs should not collide' )
  assert.end()

})
