import request from "./request.js"
// 获取全局数据
export async function getSetting() {
    return await request.get("/api/setting");

}