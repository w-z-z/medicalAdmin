/*
 * @Description: 会员路由入口文件
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-23 12:40:08
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 20:25:20
 */
import template from '@/views/template/index.vue'
export default [{
  name: "personMember",
  meta: {
    title: "会员库",
    Mid: 'M11',
  },
  isMenu: true,
  icon: "icon-huiyuanku",
  path: '/personMember',
  component: template,
  redirect: '/personMember/personMemberList',
  children: [{
      meta: {
        title: "会员管理",
        Mid: 'M11',
      },
      icon: "",
      parentMID: "M11",
      name: "personMemberList",
      path: '/personMember/personMemberList',
      component: () => import('@/views/personMember/personMemberList.vue'),
    },
    {
      meta: {
        title: "会员名称",
        Mid: 'M11',
      },
      icon: "",
      parentMID: "M11",
      name: "personDetail",
      path: '/personMember/personDetail',
      redirect: '/personMember/personDetail/healthReport/healthReportList',
      component: template,
      children: [{
          meta: {
            title: "健康档案",
            Mid: 'M11',
          },
          icon: "",
          parentMID: "M11",
          name: "healthReport",
          path: '/personMember/personDetail/healthReport',
          redirect: '/personMember/personDetail/healthReport/healthReportList',
          component: template,
          children: [{
              meta: {
                title: "",
                Mid: 'M11',
              },
              icon: "",
              parentMID: "M11",
              name: "healthReportList",
              path: '/personMember/personDetail/healthReport/healthReportList',
              component: () => import('@/views/personMember/model/healthReport/index.vue'),
            },
            {
              meta: {
                title: "新建健康档案",
                Mid: 'M11',
              },
              icon: "",
              parentMID: "M11",
              name: "addHealthReport",
              path: '/personMember/personDetail/healthReport/addHealthReport',
              component: () => import('@/views/personMember/model/healthReport/addRecord.vue'),
            }, {
              meta: {
                title: "编辑健康档案",
                Mid: 'M11',
              },
              icon: "",
              parentMID: "M11",
              name: "editHealthReport",
              path: '/personMember/personDetail/healthReport/editHealthReport/:id',
              component: () => import('@/views/personMember/model/healthReport/addRecord.vue'),
            }
          ]
        },
        {
          meta: {
            title: "体检报告",
            Mid: 'M11',
          },
          icon: "",
          parentMID: "M11",
          name: "MedicalReports",
          path: '/personMember/personDetail/MedicalReports',
          component: () => import('@/views/personMember/model/MedicalReports/index.vue'),
        },
        {
          meta: {
            title: "知情同意书",
            Mid: 'M11',
          },
          icon: "",
          parentMID: "M11",
          name: "InformedConsent",
          path: '/personMember/personDetail/InformedConsent',
          component: () => import('@/views/personMember/model/InformedConsent/index.vue'),
        },
        {
          meta: {
            title: "检测报告",
            Mid: 'M11',
          },
          icon: "",
          parentMID: "M11",
          name: "GeneTestReport",
          path: '/personMember/personDetail/GeneTestReport',
          component: () => import('@/views/personMember/model/GeneTestReport/index.vue'),
        },
        {
          meta: {
            title: "样本登记表",
            Mid: 'M11',
          },
          icon: "",
          parentMID: "M11",
          name: "sampleForm",
          path: '/personMember/personDetailLayOut/sampleForm',
          component: () => import('@/views/personMember/model/sampleForm/index.vue'),
        },
      ]
    },

  ]
}]