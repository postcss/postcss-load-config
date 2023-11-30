const { resolve } = require('node:path')
const url = require('node:url')

const config = require('lilconfig')
const yaml = require('yaml')

const loadOptions = require('./options.js')
const loadPlugins = require('./plugins.js')

const TS_EXT_RE = /\.(c|m)?ts$/

const interopRequireDefault = obj =>
  obj && obj.__esModule ? obj : { default: obj }

/**
 * Process the result from cosmiconfig
 *
 * @param  {Object} ctx Config Context
 * @param  {Object} result Cosmiconfig result
 *
 * @return {Object} PostCSS Config
 */
function processResult(ctx, result) {
  let file = result.filepath || ''
  let projectConfig = interopRequireDefault(result.config).default || {}

  if (typeof projectConfig === 'function') {
    projectConfig = projectConfig(ctx)
  } else {
    projectConfig = Object.assign({}, projectConfig, ctx)
  }

  if (!projectConfig.plugins) {
    projectConfig.plugins = []
  }

  let res = {
    file,
    options: loadOptions(projectConfig, file),
    plugins: loadPlugins(projectConfig, file)
  }
  delete projectConfig.plugins
  return res
}

/**
 * Builds the Config Context
 *
 * @param  {Object} ctx Config Context
 *
 * @return {Object} Config Context
 */
function createContext(ctx) {
  /**
   * @type {Object}
   *
   * @prop {String} cwd=process.cwd() Config search start location
   * @prop {String} env=process.env.NODE_ENV Config Enviroment, will be set to `development` by `postcss-load-config` if `process.env.NODE_ENV` is `undefined`
   */
  ctx = Object.assign(
    {
      cwd: process.cwd(),
      env: process.env.NODE_ENV
    },
    ctx
  )

  if (!ctx.env) {
    process.env.NODE_ENV = 'development'
  }

  return ctx
}

/** @type {import('jiti').JITI | null} */
let jiti = null

async function loader(filepath) {
  try {
    let module = await import(url.pathToFileURL(filepath).href)
    return module.default
  } catch (err) {
    /* c8 ignore start */
    if (!TS_EXT_RE.test(filepath)) {
      throw err
    }
    if (!jiti) {
      try {
        jiti = (await import('jiti')).default(__filename, {
          interopDefault: true
        })
      } catch (jitiErr) {
        if (
          jitiErr.code === 'ERR_MODULE_NOT_FOUND' &&
          jitiErr.message.includes("Cannot find package 'jiti'")
        ) {
          throw new Error(
            `'jiti' is required for the TypeScript configuration files. Make sure it is installed\nError: ${jitiErr.message}`
          )
        }
        throw jitiErr
      }
      /* c8 ignore stop */
    }
    return jiti(filepath)
  }
}

const withLoaders = (options = {}) => {
  let moduleName = 'postcss'

  return {
    ...options,
    loaders: {
      ...options.loaders,
      '.cjs': loader,
      '.cts': loader,
      '.js': loader,
      '.mjs': loader,
      '.mts': loader,
      '.ts': loader,
      '.yaml': (filepath, content) => yaml.parse(content),
      '.yml': (filepath, content) => yaml.parse(content)
    },
    searchPlaces: [
      ...(options.searchPlaces || []),
      'package.json',
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.ts`,
      `.${moduleName}rc.cts`,
      `.${moduleName}rc.mts`,
      `.${moduleName}rc.js`,
      `.${moduleName}rc.cjs`,
      `.${moduleName}rc.mjs`,
      `${moduleName}.config.ts`,
      `${moduleName}.config.cts`,
      `${moduleName}.config.mts`,
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`,
      `${moduleName}.config.mjs`
    ]
  }
}

/**
 * Load Config
 *
 * @method rc
 *
 * @param  {Object} ctx Config Context
 * @param  {String} path Config Path
 * @param  {Object} options Config Options
 *
 * @return {Promise} config PostCSS Config
 */
function rc(ctx, path, options) {
  /**
   * @type {Object} The full Config Context
   */
  ctx = createContext(ctx)

  /**
   * @type {String} `process.cwd()`
   */
  path = path ? resolve(path) : process.cwd()

  return config
    .lilconfig('postcss', withLoaders(options))
    .search(path)
    .then(result => {
      if (!result) {
        throw new Error(`No PostCSS Config found in: ${path}`)
      }
      return processResult(ctx, result)
    })
}

/**
 * Autoload Config for PostCSS
 *
 * @author Michael Ciniawsky @michael-ciniawsky <michael.ciniawsky@gmail.com>
 * @license MIT
 *
 * @module postcss-load-config
 * @version 2.1.0
 *
 * @requires comsiconfig
 * @requires ./options
 * @requires ./plugins
 */
module.exports = rc
