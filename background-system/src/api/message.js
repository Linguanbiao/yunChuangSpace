// 获取留言板相关的数据接口

import request from "@/utils/request"
export function postMessageApi(messageInfo) {
  return request({
    url: '/api/message',
    method: 'post',
    data: messageInfo
  })
}

export function getMessageApi(page = 1, limit = 10, keyword = '') {
  return request({
    url: '/api/message',
    method: 'get',
    params: {
      page,
      limit,
      keyword
    }
  })
}

export function deletaMessageApi(message) {
  return request({
    url: `/api/message/${message.id}`,
    method: "delete",
    data: message
  })
}
