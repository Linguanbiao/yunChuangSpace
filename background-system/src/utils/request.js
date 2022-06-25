import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor     // 请求的拦截器
service.interceptors.request.use(
  config => {

    // 请求拦截,当本地有 token 的缓存时，那么每次请求都需要把 token 放到请求头中一起带过去给服务器
    const token = localStorage.getItem('adminToken')
    if (token) {
      // 根据接口文档写 
      config.headers['Authorization'] = "Bearer " + token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 根据接口的定义，如果登录成功，那么响应头会有一个 authentication 字段 ， 之后每次请求都需要把这个 token 带到服务器
    if (response.headers.authentication) {
      // 如果响应头里存在这个字段，就存到 localStorag e
      localStorage.adminToken = response.headers.authentication
    }
    return response.data // 直接返回，不需要拦截响应


  },
  // error => {
  //   console.log('err' + error) // for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
)

export default service
