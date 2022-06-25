import requset from "./request"

/**
 * 发送 ajax 请求关于我的组件的数据信息
 */
export async function getAbout() {
    return await requset.get("/api/about")
}