/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-01-03 20:03:11
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-07 15:01:29
 */
export default [
  //获取token
  {
    name: 'GetQiNiuUploadToken',
    url: "/v1/upload/GetQiNiuUploadToken",
  },
  //获取检测项目
  // {
  //   name: 'GetProductList',
  //   url: "/v1/product/GetProductList",
  // },
  //数据统计
  {
    name: "GetPersonUserDataCount",
    url: "/v1/person/GetPersonUserDataCount",
    methods: "get"
  },

]