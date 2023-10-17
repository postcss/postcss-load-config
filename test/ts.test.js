const path = require('path')
const { test } = require('uvu')
const { is } = require('uvu/assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected, describe } = require('./utils.js')

describe('postcss.config.ts - {Object} - Load Config', test => {
  const ctx = {
    parser: true,
    syntax: true
  }

  test('Load Config - postcss.config.ts (CommonJS)', async () => {
    const config = await postcssrc(ctx, 'test/ts/object/cjs-in-ts')
    assertExpectedConfig(config, 'test/ts/object/cjs-in-ts/postcss.config.ts')
  })

  test('Load Config - postcss.config.cts', async () => {
    const config = await postcssrc(ctx, 'test/ts/object/cts')
    assertExpectedConfig(config, 'test/ts/object/cts/postcss.config.cts')
  })

  function assertExpectedConfig (config, expectedPath) {
    is(config.options.parser, require('sugarss'))
    is(config.options.syntax, require('sugarss'))
    is(config.options.map, false)
    is(config.options.from, './test/ts/object/fixtures/index.css')
    is(config.options.to, './test/ts/object/expect/index.css')

    is(config.plugins.length, 2)
    is(typeof config.plugins[0], 'function')
    is(typeof config.plugins[1], 'function')

    is(config.file, path.resolve(expectedPath))
  }

  test.run()
})

test('postcss.config.ts - {Object} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/object/cjs-in-ts').then(config => {
    return postcss(config.plugins)
      .process(fixture('ts/object', 'index.css'), config.options)
      .then(result => {
        is(result.css, expected('ts/object', 'index.css'))
      })
  })
})

test('postcss.config.ts - {Object} - Process SSS', () => {
  const ctx = {
    from: './test/ts/object/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/object/cjs-in-ts').then(config => {
    return postcss(config.plugins)
      .process(fixture('ts/object', 'index.sss'), config.options)
      .then(result => {
        is(result.css, expected('ts/object', 'index.sss'))
      })
  })
})

describe('postcss.config.ts - {Array} - Load Config', () => {
  const ctx = {
    parser: true,
    syntax: true
  }

  test('Load Config - postcss.config.ts (CommonJS)', async () => {
    const config = await postcssrc(ctx, 'test/ts/array/cjs-in-ts')
    assertExpectedConfig(config, 'test/ts/array/cjs-in-ts/postcss.config.ts')
  })

  test('Load Config - postcss.config.cts', async () => {
    const config = await postcssrc(ctx, 'test/ts/array/cts')
    assertExpectedConfig(config, 'test/ts/array/cts/postcss.config.cts')
  })

  function assertExpectedConfig (config, expectedPath) {
    is(config.options.parser, require('sugarss'))
    is(config.options.syntax, require('sugarss'))
    is(config.options.map, false)
    is(config.options.from, './test/ts/array/fixtures/index.css')
    is(config.options.to, './test/ts/array/expect/index.css')

    is(config.plugins.length, 2)
    is(typeof config.plugins[0], 'object')
    is(typeof config.plugins[1], 'object')

    is(config.file, path.resolve(expectedPath))
  }

  test.run()
})

test('postcss.config.ts - {Array} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/array/cjs-in-ts').then(config => {
    return postcss(config.plugins)
      .process(fixture('ts/array', 'index.css'), config.options)
      .then(result => {
        is(result.css, expected('ts/array', 'index.css'))
      })
  })
})

test('postcss.config.ts - {Array} - Process SSS', () => {
  const ctx = {
    from: './test/ts/array/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/array/cjs-in-ts').then(config => {
    return postcss(config.plugins)
      .process(fixture('ts/array', 'index.sss'), config.options)
      .then(result => {
        is(result.css, expected('ts/array', 'index.sss'))
      })
  })
})

test.run()
