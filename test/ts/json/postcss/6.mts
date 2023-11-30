let plugin: any = () => {
  return {
    postcssPlugin: '6'
  }
}
plugin.postcss = true
// @ts-ignore
plugin.path = import.meta.url

export default plugin
