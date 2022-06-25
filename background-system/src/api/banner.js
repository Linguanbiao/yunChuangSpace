// 请求首页标语
import request from '@/utils/request'

export function getBanners() {
  // 请求首页标语时发送 ajax 请求
  return request({
    url: '/api/banner',
    method: 'get',
  })
}

// 设置首页标语
export function setBanners(data) {
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}
