'use strict'

const fs = require('node:fs')
const path = require('node:path')

const fixture = (dir, file) => {
  return fs.readFileSync(path.resolve('test', dir, 'fixtures', file), 'utf8')
}

const expected = (dir, file) => {
  return fs.readFileSync(path.resolve('test', dir, 'expect', file), 'utf8')
}

module.exports = {
  expected,
  fixture
}
