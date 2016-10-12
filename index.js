// ------------------------------------
// #POSTCSS - LOAD CONFIG - INDEX
// ------------------------------------

'use strict'

const config = require('cosmiconfig')

const loadOptions = require('postcss-load-options/lib/options.js')
const loadPlugins = require('postcss-load-plugins/lib/plugins.js')

/**
 * @author Michael Ciniawsky (@michael-ciniawsky) <michael.ciniawsky@gmail.com>
 * @description Autoload Config for PostCSS
 *
 * @module postcss-load-config
 * @version 1.0.0
 *
 * @requires comsiconfig
 * @requires postcss-load-options
 * @requires postcss-load-plugins
 *
 * @method postcssrc
 *
 * @param  {Object} ctx Context
 * @param  {String} path Config Directory
 * @param  {Object} options Config Options
 *
 * @return {Promise} config  PostCSS Plugins, PostCSS Options
 */
module.exports = function postcssrc (ctx, path, options) {
  const defaults = {
    cwd: process.cwd(),
    env: process.env.NODE_ENV
  }

  ctx = Object.assign(defaults, ctx) || defaults
  path = path || process.cwd()
  options = options || {}

  return config('postcss', options)
    .load(path)
    .then(function (result) {
      result = result.config || {}
      return result
    })
    .then(function (config) {
      if (typeof config === 'function') {
        config = config(ctx)
      } else {
        config = Object.assign(config, ctx)
      }

      if (!config.plugins) {
        config.plugins = []
      }

      return {
        plugins: loadPlugins(config),
        options: loadOptions(config)
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}
