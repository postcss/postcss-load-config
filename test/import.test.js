const { describe, test } = require('node:test')
const { equal } = require('node:assert')
const { writeFileSync } = require('node:fs')
const postcssrc = require('../src/index.js')

describe('.postcss.config.js Load Config', () => {
  test('.postcss.config.js config update cache', () => {

    return postcssrc({}, 'test').then(config => {
      let { file, options } = config
      equal(options.map, false)
      writeFileSync(file, `export default ${JSON.stringify({ map: true })}`)
      postcssrc({}, 'test').then(({ options: newOptions }) => {
        equal(newOptions.map, true)
      }).finally(() => {
        writeFileSync(file, `export default ${JSON.stringify({ map: false })}`)
      })
    })
  })
})
