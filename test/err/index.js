// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST - ERR
// ------------------------------------

'use strict'

var test = require('ava')

var postcssrc = require('../..')

test('No Config - {Error}', function (t) {
  return postcssrc({}, 'test').catch(function (err) {
    t.is(err.message, 'No PostCSS Config found in: /home/travis/build/michael-ciniawsky/postcss-load-config/test')
  })
})
