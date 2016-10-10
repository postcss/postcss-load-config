// ------------------------------------
// #POSTCSS - LOAD CONFIG
// ------------------------------------

'use strict'

var config = require('cosmiconfig')

var loadOptions = require('postcss-load-options/lib/loadOptions.js')
var loadPlugins = require('postcss-load-plugins/lib/loadPlugins.js')

module.exports = function loadConfig (options) {
  return config('postcss')
    .catch(function (error) {
      console.log(error)
    })
    .then(function (result) {
      return result || {}
    })
    .then(function (result) {
      var config = result.config || { plugins: {} }

      return {
        plugins: loadPlugins(config, options),
        options: loadOptions(config, options)
      }
    })
}
