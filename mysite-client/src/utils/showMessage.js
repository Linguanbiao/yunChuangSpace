import getComponentRootDom from "./getComponentRootDom.js"
import styles from './showMessage.module.less'
import Icon from '../components/icon.vue'

/**
 * 弹出消息，这里不做成 vue 组件，做成 vue 组件反而做复杂了
 * @param {String} content  消息内容
 * @param {String} type 消息类型 这里我们项目有四种消息类型  info  error  success  warm
 * @param {Number} duration  多久以后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中，如果不传，则默认显示到页面正中
 */
export default function (opations = {}) {
    const content = opations.content || '';
    const type = opations.type || 'info';
    const duration = opations.duration || 2000;
    const container = opations.container || document.body;
    const div = document.createElement('div'); // 创建消息提示 div Dom 元素
    const iconDom = getComponentRootDom(Icon, {
        type
    }) // 获得 Icon 的 dom 元素

    // 设置了消息 div 的样式
    div.innerHTML = `<span class = ${styles.icon}>${iconDom.outerHTML}</span><div>${content}</div>`;

    const typeClassName = styles[`message-${type}`] // 这里使用的是 css module 保证类名样式不会冲突, 根据消息的类型渲染样式 ， 因此前面要加上 styles ，styles 在前面通过 css module 的形式导入了 ,
    div.className = `${styles.message} ${typeClassName}`;

    // 将 div 加入到容器之中,位置要在容器中居中, 查看 container 的 position 是否更改过，默认的 position 属性为 static
    if (opations.container) {
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
    }

    container.appendChild(div);
    //强行渲染一次，不然无法显示出现的动态效果，style 会被下面的样式代码覆盖，因此在这里先强行让消息元素先渲染一次
    div.offsetWidth // 查询某些属性或调用某些计算方法：offsetWidth、offsetHeight等会导致 reflow

    //回归消息元素到正常状态
    div.style.opacity = 1;
    div.style.transform = `translate(-50% , -50%)`;

    setTimeout(() => { // setTimeout 是异步的，在宏队列中
        div.style.opacity = 0;
        div.style.transform = `translate(-50% , -50%) translateY(-25px)`;
        div.addEventListener('transitionend', function () {
            div.remove;
            // opations.callback() //  元素消失，如果传了回调就要执行回调函数
        }, {
            once: true
        }) // 消失时顺便把元素也删除了, 执行一次
    }, duration)
}