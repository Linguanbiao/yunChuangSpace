import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    // 登录页
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    // 首页路由导航
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '控制台',
        icon: 'dashboard',
        auth: true
      }
    }],
  },

  {
    //首页标语导航路由配置
    path: '/banner',
    component: Layout,
    children: [{
      path: 'index',
      name: 'banner',
      component: () => import('@/views/banner/index'),
      meta: {
        title: '首页标语',
        icon: 'el-icon-house',
        auth: true

      }
    }]
  },
  {
    // 博客页路由配置
    path: '/blog',
    component: Layout,
    redirect: '/blogList',
    name: 'blog',
    meta: {
      title: '文章管理',
      icon: 'el-icon-notebook-2'
    },
    children: [{
        path: '/blogList',
        component: () => import('@/views/blog/blogList/index'), // Parent router-view
        name: 'blogList',
        meta: {
          title: '文章列表',
          icon: "el-icon-tickets",
          auth: true
        }
      },
      {
        path: '/blogCategory',
        component: () => import('@/views/blog/blogCategory/index'), // Parent router-view
        name: 'blogCategory',
        meta: {
          title: '文章分类',
          icon: "el-icon-film",
          auth: true
        }
      },
      {
        path: '/addBlog',
        component: () => import('@/views/blog/addBlog/index'), // Parent router-view
        name: 'addBlog',
        meta: {
          title: '添加文章',
          icon: "el-icon-folder-add",
          auth: true
        }
      },
      {
        path: '/editBlog/:id',
        component: () => import('@/views/blog/editBlog/index'), // Parent router-view
        name: 'editBlog',
        hidden: true, // sidebar 隐藏
        meta: {
          title: '编辑文章',
          icon: "el-icon-film",
          auth: true
        }
      },
    ]
  },
  {
    // 项目路由配置
    path: '/project',
    component: Layout,
    redirect: '/projectList',
    name: 'project',
    meta: {
      title: '项目管理',
      icon: 'el-icon-files'
    },
    children: [{
        path: '/projectList',
        component: () => import('@/views/project/projectList/index'), // Parent router-view
        name: 'projectList',
        meta: {
          title: '项目列表',
          icon: "el-icon-reading",
          auth: true
        }
      },
      {
        path: '/addProject',
        component: () => import('@/views/project/addProject/index'), // Parent router-view
        name: 'addProject',
        meta: {
          title: '添加项目',
          icon: "el-icon-folder-add",
          auth: true
        }
      }
    ]
  },
  {
    //评论导航路由配置
    path: '/comment',
    component: Layout,
    children: [{
      path: 'index',
      name: 'comment',
      component: () => import('@/views/comment/index'),
      meta: {
        title: '评论管理',
        icon: 'el-icon-chat-line-square',
        auth: true
      }
    }]
  },
  {
    //留言板导航路由配置
    path: '/message',
    component: Layout,
    children: [{
      path: 'index',
      name: 'message',
      component: () => import('@/views/message/index'),
      meta: {
        title: '留言板管理',
        icon: 'el-icon-message',
        auth: true
      }
    }]
  },
  {
    //关于我导航路由配置
    path: '/about',
    component: Layout,
    children: [{
      path: 'index',
      name: 'about',
      component: () => import('@/views/about/index'),
      meta: {
        title: '关于我',
        icon: 'el-icon-info',
        auth: true
      }
    }]
  },
  {
    //设置导航路由配置
    path: '/setting',
    component: Layout,
    children: [{
      path: 'index',
      name: 'setting',
      component: () => import('@/views/setting/index'),
      meta: {
        title: '设置',
        icon: 'el-icon-setting',
        auth: true
      }
    }]
  },
  //修改密码配置
  {
    path: '/personal',
    component: Layout,
    children: [{
      path: 'index',
      name: 'personal',
      component: () => import('@/views/personal/index'),
      hidden: true,
      meta: {
        title: '修改密码',
        icon: 'el-icon-setting',
        auth: true
      }
    }]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
