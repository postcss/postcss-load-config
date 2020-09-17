'use strict'

const path = require('path')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected } = require('./utils.js')

describe('postcss.config.js - {Object} - Load Config', () => {
  const ctx = {
    parser: true,
    syntax: true
  }

  const expected = (config) => {
    expect(config.options.parser).toEqual(require('sugarss'))
    expect(config.options.syntax).toEqual(require('sugarss'))
    expect(config.options.map).toEqual(false)
    expect(config.options.from).toEqual('./test/js/object/fixtures/index.css')
    expect(config.options.to).toEqual('./test/js/object/expect/index.css')

    expect(config.plugins.length).toEqual(2)
    expect(typeof config.plugins[0]).toBe('function')
    expect(typeof config.plugins[1]).toBe('function')

    expect(config.file)
      .toEqual(path.resolve('test/js/object', 'postcss.config.js'))
  }

  test('Async', () => {
    return postcssrc(ctx, 'test/js/object').then(expected)
  })

  test('Sync', () => {
    const config = postcssrc.sync(ctx, 'test/js/object')

    expected(config)
  })
})

test('postcss.config.js - {Object} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/object').then((config) => {
    return postcss(config.plugins)
      .process(fixture('js/object', 'index.css'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('js/object', 'index.css'))
      })
  })
})

test('postcss.config.js - {Object} - Process SSS', () => {
  const ctx = {
    from: './test/js/object/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/object').then((config) => {
    return postcss(config.plugins)
      .process(fixture('js/object', 'index.sss'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('js/object', 'index.sss'))
      })
  })
})

describe('postcss.config.js - {Array} - Load Config', () => {
  const ctx = {
    parser: true,
    syntax: true
  }

  const expected = (config) => {
    expect(config.options.parser).toEqual(require('sugarss'))
    expect(config.options.syntax).toEqual(require('sugarss'))
    expect(config.options.map).toEqual(false)
    expect(config.options.from).toEqual('./test/js/array/fixtures/index.css')
    expect(config.options.to).toEqual('./test/js/array/expect/index.css')

    expect(config.plugins.length).toEqual(2)
    expect(typeof config.plugins[0]).toBe('function')
    expect(typeof config.plugins[1]).toBe('object')

    expect(config.file)
      .toEqual(path.resolve('test/js/array', 'postcss.config.js'))
  }

  test('Async', () => {
    return postcssrc(ctx, 'test/js/array').then(expected)
  })

  test('Sync', () => {
    const config = postcssrc.sync(ctx, 'test/js/array')

    expected(config)
  })
})

test('postcss.config.js - {Array} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/array').then((config) => {
    return postcss(config.plugins)
      .process(fixture('js/array', 'index.css'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('js/array', 'index.css'))
      })
  })
})

test('postcss.config.js - {Array} - Process SSS', () => {
  const ctx = {
    from: './test/js/array/fixtures/index.sss',
    parser: true,
    syntax: false
  }

  return postcssrc(ctx, 'test/js/array').then((config) => {
    return postcss(config.plugins)
      .process(fixture('js/array', 'index.sss'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('js/array', 'index.sss'))
      })
  })
})
