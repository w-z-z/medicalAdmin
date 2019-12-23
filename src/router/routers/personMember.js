/*
 * @Description: 会员路由入口文件
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:40:08
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-23 14:08:48
 */
import template from '@/views/template/index.vue'
export default [{
  title: "会员库",
  name: "personMember",
  meta: {
    title: "会员库",
  },
  isMenu: true,
  Mid: 'M11',
  icon: "",
  path: '/personMember',
  component: template,
  redirect: '/personMember/personMemberList',
  children: [{
    title: "会员列表",
    meta: {
      title: "会员列表",
    },
    Mid: 'M1101',
    icon: "",
    parentMID: "M11",
    isMenu: true,
    name: "personMemberList",
    path: '/personMember/personMemberList',
    component: () => import('@/views/person/setUserInfo/index.vue'),
  }, ]
}, ]