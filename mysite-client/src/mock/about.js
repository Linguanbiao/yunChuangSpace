/**
 * 利用 mockjs 拦截请求并模拟数据库返回的关于我组件的数据
 * 这里没有做自己的关于我，返回的是一个外部连接，展示在组件上的 iframe
 */
import Mock from "mockjs"
Mock.mock("/api/about", 'get', {
    code: 0,
    msg: '',
    data: "https://www.strml.net/"
})