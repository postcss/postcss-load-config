const { test } = require('node:test')
const { equal } = require('node:assert')

const postcssrc = require('../src/index.js')

const ctx = {
  parser: true,
  syntax: true
}

test('Interop default in validation', async () => {
  const config = await postcssrc(ctx, 'test/plugins')
  equal(config.plugins[0].default.called, true)
})
