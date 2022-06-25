// mock.js  拦截请求并模拟服务器返回的全局设置的数据
import Mock from "mockjs"
Mock.mock('/api/setting', 'get', {
    code: 0,
    msg: "",
    data: {
        avatar: "https://avatars.githubusercontent.com/u/43643717?v=4", //头像地址
        siteTitle: "Lin's Blog",
        github: "https://github.com/Linguanbiao",
        qq: '497378774',
        qqQrCode: "https://images-na.ssl-images-amazon.com/images/I/51D+RBq6yLL.png",
        wechat: 'AIL161231',
        wechatCode: "https://www.leadtrend.com.tw/uploads/social-btn/wechat-qrcode.jpg",
        main: "linguanbiao@98.gmail.com",
        icp: '粤ICP备17001719号',
        githubName: 'Linguanbiao',
        favicon: "http://1.bp.blogspot.com/_Fwz1CnXwrew/TOR1mfyRqTI/AAAAAAAAAmk/CqcFnNmt5ig/s1600/blogger_logo.png"
    }
})