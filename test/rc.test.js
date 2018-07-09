'use strict'

const path = require('path')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { fixture, expected } = require('./utils.js')

test('.postcssrc - {Object} - Load Config', () => {
  return postcssrc({}, 'test/rc').then((config) => {
    expect(config.options.parser).toEqual(require('sugarss'))
    expect(config.options.syntax).toEqual(require('sugarss'))
    expect(config.options.map).toEqual(false)
    expect(config.options.from).toEqual('./test/rc/fixtures/index.css')
    expect(config.options.to).toEqual('./test/rc/expect/index.css')

    expect(config.plugins.length).toEqual(2)
    expect(typeof config.plugins[0]).toBe('function')
    expect(typeof config.plugins[1]).toBe('function')

    expect(config.file)
      .toEqual(path.resolve('test/rc', '.postcssrc'))
  })
})

test('.postcssrc - {Object} - Process CSS', () => {
  const ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/rc').then((config) => {
    return postcss(config.plugins)
      .process(fixture('rc', 'index.css'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('rc', 'index.css'))
      })
  })
})

test('.postcssrc - {Object} - Process SSS', () => {
  const ctx = {
    from: './test/rc/fixtures/index.sss',
    syntax: false
  }

  return postcssrc(ctx, 'test/rc').then((config) => {
    return postcss(config.plugins)
      .process(fixture('rc', 'index.sss'), config.options)
      .then((result) => {
        expect(result.css).toEqual(expected('rc', 'index.sss'))
      })
  })
})
