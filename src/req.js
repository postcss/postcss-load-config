// eslint-disable-next-line n/no-deprecated-api
const { createRequire, createRequireFromPath } = require('node:module')

function req (name, rootFile) {
  let create = createRequire || createRequireFromPath
  let require = create(rootFile)
  return require(name)
}

module.exports = req
