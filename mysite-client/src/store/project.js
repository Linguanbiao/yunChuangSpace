/**
 * 项目是不经常变动的，因此数据放在仓库里
 */
import {
    getProject
} from "@/api/project";
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
        async fetchProject(ctx) {
            const resp = await getProject();
            ctx.commit("setData", resp)
        }
    }
}