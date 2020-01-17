/*
 * @Description: 首页模块
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-17 14:46:53
 */
import template from '@/views/template/index.vue'
export default [{
  name: "home",
  meta: {
    title: "首页",
    Mid: 'M10',
  },
  icon: "icon-shouye3",
  isMenu: true,
  path: '/home',
  component: () => import('@/views/home/index.vue'),
  // component: () => import('@/views/demo/demo.vue'),
}, ]