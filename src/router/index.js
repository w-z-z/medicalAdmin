/*
 * @Description: 路由装载配置
 * @Author: chenwei
 * @Date: 2019-06-04 18:38:00
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 19:24:43
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
  redirect: '/home'
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export const createRouter = () => new Router({
  mode: 'hash',
  routes: routers
})
const router = createRouter();
//路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '精准健康后台管理系统'
  }
  if (to.meta.isStatic) {
    // store.dispatch("changeRouterType", to.meta.hiddenFooter)
    // next()
  }
  //登录问题
  if (store.state.user.userInfo && store.state.user.userInfo.token) {
    next()
  } else {
    if (to.meta.isStatic) {
      // store.dispatch("changeRouterType", to.meta.hiddenFooter)
      next()
    } else {
      if (to.name != 'login') {
        next({
          path: "/login",
          replace: true
        })
      }

    }

  }
})



export default router