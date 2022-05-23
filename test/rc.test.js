const path = require('path')
const { test } = require('uvu')
const { is } = require('uvu/assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected, describe } = require('./utils.js')

describe('.postcssrc - {Object} - Load Config', test => {
  const expected = config => {
    is(config.options.parser, require('sugarss'))
    is(config.options.syntax, require('sugarss'))
    is(config.options.map, false)
    is(config.options.from, './test/rc/fixtures/index.css')
    is(config.options.to, './test/rc/expect/index.css')

    is(config.plugins.length, 2)
    is(typeof config.plugins[0], 'function')
    is(typeof config.plugins[1], 'function')

    is(config.file, path.resolve('test/rc', '.postcssrc'))
  }

  test('Async', () => {
    return postcssrc({}, 'test/rc').then(expected)
  })

  test.run()
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
        is(result.css, expected('rc', 'index.css'))
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
        is(result.css, expected('rc', 'index.sss'))
      })
  })
})

test.run()
