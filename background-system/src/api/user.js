import request from '@/utils/request'

export function loginApi(data) {
  // 登录时发送 ajax 请求
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

export function getInfoApi() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

// 更新管理员账号密码
export function updateAdminApi(adminInfo) {
  return request({
    url: '/api/admin',
    method: 'put',
    data: adminInfo
  })
}
