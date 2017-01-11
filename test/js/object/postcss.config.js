module.exports = function (ctx) {
  return {
    parser: ctx.parser ? 'sugarss' : false,
    syntax: 'postcss-scss',
    map: ctx.map ? 'inline' : false,
    from: './test/js/object/fixtures/index.css',
    to: './test/js/object/expect/index.css',
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'postcss-sprites': {},
      'postcss-cssnext': {},
      'cssnano': ctx.env === 'production' ? {} : false
    }
  }
}
