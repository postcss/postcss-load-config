const path = require('path')
const { test, describe } = require('node:test')
const { equal } = require('node:assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected } = require('./utils.js')

describe('.postcssrc - {Object} - Load Config', () => {
  const expected = config => {
    equal(config.options.parser, require('sugarss'))
    equal(config.options.syntax, require('sugarss'))
    equal(config.options.map, false)
    equal(config.options.from, './test/rc/fixtures/index.css')
    equal(config.options.to, './test/rc/expect/index.css')

    equal(config.plugins.length, 2)
    equal(typeof config.plugins[0], 'function')
    equal(typeof config.plugins[1], 'function')

    equal(config.file, path.resolve('test/rc', '.postcssrc'))
  }

  test('Async', () => {
    return postcssrc({}, 'test/rc').then(expected)
  })
})

test('.postcssrc - {Object} - Process CSS', () => {
  const ctx = {
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
  const ctx = {
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
