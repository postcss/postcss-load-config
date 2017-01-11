// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST - JS
// ------------------------------------

'use strict'

var test = require('ava')

var join = require('path').join
var resolve = require('path').resolve

var read = require('fs').readFileSync

var postcss = require('postcss')
var postcssrc = require('../../..')

var fixture = function (file) {
  return read(join(__dirname, 'fixtures', file), 'utf8')
}

var expect = function (file) {
  return read(join(__dirname, 'expect', file), 'utf8')
}

test('postcss.config.js - {Function} - Load Config', function (t) {
  return postcssrc({ parser: true }, 'test/js/object').then(function (config) {
    t.is(config.options.parser, require('sugarss'))
    t.is(config.options.syntax, require('postcss-scss'))
    t.is(config.options.map, false)
    t.is(config.options.from, './test/js/object/fixtures/index.css')
    t.is(config.options.to, './test/js/object/expect/index.css')

    t.is(config.plugins.length, 4)
    t.is(config.plugins[0].postcssPlugin, 'postcss-import')
    t.is(config.plugins[1].postcssPlugin, 'postcss-nested')
    t.is(config.plugins[2].postcssPlugin, 'postcss-sprites')
    t.is(config.plugins[3].postcssPlugin, 'postcss-cssnext')

    t.is(config.file, join(resolve('test/js/object'), 'postcss.config.js'))
  })
})

test('postcss.config.js - {Function} - Process CSS', function (t) {
  return postcssrc({ parser: false }, 'test/js/object').then(function (config) {
    return postcss(config.plugins)
      .process(fixture('index.css'), config.options)
      .then(function (result) {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('postcss.config.js - {Function} - Process SSS', function (t) {
  var ctx = { parser: true, from: './test/js/object/fixtures/index.sss' }

  return postcssrc(ctx, 'test/js/object').then(function (config) {
    return postcss(config.plugins)
      .process(fixture('index.sss'), config.options)
      .then(function (result) {
        t.is(expect('index.sss'), result.css)
      })
  })
})
