const plugin = {
  get postcss () {
    this.called = true
    return () => {}
  },
  postcssPlugin: 'test'
}

const mod = {}
mod.default = plugin
mod.__esModule = true

export default {
  plugins: [mod]
}
