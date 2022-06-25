/**
 * 
 * @param {当前的时间戳} timestamp 
 * @param {是否显示时-分-秒} showTime 
 * @returns 日期时间
 */
export default function (timestamp, showTime = false) {
    // timestamp ： 时间戳
    const date = new Date(+timestamp); // 添加 + 号是为了转成 数字类型
    // padStart(a , b) 至少要有 a 为， 不足的前面用 b 补充
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');

    let str = `${date.getFullYear()}-${month}-${day}`;
    if (showTime) {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        str += ` ${hour}:${minute}:${second}`;
    }
    return str
}