const { test } = require('uvu')
const { is } = require('uvu/assert')

const postcssrc = require('../src/index.js')

const ctx = {
  parser: true,
  syntax: true
}

test('Interop default in validation', async () => {
  const config = await postcssrc(ctx, 'test/plugins')
  is(config.plugins[0].default.called, true)
})

test.run()
