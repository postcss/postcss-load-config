'use strict'

const postcssrc = require('../src/index.js')

test('Loading Config - {Error}', () => {
  return postcssrc({}, 'test/err').catch((err) => {
    expect(err.message).toMatch(
      /^No PostCSS Config found in: (.*)$/
    )
  })
})

describe('Loading Plugins - {Error}', () => {
  test('Plugin - {Type} - Invalid', () => {
    return postcssrc({}, 'test/err/plugins').catch((err) => {
      expect(err.message).toMatch(
        /^Invalid PostCSS Plugin found at: (.*)\n\n\(@.*\)$/
      )
    })
  })

  test('Plugin - {Object}', () => {
    return postcssrc({}, 'test/err/plugins/object').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Plugin failed: (.*)\n\n\(@.*\)$/
      )
    })
  })

  test('Plugin - {Object} - Options', () => {
    return postcssrc({}, 'test/err/plugins/object/options').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Plugin failed: (.*)\n\n\(@.*\)$/
      )
    })
  })

  test('Plugin - {Array}', () => {
    return postcssrc({}, 'test/err/plugins/array').catch((err) => {
      expect(err.message).toMatch(
        /^Cannot find (.*)$/
      )
    })
  })

  test('Plugin - {Array} - Options', () => {
    return postcssrc({}, 'test/err/plugins/array/options').catch((err) => {
      expect(err.message).toMatch(
        /^Cannot find (.*)$/
      )
    })
  })
})

describe('Loading Options - {Error}', () => {
  test('Parser - {String}', () => {
    return postcssrc({}, 'test/err/options/parser').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Parser failed: (.*)\n\n\(@.*\)$/
      )
    })
  })

  test('Syntax - {String}', () => {
    return postcssrc({}, 'test/err/options/syntax').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Syntax failed: (.*)\n\n\(@.*\)$/
      )
    })
  })

  test('Stringifier - {String}', () => {
    return postcssrc({}, 'test/err/options/stringifier').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Stringifier failed: (.*)\n\n\(@.*\)$/
      )
    })
  })
})
