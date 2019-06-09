'use strict'

const path = require('path')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected } = require('./utils.js')

describe('package.json - {Object} - Load Config', () => {
  const expected = (config) => {
    expect(config.options.parser).toEqual(require('sugarss'))
    expect(config.options.syntax).toEqual(require('sugarss'))
    expect(config.options.map).toEqual(false)
    expect(config.options.from).toEqual('./test/pkg/fixtures/index.css')
    expect(config.options.to).toEqual('./test/pkg/expect/index.css')

    expect(config.plugins.length).toEqual(2)
    expect(typeof config.plugins[0]).toBe('function')
    expect(typeof config.plugins[1]).toBe('function')

    expect(config.file)
      .toEqual(path.resolve('test/pkg', 'package.json'))
  }

  test('Async', () => {
    return postcssrc({}, 'test/pkg').then(expected)
  })

  test('Sync', () => {
    const config = postcssrc.sync({}, 'test/pkg')

    expected(config)
  })
})

test('package.json - {Object} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/pkg').then((config) => {
    return postcss(config.plugins)
      .process(fixture('pkg', 'index.css'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('pkg', 'index.css'))
      })
  })
})

test('package.json - {Object} - Process SSS', () => {
  const ctx = {
    from: './test/pkg/fixtures/index.sss',
    syntax: false
  }

  return postcssrc(ctx, 'test/pkg').then((config) => {
    return postcss(config.plugins)
      .process(fixture('pkg', 'index.sss'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('pkg', 'index.sss'))
      })
  })
})
