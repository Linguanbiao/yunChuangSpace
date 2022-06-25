/**
 * 控制页面显示的标题工具文件
 */

// 声明两个变量保存标题
var routerTitle = '';
var siteTitle = '';

function setTitle(routerTitle, siteTitle) {
    if (!routerTitle && !siteTitle) {
        document.title = 'Loading'
    } else if (!routerTitle && siteTitle) {
        document.title = siteTitle
    } else if (routerTitle && !siteTitle) {
        document.title = routerTitle
    } else {
        document.title = `${routerTitle}-${siteTitle}`
    }

}

export default {
    // 设置路由标题
    setRouterTitle(title) {
        routerTitle = title //  保存数据，方便后面一起显示标题
        setTitle(routerTitle, siteTitle)


    },
    //设置网站标题
    setSiteTitle(title) {
        siteTitle = title
        setTitle(routerTitle, siteTitle)
    }
}