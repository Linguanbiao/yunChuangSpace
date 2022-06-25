// 请求首页的服务器数据
import request from './request.js'

export async function getBanner() {
    return await request.get("/api/banner")
}
// getBanner();