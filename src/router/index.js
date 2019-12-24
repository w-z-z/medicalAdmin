/*
 * @Description: 路由装载配置
 * @Author: chenwei
 * @Date: 2019-06-04 18:38:00
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-24 09:27:11
 */



import Vue from 'vue'
import Router from 'vue-router'
import routers from './allRouter'
import store from '@/store'
// store.dispatch("changeRouters", routers)
Vue.use(Router)
/*在跳转之前执行*/

routers.unshift({
  path: '/',
  redirect: '/login'
})
// routers.unshift({ path: '*', component: '/login'})

export const createRouter = () => new Router({
  mode: 'hash',
  routes: routers
})
const router = createRouter();



export default router