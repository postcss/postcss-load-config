let plugin: any = () => {
  return {
    postcssPlugin: '5'
  }
}
plugin.postcss = true
plugin.path = __filename

export = plugin
