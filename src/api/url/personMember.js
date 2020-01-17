/*
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-01-02 14:30:56
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-15 15:41:39
 */
export default [{
    // 查询列表
    name: 'GetPersonUserList',
    url: "/v1/person/GetPersonUserList",
    methods: "get"
  },
  {
    // 添加会员
    name: 'CreatePersonUser',
    url: '/v1/person/CreatePersonUser',
  },
  {
    // 编辑会员状态
    name: 'UpdateAccountStatus',
    url: '/v1/person/UpdateAccountStatus',

  },
  //更新编辑
  {
    name: "UpdatePersonUser",
    url: "/v1/person/UpdatePersonUser"
  },
  //健康档案--添加
  {
    name: "CreateHealthRecord",
    url: "/v1/health/CreateHealthRecord"
  },
  //健康档案--删除
  {
    name: "DeleteHealthRecord",
    url: "/v1/health/DeleteHealthRecord"
  },
  //健康档案--查询详情
  {
    name: "GetHealthRecordDetail",
    url: "/v1/health/GetHealthRecordDetail",
    methods: "get"
  },
  //健康档案--列表
  {
    name: "GetHealthRecordList",
    url: "/v1/health/GetHealthRecordList",
    methods: "get"
  },
  //健康档案--编辑
  {
    name: "UpdateHealthRecord",
    url: "/v1/health/UpdateHealthRecord"
  },
  //体检报告--列表
  {
    name: "GetPhysicalExaminationReportList",
    url: "/v1/health/GetPhysicalExaminationReportList",
    methods: "get"
  },
  //体检报告--详情
  {
    name: "GetPhysicalExaminationReportFileList",
    url: "/v1/health/GetPhysicalExaminationReportFileList",
    methods: "get"
  },
  //体检报告--删除
  {
    name: "DeletePhysicalExaminationReport",
    url: "/v1/health/DeletePhysicalExaminationReport"
  },
  //体检报告--获取文件列表
  {
    name: "GetPhysicalExaminationReportFileByIds",
    url: "/v1/health/GetPhysicalExaminationReportFileByIds"
  },
  //知情同意书--列表
  {
    name: "GetConsentFormList",
    url: "/v1/health/GetConsentFormList",
    methods: "get"
  },
  //知情同意书--新增
  {
    name: "CreateConsentForm",
    url: "/v1/health/CreateConsentForm",
  },
  //知情同意书--编辑
  {
    name: "UpdateConsentForm",
    url: "/v1/health/UpdateConsentForm",
  },
  //知情同意书--删除
  {
    name: "DeleteConsentForm",
    url: "/v1/health/DeleteConsentForm",
  },
  //知情同意书--查询列表
  {
    name: "GetConsentFormList",
    url: "/v1/health/GetConsentFormList",
    methods: "get"
  },
  //检测项目--列表
  {
    name: "GetCheckReportList",
    url: "/v1/health/GetCheckReportList",
    methods: "get"
  },
  //检测项目--新增
  {
    name: "CreateCheckReport",
    url: "/v1/health/CreateCheckReport",
  },
  //检测项目--删除
  {
    name: "DeleteCheckReport",
    url: "/v1/health/DeleteCheckReport",
  },
  //检测项目--编辑检测报告
  {
    name: "UpdateCheckReport",
    url: "/v1/health/UpdateCheckReport",
  },
  //检测项目--更新检测报告状态
  {
    name: "UpdateCheckReportStatus",
    url: "/v1/health/UpdateCheckReportStatus",
  },
  //检测项目--获取详情
  {
    name: "GetCheckReportDetail",
    url: "/v1/health/GetCheckReportDetail",
    methods: "get"
  },
  //样本登记表 --列表
  {
    name: "GetSampleList",
    url: "/v1/health/GetSampleList",
    methods: "get"
  },
  //样本登记表 --添加
  {
    name: "CreateSample",
    url: "/v1/health/CreateSample",
  },
  //样本登记表 --编辑
  {
    name: "UpdateSample",
    url: "/v1/health/UpdateSample",
  },
  //样本登记表 --删除
  {
    name: "DeleteSample",
    url: "/v1/health/DeleteSample",
  },
]