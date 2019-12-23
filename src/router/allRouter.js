/*
 * @Description: 所有的路由配置
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-20 21:25:48
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-23 15:43:47
 */

//  路由模板
import template from '@/views/template/index.vue'
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
  redirect: '/userCener',
  children: [...all_router_model]
}, ...staticRouter]
// 路由拼接获取菜单
// let ALLRouteMenu = []
// const initRouter = function (routerobj) {
//   all_router_model.forEach(element => {
//     //是否是菜单路由
//     if (element.isMenu) {
//       let obj = {
//         name: element.name,
//         path: element.path,
//         Mid: element.Mid,
//         children: []
//       }
//       if (element.children && element.children.length >= 1) {
//         initRouter(element.children)
//       }
//       ALLRouteMenu.push(obj)
//     }
//   });
// }
// initRouter(all)
// console.log(ALLRouteMenu);
export default all