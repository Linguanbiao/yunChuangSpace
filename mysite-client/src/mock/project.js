/**
 * 根据接口模拟 项目 的数据
 */
import Mock from "mockjs"
Mock.mock('/api/project', 'get', {
    code: 0,
    msg: "",
    data: [{
            id: "project1",
            name: '个人博客系统',
            url: 'https://github.com/Linguanbiao/web-interview',
            github: "https://github.com/Linguanbiao/web-interview",
            description: `该博客系统大概包含了以下功能：用户的登录与注册、系统的权限管理、发表编辑博客、博客查阅、博客删除、博客评论、博客点赞、个人信息页展示、
            个人信息的修改、首页信息显示如热门标签、热门用户、热门博客、新发表博客以及所有博客列表，同时会做阅读量、评论量以及点赞量的统计`,
            thumb: "https://cdn.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-1280x720.png",
            order: 1
        }, {
            id: "project2",
            name: '像素鸟',
            url: 'https://github.com/Linguanbiao/-/tree/master/demo%E5%83%8F%E7%B4%A0%E9%B8%9Fm',
            github: "https://github.com/Linguanbiao/-/tree/master/demo%E5%83%8F%E7%B4%A0%E9%B8%9F",
            description: '使用面向对象的编程思想完成像素鸟的游戏demo',
            thumb: "https://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLC6cXiaaHEHxO6IYzYMJTq57RBJBucrlLeibMBh97KNZGNiaxDVnlowBduF9EJDNxibeiaA/600",
            order: 2
        },
        {
            id: "project3",
            name: '用户登录demo',
            url: 'https://github.com/Linguanbiao/Login-vuex',
            github: "https://github.com/Linguanbiao/Login-vuex",
            description: '使用vuex完成了用户的登录逻辑和鉴权功能',
            thumb: "https://developers.line.biz/assets/img/line-login-starter-app-login.182f8863.png",
            order: 3
        },

        {
            id: "project4",
            name: '个人博客管理系统',
            url: 'https://github.com/Linguanbiao/Front-end-development',
            github: "https://github.com/Linguanbiao/Front-end-development",
            description: '个人博客的管理系统，管理博客展示的各个页面',
            thumb: "http://www.luoxudong.com/wp-content/uploads/2018/11/5.png",
            order: 3
        }
    ]
})