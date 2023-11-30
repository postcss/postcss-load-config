const path = require('node:path')
const { describe, test } = require('node:test')
const { equal } = require('node:assert')

const postcss = require('postcss')
const postcssrc = require('../src/index.js')

const { expected, fixture } = require('./utils.js')

describe('package.json - {Object} - Load Config', () => {
  test('Async', () => {
    return postcssrc({}, 'test/pkg').then(config => {
      equal(config.options.parser, require('sugarss'))
      equal(config.options.syntax, require('sugarss'))
      equal(config.options.map, false)
      equal(config.options.from, './test/pkg/fixtures/index.css')
      equal(config.options.to, './test/pkg/expect/index.css')

      equal(config.plugins.length, 2)
      equal(typeof config.plugins[0], 'function')
      equal(typeof config.plugins[1], 'function')

      equal(config.file, path.resolve('test/pkg', 'package.json'))
    })
  })
})

test('package.json - {Object} - Process CSS', () => {
  return postcssrc(
    {
      parser: false,
      syntax: false
    },
    'test/pkg'
  ).then(config => {
    return postcss(config.plugins)
      .process(fixture('pkg', 'index.css'), config.options)
      .then(result => {
        equal(result.css, expected('pkg', 'index.css'))
      })
  })
})

test('package.json - {Object} - Process SSS', () => {
  return postcssrc(
    {
      from: './test/pkg/fixtures/index.sss',
      syntax: false
    },
    'test/pkg'
  ).then(config => {
    return postcss(config.plugins)
      .process(fixture('pkg', 'index.sss'), config.options)
      .then(result => {
        equal(result.css, expected('pkg', 'index.sss'))
      })
  })
})
