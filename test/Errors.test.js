const { test } = require('uvu')
const { match } = require('uvu/assert')

const postcssrc = require('../src/index.js')
const { describe } = require('./utils.js')

test('Loading Config - {Error}', () => {
  return postcssrc({}, 'test/err').catch(err => {
    match(err.message, /^No PostCSS Config found in: (.*)$/)
  })
})

test('Loading Config - Sync - {Error}', () => {
  try {
    postcssrc.sync({}, 'test/err')
  } catch (err) {
    match(err.message, /^No PostCSS Config found in: (.*)$/)
  }
})

describe('Loading Plugins - {Error}', test => {
  test('Plugin - {Type} - Invalid', () => {
    return postcssrc({}, 'test/err/plugins').catch(err => {
      match(err.message, /^Invalid PostCSS Plugin found at: (.*)\n\n\(@.*\)$/)
    })
  })

  test('Plugin - {Object}', () => {
    return postcssrc({}, 'test/err/plugins/object').catch(err => {
      match(err.message, /^Loading PostCSS Plugin failed: .*$/m)
    })
  })

  test('Plugin - {Object} - Options', () => {
    return postcssrc({}, 'test/err/plugins/object/options').catch(err => {
      match(err.message, /^Loading PostCSS Plugin failed: .*$/m)
    })
  })

  test('Plugin - {Array}', () => {
    return postcssrc({}, 'test/err/plugins/array').catch(err => {
      match(err.message, /^Cannot find (.*)$/m)
    })
  })

  test('Plugin - {Array} - Options', () => {
    return postcssrc({}, 'test/err/plugins/array/options').catch(err => {
      match(err.message, /^Cannot find (.*)$/m)
    })
  })

  test.run()
})

describe('Loading Plugins - Sync - {Error}', test => {
  test('Plugin - {Type} - Invalid', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins')
    } catch (err) {
      match(err.message, /^Invalid PostCSS Plugin found at: (.*)\n\n\(@.*\)$/)
    }
  })

  test('Plugin - {Object}', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/object')
    } catch (err) {
      match(err.message, /^Loading PostCSS Plugin failed: .*$/m)
    }
  })

  test('Plugin - {Object} - Options', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/object/options')
    } catch (err) {
      match(err.message, /^Loading PostCSS Plugin failed: .*$/m)
    }
  })

  test('Plugin - {Array}', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/array')
    } catch (err) {
      match(err.message, /^Cannot find (.*)$/m)
    }
  })

  test('Plugin - {Array} - Options', () => {
    try {
      postcssrc.sync({}, 'test/err/plugins/array/options')
    } catch (err) {
      match(err.message, /^Cannot find (.*)$/m)
    }
  })

  test.run()
})

describe('Loading Options - {Error}', test => {
  test('Parser - {String}', () => {
    return postcssrc({}, 'test/err/options/parser').catch(err => {
      match(err.message, /^Loading PostCSS Parser failed: .*$/m)
    })
  })

  test('Syntax - {String}', () => {
    return postcssrc({}, 'test/err/options/syntax').catch(err => {
      match(err.message, /^Loading PostCSS Syntax failed: .*$/m)
    })
  })

  test('Stringifier - {String}', () => {
    return postcssrc({}, 'test/err/options/stringifier').catch(err => {
      match(err.message, /^Loading PostCSS Stringifier failed: .*$/m)
    })
  })

  test.run()
})

describe('Loading Options - Sync - {Error}', test => {
  test('Parser - {String}', () => {
    try {
      postcssrc.sync({}, 'test/err/options/parser')
    } catch (err) {
      match(err.message, /^Loading PostCSS Parser failed: .*$/m)
    }
  })

  test('Syntax - {String}', () => {
    try {
      postcssrc.sync({}, 'test/err/options/syntax')
    } catch (err) {
      match(err.message, /^Loading PostCSS Syntax failed: .*$/m)
    }
  })

  test('Stringifier - {String}', () => {
    try {
      postcssrc.sync({}, 'test/err/options/stringifier')
    } catch (err) {
      match(err.message, /^Loading PostCSS Stringifier failed: .*$/m)
    }
  })

  test.run()
})

test.run()
