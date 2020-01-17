/*
 * @Description: 导航模块的数据
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 18:00:56
 */
import Service from '@/api/net/http.js'
import Url from '@/api/url/common.js'
import store from '@/store/index.js'
const state = {
  asideActive: "0",
  personActiveNav: "0",
  totalData: {}
}
const mutations = {
  INCREMENT_ASIDE(state, data) {
    state.asideActive = data
  },
  INCREMENT_PSERSON(state, data) {
    state.personActiveNav = data
  },
  INCREMENT_totalData(state, data) {
    state.totalData = data
  },
}
const actions = {
  changeAsideActive({
    commit
  }, data) {
    commit('INCREMENT_ASIDE', data)
  },
  changePersonActiveNav({
    commit
  }, data) {
    commit('INCREMENT_PSERSON', data)
  },
  changeTotalData({
    commit
  }) {
    let option = {}
    //获取数据统计
    Url.map(i => {
      if (i.name == 'GetPersonUserDataCount') {
        option = i
      }
    })
    Service['get'](option.url, {
      params: {
        person_user_id: store.state.user.activeUserDetail.person_user_id
      }
    }).then(res => {
      commit('INCREMENT_totalData', res)
    }).catch(error => {})
  },
}
export default {
  state,
  mutations,
  actions
}