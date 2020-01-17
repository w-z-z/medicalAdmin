/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-31 12:28:41
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-31 14:23:37
 */
export default [{
    // 查询列表
    name: 'GetWebSiteList',
    url: '/v1/website/GetWebSiteList',
    methods: "get"
  },
  {
    // 查询列表详情
    name: 'GetWebSiteDetail',
    url: '/v1/website/GetWebSiteDetail',
    methods: "get"
  },
  //更新编辑
  {
    name: "UpdateWebSite",
    url: "/v1/website/UpdateWebSite"
  }

]