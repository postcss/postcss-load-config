'use strict'

module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.[j]sx?$': 'babel-jest',
    '\\.ts': './test/ts-node-transformer.js'
  }
}
