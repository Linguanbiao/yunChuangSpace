// //事件总线, 事件总线也是一种组件之间的通信方式，非常的灵活， 不只是说父子组件之间，各种关系的组件之间的通信都可以通过事件总线实现

// const listeners = {}
// export default {
//     // 监听某个事件
//     $on(eventName, handler) {
//         if (!listeners[eventName]) {
//             listeners[eventName] = new Set();
//         }
//         // 不止一个函数在监听该事件， 这里为该事件多添加一个监听操作函数
//         listeners[eventName].add(handler);
//     },
//     // 删除一个见监听事件
//     $off(eventName, handler) {
//         if (!listeners[eventName]) {
//             return
//         }
//         // 删除该事件的一个监听操作
//         listeners[eventName].delete(handler);

//     },
//     //触发一个事件
//     $emit(eventName, ...args) {
//         if (!listeners[eventName]) {
//             return
//         }
//         // 触发一个监听事件，那么所有监听了这个事件的操作都会触发
//         for (const handler of listeners[eventName]) {
//             handler(...args)
//         }
//     }
// }

/**
 * 事件总线还有下面这样一种实现方法，就是 vue 里面自动实现的上面 $on $off $emit 三个犯法，不需要我们自己封装
 * 事件名： mainScroll 
 * 含义： 主区域滚动条位置变化后触发
 * 参数:
 * - 滚动的 dom 元素， 如果是undefined ， 则便是 dom 元素已经不存在
 *
 * 
 * 事件名: setMianScroll
 * 含义: 当需要设置主区域的滚动条的位置时触发
 * 参数:
 * - 期望的滚动高度
 */
import Vue from "vue";
const app = new Vue({})
Vue.prototype.$bus = app // 这样在 Vue 原型上注册可以让 vue 内部组件随意调用

export default app // 导出 app 这样就可以让 js 等也调用