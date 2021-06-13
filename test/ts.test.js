'use strict'

const path = require('path')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected } = require('./utils.js')

describe('postcss.config.ts - {Object} - Load Config', () => {
  const ctx = {
    parser: true,
    syntax: true
  }

  const expected = (config) => {
    expect(config.options.parser).toEqual(require('sugarss'))
    expect(config.options.syntax).toEqual(require('sugarss'))
    expect(config.options.map).toEqual(false)
    expect(config.options.from).toEqual('./test/ts/object/fixtures/index.css')
    expect(config.options.to).toEqual('./test/ts/object/expect/index.css')

    expect(config.plugins.length).toEqual(2)
    expect(typeof config.plugins[0]).toBe('function')
    expect(typeof config.plugins[1]).toBe('function')

    expect(config.file)
      .toEqual(path.resolve('test/ts/object', 'postcss.config.ts'))
  }

  test('Async', () => {
    return postcssrc(ctx, 'test/ts/object').then(expected)
  })

  test('Sync', () => {
    const config = postcssrc.sync(ctx, 'test/ts/object')

    expected(config)
  })
})

test('postcss.config.ts - {Object} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/object').then((config) => {
    return postcss(config.plugins)
      .process(fixture('ts/object', 'index.css'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('ts/object', 'index.css'))
      })
  })
})

test('postcss.config.ts - {Object} - Process SSS', () => {
  const ctx = {
    from: './test/ts/object/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/object').then((config) => {
    return postcss(config.plugins)
      .process(fixture('ts/object', 'index.sss'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('ts/object', 'index.sss'))
      })
  })
})

describe('postcss.config.ts - {Array} - Load Config', () => {
  const ctx = {
    parser: true,
    syntax: true
  }

  const expected = (config) => {
    expect(config.options.parser).toEqual(require('sugarss'))
    expect(config.options.syntax).toEqual(require('sugarss'))
    expect(config.options.map).toEqual(false)
    expect(config.options.from).toEqual('./test/ts/array/fixtures/index.css')
    expect(config.options.to).toEqual('./test/ts/array/expect/index.css')

    expect(config.plugins.length).toEqual(2)
    expect(typeof config.plugins[0]).toBe('function')
    expect(typeof config.plugins[1]).toBe('object')

    expect(config.file)
      .toEqual(path.resolve('test/ts/array', 'postcss.config.ts'))
  }

  test('Async', () => {
    return postcssrc(ctx, 'test/ts/array').then(expected)
  })

  test('Sync', () => {
    const config = postcssrc.sync(ctx, 'test/ts/array')

    expected(config)
  })
})

test('postcss.config.ts - {Array} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/array').then((config) => {
    return postcss(config.plugins)
      .process(fixture('ts/array', 'index.css'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('ts/array', 'index.css'))
      })
  })
})

test('postcss.config.ts - {Array} - Process SSS', () => {
  const ctx = {
    from: './test/ts/array/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/ts/array').then((config) => {
    return postcss(config.plugins)
      .process(fixture('ts/array', 'index.sss'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('ts/array', 'index.sss'))
      })
  })
})
