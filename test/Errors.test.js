const { describe, test } = require('node:test')
const { rejects } = require('node:assert')

const postcssrc = require('../src/index.js')

// FIXME: this is resolving to nearest postcss config (outside root)
// test('Loading Config - {Error}', async () => {
//   await rejects(() => postcssrc({}, 'test/err'), {
//     message: /^No PostCSS Config found in: (.*)$/
//   })
// })

describe('Loading Config - {Error}', () => {
  test('no config found error', () => {
    return rejects(() => postcssrc({}, 'ghostDir'), {
      message: /^No PostCSS Config found in: (.*)$/
    })
  })
})

describe('Loading Plugins - {Error}', () => {
  test('Plugin - {Type} - Invalid', () => {
    return rejects(() => postcssrc({}, 'test/err/plugins'), {
      message: /^Invalid PostCSS Plugin found at: (.*)\n\n\(@.*\)$/
    })
  })

  test('Plugin - {Object}', () => {
    return rejects(() => postcssrc({}, 'test/err/plugins/object'), {
      message: /^Loading PostCSS Plugin failed: .*$/m
    })
  })

  test('Plugin - {Object} - Options', () => {
    return rejects(() => postcssrc({}, 'test/err/plugins/object/options'), {
      message: /^Loading PostCSS Plugin failed: .*$/m
    })
  })

  test('Plugin - {Array}', () => {
    return rejects(() => postcssrc({}, 'test/err/plugins/array'), {
      message: /^Cannot find (.*)$/m
    })
  })

  test('Plugin - {Array} - Options', () => {
    return rejects(() => postcssrc({}, 'test/err/plugins/array/options'), {
      message: /^Cannot find (.*)$/m
    })
  })
})

describe('Loading Options - {Error}', () => {
  test('Parser - {String}', () => {
    return rejects(() => postcssrc({}, 'test/err/options/parser'), {
      message: /^Loading PostCSS Parser failed: .*$/m
    })
  })

  test('Syntax - {String}', () => {
    return rejects(() => postcssrc({}, 'test/err/options/syntax'), {
      message: /^Loading PostCSS Syntax failed: .*$/m
    })
  })

  test('Stringifier - {String}', () => {
    return rejects(() => postcssrc({}, 'test/err/options/stringifier'), {
      message: /^Loading PostCSS Stringifier failed: .*$/m
    })
  })
})

test('Loading TS Config - {Error} - Syntax', () => {
  return rejects(() => postcssrc({}, 'test/err/ts'), {
    message: /^(Transform failed|ParseError)/
  })
})
