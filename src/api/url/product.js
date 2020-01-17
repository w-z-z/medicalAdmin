/*
 * @Description: 产品模块
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-31 16:37:21
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-07 16:34:47
 */
export default [
  //创建新的产品
  {
    name: "CreateProduct",
    url: "/v1/product/CreateProduct"
  },
  //获取产品详情
  {
    name: "GetProductDetail",
    url: "/v1/product/GetProductDetail",
    methods: "get",
  },
  //获取产品列表
  {
    name: "GetProductList",
    url: "/v1/product/GetProductList",
    methods: "get",
  },
  //编辑产品
  {
    name: "UpdateProduct",
    url: "/v1/product/UpdateProduct"
  },
  // 产品排序
  {
    name: "SortProduct",
    url: "/v1/product/SortProduct"
  },
  // 删除产品
  {
    name: "DeleteProduct",
    url: "/v1/product/DeleteProduct"
  },
  // 产品上架下架
  {
    name: "UpperShelfProduct",
    url: "/v1/product/UpperShelfProduct"
  },
  // 产品推荐
  {
    name: "RecommendProduct",
    url: "/v1/product/RecommendProduct"
  },
  // 置顶
  {
    name: "TopProduct",
    url: "/v1/product/TopProduct"
  },
  // 七牛云token
  {
    name: 'GetQiNiuUploadToken',
    url: '/v1​/upload​/GetQiNiuUploadToken'
  }
]