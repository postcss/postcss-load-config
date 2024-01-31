const { resolve } = require('node:path')
const { describe, test } = require('node:test')
const { equal } = require('node:assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { expected, fixture } = require('./utils.js')

describe('.postcssrc - {Object} - Load Config', () => {
  test('Async', () => {
    return postcssrc({}, 'test/rc').then(config => {
      equal(config.options.parser, require('sugarss'))
      equal(config.options.syntax, require('sugarss'))
      equal(config.options.map, false)
      equal(config.options.from, './test/rc/fixtures/index.css')
      equal(config.options.to, './test/rc/expect/index.css')

      equal(config.plugins.length, 2)
      equal(typeof config.plugins[0], 'function')
      equal(typeof config.plugins[1], 'function')

      equal(config.file, resolve('test/rc', '.postcssrc'))
    })
  })
})

test('.postcssrc - {Object} - Process CSS', () => {
  let ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/rc').then(config => {
    return postcss(config.plugins)
      .process(fixture('rc', 'index.css'), config.options)
      .then(result => {
        equal(result.css, expected('rc', 'index.css'))
      })
  })
})

test('.postcssrc - {Object} - Process SSS', () => {
  let ctx = {
    from: './test/rc/fixtures/index.sss',
    syntax: false
  }

  return postcssrc(ctx, 'test/rc').then(config => {
    return postcss(config.plugins)
      .process(fixture('rc', 'index.sss'), config.options)
      .then(result => {
        equal(result.css, expected('rc', 'index.sss'))
      })
  })
})

describe('.postcss.config.js Load Config', () => {
  test('no config found error', () => {
    return postcssrc({}, '..')
    .catch(error => {
      equal(error.message.startsWith("No PostCSS Config found in:"), true)
    })
  })
})
