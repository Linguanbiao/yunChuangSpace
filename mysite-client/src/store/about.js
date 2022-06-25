/**
 * 将 关于我 请求到数据放在仓库里，省的每次都需要重新请求
 */

import {
    getAbout
} from "@/api/about";
export default {
    namespaced: true,
    state: {
        data: null
    },
    mutations: {
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchData(ctx) { // ctx 为对象
            const resp = await getAbout();
            ctx.commit("setData", resp)
        }
    }
}