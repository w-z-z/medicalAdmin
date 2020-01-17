/*
 * @Description: 登录路由
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-22 17:19:55
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-14 18:05:26
 */
import template from '@/views/template/index.vue'
export default [{
  name: "product",
  meta: {
    title: "产品库",
    Mid: 'M12',
  },

  icon: "icon-chanpinku",
  isMenu: true,
  path: '/product',
  component: template,
  redirect: '/product/productList',
  children: [{
    meta: {
      title: "产品列表",
      Mid: 'M12',
    },
    icon: "",
    name: "productList",
    path: '/product/productList',
    component: () => import('@/views/product/productList.vue'),
  },
  {
    meta: {
      title: "编辑产品",
      Mid: 'M12',
    },
    icon: "",
    name: "editProduct",
    path: '/product/editProduct/:id',
    component: () => import('@/views/product/editProduct.vue'),
  },
  {
    meta: {
      title: "新增产品",
      Mid: 'M12',
    },
    icon: "",
    name: "addProduct",
    path: '/product/addProduct',
    component: () => import('@/views/product/addProduct.vue'),
  },
  // {
  //   meta: {
  //     title: "产品分类",
  //     Mid: 'M12',
  //   },
  //   icon: "",
  //   name: "productCategory",
  //   path: '/product/productCategory',
  //   component: () => import('@/views/product/productCategory.vue'),
  // },
  ]
},]