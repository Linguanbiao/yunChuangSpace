/** 关于博客文章的一些请求数据的 API */
import request from "@/utils/request.js"
// 分页获取文章
export function getBlogApi(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

// 删除单条博客
export function deleteBlogApi(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}


//添加博客的分类
export function addBlogCategory(data) {
  return request({
    url: "/api/blogtype",
    method: 'post',
    data
  })
}

//获取一个文章的分类
export function getBlogCategory(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get',
  })
}

//获取所有的分类
export function getCategory() {
  return request({
    url: "/api/blogtype",
    method: 'get'
  })
}

//删除文章的分类
export function deleteBlogCategory(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete'
  })
}


// 修改文章的分类
export function modifyBlogCategory(blogInfo) {
  return request({
    url: `/api/blogtype/${blogInfo.id}`,
    method: 'put',
    data: blogInfo
  })
}

// 发布文章
export function postBlog(blogInfo) {
  return request({
    url: "/api/blog",
    method: 'post',
    data: blogInfo
  })
}


//修改文章
export function modifyBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: 'put',
    data: blogInfo.data
  })
}

// 删除文章
export function deleteBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete',
  })
}

// 获取单篇文章
export function getBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get',
  })
}
