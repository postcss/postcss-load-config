// ------------------------------------
// #POSTCSS - LOAD PLUGINS
// ------------------------------------

'use strict'

const path = require('path')

module.exports = function loadPlugins (config, options) {
  if (typeof options === 'string') {
    options = require(path.join(process.cwd(), options))

    for (let option in options) {
      config.plugins[option] = options.plugins[option]
    }
  }

  if (typeof options === 'object') {
    for (let option in options) {
      config.plugins[option] = options.plugins[option]
    }
  }

  if (options === undefined) {
    options = config.plugins
  }

  function load (plugin, options) {
    if (options === null || options === undefined) {
      return require(plugin)()
    }
    return require(plugin)(options)
  }

  let plugins = []

  Object.keys(options).forEach((plugin) => {
    plugins.push(load(plugin, options[plugin]))
  })

  return plugins
}
