'use strict'

const test = require('ava')

const read = require('fs').readFileSync
const join = require('path').join

const fixture = (file) => read(join(__dirname, 'fixtures', file), 'utf8')

const expect = (file) => read(join(__dirname, 'expect', file), 'utf8')

const postcss = require('postcss')
const postcssrc = require('../..')

test('package.json - {Object} - Load Config', (t) => {
  return postcssrc().then((config) => {
    t.is(config.plugins.length, 2)

    t.is(config.options.parser, require('sugarss'))
    t.is(config.options.syntax, require('postcss-scss'))
    t.is(config.options.map, false)
    t.is(config.options.from, 'fixtures/index.css')
    t.is(config.options.to, 'expect/index.css')

    t.is(config.plugins[0], require('postcss-import'))
    t.is(config.plugins[1], require('postcss-nested'))
  })
})

test('package.json - {Object} - Process CSS', (t) => {
  const ctx = { parser: false }

  return postcssrc(ctx).then((config) => {
    return postcss(config.plugins)
      .process(fixture('index.css'), config.options)
      .then((result) => {
        t.is(expect('index.css'), result.css)
      })
  })
})

test('package.json - {Object} - Process SSS', (t) => {
  const ctx = { from: 'fixtures/index.sss' }

  return postcssrc(ctx).then((config) => {
    return postcss(config.plugins)
      .process(fixture('index.sss'), config.options)
      .then((result) => {
        t.is(expect('index.sss'), result.css)
      })
  })
})
