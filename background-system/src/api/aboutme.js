// 关于我的数据接口
import request from "@/utils/request"
export function getAboutApi() {
  return request({
    url: '/api/about',
    method: 'get'
  })
}
export function postAboutApi(aboutInfo) {
  return request({
    url: "/api/about",
    method: 'post',
    data: aboutInfo
  })
}
