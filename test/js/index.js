// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST - JS
// ------------------------------------

'use strict'

var test = require('ava')

var read = require('fs').readFileSync
var join = require('path').join

var fixture = function (file) {
  return read(join(__dirname, 'fixtures', file), 'utf8')
}

var expect = function (file) {
  return read(join(__dirname, 'expect', file), 'utf8')
}

var postcss = require('postcss')
var postcssrc = require('../..')

test('postcss.config.js - {Function} - Load Config', function (t) {
  process.env.NODE_ENV = 'development'

  var ctx = { sugar: true }

  return postcssrc(ctx).then(function (config) {
    t.is(config.plugins.length, 2)

    t.is(config.options.parser, require('sugarss'))
    t.is(config.options.syntax, require('postcss-scss'))
    t.is(config.options.map, false)
    t.is(config.options.from, 'fixtures/index.css')
    t.is(config.options.to, 'expect/index.css')

    t.is(config.plugins[0], require('postcss-import'))
    t.is(config.plugins[1], require('postcss-nested'))
  })
})

test('postcss.config.js - {Function} - Process CSS', function (t) {
  var ctx = { parser: false }

  return postcssrc(ctx).then(function (config) {
    return postcss(config.plugins)
      .process(fixture('index.css'), config.options)
      .then(function (result) {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('postcss.config.js - {Function} - Process SSS', function (t) {
  var ctx = { sugar: true, from: 'fixtures/index.sss' }

  return postcssrc(ctx).then(function (config) {
    return postcss(config.plugins)
      .process(fixture('index.sss'), config.options)
      .then(function (result) {
        t.is(expect('index.sss'), result.css)
      })
  })
})

test('postcssrc- {Function} - Load only defaults when no config exists', function (t) {
  return postcssrc({}, '../').then(function (config) {
    t.deepEqual(config.plugins, [])
    t.true('cwd' in config.options)
    t.true('env' in config.options)
    t.is(Object.keys(config.options).length, 2)
  })
})
