/*
 * @Author: ranli
 * @Date: 2019-09-11 17:49:40
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 10:35:36
 * @Description: Description
 */
/**
 * 全局配置
 *
 */

// 基础信息配置
export const appConfig = {
  // 版本号
  version: '1.0.0',
  // 缓存配置(window.sessionStorage或者window.localStorage)
  storage: window.localStorage,
  // 超时设置
  TIMEOUT: 100000,
  UnLoginCode: "AuthorizationServerError",
  // 接口请求
  //配置已转入环境变量里这下面配置不生效
  // requesUrl: 'http://120.79.21.155:8200/', //测试环境
  // requesUrl: 'http://120.79.21.155:8201/', //正式环境
  // requesImgUrl: 'http://file.pms.sc.cn/'
}