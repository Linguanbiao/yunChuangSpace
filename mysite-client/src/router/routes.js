/** 导出路由匹配规则 */

import HomePage from '@/views/HomePage';
import About from '@/views/About';
import Message from '@/views/Message';
import Blog from '@/views/Blog';
import Project from '@/views/Project';
import Details from "@/views/Blog/Details"

export default [
  //当匹配到路径 / 时，渲染 HomePage 组件
  {
    path: "/",
    component: HomePage,
    meta: {
      // meta 里面的内容是自定义的，描述当前路由的特殊性
      title: "首页"
    }
  },
  //当匹配到路径 /blog 时，渲染 Blog 组件
  {
    path: "/blog",
    component: Blog,
    meta: {
      title: "文章"
    }
  },
  //当匹配到路径 /blog/cate/:categoryId 时，渲染 Blog 组件
  // categoryId 是动态绑定的
  {
    path: "/blog/cate/:categoryId",
    component: Blog,
    meta: {
      title: "文章"
    }
  },
  {
    path: "/blog/:id",
    component: Details,
    meta: {
      title: "文章详情"
    }
  },
  //当匹配到路径 /about 时，渲染 About 组件
  {
    path: "/about",
    component: About,
    meta: {
      title: '关于我'
    }
  },
  //当匹配到路径 /porject 时，渲染 Project 组件
  {
    path: "/project",
    component: Project,
    meta: {
      title: "项目&效果"
    }
  },
  //当匹配到路径 /message 时，渲染 Message 组件
  {
    path: "/message",
    component: Message,
    meta: {
      title: "留言板"
    }
  },
  {

    path: '*',
    redirect: '/404',

  }
]