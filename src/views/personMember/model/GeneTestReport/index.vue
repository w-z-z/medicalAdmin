<!--
 * @Description: 文件描述
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2019-12-24 19:10:00
 * @LastEditors  : ranli
 * @LastEditTime : 2020-01-14 18:19:22
 -->
<template>
  <personDetailLayOut>
    <div class="healthRecord">
      <div class="tabelBtn">
        <el-button class="btnStyle"
          @click="changevisible(1)"
          type="danger">新增检测报告</el-button>
      </div>
      <div class="serchFrom">
        <!-- //关联表头数据 -->
        <BDfrom @submitForm="submitForm"
          ref="serchFrom"
          @resetForm="resetForm"
          :fromConfig="fromConfig"
          :formData="apiData['apiParam']">
          <el-form-item label="检测编号">
            <el-input v-model.trim="apiData['apiParam'].number"
              placeholder="检测编号"></el-input>
          </el-form-item>
          <el-form-item label="检测项目">
            <el-select placeholder="检测项目"
              v-model.trim="apiData['apiParam'].product_id">
              <el-option v-for="(item,index) in getProductList"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检测状态">
            <el-select placeholder="检测状态"
              v-model="apiData['apiParam'].check_status">
              <el-option v-for="(item,index) in personMember.sampleStatus"
                :key="index"
                :label="item"
                :value="index"></el-option>
            </el-select>
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
      <!-- 弹窗--新增/编辑 -->
      <BDdialog :dialogParam="dialogParamAdd">
        <div style="padding:0 80px">
          <BDfrom v-loading="!isclick"
            @submitForm="changeUser"
            :fromConfig="recordFrom"
            ref="recordFrom"
            :formData="recordInfo">
            <el-form-item label="检测编号"
              prop="number">
              <el-input maxlength="50"
                v-model.trim="recordInfo.number"
                placeholder="检测编号"></el-input>
            </el-form-item>
            <!--  :picker-options="pickerDisabled" -->
            <el-form-item prop="check_time"
              label="采样日期">
              <el-date-picker v-model="recordInfo.check_time"
                type="date"
                value-format="timestamp"
                placeholder="请选择采样日期"></el-date-picker>
            </el-form-item>
            <el-form-item prop="product_id"
              label="检测项目">
              <el-select placeholder="检测项目"
                v-model.trim="recordInfo.product_id">
                <el-option v-for="(item,index) in getProductList"
                  :key="index"
                  :label="item"
                  :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="check_status"
              label="样本状态">
              <el-select placeholder="样本状态"
                v-model.trim="recordInfo.check_status">
                <el-option v-for="(item,index) in personMember.sampleStatus"
                  :key="index"
                  :label="item"
                  :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="uploadItem"
              prop="upload_file"
              label="上传报告">
              <uploadImg @getUploadimg="getUploadimg"
                :uploadFile="recordInfo.check_report_file_list"
                customClass="uploadFilesInformedConsent"></uploadImg>
              <span class="tips">
                支持png,jpg,jpeg,bmp,doc,docx,pdf格式文档
                <br />大小不超过20M
              </span>
            </el-form-item>
          </BDfrom>
        </div>
      </BDdialog>
    </div>
  </personDetailLayOut>
</template>
<script>
import BDtableApi from "@/components/BD_table/api_table";
import BDfrom from "@/components/BD_from/index";
import BDdialog from "@/components/BD_dialog/index";
import personDetailLayOut from "../personDetailLayOut";
import selectData from "@/utils/selectData.js";
import uploadImg from "@/components/uploadFile/uploadImg";
import { personMember } from "@/utils/selectData.js";
import { validate } from "@/utils/validate";
import { mapGetters } from "vuex";
export default {
  name: "GeneTestReport",
  components: { BDtableApi, BDfrom, BDdialog, uploadImg, personDetailLayOut },
  data() {
    return {
      isclick: true,
      loading: false,
      childchecked: true,
      personMember,
      // 表单基础参数
      batchHandel: [
        {
          label: "样本处理中",
          type: "warning",
          onClick: (item, selectData) => {
            this.changeStatus(selectData, 1);
          }
        },
        {
          label: "样本检测中",
          type: "warning",
          onClick: (item, selectData) => {
            this.changeStatus(selectData, 2);
          }
        },
        {
          label: "报告已出具",
          type: "warning",
          onClick: (item, selectData) => {
            this.changeStatus(selectData, 3);
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
        // 表单验证规则
        inline: true,
        ref: "ruleForm",
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
          label: "检测编号",
          prop: "number"
        },
        {
          label: "检测项目",
          prop: "product_name"
        },
        {
          label: "采样日期",
          formatter: (row, column, cellValue, index) => {
            return <span>{this.$formatTime(row.check_time * 1000)}</span>;
          }
        },
        {
          label: "样本状态",
          prop: "check_status",
          formatter: (row, column, cellValue, index) => {
            return <span>{personMember.sampleStatus[row.check_status]}</span>;
          }
        },
        // {
        //   label: "上传状态",
        //   prop: "upload_status",
        //   formatter: (row, column, cellValue, index) => {
        //     return <span>{personMember.uploadStatus[row.check_status]}</span>;
        //   }
        // },
        {
          label: "上传日期",
          formatter: (row, column, cellValue, index) => {
            let { upload_time } = row;
            let str = upload_time
              ? this.$formatTime(row.upload_time * 1000)
              : "--";
            return <span>{str}</span>;
          }
        },
        {
          label: "操作",
          type: "btn",
          width: "70px",
          btns: [{ label: "编辑" }],
          btnClick: (btn, rown, index) => {
            this.getRecordInfo(rown);
          }
        }
      ],
      apiData: {
        apiName: "GetCheckReportList",
        timeParamsKey: "create_time",
        apiParam: {
          page_no: 1,
          page_size: 10,
          number: "",
          product_id: "",
          check_status: ""
        }
      },
      pickerDisabled: {
        disabledDate: time => {
          return time.getTime() > new Date().getTime();
        }
      },
      recordInfo: {
        number: "",
        product_id: "",
        check_time: "",
        check_status: "",
        check_report_file_list: {
          file_type: "",
          file_url: ""
        }
      },
      recordFrom: {
        // 表单验证规则
        ref: "recordFrom",
        labelPosition: "top",
        coustomClass: "submitInfoFrom",
        okBtn: {
          label: "确定新增",
          type: "danger",
          class: "btnStyle"
        },
        noBtn: { label: "重 置", show: false },
        rules: {
          number: [
            { required: true, message: "请输入档案编号", trigger: "submit" }
          ],
          product_id: [
            { required: true, message: "请选产品", trigger: "submit" }
          ],
          check_time: [
            { required: true, message: "请选择时间", trigger: "submit" }
          ],
          check_status: [
            { required: true, message: "请选择状态", trigger: "submit" }
          ]
        }
      },
      recordType: 1,
      dialogParamAdd: {
        title: "新增检测报告",
        top: "2%",
        center: true,
        width: "594px",
        visible: false,
        lockScroll: true,
        okBtn: {
          show: false
        },
        noBtn: {
          show: false
        },
        beforeClose: done => {
          this.$refs.recordFrom.resetForm();
          done();
        }
      }
    };
  },
  watch: {
    recordType(value) {
      if (this.recordType == 1) {
        this.dialogParamAdd.title = "新增检测报告";
        this.recordFrom.okBtn.label = "确定新增";
      } else {
        this.dialogParamAdd.title = "编辑检测报告";
        this.recordFrom.okBtn.label = "保存修改";
      }
    }
  },
  computed: {
    ...mapGetters(["getActiveUser", "getProductList"])
  },
  methods: {
    //删除
    delRecord(data) {
      let checkData = data.map(item => item.check_report_id);
      if (checkData.length == 0) {
        return false;
      }
      let params = {
        check_report_ids: checkData
      };
      this.$api["DeleteCheckReport"](params)
        .then(res => {
          this.$showMsg("删除成功!", 3);
          this.$refs.staffTable.refresh(1);
          this.$store.dispatch("changeTotalData");
        })
        .catch(err => {
          this.$showMsg("删除失败!");
        });
    },
    //确定回调事件
    resetForm(formName) {
      this.apiData.apiParam = {
        page_no: 1,
        page_size: 10,
        product_id: "",
        number: "",
        // sign_time: "",
        check_status: "",
        person_user_id: this.getActiveUser.person_user_id
      };
      this.$refs.staffTable.refresh(1);
    },
    //获取详情
    getRecordInfo(item) {
      this.$api["GetCheckReportDetail"]({
        check_report_id: item.check_report_id
      })
        .then(res => {
          this.changevisible(2, res);
        })
        .catch(err => {
          this.$showMsg("获取产品详情失败");
        });
    },
    //编辑/新增
    changeUser(formName) {
      let apiUrl =
        this.recordType == 1 ? "CreateCheckReport" : "UpdateCheckReport";
      this.recordInfo.person_user_id = this.apiData.apiParam.person_user_id;
      let New_obj = Object.assign({}, this.recordInfo);
      New_obj.check_time = New_obj.check_time / 1000;
      New_obj.check_status = Number(New_obj.check_status);
      New_obj.check_report_file_list = [New_obj.check_report_file_list];
      if (this.isclick) {
        this.isclick = false;
        this.$api[apiUrl](New_obj)
          .then(res => {
            this.$showMsg("操作成功", 3);
            this.dialogParamAdd.visible = false;
            this.$refs.staffTable.refresh(1);
            this.$store.dispatch("changeTotalData");
            this.isclick = true;
          })
          .catch(err => {
            this.$showMsg(err);
            this.isclick = true;
          });
      }
    },
    //更改状态
    changeStatus(data, type) {
      let checkData = data.map(item => item.check_report_id);
      if (checkData.length == 0) {
        return false;
      }
      let params = {
        check_report_ids: checkData,
        check_status: type
      };
      this.$api["UpdateCheckReportStatus"](params)
        .then(res => {
          this.$showMsg("操作成功!", 3);
          this.$refs.staffTable.refresh(1);
        })
        .catch(err => {
          this.$showMsg("获取数据失败!");
        });
    },
    //更改弹窗
    changevisible(type, obj) {
      this.recordType = type;
      if (type == 1) {
        this.recordInfo = {
          number: "",
          product_id: "",
          check_time: "",
          check_report_file_list: {
            file_url: ""
          },
          check_status: ""
        };
      } else {
        let newObj = this._.cloneDeep(obj);
        newObj.check_time = newObj.check_time * 1000;
        newObj.check_status = newObj.check_status.toString();
        if (newObj.check_report_file_list) {
          newObj.check_report_file_list = newObj.check_report_file_list[0];
        } else {
          newObj.check_report_file_list = { file_url: "" };
        }
        console.log(newObj);
        this.recordInfo = newObj;
      }
      this.dialogParamAdd.visible = true;
    },
    // 确定回调事件
    submitForm(formName) {
      this.$refs.staffTable.refresh(1);
    },
    //上传文件的回调
    getUploadimg(file) {
      this.recordInfo.check_report_file_list = file;
    }
  },
  created() {
    this.apiData.apiParam.person_user_id = this.getActiveUser.person_user_id;
  }
};
</script>
<style lang="scss">
.healthRecord {
  .uploadItem {
    .el-form-item__content {
      line-height: 20px !important;
    }
  }
  .uploadFilesInformedConsent {
    border-radius: 0;
  }
  .tips {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
