/*
 * @Description: user模块的数据
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-06 11:58:13
 */

import Service from '@/api/net/http.js'
import Url from '@/api/url/product.js'
const state = {
  getProductList: "",
}
const mutations = {
  INCREMENT_PRO(state, data) {
    state.getProductList = data
  },
}
const actions = {
  changeProductList({
    commit
  }) {
    let option = {}
    //获取产品下拉列表
    Url.map(i => {
      if (i.name == 'GetProductList') {
        option = i
      }
    })
    Service['get'](option.url, {
      params: {
        page_no: 1,
        page_size: 2000,
      }
    }).then(res => {
      let obj = {}
      res.data.forEach(element => {
        obj[element.product_id] = element["product_name"]
      });
      commit('INCREMENT_PRO', obj)
    }).catch(error => {})
  },
}
export default {
  state,
  mutations,
  actions
}