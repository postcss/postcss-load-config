module.exports = function (ctx) {
  return {
    from: './test/js/array/fixtures/index.css',
    map: ctx.map ? 'inline' : false,
    parser: ctx.parser ? 'sugarss' : false,
    plugins: [
      require('postcss-import')(),
      require('postcss-nested')(),
      ctx.env === 'production' ? require('cssnano')() : false
    ],
    syntax: ctx.syntax ? 'sugarss' : false,
    to: './test/js/array/expect/index.css'
  }
}
