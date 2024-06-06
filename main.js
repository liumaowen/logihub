
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
// 引入请求封装，将app参数传递到配置中
require('common/config.js')(app)

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uvUI from '@climblee/uv-ui'
import App from './App.vue'
import { initRequest } from '@/utils/request/index'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uvUI)
  // 引入请求封装
  initRequest(app)
  return {
    app
  }
}
// #endif