// ------------------------------------
// #POSTCSS - LOAD CONFIG - TEST
// ------------------------------------

'use strict'

var test = require('ava')

var fs = require('fs')
var path = require('path')

function fixtures (file) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', file), 'utf8')
}
function expected (file) {
  return fs.readFileSync(path.join(__dirname, 'expects', file), 'utf8')
}

var postcss = require('postcss')
var postcssrc = require('../..')

test('1.0 - Load options && plugins with default config', function (t) {
  return postcssrc().then(function (config) {
    console.log(config.plugins, '\n\n', config.options)
  })
})

test('1.1 - Load options && plugins with custom config', function (t) {
  return postcssrc('./postcss.config.js').then(function (config) {
    console.log(config.plugins, '\n\n', config.options)
  })
})

test('2.0 - Process CSS with default config', function (t) {
  return postcssrc().then(function (config) {
    postcss(config.plugins)
      .process(fixtures('index.css'), config.options)
      .then(function (result) {
        fs.writeFileSync('expects/index.css', result.css, 'utf8')
        t.is(expected('index.css'), result.css)
      })
  })
})

test('2.1 - Process SSS with default config', function (t) {
  return postcssrc().then(function (config) {
    postcss(config.plugins)
      .process(fixtures('index.sss'), config.options)
      .then(function (result) {
        fs.writeFileSync('expects/index.sss.css', result.css, 'utf8')
        t.is(expected('index.sss.css'), result.css)
      })
  })
})

test('3.0 - Process CSS with custom config', function (t) {
  return postcssrc('./postcssrc.json').then(function (config) {
    postcss(config.plugins)
      .process(fixtures('index.css'), config.options)
      .then(function (result) {
        fs.writeFileSync('expects/custom.css', result.css, 'utf8')
        t.is(expected('custom.css'), result.css)
      })
  })
})

test('3.1 - Process SSS with custom config', function (t) {
  return postcssrc('./postcssrc.json').then(function (config) {
    postcss(config.plugins)
      .process(fixtures('index.sss'), config.options)
      .then(function (result) {
        fs.writeFileSync('expects/custom.sss.css', result.css, 'utf8')
        t.is(expected('custom.sss.css'), result.css)
      })
  })
})
