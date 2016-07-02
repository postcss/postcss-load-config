// ------------------------------------
// #POSTCSS - LOAD OPTIONS - TEST
// ------------------------------------

'use strict'

const test = require('ava')

const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

const fixtures = (file) => readFileSync(join(__dirname, 'fixtures', file))
const expected = (file) => readFileSync(join(__dirname, 'expects', file))

const postcss = require('postcss')
const postcssrc = require('../')

test('1 - Process CSS with default config', (t) => {
  postcssrc().then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.css'), options)
      .then(result => {
        writeFileSync('./expects/index.css', result.css)
        t.is(expected('index.css'), result.css)
      })
  })
})

test('2 - Process SSS with default config', (t) => {
  postcssrc().then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.sss'), options)
      .then(result => {
        writeFileSync('./expects/index.sss.css', result.css)
        t.is(expected('index.sss.css'), result.css)
      })
  })
})

test('3 - Process CSS with custom config provided as string', (t) => {
  postcssrc('postcssrc.json').then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.custom.css'), options)
      .then(result => {
        writeFileSync('./expects/index.custom.css', result.css)
        t.is(expected('index.custom.css'), result.css)
      })
  })
})

test('4 - Process SSS with custom config provided as string', (t) => {
  postcssrc('postcssrc.json').then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.custom.sss'), options)
      .then(result => {
        writeFileSync('./expects/index.custom.sss.css', result.css)
        t.is(expected('index.custom.sss.css'), result.css)
      })
  })
})

test('5 - Process CSS with custom config provided as object', (t) => {
  postcssrc('postcss.config.js').then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.custom.css'), options)
      .then(result => {
        writeFileSync('./expects/index.custom.sss.css', result.css)
        t.is(expected('index.custom.sss.css'), result.css)
      })
  })
})

test('6 - Process SSS with custom config provided as object', (t) => {
  postcssrc('postcss.config.js').then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.custom.sss'), options)
      .then(result => {
        writeFileSync('./expects/index.custom.sss.css', result.css)
        t.is(expected('index.custom.sss.css'), result.css)
      })
  })
})
