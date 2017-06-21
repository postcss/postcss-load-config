// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST - ERR
// ------------------------------------

'use strict'

var test = require('ava')

var postcssrc = require('../..')

test('No Config - {Error}', function (t) {
  t.plan(1);

  return postcssrc({}, 'test').catch(function (err) {
    t.regex(err.message, /^No PostCSS Config found in: .*\/postcss-load-config\/test$/)
  })
})
