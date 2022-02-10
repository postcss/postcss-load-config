// eslint-disable-next-line node/no-deprecated-api
const { createRequire, createRequireFromPath } = require('module')
const path = require('path')

const req = (moduleId, file) => (createRequire || createRequireFromPath)(path.resolve(file, '_'))(moduleId)

module.exports = req
