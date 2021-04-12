import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout' //布局页



Vue.use(VueRouter)

// 通用页面, 这里的配置不需要权限
export const constRouter = [
  {
      path: '/login',
      component: () => import('@/views/login/Login'),
      hidden: true //导航菜单忽略选项
  },
  {
      path: '',
      component: Layout, //应用布局页
      redirect: '/index',
      hidden: true,
  },
  {
      path: '/index',
      component: Layout, //应用布局页
      name: 'index',
      meta:{
          title: "首页", //导航菜单项标题
          icon: 'el-icon-s-home' //导航菜单图标
      },
      children: [
        {
          path: '',
          component: () => import('@/views/index/index.vue'),
          name: 'indexs',
          meta: {
            title: "工作台",
            icon: 'el-icon-s-home',
            roles: ['admin','jerry']
          }
        }
      ]
  }
]

// 通用页面, 这里的配置不需要权限
export const asyncRoutes = [
  {
      path: '/login',
      component: () => import('@/views/login/Login'),
      hidden: true //导航菜单忽略选项
  },
  {
      path: '',
      component: Layout, //应用布局页
      redirect: '/index/indexzzz',
      hidden: true,
  },
  {
      path: '/index/indexzzz',
      component: Layout, //应用布局页
      name: 'index',
      meta:{
          title: "首页", //导航菜单项标题
          icon: 'el-icon-s-home-FX' //导航菜单图标
      },
      children: [
        {
          path: '',
          component: () => import('@/views/index/indexzzz.vue'),
          name: 'indexs',
          meta: {
            title: "查看日志",
            icon: 'el-icon-s-home-FL',
            roles: ['admin','jerry']
          }
        }
      ]
  }
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router

