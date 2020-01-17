/*
 * @Description: user模块的数据
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 18:01:36
 */
import router from '../../router/index'
import {
  createRouter
} from "@/router/index";
import Vue from 'vue'
const state = {
  userInfo: {
    // name:"",
    // type:"",//1 个人企业
  },
  currentRouterType: 0, //0表示不用显示1表示显示
  routers: [],
  activeUserDetail: "",
}
const mutations = {
  INCREMENT_CHANGEUSERINFO(state, data) {
    state.userInfo = data
  },
  CHANGE_ROUTER(state, routers) {
    state.routers = routers
  },
  //添加路由
  ADD_ROUTER(state, addRouter) {
    if (!router.hasAddRouter) {
      router.addRoutes(addRouter)
      router.hasAddRouter = true;
    }
  },
  //是否显示页脚
  CURRENT_ROUTERTYPE(state, data) {
    state.currentRouterType = data
  },
  USERROUTERTYPE(state, data) {
    state.type = data
  },
  //激活的用户id
  ACTIVE_USERDETAIL(state, data) {
    state.activeUserDetail = data
  }
}
const actions = {
  //更改路由配置
  changeRouters({
    commit
  }, data) {
    commit('CHANGE_ROUTER', data)
  },
  changeUserInfo({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      commit('INCREMENT_CHANGEUSERINFO', data)
      resolve()
    })
  },
  addRouters({
    commit
  }, data) {
    commit('ADD_ROUTER', data)
  },
  //用户路由Type
  userRouterType({
    commit
  }, data) {
    commit('CURRENT_ROUTERTYPE', data)
  },

  //激活的用户id
  changeActiveUserDetail({
    commit
  }, data) {
    commit('ACTIVE_USERDETAIL', data)
  },






  //清空用户数据
  clearAllUserData({
    commit
  }, data) {
    //清楚用户数据
    commit('INCREMENT_CHANGEUSERINFO', null)
    //跟换路由
    // router.hasAddRouter = false
    // commit('ADD_ROUTER', null)
    //重新匹配路由
    // router.matcher = createRouter().matcher;
    Vue.prototype.$showMsg("登录失效")
    //回到登录页
    router.push({
      name: "login"
    });
  }
}
export default {
  state,
  mutations,
  actions
}