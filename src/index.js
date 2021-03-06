// Import vue components
import * as components from './lib-components/index'

// install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Object.keys(components).forEach(componentName => {
    Vue.component(componentName, components[componentName])
  })
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// To auto-install when vue is found
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
// export default Component

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
export * from './lib-components/index'
