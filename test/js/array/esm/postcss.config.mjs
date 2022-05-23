import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import cssnano from 'cssnano'

export default function (ctx) {
  return {
    parser: ctx.parser ? 'sugarss' : false,
    syntax: ctx.syntax ? 'sugarss' : false,
    map: ctx.map ? 'inline' : false,
    from: './test/js/array/fixtures/index.css',
    to: './test/js/array/expect/index.css',
    plugins: [
      postcssImport(),
      postcssNested(),
      ctx.env === 'production' ? cssnano() : false
    ]
  }
}
