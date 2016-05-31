// ------------------------------------
// #POSTCSS - LOAD OPTIONS - TEST
// ------------------------------------

'use strict'

const test = require('ava')

const postcss = require('postcss')
const postcssrc = require('../index')

const { readFileSync, writeFileSync } = require('fs')

function readSync (path) {
  return readFileSync(path, 'utf8')
}

function writeSync (path, file) {
  return writeFileSync(path, file, 'utf8')
}

// Fixtures
const css = readSync('./fixtures/index.css', 'utf8')
const sss = readSync('./fixtures/index.sss', 'utf8')
const less = readSync('./fixtures/index.scss', 'utf8')
const scss = readSync('./fixtures/index.less', 'utf8')

test('Process CSS with default config', (t) => {
  postcssrc().then(({plugins, options}) => {
    postcss(plugins)
      .process(css)
      .then(result => {
        writeSync('./expect/result.css')
        t.equal(result.css, readSync('./expect/result-sss.css'))
        writeSync('./results/result.css')
      })
  })
})

test('Process SSS with default config', (t) => {
  postcssrc().then(({plugins, options}) => {
    postcss(plugins)
      .process(sss, options)
      .then(result => {
        writeSync('./expect/index.sss.css')
        t.equal(result.css, readSync('./expect/index.sss.css'))
      })
  })
})

test('Process LESS with custom config provided as string', (t) => {
  postcssrc('postcss.config.js').then(({plugins, options}) => {
    postcss(plugins)
      .process(scss, options)
      .then(result => {
        writeSync('./expect/index.less.css')
        t.equal(result.css, readSync('./expect/index.less.css'))
      })
  })
})

test('Process SCSS with custom config provided as string', (t) => {
  postcssrc('postcssrc.json').then(({plugins, options}) => {
    postcss(plugins)
      .process(less, options)
      .then(result => {
        writeSync('./expect/index.scss.css')
        t.equal(result.css, readSync('./expect/index.scss.css'))
      })
  })
})
