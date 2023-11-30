const req = require('./req.js')

/**
 * Plugin Loader
 *
 * @private
 * @method load
 *
 * @param  {String} plugin PostCSS Plugin Name
 * @param  {Object} options PostCSS Plugin Options
 *
 * @return {Function} PostCSS Plugin
 */
function load(plugin, options, file) {
  try {
    if (
      options === null ||
      options === undefined ||
      Object.keys(options).length === 0
    ) {
      return req(plugin, file)
    } else {
      return req(plugin, file)(options)
    }
  } catch (err) {
    throw new Error(
      `Loading PostCSS Plugin failed: ${err.message}\n\n(@${file})`
    )
  }
}

/**
 * Load Plugins
 *
 * @private
 * @method plugins
 *
 * @param {Object} config PostCSS Config Plugins
 *
 * @return {Array} plugins PostCSS Plugins
 */
function plugins(config, file) {
  let list = []

  if (Array.isArray(config.plugins)) {
    list = config.plugins.filter(Boolean)
  } else {
    list = Object.keys(config.plugins)
      .filter(plugin => {
        return config.plugins[plugin] !== false ? plugin : ''
      })
      .map(plugin => {
        return load(plugin, config.plugins[plugin], file)
      })
  }

  if (list.length && list.length > 0) {
    list.forEach((plugin, i) => {
      if (plugin.default) {
        plugin = plugin.default
      }

      if (plugin.postcss === true) {
        plugin = plugin()
      } else if (plugin.postcss) {
        plugin = plugin.postcss
      }

      if (
        // eslint-disable-next-line
        !(
          (typeof plugin === 'object' && Array.isArray(plugin.plugins)) ||
          (typeof plugin === 'object' && plugin.postcssPlugin) ||
          typeof plugin === 'function'
        )
      ) {
        throw new TypeError(
          `Invalid PostCSS Plugin found at: plugins[${i}]\n\n(@${file})`
        )
      }
    })
  }

  return list
}

module.exports = plugins
