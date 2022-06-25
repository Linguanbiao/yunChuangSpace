// 请求博客页的服务器数据
/**
 * @function getBlogs 请求博客内容的数据（放在中间主要部分）
 * @function getBlogTypes  请求博客类别内容（放在侧边导航栏）
 */
import request from './request.js'


//分页获取文章
export async function getBlogs(page = 1, limit = 10, catagoryid = -1) {
    return await request.get("/api/blog", {
        params: {
            page,
            limit,
            catagoryid
        },
    })
}

//获取文章分类情况
export async function getBlogTypes() {
    return await request.get("/api/blogtype");
}

//获取单篇博客
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`)
}

// 提交评论
export async function postComment(commentInfo) {
    return await request.post(`/api/comment`, commentInfo);
}

// 分页获取获取评论
export async function getComment(blogid, page = 1, limit = 10) {
    return await request.get("/api/comment", {
        params: {
            blogid,
            page,
            limit,
        }
    })
}