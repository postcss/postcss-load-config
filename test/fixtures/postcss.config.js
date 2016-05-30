module.exports = {
  parser: 'postcss-less',
  from: 'fixtures/index.less',
  map: 'inline',
  to: 'result.css',
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
