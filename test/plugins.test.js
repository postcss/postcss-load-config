const { equal } = require('node:assert')
const { test } = require('node:test')
const postcss = require('postcss')

const postcssrc = require('../src/index.js')
const loadPlugins = require('../src/plugins.js')

const ctx = {
  parser: true,
  syntax: true
}

test('Interop default in validation', async () => {
  let config = await postcssrc(ctx, 'test/plugins')
  equal(config.plugins[0].called, true)
  let result = await postcss(config.plugins).process('a {}', { from: undefined })
  equal(result.css, 'a {}')
})

test('Returns default-exported transform callbacks', async () => {
  let transform = root => {
    root.walkDecls(decl => {
      decl.value = 'blue'
    })
  }
  let plugins = await loadPlugins(
    { plugins: [{ __esModule: true, default: transform }] },
    __filename
  )
  let result = await postcss(plugins).process('a { color: red }', {
    from: undefined
  })
  equal(result.css, 'a { color: blue }')
  equal(plugins[0], transform)
})
