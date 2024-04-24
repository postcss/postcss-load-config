module.exports = function (ctx) {
  return {
    from: './test/js/object/fixtures/index.css',
    map: ctx.map ? 'inline' : false,
    parser: ctx.parser ? 'sugarss' : false,
    plugins: {
      cssnano: ctx.env === 'production' ? {} : false,
      'postcss-import': {},
      'postcss-nested': {}
    },
    syntax: ctx.syntax ? 'sugarss' : false,
    to: './test/js/object/expect/index.css'
  }
}
