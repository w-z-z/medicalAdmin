/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-03 17:57:32
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-05 16:50:25
 */
export default [
    //查询通知列表
    {
        name: "GetNoticeList",
        url: "/v1/notice/GetNoticeList",
        methods: 'get'
    },
    // 新增
    {
        name: 'CreateNotice',
        url: '/v1/notice/CreateNotice'
    },
    // 查询通知详情
    {
        name: 'GetNoticeDetail',
        url: '/v1/notice/GetNoticeDetail',
        methods: 'get'
    },
    // 编辑
    {
        name: 'UpdateNotice',
        url: '/v1/notice/UpdateNotice'
    },
    // 删除
    {
        name: 'DeleteNotice',
        url: '/v1/notice/DeleteNotice'
    }


]