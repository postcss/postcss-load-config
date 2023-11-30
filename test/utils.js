const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')

function fixture(dir, file) {
  return readFileSync(resolve('test', dir, 'fixtures', file), 'utf8')
}

function expected(dir, file) {
  return readFileSync(resolve('test', dir, 'expect', file), 'utf8')
}

module.exports = {
  expected,
  fixture
}
