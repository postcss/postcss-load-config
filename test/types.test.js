const { strictEqual } = require('node:assert')
const { resolve } = require('node:path')
const { test } = require('node:test')

const ts = require('typescript')

test('Config.map matches PostCSS source map options', () => {
  let program = ts.createProgram([resolve(__dirname, 'types/map.ts')], {
    noEmit: true,
    skipLibCheck: true,
    strict: true
  })
  let diagnostics = ts.getPreEmitDiagnostics(program)
  strictEqual(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: file => file,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n'
    })
  )
})
