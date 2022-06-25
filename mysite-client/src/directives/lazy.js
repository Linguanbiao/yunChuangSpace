/**
 * 自定义指令 v-lazy ： 用于图片懒加载
 */

import eventBus from "../eventBus.js"
import lazyLoading from "../assets/Search.gif"
import {
    debounce
} from "@/utils/debounce.js"

let imgs = []



function setImag(img) {
    // 为所有图片都先加载一个图片
    img.dom.src = lazyLoading
    // 首先判断图片是否在视口范围内
    const clientHeight = document.documentElement.clientHeight; // 获取视口的高度
    const rect = img.dom.getBoundingClientRect(); // 获取 dom 元素离视口的距离
    const height = rect.height || 150
    if (rect.top >= -height && rect.top <= clientHeight) {
        // 在视口范围内
        img.dom.src = img.src
        // 处理完成以后把当前的图片过滤掉，加载完了以后就不用再继续处理了
        imgs = imgs.filter((i) => i !== img)
    }
}

// 希望使用该方法 ， 就可以设置那些合适的图片 
function setImags() {
    for (let img of imgs) {
        // 循环图片数组里的图片并依次处理图片
        setImag(img)
    }
}

function handleScroll() {
    //监听到页面的滚动条事件，做相应的图片懒加载功能
    setImags()
}

eventBus.$on("mainScroll", debounce(handleScroll, 50))
export default {
    /**
     * bind 为自定义指令的钩子函数，只使用一次，指令第一次绑定到元素上使用，在这里可以进行一次性的初始化设置
     * el : 指令所绑定的元素， 可以用来直接操作 dom
     * bindings : 钩子函数传入的一个参数对象，{name , value , oldValue ...} 具体可以看文档
     */
    inserted(el, bindings) {
        const img = {
            dom: el, // 当前指令绑定的 dom 元素，这里是 img 元素
            src: bindings.value //  img 元素的真实图片地址
        }
        imgs.push(img)
        setImag(img) //立即渲染
    },
    // unbind 为指令与元素解绑，也是只调用一次
    unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el)
    }
}