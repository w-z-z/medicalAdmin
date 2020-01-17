/*
 * @Description: 所有的路由配置
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-20 21:25:48
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-02 16:14:22
 */

//  路由模板
import layout from '@/layout/index.vue'
//未登录路由
import staticRouter from './staticRouter'

import store from "@/store"
//登录路由
import personMember from './routers/personMember'
import product from './routers/product'
import home from './routers/home'
import webset from './routers/webset'
import message from './routers/message'

let all_router_model = [...home, ...personMember, ...product, ...webset, ...message] //配置的路由
store.dispatch("changeRouters", all_router_model)
let all = [{
  id: 123456,
  title: "登录路由",
  name: "layout",
  meta: {
    title: "",
  },
  path: '/layout',
  component: layout,
  redirect: '/product',
  children: [...all_router_model]
}, ...staticRouter]




export default all