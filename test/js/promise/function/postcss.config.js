module.exports = Promise.resolve(function (ctx) {
  return {
    parser: ctx.parser ? 'sugarss' : false,
    syntax: ctx.syntax ? 'sugarss' : false,
    map: ctx.map ? 'inline' : false,
    from: './test/js/promise/function/fixtures/index.css',
    to: './test/js/promise/function/expect/index.css',
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'cssnano': ctx.env === 'production' ? {} : false
    }
  }
})
