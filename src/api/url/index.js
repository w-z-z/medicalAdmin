/*
 * @Description:
 * @Author: knight
 * @Date: 2019-09-19 14:06:47
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-05 17:14:45
 */
/*
 * @Description: 引入所有请求地址
 */

import record from './record'
import login from './login'
import webset from './webset'
import product from './product'
import personMember from './personMember'
import message from './message'
import common from './common'
import home from './home'


export default [
  ...record,
  ...login, ...webset, ...product, ...personMember,
  ...message, ...common, ...home
]