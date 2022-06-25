/**
 * 利用 vuex 导出一个共享数据仓库
 */
import Vuex from "vuex"
import Vue from "vue"
import setting from './setting.js'
import about from "./about.js"
import project from "./project.js"
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        setting,
        about,
        project
    }
})