<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 19:10:00
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-10 16:29:31
 -->
<template>
  <personDetailLayOut>
    <div class="MedicalReports">
      <div class="serchFrom">
        <!-- //关联表头数据 -->
        <BDfrom @submitForm="submitForm"
          @resetForm="resetForm"
          :fromConfig="fromConfig"
          :formData="apiData['apiParam']">
          <el-form-item label="报告名称">
            <el-input v-model.trim="apiData['apiParam'].report_name"
              placeholder="报告名称"></el-input>
          </el-form-item>
          <el-form-item label="体检日期">
            <el-date-picker v-model="otherParams.time1"
              type="datetimerange"
              range-separator="至"
              value-format="timestamp"
              start-placeholder="开始日期"
              end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="上传日期">
            <el-date-picker v-model="otherParams.time2"
              type="datetimerange"
              range-separator="至"
              value-format="timestamp"
              start-placeholder="开始日期"
              end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </BDfrom>
      </div>

      <!-- 搜索结果 -->
      <div class="searchResult">
        <BDtableApi ref="staffTable"
          :batchHandel="batchHandel"
          :tableHead="tableHead"
          :apiData="apiData"></BDtableApi>
      </div>
      <!-- 弹窗--详情 -->
      <BDdialog :dialogParam="dialogParam">
        <div class="allFile">
          <files :files="allFileData"></files>
        </div>
      </BDdialog>
    </div>
  </personDetailLayOut>

</template>
<script>
import BDtableApi from "@/components/BD_table/api_table";
import BDfrom from "@/components/BD_from/index";
import BDdialog from "@/components/BD_dialog/index";
import files from "@/views/personMember/components/fileType.vue";
import selectData from "@/utils/selectData.js";
import { mapGetters } from "vuex";
import personDetailLayOut from "../personDetailLayOut";
export default {
  name: "MedicalReports",
  components: { BDtableApi, BDfrom, BDdialog, files, personDetailLayOut },
  data() {
    return {
      loading: false,
      childchecked: true,
      // 表单基础参数
      batchHandel: [
        {
          label: "下载",
          type: "warning",
          onClick: (item, selectData) => {
            this.downData(selectData);
          }
        },
        {
          label: "删除",
          type: "info",
          onClick: (item, selectData) => {
            this.delRecord(selectData);
          }
        }
      ],
      fromConfig: {
        inline: true,
        ref: "serchFrom",
        size: "small",
        okBtn: {
          label: "查 询",
          type: "danger"
          // costomClass: "searchFromConfirmBtn"
        },
        noBtn: { label: "重 置", show: true }
      },
      tableHead: [
        {
          type: "selection",
          width: "60px",
          selectable: (row, index) => {
            return true;
          }
        },
        {
          label: "报告名称",
          prop: "report_name"
        },

        {
          label: "体检日期",
          formatter: (row, column, cellValue, index) => {
            return <span>{this.$formatTime(row.check_time * 1000)}</span>;
          }
        },
        {
          label: "上传日期",
          formatter: (row, column, cellValue, index) => {
            return <span>{this.$formatTime(row.upload_time * 1000)}</span>;
          }
        },
        {
          label: "下载次数",
          prop: "download"
        },

        {
          label: "操作",
          type: "btn",
          width: "70px",
          btns: [{ label: "查看" }],
          btnClick: (btn, rown, index) => {
            this.getInfo(rown.physical_examination_report_id);
          }
        }
      ],
      otherParams: {
        time1: "",
        time2: ""
      },
      apiData: {
        apiName: "GetPhysicalExaminationReportList",
        timeParamsKey: "create_time",
        apiParam: {
          page_no: 1,
          page_size: 10,
          person_user_id: "",
          report_name: ""
        },
        //上传之前的事件
        beforeGetInfo: () => {
          let { time1, time2 } = this.otherParams;
          let check_start_time = Number(
            Array.isArray(time1) ? time1[0] / 1000 : ""
          );
          let check_end_time = Number(
            Array.isArray(time1) ? time1[0] / 1000 : ""
          );
          let upload_start_time = Number(
            Array.isArray(time2) ? time2[0] / 1000 : ""
          );
          let upload_end_time = Number(
            Array.isArray(time2) ? time2[0] / 1000 : ""
          );
          return {
            check_start_time,
            check_end_time,
            upload_start_time,
            upload_end_time
          };
        }
      },
      dialogParam: {
        title: "查看文件",
        top: "2%",
        center: true,
        width: "700px",
        visible: false,
        lockScroll: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        }
      },
      allFileData: [
        {
          name: "xxx",
          url: "xxxx"
        },
        {
          name: "x545xx",
          url: "xxxx58"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getActiveUser"])
  },
  methods: {
    //   删除
    delRecord(data) {
      let checkData = data.map(item => item.physical_examination_report_id);
      if (checkData.length == 0) {
        return false;
      }
      let params = {
        physical_examination_report_ids: checkData
      };

      this.$api["DeletePhysicalExaminationReport"](params)
        .then(res => {
          this.$showMsg("操作成功", 3);
          this.$refs.staffTable.refresh(1);
          this.$store.dispatch("changeTotalData");
        })
        .catch(err => {
          this.$showMsg(err);
        });
    },
    getInfo(physical_examination_report_id) {
      this.dialogParam.visible = true;
      this.$api["GetPhysicalExaminationReportFileList"]({
        physical_examination_report_id
      })
        .then(res => {
          this.dialogParam.visible = true;
          this.allFileData = res.data;
        })
        .catch(err => {
          this.$showMsg("获取数据失败!");
        });
    },
    // 确定回调事件
    submitForm(formName) {
      this.$refs.staffTable.refresh(1);
    },
    //确定回调事件
    resetForm(formName) {
      this.apiData.apiParam = {
        page_no: 1,
        page_size: 10,
        person_user_id: this.getActiveUser.person_user_id,
        report_name: ""
      };
      this.otherParams = {
        time1: "",
        time2: ""
      };
      this.$refs.staffTable.refresh(1);
    },
    //下载文件
    downData(data) {
      let checkData = data.map(item => item.physical_examination_report_id);
      if (checkData.length == 0) {
        return false;
      }
      this.$api["GetPhysicalExaminationReportFileByIds"]({
        physical_examination_report_ids: checkData
      })
        .then(res => {
          this.$uploadFile(res.data, 2).bind(this);
        })
        .catch(err => {
          // this.$showMsg("下载失败");
        });
    }
  },
  created() {
    this.apiData.apiParam.person_user_id = this.getActiveUser.person_user_id;
  }
};
</script>
<style lang="scss" scoped>
</style>
