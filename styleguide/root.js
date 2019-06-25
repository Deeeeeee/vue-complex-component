import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: []
})
export default previewComponent => {
  // https://vuejs.org/v2/guide/render-function.html
  return {
    router,
    render(createElement) {
      return createElement(previewComponent)
    }
  }
}
