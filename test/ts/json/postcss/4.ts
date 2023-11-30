let plugin: any = () => {
  return {
    postcssPlugin: '4'
  }
}
plugin.postcss = true
plugin.path = __filename

export = plugin
