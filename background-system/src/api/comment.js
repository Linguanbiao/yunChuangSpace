// 关于和评论相关的数据请求
import request from "@/utils/request"

// 分页获取评论
export function getCommentsApi(page = 1, limit = 10, blogid = -1, keyword = '') {
  return request({
    url: '/api/comment',
    method: 'get',
    params: {
      page,
      limit,
      blogid,
      keyword
    }
  })
}

export function addCommentApi(blogInfo) {
  return request({
    url: '/api/comment',
    method: 'post',
    data: blogInfo
  })
}

export function deleteCommentApi(id) {
  return request({
    url: `/api/comment/${id}`,
    method: 'delete'
  })
}
