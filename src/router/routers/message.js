/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2019-12-31 14:46:02
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 16:55:39
 */
import template from '@/views/template/index.vue'
export default [{
    name: "newsCenter",
    meta: {
        title: "消息中心",
        Mid: 'M13',
    },
    icon: "",
    path: '/newsCenter',
    component: template,
    redirect: '/newsCenter/notice',
    children: [{
            meta: {
                title: "通知公告",
                Mid: 'M13',
            },
            icon: "",
            parentMID: "M11",
            name: "notice",
            path: '/newsCenter/notice',
            params: {},
            component: () => import('@/views/message/index.vue'),
        },
        {
            meta: {
                title: "新增消息",
                Mid: 'M13',
            },
            icon: "",
            parentMID: "M11",
            name: "addMessage",
            path: '/newsCenter/addMessage',
            component: () => import('@/views/message/addMessage.vue'),
        },
        {
            meta: {
                title: "编辑消息",
                Mid: 'M13',
            },
            icon: "",
            parentMID: "M11",
            name: "editMessage",
            path: '/newsCenter/editMessage/:id',
            component: () => import('@/views/message/editMessage.vue'),
        },
    ]

}, ]