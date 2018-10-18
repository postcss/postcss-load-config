module.exports = Promise.resolve({
  parser: 'sugarss',
  syntax: 'sugarss',
  map: 'inline',
  from: './test/js/promise/object/fixtures/index.css',
  to: './test/js/promise/object/expect/index.css',
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'cssnano': false
  }
})
