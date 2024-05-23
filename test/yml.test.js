const { resolve } = require('node:path')
const { describe, test } = require('node:test')
const { equal } = require('node:assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { expected, fixture } = require('./utils.js')

describe('.yml - {Object} - Load Config', () => {
  test('Async', () => {
    return postcssrc({}, 'test/yml').then(config => {
      equal(config.options.parser, require('sugarss'))
      equal(config.options.syntax, require('sugarss'))
      equal(config.options.map, false)
      equal(config.options.from, './test/yml/fixtures/index.css')
      equal(config.options.to, './test/yml/expect/index.css')

      equal(config.plugins.length, 2)
      equal(typeof config.plugins[0], 'function')
      equal(typeof config.plugins[1], 'function')

      equal(config.file, resolve('test/yml', '.postcssrc.yml'))
    })
  })
})

test('.yml - {Object} - Process CSS', () => {
  let ctx = {
    parser: false,
    syntax: false
  }

  return postcssrc(ctx, 'test/yml').then(config => {
    return postcss(config.plugins)
      .process(fixture('yml', 'index.css'), config.options)
      .then(result => {
        equal(result.css, expected('yml', 'index.css'))
      })
  })
})

test('.yml - {Object} - Process SSS', () => {
  let ctx = {
    from: './test/yml/fixtures/index.sss',
    syntax: false
  }

  return postcssrc(ctx, 'test/yml').then(config => {
    return postcss(config.plugins)
      .process(fixture('yml', 'index.sss'), config.options)
      .then(result => {
        equal(result.css, expected('yml', 'index.sss'))
      })
  })
})
