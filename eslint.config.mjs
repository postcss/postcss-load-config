import loguxConfig from '@logux/eslint-config'

export default [
  ...loguxConfig,
  {
    files: ['test/**/*.js', 'test/**/*.cjs'],
    rules: {
      'n/global-require': 'off',
      'n/no-missing-require': 'off'
    }
  }
]
