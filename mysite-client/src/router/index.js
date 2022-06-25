import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes.js'
import titleSet from "@/utils/titleSet.js"


Vue.use(VueRouter) // Vue.use(插件)  在 Vue 中安装插件
const Router = new VueRouter({
  // 路由配置
  routes, //路由映射配置  路由地址变化进行相应的组件切换
  mode: 'history' // hash history  abstract 
})


// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }



// 添加一个导航守卫， 设置页面标题为路由标题
Router.afterEach((to, from) => {
  /**
   * to : 进入的路由
   * from ；从那里
   */
  if (to.meta.title) {
    // 有路由标题的话就设置路由标题
    titleSet.setRouterTitle(to.meta.title)
  }
})

export default Router; //默认导出路由,