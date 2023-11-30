let plugin = () => {
  return {
    postcssPlugin: '3'
  }
}
plugin.postcss = true
plugin.path = import.meta.url

export default plugin
