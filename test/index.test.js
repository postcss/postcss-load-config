// ------------------------------------
// #POSTCSS - LOAD OPTIONS - TEST
// ------------------------------------

'use strict'

const fs = require('fs')

const postcss = require('postcss')
const postrc = require('../index')()

const css = fs.readFileSync('./fixtures/index.css', 'utf8')
const sss = fs.readFileSync('./fixtures/index.sss', 'utf8')

postrc.then(({plugins, options}) => {
  console.log(plugins)
  console.log(options)
  postcss(plugins)
    .process(sss, options)
    .then(result => {
      console.log(result.css)
      fs.writeFileSync('./result.css', result.css)
    })
})
