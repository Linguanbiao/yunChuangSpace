// 设置一个请求拦截器，每次请求返回的结果会先运行拦截器
import axios from "axios";
import showMessage from "@/utils/showMessage";

const ins = axios.create(); // 创建一个 axios 的实例 , 使用 axios 发送 ajax 请求
ins.interceptors.response.use(function (resp) {
    if (resp.data.code !== 0) { // 设置一个响应的拦截器，判断请求返回的数据是否有错误，有错误就调用 shouMessage()方法提示错误
        console.log(resp.data)
        showMessage({
            content: 'error',
            type: 'error',
            duration: 2000,
        })
        return null;
    }
    return resp.data.data;
});
export default ins; // ins 是一个 axios 实例