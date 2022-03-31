'use strict'

const fs = require('fs')
const path = require('path')
const { suite } = require('uvu')

const fixture = (dir, file) => {
  return fs.readFileSync(path.resolve('test', dir, 'fixtures', file), 'utf8')
}

const expected = (dir, file) => {
  return fs.readFileSync(path.resolve('test', dir, 'expect', file), 'utf8')
}

const describe = (name, hook) => {
  hook(suite(name))
}

module.exports = {
  fixture,
  expected,
  describe
}
