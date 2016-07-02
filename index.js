// ------------------------------------
// #POSTCSS - LOAD CONFIG
// ------------------------------------

'use strict'

const config = require('cosmiconfig')

const loadOptions = require('postcss-load-options/lib/loadOptions.js')
const loadPlugins = require('postcss-load-plugins/lib/loadPlugins.js')

module.exports = function loadConfig (options) {
  return config('postcss')
    .catch((error) => console.log(error))
    .then((result) => {
      return {
        plugins: loadPlugins(result.config, options),
        options: loadOptions(result.config, options)
      }
    })
}
