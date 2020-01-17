/*
 * @Description: vuex的getter文件
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-20 23:56:20
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 17:34:27
 */
export default {
   getUserInfo: (state) => {
      return state.user.userInfo
   },
   getRouters: (state) => {
      return state.user.routers
   },
   getToken: (state) => {
      return state.user.userInfo.token
   },
   getCurrentRouterType: (state) => {
      return state.user.currentRouterType
   },
   getActiveUser: (state) => {
      return state.user.activeUserDetail
   },
   getProductList: (state) => {
      return state.product.getProductList
   },
   getAsideActive: (state) => {
      return state.nav.asideActive
   },
   getPersonActiveNav: (state) => {
      return state.nav.personActiveNav
   },
   getTotalData: (state) => {
      return state.nav.totalData
   }
}