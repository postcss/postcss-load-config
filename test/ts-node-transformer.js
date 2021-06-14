'use strict'

const { create: createTypeScriptCompiler } = require('ts-node')

const tsCompiler = createTypeScriptCompiler()

module.exports = {
  process: tsCompiler.compile.bind(tsCompiler)
}
