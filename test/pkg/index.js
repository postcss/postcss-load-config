// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST - PKG
// ------------------------------------

'use strict'

var test = require('ava')

var join = require('path').join
var resolve = require('path').resolve

var read = require('fs').readFileSync

var postcss = require('postcss')
var postcssrc = require('../..')

var fixture = function (file) {
  return read(join(__dirname, 'fixtures', file), 'utf8')
}

var expect = function (file) {
  return read(join(__dirname, 'expect', file), 'utf8')
}

test('package.json - {Object} - Load Config', function (t) {
  return postcssrc({}, 'test/pkg').then(function (config) {
    t.is(config.options.parser, require('sugarss'))
    t.is(config.options.syntax, require('postcss-scss'))
    t.is(config.options.map, false)
    t.is(config.options.from, './test/pkg/fixtures/index.css')
    t.is(config.options.to, './test/pkg/expect/index.css')

    t.is(config.plugins.length, 4)
    t.is(config.plugins[0].postcssPlugin, 'postcss-import')
    t.is(config.plugins[1].postcssPlugin, 'postcss-nested')
    t.is(config.plugins[2].postcssPlugin, 'postcss-sprites')
    t.is(config.plugins[3].postcssPlugin, 'postcss-cssnext')

    t.is(config.file, join(resolve('test/pkg'), 'package.json'))
  })
})

test('package.json - {Object} - Process CSS', function (t) {
  return postcssrc({ parser: false }, 'test/pkg').then(function (config) {
    return postcss(config.plugins)
      .process(fixture('index.css'), config.options)
      .then(function (result) {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('package.json - {Object} - Process SSS', function (t) {
  var ctx = { from: './test/pkg/fixtures/index.sss' }

  return postcssrc(ctx, 'test/pkg').then(function (config) {
    return postcss(config.plugins)
      .process(fixture('index.sss'), config.options)
      .then(function (result) {
        t.is(expect('index.sss'), result.css)
      })
  })
})
