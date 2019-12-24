/*
 * @Description: user模块的数据
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-24 09:18:48
 */

const state = {
  userInfo: {
    // name:"",
    // type:"",//1 个人企业
  },
  currentRouterType: 0, //0表示不用显示1表示显示
  routers: []
}
const mutations = {
  INCREMENT_CHANGEUSERINFO(state, data) {
    state.userInfo = data
  },
  CHANGE_ROUTER(state, routers) {
    state.routers = routers
  },
  CURRENT_ROUTERTYPE(state, data) {
    state.currentRouterType = data
  }
}
const actions = {
  changeUserInfo({
    commit
  }, data) {
    commit('INCREMENT_CHANGEUSERINFO', data)
  },
  //更改路由配置
  changeRouters({
    commit
  }, data) {
    commit('CHANGE_ROUTER', data)
  },
  changeRouterType({
    commit
  }, data) {
    commit('CURRENT_ROUTERTYPE', data)
  },

}
export default {
  state,
  mutations,
  actions
}