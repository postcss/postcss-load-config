const path = require('path')
const { test } = require('uvu')
const { is } = require('uvu/assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected, describe } = require('./utils.js')

describe('postcss.config.js - {Object} - Load Config', test => {
  const ctx = {
    parser: true,
    syntax: true
  }

  const expected = config => {
    is(config.options.parser, require('sugarss'))
    is(config.options.syntax, require('sugarss'))
    is(config.options.map, false)
    is(config.options.from, './test/js/object/fixtures/index.css')
    is(config.options.to, './test/js/object/expect/index.css')

    is(config.plugins.length, 2)
    is(typeof config.plugins[0], 'function')
    is(typeof config.plugins[1], 'function')

    is(config.file, path.resolve('test/js/object', 'postcss.config.js'))
  }

  test('Async', () => {
    return postcssrc(ctx, 'test/js/object').then(expected)
  })

  test('Sync', () => {
    const config = postcssrc.sync(ctx, 'test/js/object')

    expected(config)
  })

  test.run()
})

test('postcss.config.js - {Object} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/object').then(config => {
    return postcss(config.plugins)
      .process(fixture('js/object', 'index.css'), config.options)
      .then(result => {
        is(result.css, expected('js/object', 'index.css'))
      })
  })
})

test('postcss.config.js - {Object} - Process SSS', () => {
  const ctx = {
    from: './test/js/object/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/object').then(config => {
    return postcss(config.plugins)
      .process(fixture('js/object', 'index.sss'), config.options)
      .then(result => {
        is(result.css, expected('js/object', 'index.sss'))
      })
  })
})

describe('postcss.config.js - {Array} - Load Config', test => {
  const ctx = {
    parser: true,
    syntax: true
  }

  const expected = config => {
    is(config.options.parser, require('sugarss'))
    is(config.options.syntax, require('sugarss'))
    is(config.options.map, false)
    is(config.options.from, './test/js/array/fixtures/index.css')
    is(config.options.to, './test/js/array/expect/index.css')

    is(config.plugins.length, 2)
    is(typeof config.plugins[0], 'object')
    is(typeof config.plugins[1], 'object')

    is(config.file, path.resolve('test/js/array', 'postcss.config.js'))
  }

  test('Async', () => {
    return postcssrc(ctx, 'test/js/array').then(expected)
  })

  test('Sync', () => {
    const config = postcssrc.sync(ctx, 'test/js/array')

    expected(config)
  })

  test.run()
})

test('postcss.config.js - {Array} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/array').then(config => {
    return postcss(config.plugins)
      .process(fixture('js/array', 'index.css'), config.options)
      .then(result => {
        is(result.css, expected('js/array', 'index.css'))
      })
  })
})

test('postcss.config.js - {Array} - Process SSS', () => {
  const ctx = {
    from: './test/js/array/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/array').then(config => {
    return postcss(config.plugins)
      .process(fixture('js/array', 'index.sss'), config.options)
      .then(result => {
        is(result.css, expected('js/array', 'index.sss'))
      })
  })
})

test.run()
