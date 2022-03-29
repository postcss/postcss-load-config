const path = require('path')
const { test } = require('uvu')
const { is } = require('uvu/assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected, describe } = require('./utils.js')

describe('package.json - {Object} - Load Config', test => {
  const expected = config => {
    is(config.options.parser, require('sugarss'))
    is(config.options.syntax, require('sugarss'))
    is(config.options.map, false)
    is(config.options.from, './test/pkg/fixtures/index.css')
    is(config.options.to, './test/pkg/expect/index.css')

    is(config.plugins.length, 2)
    is(typeof config.plugins[0], 'function')
    is(typeof config.plugins[1], 'function')

    is(config.file, path.resolve('test/pkg', 'package.json'))
  }

  test('Async', () => {
    return postcssrc({}, 'test/pkg').then(expected)
  })

  test.run()
})

test('package.json - {Object} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/pkg').then(config => {
    return postcss(config.plugins)
      .process(fixture('pkg', 'index.css'), config.options)
      .then(result => {
        is(result.css, expected('pkg', 'index.css'))
      })
  })
})

test('package.json - {Object} - Process SSS', () => {
  const ctx = {
    from: './test/pkg/fixtures/index.sss',
    syntax: false
  }

  return postcssrc(ctx, 'test/pkg').then(config => {
    return postcss(config.plugins)
      .process(fixture('pkg', 'index.sss'), config.options)
      .then(result => {
        is(result.css, expected('pkg', 'index.sss'))
      })
  })
})

test.run()
