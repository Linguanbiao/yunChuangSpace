// 侧边栏个人信息模块共享数据
import {
    getSetting
} from "@/api/setting";
import titleSet from "@/utils/titleSet";
export default {
    namespaced: true, // 开启命名规范
    state: {
        data: null // 数据
    },
    mutations: {
        setData(state, payload) {
            // mutation 函数接受 state 作为第一个参数
            state.data = payload
        }
    },
    actions: {
        // 异步函数
        async fetchData(ctx) { // ctx 为 导出的对象 {}
            const resp = await getSetting();
            ctx.commit("setData", resp) // 不能直接说修改 ct.state.data  = resp ， vuex 中数据的更改必须是 commit 一个 mutation 函数
            if (resp.siteTitle) {
                // 设置网站标题
                titleSet.setSiteTitle(resp.siteTitle)
            }
        }
    }
}