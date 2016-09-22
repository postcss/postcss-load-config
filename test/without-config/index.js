// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST
// ------------------------------------

'use strict'

var test = require('ava')

var postcssrc = require('../..')

test('4.0 - Load options && plugins with no config', function (t) {
  return postcssrc().then(function (config) {
    t.deepEqual(config.plugins, [])
    t.deepEqual(config.options, {})
  })
})
