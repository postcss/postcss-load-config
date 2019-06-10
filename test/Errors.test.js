'use strict'

const postcssrc = require('../src/index.js')

test('Loading Config - {Error}', () => {
  return postcssrc({}, 'test/err').catch((err) => {
    expect(err.message).toMatch(
      /^No PostCSS Config found in: (.*)$/
    )
  })
})

test('Loading Config - Sync - {Error}', () => {
  try {
    postcssrc.sync({}, 'test/err')
  } catch (err) {
    expect(err.message).toMatch(
      /^No PostCSS Config found in: (.*)$/
    )
  }
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
        /^Loading PostCSS Plugin failed: .*$/m
      )
    })
  })

  test('Plugin - {Object} - Options', () => {
    return postcssrc({}, 'test/err/plugins/object/options').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Plugin failed: .*$/m
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

describe('Loading Plugins - Sync - {Error}', () => {
  test('Plugin - {Type} - Invalid', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins')
    } catch (err) {
      expect(err.message).toMatch(
        /^Invalid PostCSS Plugin found at: (.*)\n\n\(@.*\)$/
      )
    }
  })

  test('Plugin - {Object}', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/object')
    } catch (err) {
      expect(err.message).toMatch(
        /^Loading PostCSS Plugin failed: .*$/m
      )
    }
  })

  test('Plugin - {Object} - Options', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/object/options')
    } catch (err) {
      expect(err.message).toMatch(
        /^Loading PostCSS Plugin failed: .*$/m
      )
    }
  })

  test('Plugin - {Array}', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/array')
    } catch (err) {
      expect(err.message).toMatch(
        /^Cannot find (.*)$/
      )
    }
  })

  test('Plugin - {Array} - Options', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/array/options')
    } catch (err) {
      expect(err.message).toMatch(
        /^Cannot find (.*)$/
      )
    }
  })
})

describe('Loading Options - {Error}', () => {
  test('Parser - {String}', () => {
    return postcssrc({}, 'test/err/options/parser').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Parser failed: .*$/m
      )
    })
  })

  test('Syntax - {String}', () => {
    return postcssrc({}, 'test/err/options/syntax').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Syntax failed: .*$/m
      )
    })
  })

  test('Stringifier - {String}', () => {
    return postcssrc({}, 'test/err/options/stringifier').catch((err) => {
      expect(err.message).toMatch(
        /^Loading PostCSS Stringifier failed: .*$/m
      )
    })
  })
})

describe('Loading Options - Sync - {Error}', () => {
  test('Parser - {String}', () => {
    try {
      postcssrc.sync({}, 'test/err/options/parser')
    } catch (err) {
      expect(err.message).toMatch(
        /^Loading PostCSS Parser failed: .*$/m
      )
    }
  })

  test('Syntax - {String}', () => {
    try {
      postcssrc.sync({}, 'test/err/options/syntax')
    } catch (err) {
      expect(err.message).toMatch(
        /^Loading PostCSS Syntax failed: .*$/m
      )
    }
  })

  test('Stringifier - {String}', () => {
    try {
      postcssrc.sync({}, 'test/err/options/stringifier')
    } catch (err) {
      expect(err.message).toMatch(
        /^Loading PostCSS Stringifier failed: .*$/m
      )
    }
  })
})
