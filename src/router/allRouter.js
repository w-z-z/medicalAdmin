/*
 * @Description: 所有的路由配置
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-20 21:25:48
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-24 09:29:06
 */

//  路由模板
import layout from '@/layout/index.vue'
//未登录路由
import staticRouter from './staticRouter'


//登录路由
import product from './routers/product'
import personMember from './routers/personMember'

let all_router_model = [...product, ...personMember] //配置的路由
let all = [{
  id: 123456,
  title: "登录路由",
  name: "layout",
  meta: {
    title: "首页",
  },
  path: '/layout',
  component: layout,
  redirect: '/product',
  children: [...all_router_model]
}, ...staticRouter]




export default all