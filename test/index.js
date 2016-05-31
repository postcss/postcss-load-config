// ------------------------------------
// #POSTCSS - LOAD OPTIONS - TEST
// ------------------------------------

'use strict'

const test = require('ava')

const postcss = require('postcss')
const postcssrc = require('../index')

const { readFileSync, writeFileSync } = require('fs')

function read (path) {
  return readFileSync(path, 'utf8')
}

function write (path, file) {
  return writeFileSync(path, file, 'utf8')
}

// const postrc = {
//   parser: 'postcss-less',
//   from: 'fixtures/index.less',
//   map: 'inline',
//   to: 'result-less.css',
//   plugins: {
//     'postcss-import': null,
//     'postcss-nested': null,
//     'postcss-bem': {
//       style: 'bem',
//       separators: {
//         namespace: '-',
//         descendent: '__',
//         modifier: '--'
//       },
//       shortcuts: {
//         component: 'block',
//         descendent: 'elem',
//         modifier: 'mods'
//       }
//     }
//   }
// }

// Fixtures
const css = read('./fixtures/index.css', 'utf8')
const sss = read('./fixtures/index.sss', 'utf8')
const less = read('./fixtures/index.scss', 'utf8')
const scss = read('./fixtures/index.less', 'utf8')

test('Process CSS with default config', (t) => {
  postcssrc().then(({plugins, options}) => {
    postcss(plugins)
      .process(css, options)
      .then(result => {
        write('./expect/result.css')
        t.equal(result.css, read('./expect/result-sss.css'))
        write('./results/result.css')
      })
  })
})

test('Process SSS with default config', (t) => {
  postcssrc().then(({plugins, options}) => {
    postcss(plugins)
      .process(sss, options)
      .then(result => {
        t.equal(result.css, read('./expect/result-sss.css'))
        write('./results/result-sss.css')
      })
  })
})

test('Process CSS with custom config provided as string', (t) => {
  postcssrc().then(({plugins, options}) => {
    postcss(plugins)
      .process(scss, options)
      .then(result => {
        write('./expect/result-scss.css')
        t.equal(result.css, read('./expect/result-scss.css'))
        write('./results/result-scss.css')
      })
  })
})

test('Process CSS with custom config provided as object', (t) => {
  postcssrc().then(({plugins, options}) => {
    postcss(plugins)
      .process(less, options)
      .then(result => {
        write('./expect/result-less.css')
        t.equal(result.css, read('./expect/result-sss.css'))
        write('./results/result-less.css')
      })
  })
})
