// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST - ERR
// ------------------------------------

'use strict'

var test = require('ava')

var postcssrc = require('../..')

test('No Config - Load defaults', function (t) {
  return postcssrc({}, '../').then(function (config) {
    t.deepEqual(config.plugins, [])

    t.true('cwd' in config.options)
    t.true('env' in config.options)

    t.is(Object.keys(config.options).length, 2)
  })
})
