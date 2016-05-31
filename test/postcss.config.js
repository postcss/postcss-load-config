module.exports = {
  parser: 'postcss-scss',
  from: 'fixtures/index.scss',
  map: 'inline',
  to: 'result-scss.css',
  plugins: {
    'postcss-import': null,
    'postcss-nested': null,
    'postcss-bem': {
      defaultNamespace: 'undefined',
      style: 'bem',
      separators: {
        namespace: '-',
        descendent: '__',
        modifier: '--'
      },
      shortcuts: {
        component: 'block',
        descendent: 'elem',
        modifier: 'mods'
      }
    }
  }
}
