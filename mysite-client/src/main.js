// 工程入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import showMessage from './utils/showMessage.js'
// import "./mock"
import "./api/banner"
import "./eventBus.js"
import store from './store'



store.dispatch('setting/fetchData')

//全局注册自定义指令
import vlazy from "./directives/lazy.js"
Vue.directive("lazy", vlazy)

new Vue({
  router, // 主入口文件挂载路由实例
  store, // 数据仓库
  render: h => h(App),
}).$mount('#app')