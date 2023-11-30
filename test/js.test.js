const path = require('path')
const { test, describe } = require('node:test')
const { equal, deepStrictEqual } = require('node:assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected } = require('./utils.js')

const ctx = {
  parser: true,
  syntax: true
}

describe('Object', () => {
  test('Load Config - postcss.config.mjs', async () => {
    const config = await postcssrc(ctx, 'test/js/object/esm')
    assertExpectedConfig(config, 'test/js/object/esm/postcss.config.mjs')
  })

  test('Load Config - postcss.config.js (ESM)', async () => {
    const config = await postcssrc(ctx, 'test/js/object/esm-in-js')
    assertExpectedConfig(config, 'test/js/object/esm-in-js/postcss.config.js')
  })

  test('Load Config - postcss.config.cjs', async () => {
    const config = await postcssrc(ctx, 'test/js/object/cjs')
    assertExpectedConfig(config, 'test/js/object/cjs/postcss.config.cjs')
  })

  test('Load Config - postcss.config.js (CommonJS)', async () => {
    const config = await postcssrc(ctx, 'test/js/object/cjs-in-js')
    assertExpectedConfig(config, 'test/js/object/cjs-in-js/postcss.config.js')
  })

  test('Process CSS - postcss.config.js (CommonJS)', async () => {
    const ctx = {
      parser: false,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/js/object/cjs-in-js')
    const result = await postcss(config.plugins).process(
      fixture('js/object', 'index.css'),
      config.options
    )
    equal(result.css, expected('js/object', 'index.css'))
  })

  test('Process SSS - postcss.config.js (CommonJS)', async () => {
    const ctx = {
      from: './test/js/object/fixtures/index.sss',
      parser: true,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/js/object/cjs-in-js')
    const result = await postcss(config.plugins).process(
      fixture('js/object', 'index.sss'),
      config.options
    )
    equal(result.css, expected('js/object', 'index.sss'))
  })

  function assertExpectedConfig (config, expectedConfigPath) {
    deepStrictEqual(config.options, {
      parser: require('sugarss'),
      syntax: require('sugarss'),
      map: false,
      from: './test/js/object/fixtures/index.css',
      to: './test/js/object/expect/index.css'
    })

    equal(config.plugins.length, 2)
    equal(typeof config.plugins[0], 'function')
    equal(typeof config.plugins[1], 'function')

    equal(config.file, path.resolve(expectedConfigPath))
  }
})

describe('Array', () => {
  test('Load Config - postcss.config.mjs', async () => {
    const config = await postcssrc(ctx, 'test/js/array/esm')
    assertExpectedConfig(config, 'test/js/array/esm/postcss.config.mjs')
  })

  test('Load Config - postcss.config.js (ESM)', async () => {
    const config = await postcssrc(ctx, 'test/js/array/esm-in-js')
    assertExpectedConfig(config, 'test/js/array/esm-in-js/postcss.config.js')
  })

  test('Load Config - postcss.config.cjs', async () => {
    const config = await postcssrc(ctx, 'test/js/array/cjs')
    assertExpectedConfig(config, 'test/js/array/cjs/postcss.config.cjs')
  })

  test('Load Config - postcss.config.js (CommonJS)', async () => {
    const config = await postcssrc(ctx, 'test/js/array/cjs-in-js')
    assertExpectedConfig(config, 'test/js/array/cjs-in-js/postcss.config.js')
  })

  test('Process CSS - postcss.config.js (CommonJS)', async () => {
    const ctx = {
      parser: false,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/js/array/cjs')
    const result = await postcss(config.plugins).process(
      fixture('js/array', 'index.css'),
      config.options
    )
    equal(result.css, expected('js/array', 'index.css'))
  })

  test('Process SSS - postcss.config.js (CommonJS)', async () => {
    const ctx = {
      from: './test/js/array/fixtures/index.sss',
      parser: true,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/js/array/cjs')
    const result = await postcss(config.plugins).process(
      fixture('js/array', 'index.sss'),
      config.options
    )

    equal(result.css, expected('js/array', 'index.sss'))
  })

  function assertExpectedConfig (config, expectedPath) {
    deepStrictEqual(config.options, {
      parser: require('sugarss'),
      syntax: require('sugarss'),
      map: false,
      from: './test/js/array/fixtures/index.css',
      to: './test/js/array/expect/index.css'
    })

    equal(config.plugins.length, 2)
    equal(typeof config.plugins[0], 'object')
    equal(typeof config.plugins[1], 'object')

    equal(config.file, path.resolve(expectedPath))
  }
})
