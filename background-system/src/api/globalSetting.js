// 获取关于网站全局配置的信息
import request from "@/utils/request.js"
export function getGlobalSettingApi() {
  return request({
    url: '/api/setting',
    method: 'get',
  })
}

export function modifyGlobalSetting(globalSettingInfo) {
  return request({
    url: '/api/setting',
    method: 'put',
    data: globalSettingInfo
  })
}
