import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'



NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist   这里原本写的是为路由配置了白名单判断是否需要鉴权，这里我们不用


router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置导航的标题
  document.title = getPageTitle(to.meta.title)

  //设置我们的登录鉴权流程
  const hasGetUserInfo = store.getters.user // 获取本地的用户信息
  if (to.meta.auth) {
    //需要鉴权的页面
    if (hasGetUserInfo) {
      //有登录的用户信息， 放行
      next()
    } else {
      const hasToken = localStorage.getItem('adminToken')
      if (hasToken) {
        // 没有登录的用户信息，但是有 本地缓存的 token ,可以根据 token 恢复登录信息，首先要验证 token 是否过期了
        try {
          await store.dispatch('user/getInfo') // 恢复登录状态，成功就放行，失败会被 catch
          next()
          NProgress.done()
        } catch (error) {
          // 进入此分支代表 token 失效了， 要重置 token， 并跳转到登录页面
          await store.dispatch('user/resetToken')
          Message.warning("登录超时，请重新登录")
          next(`/login?redirect${to.path}`)
          NProgress.done
        }
      } else {
        // 没有登录的用户信息，也没有缓存的 token, 那就重定向去 登录页面
        next(`/login?redirect=${to.path}`);
        Message.warning("请先登录")
        NProgress.done()
      }
    }
  } else {
    // 进入该分支表示进入的是不需要鉴权的页面
    if (to.path === '/login' && hasGetUserInfo) {
      //  如果该用户已经登录了，有登录的用户信息了，还要去登录页，那就不用再去了，直接给他跳转到首页
      next('/')
    } else {
      // 没有登录的用户信息，那么就放行
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
