import { ProcessOptions } from 'postcss'
import { Config } from '../../src'

function configFromPostcss(map: ProcessOptions['map']): Config {
  return { map }
}

function postcssFromConfig(config: Config): ProcessOptions['map'] {
  return config.map
}

const objectConfig: Config = {
  map: {
    annotation: true,
    inline: false,
    sourcesContent: true
  }
}
const annotationConfig: Config = { map: { annotation: 'output.css.map' } }
const enabledConfig: Config = { map: true }
const disabledConfig: Config = { map: false }
const defaultConfig: Config = {}

// @ts-expect-error PostCSS does not accept a string as the map option.
const stringConfig: Config = { map: 'inline' }
// @ts-expect-error Source map options must use the PostCSS property types.
const invalidConfig: Config = { map: { inline: 'false' } }
