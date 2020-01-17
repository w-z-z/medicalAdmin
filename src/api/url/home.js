/*
 * @Description: 产品模块
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-31 16:37:21
 * @LastEditors  : Seven
 * @LastEditTime : 2020-01-05 18:12:12
 */
export default [
    // 查询基因检测报告统计
    {
        name: 'GetCheckReportCount',
        url: '/v1/home/GetCheckReportCount',
        methods: 'get'
    },
    // 查询总数据统计
    {
        name: 'GetDataTotal',
        url: '/v1/home/GetDataTotal',
        methods: 'get'
    },
    // 查询基因检测报告统计
    {
        name: 'GetHandleCheckReportList',
        url: '/v1/home/GetHandleCheckReportList',
        methods: 'get'
    }
]