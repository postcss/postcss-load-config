// eslint-disable-next-line node/no-deprecated-api
const { createRequire, createRequireFromPath } = require('module')
const path = require('path')

function req (name, rootFile) {
  const create = createRequire || createRequireFromPath
  const require = create(path.resolve(rootFile, '_'))
  return require(name)
}

module.exports = req
