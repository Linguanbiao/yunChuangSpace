//  获取验证码
import request from "@/utils/request"
export function getCaptcha() {
  return request({
    url: '/res/captcha', // 根据我们的借口文档进行请求
    method: 'get',
  })
}
