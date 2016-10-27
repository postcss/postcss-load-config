module.exports = function (ctx) {
  return {
    parser: ctx.sugar ? 'sugarss' : false,
    syntax: 'postcss-scss',
    map: ctx.map ? 'inline' : false,
    from: 'fixtures/index.css',
    to: 'expect/index.css',
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'postcss-sprites': {},
      'cssnano': ctx.env === 'production' ? {} : false
    }
  }
}
