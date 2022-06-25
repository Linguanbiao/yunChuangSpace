/**
 * 
 * @param {运行的函数} fun 
 * @param {时间间隔} duration 
 * @returns 返回一个防抖函数
 */
export function debounce(fun, duration) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fun(...args);
        }, duration)
    }
}

/**
 * 
 * @param {运行的函数} func 
 * @param {等待的时间} duration 
 * @returns 基于时间差的节流函数
 */
export function throttle(func, duration) {
    let pre = 0;
    return function (...args) {
        let now = new Date();
        if (now - pre > duration) {
            func(...args);
            pre = now
        }
    }
}

/**
 * 
 * @param {需要运行的函数} func 
 * @param {等待的时间间隔} duration 
 * @returns 一个基于记数的截流函数
 */
export function throttleCount(func, duration) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            func(...args);
            timer = setTimeout(() => {
                timer = null;
            }, duration)
        }
    }
}