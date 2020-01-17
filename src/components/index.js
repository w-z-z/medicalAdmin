/*
 * @Author: ranli
 * @Date: 2019-09-25 16:09:18
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 15:38:34
 * @Description: Description
 */
/**
 * 注册组件到全局
 * 
 */
// 表格组件
// import Table from './BD_table'
import Breadcrumb from './Breadcrumb/index'
// import BD_from from './BD_from/demo'
// import TimePick from './BD_timePick'
let Plugin = {
  install: (Vue) => {
    Vue.component('breadcrumb', Breadcrumb)
  }
}

export default Plugin