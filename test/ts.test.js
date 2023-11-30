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
  test('Load Config - postcss.config.mts', async () => {
    const config = await postcssrc(ctx, 'test/ts/object/esm')
    assertExpectedConfig(config, 'test/ts/object/esm/postcss.config.mts')
  })

  test('Load Config - postcss.config.ts (ESM)', async () => {
    const config = await postcssrc(ctx, 'test/ts/object/esm-in-ts')
    assertExpectedConfig(config, 'test/ts/object/esm-in-ts/postcss.config.ts')
  })

  test('Load Config - postcss.config.cts', async () => {
    const config = await postcssrc(ctx, 'test/ts/object/cjs')
    assertExpectedConfig(config, 'test/ts/object/cjs/postcss.config.cts')
  })

  test('Load Config - postcss.config.ts (CommonJS)', async () => {
    const config = await postcssrc(ctx, 'test/ts/object/cjs-in-ts')
    assertExpectedConfig(config, 'test/ts/object/cjs-in-ts/postcss.config.ts')
  })

  test('Process CSS - postcss.config.ts (CommonJS)', async () => {
    const ctx = {
      parser: false,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/ts/object/cjs-in-ts')
    const result = await postcss(config.plugins).process(
      fixture('ts/object', 'index.css'),
      config.options
    )
    equal(result.css, expected('ts/object', 'index.css'))
  })

  test('Process SSS - postcss.config.ts (CommonJS)', async () => {
    const ctx = {
      from: './test/ts/object/fixtures/index.sss',
      parser: true,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/ts/object/cjs-in-ts')
    const result = await postcss(config.plugins).process(
      fixture('ts/object', 'index.sss'),
      config.options
    )
    equal(result.css, expected('ts/object', 'index.sss'))
  })

  function assertExpectedConfig (config, expectedConfigPath) {
    deepStrictEqual(config.options, {
      parser: require('sugarss'),
      syntax: require('sugarss'),
      map: false,
      from: './test/ts/object/fixtures/index.css',
      to: './test/ts/object/expect/index.css'
    })

    equal(config.plugins.length, 2)
    equal(typeof config.plugins[0], 'function')
    equal(typeof config.plugins[1], 'function')

    equal(config.file, path.resolve(expectedConfigPath))
  }
})

describe('Array', () => {
  test('Load Config - postcss.config.mts', async () => {
    const config = await postcssrc(ctx, 'test/ts/array/esm')
    assertExpectedConfig(config, 'test/ts/array/esm/postcss.config.mts')
  })

  test('Load Config - postcss.config.ts (ESM)', async () => {
    const config = await postcssrc(ctx, 'test/ts/array/esm-in-ts')
    assertExpectedConfig(config, 'test/ts/array/esm-in-ts/postcss.config.ts')
  })

  test('Load Config - postcss.config.cts', async () => {
    const config = await postcssrc(ctx, 'test/ts/array/cjs')
    assertExpectedConfig(config, 'test/ts/array/cjs/postcss.config.cts')
  })

  test('Load Config - postcss.config.ts (CommonJS)', async () => {
    const config = await postcssrc(ctx, 'test/ts/array/cjs-in-ts')
    assertExpectedConfig(config, 'test/ts/array/cjs-in-ts/postcss.config.ts')
  })

  test('Process CSS - postcss.config.ts (CommonJS)', async () => {
    const ctx = {
      parser: false,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/ts/array/cjs')
    const result = await postcss(config.plugins).process(
      fixture('ts/array', 'index.css'),
      config.options
    )
    equal(result.css, expected('ts/array', 'index.css'))
  })

  test('Process SSS - postcss.config.ts (CommonJS)', async () => {
    const ctx = {
      from: './test/ts/array/fixtures/index.sss',
      parser: true,
      syntax: false
    }

    const config = await postcssrc(ctx, 'test/ts/array/cjs')
    const result = await postcss(config.plugins).process(
      fixture('ts/array', 'index.sss'),
      config.options
    )

    equal(result.css, expected('ts/array', 'index.sss'))
  })

  function assertExpectedConfig (config, expectedPath) {
    deepStrictEqual(config.options, {
      parser: require('sugarss'),
      syntax: require('sugarss'),
      map: false,
      from: './test/ts/array/fixtures/index.css',
      to: './test/ts/array/expect/index.css'
    })

    equal(config.plugins.length, 2)
    equal(typeof config.plugins[0], 'object')
    equal(typeof config.plugins[1], 'object')

    equal(config.file, path.resolve(expectedPath))
  }
})
