const plugin = {
  postcssPlugin: 'test',
  get postcss () {
    this.called = true
    return () => {}
  }
}

const mod = {}
mod.default = plugin
mod.__esModule = true

export default {
  plugins: [mod]
}
