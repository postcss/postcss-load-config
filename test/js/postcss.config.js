module.exports = (ctx) => {
  return {
    parser: ctx.sugar ? 'sugarss' : false,
    syntax: 'postcss-scss',
    map: ctx.map ? 'inline' : false,
    from: 'fixtures/index.css',
    to: 'expect/index.css',
    plugins: {
      'postcss-import': null,
      'postcss-nested': null,
      'cssnano': ctx.env === 'production' ? null : false
    }
  }
}
