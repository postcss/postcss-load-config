// ------------------------------------
// #POSTCSS - LOAD OPTIONS - TEST
// ------------------------------------

'use strict'

const test = require('ava')

const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

const fixtures = (file) => readFileSync(join(__dirname, 'fixtures', file), 'utf8')
const expected = (file) => readFileSync(join(__dirname, 'expects', file), 'utf8')

const postcss = require('postcss')
const postcssrc = require('../')

test('1.0 - Load options && plugins with default config', (t) => {
  postcssrc().then(({ plugins, options }) => {
    console.log(plugins, '\n\n', options)
  })
})

test('1.1 - Load options && plugins with custom config', (t) => {
  postcssrc('./postcss.config.js').then(({ plugins, options }) => {
    console.log(plugins, '\n\n', options)
  })
})

test('2.0 - Process CSS with default config', (t) => {
  postcssrc().then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.css'), options)
      .then((result) => {
        writeFileSync('expects/index.css', result.css, 'utf8')
        t.is(expected('index.css'), result.css)
      })
  })
})

test('2.1 - Process SSS with default config', (t) => {
  postcssrc().then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.sss'), options)
      .then((result) => {
        writeFileSync('expects/index.sss.css', result.css, 'utf8')
        t.is(expected('index.sss.css'), result.css)
      })
  })
})

test('3.0 - Process CSS with custom config', (t) => {
  postcssrc('./postcssrc.json').then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.css'), options)
      .then((result) => {
        writeFileSync('expects/custom.css', result.css, 'utf8')
        t.is(expected('custom.css'), result.css)
      })
  })
})

test('3.1 - Process SSS with custom config', (t) => {
  postcssrc('./postcssrc.json').then(({ plugins, options }) => {
    postcss(plugins)
      .process(fixtures('index.sss'), options)
      .then((result) => {
        writeFileSync('expects/custom.sss.css', result.css, 'utf8')
        t.is(expected('custom.sss.css'), result.css)
      })
  })
})
