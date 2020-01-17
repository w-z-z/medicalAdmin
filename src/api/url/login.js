/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-31 12:28:41
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-07 19:06:03
 */
export default [
  {
    // 登录
    name: 'login',
    url: '/v1/login/AdminSmsCodeLogin'
  },
  //获取用户详情
  {
    name: "GetAdminUserInfo",
    url: "/v1/admin/GetAdminUserInfo"
  },
  //获取短信验证码
  {
    name: "SendLoginCode",
    url: "/v1/login/SendLoginCode",
  },
  // 忘记密码
  // 检查手机号是否注册1
  {
    name: "CheckMobileRegistered",
    url: "/v1/forget/CheckMobileRegistered"
  },
  // 发送忘记密码短信验证码2
  {
    name: 'SendForgetCode',
    url: '/v1/forget/SendForgetCode'
  },
  // 验证忘记密码短信验证码3
  {
    name: 'CheckForgetCode',
    url: '/v1/forget/CheckForgetCode'
  },
  // 重置密码4
  {
    name: 'ResetPassword',
    url: '/v1/forget/ResetPassword'
  },
  // 修改密码
  {
    name: 'UpdatePassword',
    url: '/v1/admin/UpdatePassword'
  },
  // 退出登录
  {
    name: 'Logout',
    url: '/v1/admin/Logout'
  },
]