// @ts-check
const { createRequire } = require('node:module')

const TS_EXT_RE = /\.(c|m)?ts$/

/** @type {import('jiti').default | null} */
let jiti = null

/**
 * @param {string} name
 * @param {string} rootFile
 * @returns {Promise<any>}
 */
async function req(name, rootFile = __filename) {
  let __require = createRequire(rootFile)
  let url = __require.resolve(name)

  try {
    return (await import(url)).default
  } catch (err) {
    if (!TS_EXT_RE.test(url)) {
      /* c8 ignore start */
      throw err
    }
    if (!jiti) {
      try {
        jiti = (await import('jiti')).default
      } catch (jitiErr) {
        throw new Error(
          `'jiti' is required for the TypeScript configuration files. Make sure it is installed\nError: ${jitiErr.message}`
        )
      }
      /* c8 ignore stop */
    }
    return jiti(rootFile, { interopDefault: true })(name)
  }
}

module.exports = req
