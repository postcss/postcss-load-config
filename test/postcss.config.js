module.exports = {
  parser: 'postcss-less',
  map: 'inline',
  from: 'fixtures/index.less',
  to: 'results/index.less.css',
  plugins: {
    'postcss-import': null,
    'postcss-nested': null,
    'postcss-bem': {
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
