/*
 * @Description: 登录路由
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : ranli
 * @LastEditTime : 2019-12-24 09:05:08
 */
import template from '@/views/template/index.vue'
export default [{
  name: "product",
  meta: {
    title: "产品库",
  },
  Mid: 'M10',
  icon: "",
  isMenu: true,
  path: '/product',
  component: template,
  redirect: '/product/productList',
  children: [{
    meta: {
      title: "产品列表",
    },
    icon: "",
    Mid: 'M1001',
    isMenu: true,
    name: "productList",
    path: '/product/productList',
    component: () => import('@/views/product/productList.vue'),
  }, ]
}, ]