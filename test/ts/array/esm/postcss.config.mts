import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import cssnano from 'cssnano'
import { ConfigFn } from '../../../../src'

const config: ConfigFn = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  syntax: ctx.syntax ? 'sugarss' : false,
  map: ctx.map ? 'inline' : false,
  from: './test/ts/array/fixtures/index.css',
  to: './test/ts/array/expect/index.css',
  plugins: [
    postcssImport(),
    postcssNested({ preserveEmpty: true }),
    ctx.env === 'production' ? cssnano() : false
  ]
})

export default config
