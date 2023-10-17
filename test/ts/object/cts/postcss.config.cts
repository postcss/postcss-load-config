import { ConfigFn } from '../../../src';

const config: ConfigFn = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  syntax: ctx.syntax ? 'sugarss' : false,
  map: ctx.map ? 'inline' : false,
  from: './test/ts/object/fixtures/index.css',
  to: './test/ts/object/expect/index.css',
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    cssnano: ctx.env === 'production' ? {} : false
  }
})

export = config;
