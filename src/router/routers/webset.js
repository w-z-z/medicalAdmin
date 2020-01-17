/*
 * @Description: 登录路由
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 16:55:17
 */
import template from '@/views/template/index.vue'
export default [{
  name: "webset",
  meta: {
    title: "网站管理",
    Mid: 'M14',
  },
  icon: "",
  path: '/webset',
  component: template,
  redirect: '/webset/websetIndex',
  children: [{
      meta: {
        title: "",
        Mid: 'M14',
      },
      icon: "",
      name: "websetIndex",
      path: '/webset/websetIndex',
      component: () => import('@/views/webset/webset/index.vue'),
    },
    {
      meta: {
        title: "网站管理-编辑",
        Mid: 'M14',
      },
      icon: "",
      name: "websetEdit",
      path: '/webset/websetEdit/:name',
      component: () => import('@/views/webset/webset/edit.vue'),
    },
    {
      meta: {
        title: "网站日志",
        Mid: 'M1001',
      },
      icon: "",
      name: "log",
      path: '/webset/log',
      component: () => import('@/views/webset/log/index.vue'),
    },
  ]
}, ]