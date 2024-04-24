import cssnano from 'cssnano'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'

export default function (ctx) {
  return {
    from: './test/js/array/fixtures/index.css',
    map: ctx.map ? 'inline' : false,
    parser: ctx.parser ? 'sugarss' : false,
    plugins: [
      postcssImport(),
      postcssNested(),
      ctx.env === 'production' ? cssnano() : false
    ],
    syntax: ctx.syntax ? 'sugarss' : false,
    to: './test/js/array/expect/index.css'
  }
}
